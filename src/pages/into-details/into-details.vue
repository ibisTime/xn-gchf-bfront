<template>
    <div class="full-screen-wrapper into-wrapper">
        <scroll ref="scroll" :hasMore="false">
            <div>
                <div class="baseBanner">
                    <p class="baseCenter">
                        进出详情
                    </p>
                </div>
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
                      <span>{{item.type}}</span>
                    </div>
                    <div class="entryImg">
                      <span>{{item.date}}</span> <img src="./to@2x.png"/>
                    </div>
                  </div>
                </div>
                <no-result title="暂无进退场记录" v-if="entryOutList.length === 0" style="margin-top: 0.8rem"/>
              </scroll>
            </div>
        </scroll>
        <router-link to="/addProject">
            <div class="footer">
                        <div class="footer-wrapper">
                            <img src="./addnew@2x.png"/>
                        </div>
            </div>
        </router-link>
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

export default {
    data(){
        return{
          entryOutList:[],
          inOutData: [],
          isLoading: true,
          toastText: '',
          config: {
            workerCode: ''
          },
          entryExitType: {}
        }
    },
  created() {
      let inOutData = sessionStorage.getItem('inOutData') || '';
      if(inOutData) {
        this.inOutData.push(JSON.parse(inOutData));
        this.config.workerCode = this.inOutData[0].workerCode;
        Promise.all([
          getDictList('entry_exit_type'),
        ]).then(([data1]) => {
          data1.forEach(item => {
            this.entryExitType[item.dkey] = item.dvalue;
          });
          this.entryOutFn()
        });
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
        this.entryOutList = data.map(item => {
          item.type = this.entryExitType[item.type];
          item.date = formatDate(item.date, 'yyyy-MM-dd hh-mm-ss');
          return item;
        });
        this.isLoading = false;
      });
    },
    toDetailsText(code) {
      this.$router.push(`/detailsText?code=${code}`)
    },
    toDetailItems() {
      this.$router.push(`/memberDetails?code=${this.inOutData[0].workerCode}`);
    }
  },
  components: {
    scroll: Scroll,
    noResult: NoResult,
    loading: Loading,
    toast: Toast
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
                    right: 2.5rem;
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
        box-shadow: 0 -1px 0 0 #E6E6E6;
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
}
</style>


