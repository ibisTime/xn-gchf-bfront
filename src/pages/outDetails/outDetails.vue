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
                    <span>{{outInDetails[0].workerName}}</span>
                    <span>{{outInDetails[0].teamName}}</span>
                    <span :class="outInDetails[0].direction === '01' ? 'in' : 'out'">{{outInDetails[0].direction === '01' ? '在场内' : '已出场'}}</span>
                  </p>
                  <p class="detailUnder">
                    <span>身份证号: {{outInDetails[0].idcardNumber}}</span>
                  </p>
                  <div class="detailImg">
                    <img src="./to@2x.png"/>
                  </div>
                </div>
              </div>
                <div class="empty"></div>
              <div class="pushAdd" v-for="(item, index) in entryOutList" :key="index" @click="toOutInDetails(item.code)">
                <div class="entry" :class="item.direction === '01' ? 'in' : 'out'">
                  {{item.direction}} <span>&nbsp; {{formatDate(item.date)}}</span>
                </div>
                <div class="entryImg">
                  <img src="./to@2x.png"/>
                </div>
              </div>
            </div>
          <no-result title="暂无进出记录" v-if="entryOutList.length === 0" style="margin-top: 0.8rem"/>
        </scroll>
      <loading :title="'正在努力加载中...'" :isLoading="isLoading"></loading>
      <toast ref="toast" :text="toastText"></toast>
    </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import NoResult from 'base/no-result/no-result';
  import Loading from 'base/loading/loading';
  import Toast from 'base/toast/toast';
  import {queryOutInList} from 'api/deal';
  import {getDictList} from 'api/general';
  import {formatDate} from 'common/js/util';
  export default {
    data(){
        return{
          outInDetails: [{}],
          entryOutList: [],
          isLoading: true,
          toastText: ''
        }
    },
    created() {
      let outInDetails = sessionStorage.getItem('outInDetails') || '';
      if(outInDetails) {
        this.outInDetails = [JSON.parse(outInDetails)];
        Promise.all([
          getDictList('direction'),
          queryOutInList(this.outInDetails[0].workerName)
        ]).then(([data1, data2]) => {
          let entryExitType = {};
          data1.forEach(item => {
            entryExitType[`${item.dkey}`] = item.dvalue;
          });
          this.entryOutList = data2.map(item => {
            item.direction = entryExitType[item.direction];
            return item;
          });
          this.isLoading = false;
        });
      }
    },
    methods: {
      toOutInDetails(code) {
        this.$router.push(`/outInDetails?code=${code}`);
      },
      formatDate(time) {
        return formatDate(time);
      },
      toDetailItems() {
        this.$router.push(`/memberDetails?code=${this.outInDetails[0].workerCode}`);
      }
    },
    components: {
      Scroll,
      NoResult,
      Loading,
      Toast
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
        box-shadow: 0 1px 0 0 #E6E6E6;
        font-size:.32rem;
        span{
            position: absolute;
            display: inline-block;
        }
        .entryImg{
            width: 0.2rem;
            height: 0.3rem;
            display: inline-block;
            position: absolute;
            right: 0.1rem;
            top: 0.1rem;
            img{
            width: 100%;
            height: 100%;
            }
        }
     }
  .in{
    color: #28C71F !important;
  }
  .out{
    color: #E93535 !important;
  }
}
</style>


