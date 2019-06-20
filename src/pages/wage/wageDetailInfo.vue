<template>
  <div class="full-screen-wrapper">
    <scroll ref="scroll" :hasMore="false">
    <div class="faceCollectBanner">
      <p class="toBack" @click="toBack">返回</p>
      <p class="faceCollectCenter">
        工资单明细
      </p>
      <div class="right" @click='exitProject'>
        修改
      </div>
    </div>
      <ToHome></ToHome>
    <div class="form-wrapper form-gray-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">员工编号</div>
          <span class="margin-left-ram">{{this.wageInfoList.workerName}}-{{this.wageInfoList.workerCode}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">工人工资银行</div>
          <span class="margin-left-ram">{{this.wageInfoList.payRollBankName}}{{this.wageInfoList.payRollBankCardNumber}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">所在参建单位银行</div>
          <span class="margin-left-ram">{{this.wageInfoList.payBankName}}{{this.wageInfoList.payBankCardNumber}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">应发金额</div>
          <span class="margin-left-ram">{{this.wageInfoList.totalPayAmount}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">实发金额</div>
          <span class="margin-left-ram">{{this.wageInfoList.actualAmount}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">发放日期</div>
          <span class="margin-left-ram">{{this.wageInfoList.balanceDate ? formatDate(this.wageInfoList.balanceDate, true) : '暂无数据'}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">发放月份</div>
          <span class="margin-left-ram">{{this.wageInfoList.payMonth ? formatDate(this.wageInfoList.payMonth, false) : '暂无数据'}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">是否为补发</div>
          <span class="margin-left-ram">{{this.wageInfoList.isBackPay == "0" ? "否" : '是'}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">补发月份</div>
          <span class="margin-left-ram">{{this.wageInfoList.backPayMonth ? formatDate(this.wageInfoList.backPayMonth, false) : '暂无数据'}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">出勤天数</div>
          <span class="margin-left-ram">{{this.wageInfoList.days}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">总工时</div>
          <span class="margin-left-ram">{{this.wageInfoList.workHours}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">第三方工资单编号</div>
          <span class="margin-left-ram">{{this.wageInfoList.thirdPayRollCode}}</span>
        </div>
      </div>
      <div class="preservationClear" @click="deleteWage" style="margin-bottom: 2rem">
        删除
      </div>
      <toast ref="toast" :text="toastText"></toast>
    </div>
    </scroll>
  </div>
</template>
<script>
  import { formatDate } from 'common/js/util';
  import{getDictList} from 'api/general';
  import{findWageInfo, delWage} from 'api/deal';
  import Toast from 'base/toast/toast';
  import Scroll from 'base/scroll/scroll';
  import ToHome from 'base/toHome/toHome';
  export default {
    data(){
      return {
        wageInfoList: [],
        wageCode: '',
        toastText: ''
      }
    },
    async created() {
      const {code} = this.$route.query;
      this.wageCode = code;
      this.getWageInfo(code);
    },
    methods: {
      async getWageInfo(code) {
        return findWageInfo(code).then(data => {
          this.wageInfoList = data;
          console.log(this.wageInfoList);
        });
      },
      formatDate(time, showFlag) {
        if(showFlag) {
          return formatDate(time);
        }else{
          return formatDate(time, "yyyy-MM");
        }
      },
      exitProject() {
        this.$router.push(`/wageChange?code=${this.wageInfoList.workerCode}&wageCode=${this.wageCode}`);
      },
      toBack() {
        window.history.go(-1);
      },
      deleteWage() {
        delWage(this.wageCode).then(() => {
          this.toastText = '删除成功';
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.back();
          }, 1000);
        });
      }
    },
    components: {
      Toast,
      scroll: Scroll,
      ToHome
    }
  }
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";
  .faceCollectBanner{
    position: relative;
    height: 1.28rem;
    width:100%;
    background:#028EFF;
    text-align: center;
    font-size: 0.32rem;
    color: #fff;
    .faceCollectCenter{
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
  .right{
    position: absolute;
    right: .3rem;
    top: .5rem;;
    color: #fff;
    font-size: 0.32rem;
  }
  .item-title{
    color:#ccc;
  }
  .margin-left-ram{
    margin-left: 0.2rem;
  }
  .wADatatime{
    width: 60%;
    text-align: center;
    background: #fff;
  }
  .wASelect{
    width: 60%;
    text-align: center;
    background: #fff;
  }
  .preservationClear{
    width: 92%;
    height: 1rem;
    line-height: 1rem;
    background:rgba(2,142,255,1);
    margin: 1rem auto 0;
    color: rgba(255,255,255,1);
    text-align: center;
    border:2px solid rgba(2,142,255,1);
    border-radius: 2px;
    font-size: 0.32rem;
  }
</style>
