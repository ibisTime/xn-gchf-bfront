<template>
  <div class="full-screen-wrapper into-wrapper">
    <scroll ref="scroll" :hasMore="false">
      <div>
        <div class="baseBanner">
          <p class="baseCenter">
            考勤详情
          </p>
        </div>
        <div class="detailItems" @click="toDetailItems">
          <div class="details">
            <p class="detailTop">
              <span>{{inOutDetail[0].workerName}}</span>
              <span>{{inOutDetail[0].teamName}}</span>
              <span :class="inOutDetail[0].static === '1' ? 'in' : 'out'">{{inOutDetail[0].uploadStatus}}</span>
            </p>
            <p class="detailUnder">
              <span>身份证号: {{inOutDetail[0].idCardNumber}}</span>
            </p>
            <div class="detailImg">
              <img src="./to@2x.png"/>
            </div>
          </div>
        </div>
        <div class="empty"></div>
        <div class="pushAdd" v-for="(item, index) in entryOutList" :key="index" @click="toOutInDetails(item.code)">
          <div class="entry" :class="inOutDetail[0].static === '1' ? 'in' : 'out'">
            {{item.direction}} <span>&nbsp; {{formatDate(item.date)}}</span>
          </div>
          <div class="entryImg">
            <img src="./to@2x.png"/>
          </div>
        </div>
      </div>
      <router-link to="/attence-add">
        <div class="footer">
          <div class="footer-wrapper">
            <img src="./addnew@2x.png"/>
          </div>
        </div>
      </router-link>
      <no-result title="抱歉，暂无考勤记录" v-if="entryOutList.length === 0" style="margin-top: 0.8rem"/>
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
  import {queryAttendanceList} from 'api/deal';
  import {getDictList} from 'api/general';
  import {formatDate} from 'common/js/util';
  export default {
    data(){
      return{
        inOutDetail: [{}],
        entryOutList: [],
        isLoading: true,
        toastText: ''
      }
    },
    created() {
      let inOutDetail = sessionStorage.getItem('inOutDetail') || '';
      if(inOutDetail) {
        this.inOutDetail = [JSON.parse(inOutDetail)];
        Promise.all([
          getDictList('direction'),
          queryAttendanceList(this.inOutDetail[0].workerCode)
        ]).then(([data1, data2]) => {
          let entryExitType = {};
          data1.forEach(item => {
            entryExitType[item.dkey] = item.dvalue;
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
        this.$router.push(`/attence?code=${code}`);
      },
      formatDate(time) {
        return formatDate(time);
      },
      toDetailItems() {
        this.$router.push(`/memberDetails?code=${this.inOutDetail[0].workerCode}`);
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
    .in{
      color: #E93535 !important;
    }
    .out{
      color: #28C71F !important;
    }
  }
</style>


