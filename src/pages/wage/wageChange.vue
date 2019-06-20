<template>
  <div class="full-screen-wrapper">
    <scroll ref="scroll" :hasMore="false">
    <div class="faceCollectBanner">
      <p class="toBack" @click="toBack">返回</p>
      <p class="faceCollectCenter">
        修改工资信息
      </p>
    </div>
      <ToHome></ToHome>
    <div class="form-wrapper form-gray-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title"><strong class="item-must">*</strong>工人工资卡银行</div>
            <select v-model="config.payRollBankCode" name="payRollBankCode" class="wASelect margin-left-ram">
            <option value="">请选择</option>
            <option :value="item.key" v-for="(item, index) in bankCodeList" :key="index">{{item.value}}</option>
            </select>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title"><strong class="item-must">*</strong>工人工资卡号</div>
          <input type="text" v-model="config.payRollBankCardNumber" name="payBankCardNumber" class="margin-left-ram" />
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title"><strong class="item-must">*</strong>工资代发银行</div>
          <select v-model="config.payBankCode" name="payBankCode" class="wASelect margin-left-ram">
            <option value="">请选择</option>
            <option :value="item.key" v-for="(item, index) in bankCodeList" :key="index">{{item.value}}</option>
          </select>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title"><strong class="item-must">*</strong>工资代发银行卡号</div>
          <input type="text" v-model="config.payBankCardNumber" name="payRollBankCardNumber" class="margin-left-ram" />
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title"><strong class="item-must">*</strong>应发金额</div>
          <input type="text" value="" v-model="config.totalPayAmount" name="totalPayAmount" class="margin-left-ram" />
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title"><strong class="item-must">*</strong>实发金额</div>
          <input type="text" value="" v-model="config.actualAmount" name="actualAmount" class="margin-left-ram" />
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title"><strong class="item-must">*</strong>发放日期</div>
          <date-picker id="timego" class="margin-left-ram"
                       :year="exitYear"
                       :month="exitMonth"
                       :day="exitDay"
                       @change="updateExitDate">
          </date-picker>
        </div>
      </div>
      <!--<div class="form-item border-bottom-1px">-->
        <!--<div class="item-input-wrapper">-->
          <!--<div class="item-title">发放月份<strong class="item-must">*</strong></div>-->
          <!--<input type="text" value="" v-model="config.payMonth" name="payMonth" class="margin-left-ram" />-->
        <!--</div>-->
      <!--</div>-->
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title"><strong class="item-must">*</strong>是否为补发</div>
          <select v-model="config.isBackPay" name="isBackPay" class="item-input margin-left-ram" @change="isBackPayMonitor">
            <option value="">请选择</option>
            <option :value="item.key" v-for="(item, index) in dictList" :key="index">{{item.value}}</option>
          </select>
        </div>
      </div>
      <div class="form-item border-bottom-1px" v-if="showPrise">
        <div class="item-input-wrapper">
          <div class="item-title"><strong class="item-must">*</strong>补发月份</div>
          <!--<input type="text" value="" v-model="config.backPayMonth" name="backPayMonth" class="margin-left-ram" />-->

          <!--<select class="item-input margin-left-ram" v-model="config.backPayMonth">-->
            <!--<option value="01">一月</option>-->
            <!--<option value="02">二月</option>-->
            <!--<option value="03">三月</option>-->
            <!--<option value="04">四月</option>-->
            <!--<option value="05">五月</option>-->
            <!--<option value="06">六月</option>-->
            <!--<option value="07">七月</option>-->
            <!--<option value="08">八月</option>-->
            <!--<option value="09">九月</option>-->
            <!--<option value="10">十月</option>-->
            <!--<option value="11">十一月</option>-->
            <!--<option value="12">十二月</option>-->
          <!--</select>-->
          <DatePickerM class="margin-left-ram"
                       :year="repairExitYear"
                       :month="repairExitMonth"
                       @change="updateRepairExitDate">
          </DatePickerM>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">出勤天数</div>
          <input type="text" value="" v-model="config.days" name="days" class="margin-left-ram" />
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">总工时</div>
          <input type="text" value="" v-model="config.workHours" name="workHours" class="margin-left-ram" />
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <div class="item-title">第三方工资单编号</div>
          <input type="text" value="" v-model="config.thirdPayRollCode" name="thirdPayRollCode" class="margin-left-ram" />
        </div>
      </div>
      <div class="preservationClear" @click="openUpdateWageInfo">
        修改
      </div>
      <div class="divBox"></div>
    </div>
    <toast ref="toast" :text="toastText"></toast>
    </scroll>
  </div>
</template>
<script>
  import { formatDate } from 'common/js/util';
  import DatePicker from 'base/date-picker/date-picker';
  import DatePickerM from 'base/date-picker/date-picker-show-m';
  import {getClassDetail} from 'api/biz';
  import{getDictList} from 'api/general';
  import{userQueryList, findBankCardByBs, findGinsengBk, updateWageInfo, findWageInfo} from 'api/deal'
  import Toast from 'base/toast/toast';
  import Scroll from 'base/scroll/scroll';
  import ToHome from 'base/toHome/toHome';
  export default {
    data(){
      return{
        exitYear: '',
        exitMonth: '',
        exitDay: '',
        month: '00',
        payMonth: '00',
        repairExitYear: '',
        repairExitMonth: '',
        repairExitDay: '',
        toastText: '',
        userList: [],
        bankList: [],
        bankLists: [],
        ginsengBkList: [],
        ginsengBkLists: [],
        dictList: [],
        wageInfoList: [],
        bankCodeList: [],
        config: {
          code: '',
          days: '',
          payBankCode: '',
          payRollBankCode: '',
          workHours: '',
          totalPayAmount: null,
          actualAmount: null,
          isBackPay: '',
          backPayMonth: '',
          payMonth: '',
          balanceDate: '',
          thirdPayRollCode: '',
          payRollBankCardNumber: '',
          payBankCardNumber: '',
        },
        showPrise: false,
        bkConfig: {
          businessSysNo: '',
          businessType: '002'
        },
        wageCode: ''
      }
    },
    computed: {
    },
    created() {
      const {code} = this.$route.query;
      const {wageCode} = this.$route.query;
      this.wageCode = wageCode;
      this.bkConfig.businessSysNo = code;
      this.getDList();
      this.getBankCodeList();
      this.getWageInfo(wageCode);
    },
    methods: {
      updateExitDate(year, month, day) {
        this.exitYear = year;
        this.exitMonth = month;
        this.exitDay = day;
        this.config.balanceDate = `${this.exitYear}-${this.exitMonth}-${this.exitDay}`;
      },
      updateRepairExitDate(year, month, day) {
        this.repairExitYear = year;
        this.repairExitMonth = month;
        this.repairExitDay = day;
        this.config.backPayMonth = `${this.repairExitYear}-${this.repairExitMonth}`;
        //console.log(`${this.repairExitYear}-${this.repairExitMonth}-${this.repairExitDay}`);
      },
      async getBankCardList() {
        return findBankCardByBs(this.bkConfig).then(data => {
          this.bankList = data.map(item => ({
            bankName: item.bankName,
            bankNumber: item.bankNumber,
            code: item.code
          }));
          this.bankLists = this.bankList;
        });
      },
      async getGinsengBk(code) {
        return findGinsengBk(code).then(data => {
          this.ginsengBkList = data.map(item => ({
            bankName: item.bankName,
            bankNumber: item.bankNumber,
            code: item.code
          }));
          this.ginsengBkLists = this.ginsengBkList;
        });
      },
      setBankOrGBank(bankNumber, clz){
        if(clz == 0){
          for(var i = 0; i < this.bankLists.length; i++){
            if(this.bankLists[i].bankNumber = bankNumber){
              console.log(this.bankLists[i].code);
              return this.bankLists[i].code;
            }
          }
        }else if(clz == 1){
          for(var i = 0; i < this.ginsengBkLists.length; i++){
            if(this.ginsengBkLists[i].bankNumber = bankNumber){
              console.log(this.ginsengBkLists[i].code);
              return this.ginsengBkLists[i].code;
            }
          }
        }
        return '';
      },
      async getDList() {
        getDictList('is_not').then(data => {
          this.dictList = data.map(item => ({
            key: item.dkey,
            value: item.dvalue
          }));
        });
      },
      async getBankCodeList() {
        getDictList('bank_code').then(data => {
          this.bankCodeList = data.map(item => ({
            key: item.dkey,
            value: item.dvalue
          }));
        });
      }
      ,
      async getWageInfo(code) {
        return findWageInfo(code).then(data => {
          this.wageInfoList = data;
          console.log(this.wageInfoList);
          this.setDefaultShow();
        });
      },
      async setDefaultShow() {
        console.log(this.wageInfoList.backPayMonth);
        this.config.code = this.wageInfoList.code;
        this.config.days = this.wageInfoList.days;
        this.config.workHours = this.wageInfoList.workHours;
        this.config.totalPayAmount = this.wageInfoList.totalPayAmount;
        this.config.actualAmount = this.wageInfoList.actualAmount;
        this.config.isBackPay = this.wageInfoList.isBackPay;
        this.config.backPayMonth = formatDate(this.wageInfoList.backPayMonth, "MM");
        this.config.balanceDate = this.wageInfoList.balanceDate;
        this.config.payMonth = formatDate(this.wageInfoList.payMonth, "MM");
        this.config.thirdPayRollCode = this.wageInfoList.thirdPayRollCode;
        this.config.payRollBankCardNumber = this.wageInfoList.payRollBankCardNumber;
        this.config.payBankCardNumber = this.wageInfoList.payBankCardNumber;
        this.config.payBankCode = this.wageInfoList.payBankCode;
        this.config.payRollBankCode = this.wageInfoList.payRollBankCode;
        if (this.wageInfoList.balanceDate) {
          let dates = formatDate(this.wageInfoList.balanceDate).split('-');
          this.exitYear = dates[0];
          this.exitMonth = dates[1];
          this.exitDay = dates[2];
        }
        if (this.wageInfoList.backPayMonth) {
          let dates = formatDate(this.wageInfoList.backPayMonth).split('-');
          this.repairExitYear = dates[0];
          this.repairExitMonth = dates[1];
        }
        console.log(this.wageInfoList.balanceDate);
        console.log(this.wageInfoList.backPayMonth);
        if(this.wageInfoList.isBackPay == 1){
          this.showPrise = true;
        }
      },
      isBackPayMonitor() {
        if(this.config.isBackPay == 0) {
          // 否
          this.showPrise = false;
        }else if(this.config.isBackPay) {
          // 是
          this.showPrise = true;
        }
      },
      openUpdateWageInfo() {
        this.config.balanceDate = `${this.exitYear}-${this.exitMonth}-${this.exitDay}`;
        this.config.payMonth = `${this.exitYear}-${this.config.payMonth}`;
        console.log(this.config.backPayMonth);
        console.log(this.config.payMonth);
        return updateWageInfo(this.config).then((data) => {
          this.toastText = '操作成功';
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.push(`/wageDetailInfo?code=${this.wageCode}`);
          }, 1000);
        }).catch(() => {
          this.loadFlag = false;
        });
      },
      toBack() {
        window.history.go(-1);
      }
    },
    components: {
      DatePicker,
      Toast,
      Scroll,
      ToHome,
      DatePickerM
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
  .item-title{
    color:#ccc;
  }
  .item-must{
    color:darkred;
    margin-right: 0.1rem;
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
  .divBox{
    width: 92%;
    height: 1rem;
    line-height: 1rem;
  }
</style>
