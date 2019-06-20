<template>
  <div class="full-screen-wrapper into-wrapper">
    <scroll ref="scroll" :hasMore="hasMore"  @pullingUp="entryOutFn" :data="items">
      <div>
        <div class="baseBanner">
          <p class="toBack" @click="toBack">返回</p>
          <p class="baseCenter">
            工资详情
          </p>
        </div>
        <ToHome></ToHome>
        <div class="detailItems" @click="toDetailItems">
          <div class="details">
            <p class="detailTop">
              <span>{{wageDetail[0].workerName}}</span>
              <span>{{wageDetail[0].teamName.length > 4 ? wageDetail[0].teamName.substring(0,4) + "..." : wageDetail[0].teamName}}</span>
              <span>{{wageDetail[0].uploadStatus ? formatUploadStatus(wageDetail[0].uploadStatus) : ''}}</span>
            </p>
            <p class="detailUnder">
              <span>身份证号: {{wageDetail[0].idcardNumber}}</span>
            </p>
            <div class="detailImg">
              <img src="./to@2x.png"/>
            </div>
          </div>
        </div>
        <div class="empty"></div>
          <div class="pushAdd" v-for="(item, index) in items" :key="index">
            <div class="item" @click="toDetailsText(item.code)">
              <p>
                <span>{{ item.payMonth ? balanceFormatDate(item.payMonth, true) + "月" : "暂无记录"}}</span>
                <span class="margin-left-rem">应发:{{item.totalPayAmount ? item.totalPayAmount : "暂无记录"}}</span>
                <span class="margin-left-rem">实发:{{item.actualAmount ? item.actualAmount : "暂无记录"}}</span>
                <span class="margin-left-rem">状态:{{formatUploadStatus(item.uploadStatus)}}</span>
                <br />
                <span>发放日期:{{balanceFormatDate(item.balanceDate, false) === "NaN-aN-aN" ? "暂无数据" : balanceFormatDate(item.balanceDate, false)}}</span>
              </p>
              <div class="entryImg">
                <img src="./to@2x.png"/>
              </div>
            </div>
          </div>
        <div style="height:1rem;width:100%;"></div>
      </div>
      <no-result title="抱歉，暂无工资记录" v-if="items.length === 0" style="margin-top: 0.8rem"/>
    </scroll>
    <loading :title="'正在努力加载中...'" :isLoading="isLoading"></loading>
    <toast ref="toast" :text="toastText"></toast>
    <div class="footer" @click="toAddWageDetail()">
      <div class="footer-wrapper">
        <img src="./addnew@2x.png"/>
      </div>
    </div>
  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import NoResult from 'base/no-result/no-result';
  import Loading from 'base/loading/loading';
  import Toast from 'base/toast/toast';
  import {PagewageInfo} from 'api/deal';
  import{getDictList} from 'api/general';
  import { formatDate } from 'common/js/util';
  import ToHome from 'base/toHome/toHome';
  export default {
    data(){
      return{
        items: [],
        entryOutList:[],
        hasMore: true,
        wageDetail: [],
        isLoading: true,
        toastText: '',
        config: {
          idcardNumber: '',
          start: 1,
          limit: 10
        },
        uploadStatus: {},
        uploadStatusTwo: {}
      }
    },
    created() {
      let wageDetail = sessionStorage.getItem('wageDetail') || '';
      if(wageDetail) {
        this.wageDetail.push(JSON.parse(wageDetail));
        this.config.idcardNumber = this.wageDetail[0].idcardNumber;
        Promise.all([
          getDictList('upload_status'),
        ]).then(([data1]) => {
          this.uploadStatusTwo = data1;
          data1.forEach(item => {
            this.uploadStatus[item.dkey] = item.dvalue;
          });
          this.entryOutFn();
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
        return PagewageInfo(this.config).then(data => {
          this.hasMore = (data.pageNO < data.totalPage);
          this.config.start++;
          this.items = [...this.items, ...data.list];
          console.log(this.items);
          this.isLoading = false;
        });
      },
      balanceFormatDate(time, flag) {
        if(flag) {
          return formatDate(time, "M");
        }else{
          return formatDate(time, "yyyy-MM-dd");
        }

      },
      formatUploadStatus(status) {
        for (let i = 0; i < this.uploadStatusTwo.length; i++) {
          if (this.uploadStatusTwo[i].dkey === status) {
            return this.uploadStatusTwo[i].dvalue;
          }
        }
        return '';
      },
      toDetailsText(code) {
        this.$router.push(`/wageDetailInfo?code=${code}`);
      },
      toDetailItems() {
        this.$router.push(`/memberDetails?code=${this.wageDetail[0].code}`);
      },
      toAddWageDetail() {
        this.$router.push(`/wageAdd?code=${this.wageDetail[0].code}`);
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
      .toBack{
        float: left;
        margin-left: 0.5rem;
        margin-top: 0.5rem;
      }
    }
    .sendStatus{
      position: absolute;
      right: 0px;
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
      height: 2rem;
      line-height: 1rem;
      border-bottom: 1px solid #E6E6E6;
      font-size:0.24rem;
      color: #333;
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
        margin-top: 0.6rem;
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
    .margin-left-rem{
      margin-left: 0.2rem;
    }
  }
</style>


