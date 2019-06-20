<template>
  <div class="full-screen-wrapper">
    <scroll ref="scroll" :hasMore="false">
    <div class="faceCollectBanner">
      <p class="toBack" @click="toBack">返回</p>
      <p class="faceCollectCenter">
        添加工资信息
      </p>
    </div>
    <ToHome></ToHome>
      <div class="form-wrapper form-gray-wrapper">
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title"><strong class="item-must">*</strong>员工编号</div>
            <!--<input type="text" id="iptCode" v-model="config.detailList[0].workerCode" class="margin-left-ram" />-->
            <select v-model="config.detailList[0].workerCode" class="wASelectCd margin-left-ram" onmousedown="javascript: this.style.width='auto';" onblur="javascript: this.style.width=125;" onchange="javascript: this.style.width=125;">
              <option value="">请选择</option>
              <option :value="item.workerCode" v-for="(item, index) in userList" :key="index">{{item.workerName}}-{{item.workerCode}}</option>
            </select>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title" style="width: 2rem;"><strong class="item-must">*</strong>工人工资银行</div>
            <!--<input type="text" value="" v-model="config.detailList[0].workerBankCard" class="margin-left-ram" />-->
            <select v-model="config.detailList[0].workerBankCard" class="wASelect margin-left-ram" style="font-size:0.24rem;background: #fff" onmousedown="javascript: this.style.width='auto';" onblur="javascript: this.style.width=125;" onchange="javascript: this.style.width=125;">
              <option value="">请选择</option>
              <option :value="item.code" v-for="(item, index) in bankList" :key="index">{{item.bankName}}-{{item.bankNumber}}</option>
            </select>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title" style="width: 2rem;"><strong class="item-must">*</strong>所在参建单位银行</div>
            <select v-model="config.detailList[0].corpBankCard" class="wASelect margin-left-ram" style="font-size:0.24rem;background: #fff" onmousedown="javascript: this.style.width='auto';" onblur="javascript: this.style.width=125;" onchange="javascript: this.style.width=125;">
              <option value="">请选择</option>
              <option :value="item.code" v-for="(item, index) in ginsengBkList" :key="index">{{item.bankName}}-{{item.bankNumber}}</option>
            </select>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title"><strong class="item-must">*</strong>应发金额</div>
            <input type="number" value="" v-model="config.detailList[0].totalPayAmount" class="inputSelect margin-left-ram" />
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title"><strong class="item-must">*</strong>实发金额</div>
            <input type="text" value="" v-model="config.detailList[0].actualAmount" class="inputSelect margin-left-ram" />
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title"><strong class="item-must">*</strong>发放日期</div>
            <date-picker class="margin-left-ram"
                         :year="exitYear"
                         :month="exitMonth"
                         :day="exitDay"
                         @change="updateExitDate">
            </date-picker>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title"><strong class="item-must">*</strong>发放工资月份</div>
            <!--<date-picker class="wADatatime margin-left-ram"-->
                         <!--:year="payMYear"-->
                         <!--:month="payMMonth"-->
                         <!--:day="payMDay"-->
                         <!--@change="updatePayMDate">-->
            <!--</date-picker>-->
            <!--<input type="number" value="00" v-model="payMonth" class="inputSelect margin-left-ram" />-->
            <!--payMonth-->
            <!--<select class="item-input margin-left-ram" v-model="payMonth">-->
              <!--<option value="1">一月</option>-->
              <!--<option value="2">二月</option>-->
              <!--<option value="3">三月</option>-->
              <!--<option value="4">四月</option>-->
              <!--<option value="5">五月</option>-->
              <!--<option value="6">六月</option>-->
              <!--<option value="7">七月</option>-->
              <!--<option value="8">八月</option>-->
              <!--<option value="9">九月</option>-->
              <!--<option value="10">十月</option>-->
              <!--<option value="11">十一月</option>-->
              <!--<option value="12">十二月</option>-->
            <!--</select>-->
            <DatePickerM class="margin-left-ram"
                         :year="payMYear"
                         :month="payMMonth"
                         @change="updatePayMDate">
            </DatePickerM>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title"><strong class="item-must">*</strong>是否为补发</div>
            <select v-model="config.detailList[0].isBackPay" class="item-input margin-left-ram" @change="isBackPayMonitor">
              <option value="">请选择</option>
              <option :value="item.key" v-for="(item, index) in dictList" :key="index">{{item.value}}</option>
            </select>
          </div>
        </div>
        <div class="form-item border-bottom-1px" v-if="showPrise">
          <div class="item-input-wrapper">
            <div class="item-title">补发月份</div>
            <!--<date-picker class="wADatatime margin-left-ram"-->
                         <!--:year="repairExitYear"-->
                         <!--:month="repairExitMonth"-->
                         <!--:day="repairExitDay"-->
                         <!--@change="updateRepairExitDate">-->
            <!--</date-picker>-->
            <!--<input type="number" value="00" v-model="month" class="inputSelect margin-left-ram" />-->
            <!--month-->
            <!--<select class="item-input margin-left-ram" v-model="month">-->
              <!--<option value="1">一月</option>-->
              <!--<option value="2">二月</option>-->
              <!--<option value="3">三月</option>-->
              <!--<option value="4">四月</option>-->
              <!--<option value="5">五月</option>-->
              <!--<option value="6">六月</option>-->
              <!--<option value="7">七月</option>-->
              <!--<option value="8">八月</option>-->
              <!--<option value="9">九月</option>-->
              <!--<option value="10">十月</option>-->
              <!--<option value="11">十一月</option>-->
              <!--<option value="12">十二月</option>-->
            <!--</select>-->
            <DatePickerM class="margin-left-ram"
                         :year="monthYear"
                         :month="monthMonth"
                         @change="updateRepairExitDate">
            </DatePickerM>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title">出勤天数</div>
            <input type="text" value="" v-model="config.detailList[0].days" class="inputSelect margin-left-ram" />
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title">总工时</div>
            <input type="text" value="" v-model="config.detailList[0].workHours" class="inputSelect margin-left-ram" />
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title">第三方工资单编号</div>
            <input type="text" value="" v-model="config.detailList[0].thirdPayRollCode" class="margin-left-ram" />
          </div>
        </div>
        <div class="form-btn">
          <button @click="openAddWage()">保存</button>
        </div>
        <div style="width: 100%;height: 2rem;"></div>
      </div>
      <toast ref="toast" :text="toastText"></toast>
    </scroll>
  </div>
</template>
<script>
  import { formatDate } from 'common/js/util';
  import DatePicker from 'base/date-picker/date-picker';
  import {addWage} from 'api/deal';
  import {getClassDetail} from 'api/biz';
  import{getDictList} from 'api/general';
  import{teamUserDetail, userQueryList, findBankCardByBs, findGinsengBk} from 'api/deal'
  import Toast from 'base/toast/toast';
  import Scroll from 'base/scroll/scroll';
  import ToHome from 'base/toHome/toHome';
  import DatePickerM from 'base/date-picker/date-picker-show-m';
  export default {
    data(){
        return{
          exitYear: '',
          exitMonth: '',
          exitDay: '',
          month: '00',
          payMonth: '00',
          monthYear: '',
          monthMonth: '',
          repairExitYear: '',
          repairExitMonth: '',
          repairExitDay: '',
          payMYear: '',
          payMMonth: '',
          payMDay: '',
          toastText: '',
          userCode: '',
          dictList: [],
          userList: [],
          sendFlag: true,
          config: {
            projectCode: '',
            corpCode: '',
            teamSysNo: '',
            payMonth: '',
            detailList: [
              {
                'workerCode': '',
                'workerBankCard': '',
                'corpBankCard': '',
                'days': '',
                'workHours': '',
                'totalPayAmount': null,
                'balanceDate': '',
                'actualAmount': null,
                'isBackPay': '',
                'backPayMonth': '',
                'thirdPayRollCode': ''
              }
            ]
          },
          bkConfig: {
            businessSysNo: '',
            businessType: '002'
          },
          partakebkConfig: {
            businessSysNo: '',
            businessType: '001'
          },
          bankList: [],
          partakebkList: [],
          ginsengBkList: [],
          showPrise: false
        }
    },
    created() {
      const {code} = this.$route.query;
      this.config.detailList[0].workerCode = code;
      this.bkConfig.businessSysNo = code;
      teamUserDetail(code).then((data) => {
        this.config.corpCode = data.corpCode || '';
        this.config.teamSysNo = data.teamSysNo || '';
        this.config.projectCode = data.projectCode || '';
      });
      let organizationCode = sessionStorage.getItem('organizationCode');
      this.getUserInfo({projectCode: organizationCode});
      this.getBankCardList();
      this.getGinsengBk(code);
      this.getDList();
    },
    methods: {
      updateExitDate(year, month, day) {
        this.exitYear = year;
        this.exitMonth = month;
        this.exitDay = day;
        this.config.detailList[0].balanceDate = `${this.exitYear}-${this.exitMonth}-${this.exitDay}`;
      },
      updateRepairExitDate(year, month) {
        this.monthYear = year;
        this.monthMonth = month;
      },
      updatePayMDate(year, month) {
        this.payMYear = year;
        this.payMMonth = month;
      },
      async getUserInfo(data) {
        return userQueryList(data).then(data => {
          this.userList = data.map(item => ({
            workerName: item.workerName,
            workerCode: item.code,
          }));
        });
      },
      async getBankCardList() {
        return findBankCardByBs(this.bkConfig).then(data => {
          console.log(data);
          this.bankList = data.map(item => ({
            bankName: item.bankName,
            bankNumber: item.bankNumber,
            code: item.code
          }));
        });
      },
      async getGinsengBk(code) {
        return findGinsengBk(code).then(data => {
          this.ginsengBkList = data.map(item => ({
            bankName: item.bankName,
            bankNumber: item.bankNumber,
            code: item.code
          }));
        });
      },
      async getDList() {
        getDictList('is_not').then(data => {
          this.dictList = data.map(item => ({
            key: item.dkey,
            value: item.dvalue
          }));
        });
      },
      isBackPayMonitor() {
        if(this.config.detailList[0].isBackPay == 0){
          // 否
          this.showPrise = false;
        }else{
          // 是
          this.showPrise = true;
        }
      },
      openAddWage() {
        //payMYear,payMMonth,monthYear,monthMonth
        this.config.detailList[0].backPayMonth = `${this.monthYear}-${this.monthMonth}`;
        this.config.payMonth = `${this.payMYear}-${this.payMMonth}`;
        if(this.config.detailList[0].workerCode === ""){
          this.toastText = "员工编号不能为空";
          this.$refs.toast.show();
        }else if(this.config.detailList[0].workerBankCard === ""){
          this.toastText = "工人工资银行不能为空";
          this.$refs.toast.show();
        }else if(this.config.detailList[0].corpBankCard === ""){
          this.toastText = "所在参建单位不能为空";
          this.$refs.toast.show();
        }else if(this.config.detailList[0].totalPayAmount === null){
          this.toastText = "应发金额不能为空";
          this.$refs.toast.show();
        }else if(this.config.detailList[0].actualAmount === null){
          this.toastText = "实发金额不能为空";
          this.$refs.toast.show();
        }else if(this.exitYear === ""){
          this.toastText = "发放日期不能为空";
          this.$refs.toast.show();
        }else if(this.payMYear === "00" || this.payMYear === ""){
          this.toastText = "发放月份不能为空";
          this.$refs.toast.show();
        }else if(this.config.detailList[0].isBackPay === ""){
          this.toastText = "是否补发不能为空";
          this.$refs.toast.show();
        }else if(this.config.detailList[0].isBackPay === "1"){
          if(this.monthYear === "" || this.monthYear === "00"){
            this.toastText = "补发月份不能为空";
            this.$refs.toast.show();
          }else{
            if(this.sendFlag) {
              addWage(this.config).then((data) => {
                if (data.code) {
                  this.toastText = '操作成功';
                  this.$refs.toast.show();
                  this.sendFlag = false;
                  setTimeout(() => {
                    this.$router.push(`/wageDetail`);
                  }, 1000);
                }
              }).catch(() => {
                this.loadFlag = false;
              });
            }
          }
        }else{
          if(this.sendFlag) {
            addWage(this.config).then((data) => {
              if(data.code) {
                this.toastText = '操作成功';
                this.$refs.toast.show();
                this.sendFlag = false;
                setTimeout(() => {
                  this.$router.push(`/wageDetail`);
                }, 1000);
              }
            }).catch(() => {
              this.loadFlag = false;
            });
          }
        }
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
    .item-must{
      color:darkred;
      margin-right: 0.1rem;
    }
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
  .wASelectCd{
    width: 70%;
    font-size:0.26rem;
    background: #fff
  }
  .wASelectR{
    width: 50%;
    text-align: center;
    background: #fff;
  }
  .inputSelect{
    width: 5rem;
  }
</style>
