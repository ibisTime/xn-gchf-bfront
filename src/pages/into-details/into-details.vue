<template>
    <div class="full-screen-wrapper into-wrapper">
        <scroll ref="scroll" :hasMore="false">
            <div>
                <div class="baseBanner">
                    <p class="toBack" @click="toBack">返回</p>
                    <p class="baseCenter">
                        进退详情
                    </p>
                </div>
              <ToHome></ToHome>
              <div class="detailItems" @click="toDetailItems">
                <div class="details">
                  <p class="detailTop">
                    <span>{{inOutData[0].workerName}}</span>
                    <span>{{inOutData[0].teamName}}</span>
                    <span>{{inOutData[0].uploadStatus}}</span>
                  </p>
                  <p class="detailUnder">
                    <span>身份证号: {{inOutData[0].idcardNumber}}</span>
                  </p>
                  <router-link to="/memberDetails">
                    <div class="detailImg">
                      <img src="./to@2x.png"/>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="empty"></div>
              <scroll ref="scroll" :hasMore="false" :data="entryOutList">
                <div class="pushAdd" v-for="(item, index) in entryOutList" :key="index">
                  <div class="item" @click="toDetailsText(item.code)">
                    <div class="entry">
                      <span :class="item.type != '1' ? 'out' : 'in'">{{item.type === 1 ? "进场" : "退场"}}</span>
                    </div>
                    <div class="entryImg">
                      <span :class="item.type != '1' ? 'out' : 'in'">{{item.date === "NaN-aN-aN" ? "暂无数据" : item.date }}</span> <img src="./to@2x.png"/>
                    </div>
                  </div>
                </div>
                <no-result title="抱歉，暂无进退场记录" v-if="entryOutList.length === 0" style="margin-top: 0.8rem"/>
                <div style="height:0.4rem;width:100%;"></div>
              </scroll>
            </div>
        </scroll>
        <!--<router-link to="/addProject">-->
            <div class="footer" @click="toAddProject()">
                        <div class="footer-wrapper">
                            <img src="./addnew@2x.png"/>
                        </div>
            </div>
        <!--</router-link>-->
      <loading :title="'正在努力加载中...'" :isLoading="isLoading"></loading>
      <toast ref="toast" :text="toastText"></toast>
    </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import NoResult from 'base/no-result/no-result';
import Loading from 'base/loading/loading';
import Toast from 'base/toast/toast';
import {getEntryOutList} from 'api/deal';
import{getDictList} from 'api/general';
import { formatDate } from 'common/js/util';
import ToHome from 'base/toHome/toHome';

export default {
    data(){
        return{
          entryOutList: [],
          inOutData: [],
          isLoading: true,
          uploadStatusLists: {},
          toastText: '',
          config: {
            workerCode: '',
            orderColumn: 'date',
            orderDir: 'desc'
          }
        }
    },
  created() {
    let inOutData = sessionStorage.getItem('inOutData') || '';
    if(inOutData) {
      this.inOutData.push(JSON.parse(inOutData));
      this.config.workerCode = this.inOutData[0].code;
      Promise.all([
        getDictList('entry_exit_type')
      ]).then(([data1]) => {
        data1.forEach(item => {
          this.uploadStatusLists[item.dkey] = item.dvalue;
        });
      });
      this.entryOutFn();
    }else {
      this.toastText = '访问异常';
      this.$refs.toast.show();
      setTimeout(() => {
        this.$router.push('/filed');
      }, 1000);
    }
  },
  methods: {
    entryOutFn() {
      return getEntryOutList(this.config).then(data => {
        let arr = data.map(item => {
          // yyyy-MM-dd  hh-mm-ss
          item.date = formatDate(item.date, 'yyyy-MM-dd');
          return item;
        });
        this.hasMore = (data.pageNO < data.totalPage);
        this.config.start ++;
        this.entryOutList = [...this.entryOutList, ...arr];
        console.log(this.entryOutList);
        this.isLoading = false;
      });
    },
    toDetailsText(code) {
      this.$router.push(`/detailsText?code=${code}`);
    },
    toDetailItems() {
      this.$router.push(`/memberDetails?code=${this.inOutData[0].code}`);
    },
    toAddProject() {
      this.$router.push(`/addProject?userCode=${this.inOutData[0].code}`);
    },
    toBack() {
      window.history.go(-1);
    }
  },
  components: {
    scroll: Scroll,
    noResult: NoResult,
    loading: Loading,
    toast: Toast,
    ToHome
  }
}
</script>

<style lang="scss" scoped>
.into-wrapper{
    .baseBanner{
        position: relative;
        height: 1.28rem;
        width:100%;
        background:#028EFF;
        text-align: center;
        font-size: 0.32rem;
        color: #fff;
        .baseCenter{
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translateX(-50%) translateY(-50%);
            }
        }
        .toBack{
          float: left;
          margin-left: 0.5rem;
          margin-top: 0.5rem;
        }
    .detailItems{
        position: relative;
        width:100%;
        .details{
            position: relative;
            height:1.5rem;
            width: 92%;
            border-bottom: 1px solid #E6E6E6;
            margin: 0 auto;
            .detailTop{
                margin-top: 0.5rem;
                width: 100%;
                color: #333;
                font-size:0.32rem;
                :nth-child(2){
                    display: inline-block;
                    position: absolute;
                    right: 3.2rem;
                }
                :nth-child(3){
                    display: inline-block;
                    position: absolute;
                    right: .5rem;
                }
            }
            .detailUnder{
                width: 100%;
                font-size:0.24rem;
                margin-top:0.4rem;
                color: #333;
                letter-spacing: 0;
                text-align: justify;
            }
            .detailImg{
                width: 0.2rem;
                height: 0.3rem;
                display: inline-block;
                position: absolute;
                right: 0.1rem;
                top: 20%;
                img{
                width: 100%;
                height: 100%;
                }
            }
        }
    }
    .empty{
        height: .2rem;
        background: #f0f0f0;
        width: 100%;
    }
    .pushAdd{
        position: relative;
        width: 92%;
        margin: 0 auto;
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #E6E6E6;
        font-size:.32rem;
      .item{
        display: flex;
      }
        span{
            display: inline-block;
        }
        .entryImg{
            display: inline-block;
            position: absolute;
            right: 0.1rem;
            img{
              width: 0.2rem;
              height: 0.2rem;
            }
        }
    }
    .footer{
        position: fixed;
        background: #fff;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1.9rem;
        .footer-wrapper{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 92%;
            height: 1.5rem;
            background: #F5F5F5;
            border-radius: 4px;
            img{
                width:100%;
                height: 100%;
            }
        }
    }
  .in{
    color: #E93535 !important;
  }
  .out{
    color: #28C71F !important;
  }
}
</style>


