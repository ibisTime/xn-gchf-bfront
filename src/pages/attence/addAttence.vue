<template>
  <div class="full-screen-wrapper details-wrapper">
    <scroll ref="scroll" :hasMore='false'>
      <div class="wrapper">
        <div class="baseBanner">
          <p class="toBack" @click="toBack">返回</p>
          <p class="baseCenter">
            {{title}}考勤记录
          </p>
        </div>
        <ToHome></ToHome>
        <div class="banner">
          <div class="memNum">
            <div class="left">
              <strong class="left-must">*</strong>班组
            </div>
            <div class="right">
              <select class="font-size-ram" v-model="config.teamSysNo">
                <option value="">请选择</option>
                <option :value="item.code" v-for="(item, index) in teamList" :key="index">{{item.teamName}}</option>
              </select>
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              <strong class="left-must">*</strong>班组人员
            </div>
            <div class="right">
              <select class="font-size-ram" v-model="config.workerCode">
                <option value="">请选择</option>
                <option :value="item.code" v-for="(item, index) in userList" :key="index">{{item.workerName}}-{{item.idcardNumber}}</option>
              </select>
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              <strong class="left-must">*</strong>刷卡进出方向
            </div>
            <div class="right">
              <select class="font-size-ram" v-model="config.direction">
                <option value="">请选择</option>
                <option :value="item.key" v-for="(item, index) in dictList" :key="index">
                  {{item.key == "01" ? "下班" : "上班"}}
                </option>
              </select>
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              <strong class="left-must">*</strong>刷卡日期
            </div>
            <div class="right">
              <date-picker class="item-input"
                           :year="exitYear"
                           :month="exitMonth"
                           :day="exitDay"
                           :value="config.date"
                           @change="updateExitDate">
              </date-picker>
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              <strong class="left-must">*</strong>刷卡时间
            </div>
            <div class="right">
              <input type="text" v-model="dateResult" id="nowtime" name="teamLeaderIdNumber" class="font-size-ram" />
            </div>
          </div>
        </div>
        <div class="preservation" @click="preservation">
          保 存
        </div>
      </div>
    </scroll>
    <loading :title="'正在努力加载中...'" :isLoading="isLoading"></loading>
    <toast ref="toast" :text="toastText"></toast>
  </div>
</template>
<script>
  import { formatDate, getProjectCode } from 'common/js/util';
  import DatePicker from 'base/date-picker/date-picker';
  import {xmbzList, userQueryList, userAttenceDetail, addAttence, editAttence} from 'api/deal';
  import{getDictList} from 'api/general';
  import Toast from 'base/toast/toast';
  import Scroll from 'base/scroll/scroll';
  import Loading from 'base/loading/loading';
  import ToHome from 'base/toHome/toHome';
  export default {
    data(){
      return{
        teamList: [],
        dictList: [],
        userList: [],
        toastText: '',
        picUrl: '',
        code: '',
        title: '新增',
        exitYear: '',
        exitMonth: '',
        exitDay: '',
        config: {
          teamSysNo: '',
          workerCode: '',
          date: '',
          direction: ''
        },
        code: '',
        isLoading: true,
        isVisible2: false,
        currentDate: '',
        nowTime: '',
        dateArray: [],
        dateLimit: [],
        dateResult: '00:00:00',
        dateYMD: [],
      }
    },
    created() {
      const {code, teamSysNo, workerCode} = this.$route.query;
      this.code = code;
      this.config.teamSysNo = teamSysNo;
      this.config.workerCode = workerCode;
      this.config.projectCode = getProjectCode();
      Promise.all([
        getDictList('direction'),
        xmbzList({projectCode: getProjectCode()}),
        userQueryList({projectCode: getProjectCode()})
      ]).then(([data1, data2, data3]) => {
        this.teamList = data2;
        this.dictList = data1.map(item => ({
          key: item.dkey,
          value: item.dvalue
        }));
        this.userList = data3;
        this.isLoading = false;
      });
      if(code) {
        this.code = code;
        this.title = '修改';
        userAttenceDetail(code).then(data => {
          this.dateArray = formatDate(data.date, "yyyy-MM-dd hh:ss:mm").split(" ");
          this.dateLimit = this.dateArray[1].split(":");
          this.dateYMD = this.dateArray[0].split("-");
          //console.log(this.dateYMD);
          this.exitYear = this.dateYMD[0];
          this.exitMonth = this.dateYMD[1];
          this.exitDay = this.dateYMD[2];
          this.dateResult = this.dateLimit[0] + ":" + this.dateLimit[2] + ":" + this.dateLimit[1];
          console.log(this.dateArray)
          let config = {
            teamSysNo: data.teamSysNo,
            workerCode: data.workerCode,
            date: this.dateArray[0],
            direction: data.direction
          };
          this.$set(this, 'config', config);
        });
      }
    },
    methods: {
      preservation() {

        if(this.config.direction == null || this.config.direction == ''){
          this.toastText = "刷卡进出方向不能为空";
          this.$refs.toast.show();
        }else if(this.exitYear == ''){
          this.toastText = "刷卡日期不能为空";
          this.$refs.toast.show();
        }else{
          this.isLoading = true;
          this.config.date = this.config.date + " " +document.getElementById('nowtime').value;
          if(this.code) {
            this.config.code = this.code;
            editAttence(this.config).then(() => {
              this.isLoading = false;
              this.toastText = '操作成功';
              this.$refs.toast.show();
              setTimeout(() => {
                this.$router.push('/checkWorkDetails');
              }, 1000);
            });
          }else {
            addAttence(this.config).then(() => {
              this.isLoading = false;
              this.toastText = '操作成功';
              this.$refs.toast.show();
              setTimeout(() => {
                this.$router.push('/checkWorkDetails');
              }, 1000);
            });
          }
        }
      },
      formatDate(time) {
        return formatDate(time);
      },
      exitProject() {
        this.$router.replace(`/addProject?code=${this.code}`);
      },
      updateExitDate(year, month, day) {
        //this.timeFormate(new Date());
        //this.exitHMS = this.nowTime;
        this.exitYear = year;
        this.exitMonth = month;
        this.exitDay = day;
        this.config.date = `${this.exitYear}-${this.exitMonth}-${this.exitDay}`;
      },
      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
        let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
        let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
        let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        this.nowTime = hh+":"+mm+':'+ss ;
      },
      nowTimes(){
        this.timeFormate(new Date());
        setInterval(this.nowTimes,1000);
        this.clear()
      },
      clear(){
        clearInterval(this.nowTimes)
        this.nowTimes = null;
      },
      toBack() {
        window.history.go(-1);
      }
    },
    components: {
      DatePicker,
      Toast,
      Scroll,
      Loading,
      ToHome
    }
  }
</script>
<style lang="scss" scoped>
  .details-wrapper{
    .wrapper{
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
        .right{
          position: absolute;
          right: .3rem;
          top: .5rem;;
          color: #fff;
          font-size: 0.32rem;
        }
        .toBack{
          float: left;
          margin-left: 0.5rem;
          margin-top: 0.5rem;
        }
      }
      .banner{
        width: 100%;
        .memNum{
          display: flex;
          width:92%;
          margin: 0 auto;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.3rem;
          border-bottom: 1px solid rgba(235,235,235,1);
          span{
            display: inline-block;
            margin-left: 1rem;
          }
          .left {
            width: 33%;
            .left-must{
              color: darkred;
              margin-right: 0.1rem;
            }
          }
          .right {
            width: 67%;
            select{
              width: 100%;
            }
            input{
              width: 100%;
            }
          }
        }

        .idHeader{
          width: 92%;
          margin: 0 auto;
          padding-bottom: 0.4rem;
          color:rgba(153,153,153,1);
          font-size: 0.24rem;
          span{
            display: inline-block;
            margin-top: 0.2rem;
          }
          .upPic{
            text-align: center;
            position: relative;
            width: 1.6rem;
            height: 1.6rem;
            margin-top: 0.3rem;
            input{
              opacity: 0;
              width: 100%;
              height: 100%;
              position: absolute;
              z-index: 9;
              left: 0;
            }
            img{
              width: .5rem;
              height: .5rem;
              position: absolute;
              top: 40%;
              left: 50%;
              transform: translate(-50%,-50%);
            }
            span{
              display: inline-block;
              margin-top: 1rem;
              font-size: .2rem;
            }
            .picBox{
              position: absolute;
              left: 0;
              top: 0;
              z-index: 1;
              width: 100%;
              height: 100%;
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
            }
          }
        }
      }
      .empty{
        height: 0.2rem;
        width: 100%;
        background:rgba(240,240,240,1);
      }
      .footer{
        .logs{
          .jounal{
            margin-top: 0.2rem;
            text-align: center;
            display: flex;
            border-bottom: 1px solid rgba(235,235,235,1);
            div{
              width: 32%;
              margin: 0 auto;
              height: .9rem;
              line-height: .9rem;
              color: rgba(153,153,153,1);
              font-size: 0.28rem;
            }
          }
          .log-list{
            margin-top: 0.2rem;
            text-align: center;
            color: #333;
            li{
              display: flex;
              line-height: .9rem;
              height: .9rem;
              p{
                width: 32%;
              }
            }
          }
        }
        p{
          width: 92%;
          padding:.3rem 0 0 0;
          margin: 0 auto;
          color: #333;
          font-size: 0.28rem;
          font-weight: 500;
        }
      }
      .preservation{
        width: 92%;
        height: 1rem;
        line-height: 1rem;
        background: #028EFF;
        margin: 0 auto;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        margin-top: 1.5rem;
      }
    }
    .font-size-ram{
      font-size: 0.29rem;
    }
  }
</style>


