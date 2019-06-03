<template>
  <div class="full-screen-wrapper details-wrapper">
    <scroll ref="scroll" :hasMore='false'>
      <div class="wrapper">
        <div class="baseBanner">
          <p class="baseCenter">
            {{title}}考勤记录
          </p>
        </div>
        <div class="banner">
          <div class="memNum">
            <div class="left">
              班组
            </div>
            <div class="right">
              <select v-model="config.teamSysNo">
                <option value="">请选择</option>
                <option :value="item.code" v-for="(item, index) in teamList" :key="index">{{item.teamName}}</option>
              </select>
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              班组人员
            </div>
            <div class="right">
              <select v-model="config.workerCode">
                <option value="">请选择</option>
                <option :value="item.code" v-for="(item, index) in userList" :key="index">{{item.workerName}}-{{item.idcardNumber}}</option>
              </select>
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              刷卡进出方向
            </div>
            <div class="right">
              <select v-model="config.direction">
                <option value="">请选择</option>
                <option :value="item.key" v-for="(item, index) in dictList" :key="index">{{item.value}}</option>
              </select>
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              刷卡时间
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
        currentDate: ''
      }
    },
    created() {
      const {code} = this.$route.query;
      this.code = code;
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
          let config = {
            teamSysNo: data.teamSysNo,
            workerCode: data.workerCode,
            date: formatDate(data.date),
            direction: data.direction
          };
          this.$set(this, 'config', config);
        });
      }
    },
    methods: {
      preservation() {
        this.isLoading = true;
        if(this.code) {
          this.config.code = this.code;
          editAttence(this.config).then(() => {
            this.isLoading = false;
            this.toastText = '操作成功';
            this.$refs.toast.show();
            setTimeout(() => {
              this.$router.push('/into-details');
            }, 1000);
          });
        }else {
          addAttence(this.config).then(() => {
            this.isLoading = false;
            this.toastText = '操作成功';
            this.$refs.toast.show();
            setTimeout(() => {
              this.$router.push('/into-details');
            }, 1000);
          });
        }
      },
      formatDate(time) {
        return formatDate(time);
      },
      exitProject() {
        this.$router.replace(`/addProject?code=${this.code}`);
      },
      updateExitDate(year, month, day) {
        this.exitYear = year;
        this.exitMonth = month;
        this.exitDay = day;
        this.config.date = `${this.exitYear}-${this.exitMonth}-${this.exitDay} 00:00:00`;
      }
    },
    components: {
      DatePicker,
      Toast,
      Scroll,
      Loading
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
            width: 30%;
          }
          .right {
            width: 70%;
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
  }
</style>


