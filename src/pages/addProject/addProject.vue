<template>
<div class="full-screen-wrapper add-wrapper">
    <div class="wrapper">
        <div class="baseBanner">
            <p class="baseCenter">
                {{title}}人员进退场
            </p>
        </div>
        <div class="banner">
            <div class="memNum">
                <div class="left">
                  员工编号
                </div>
              <div class="right">
                <select v-model="workerCode">
                  <option value="">请选择</option>
                  <option :value="item.workerCode" v-for="(item, index) in userList" :key="index">{{item.workerName}}-{{item.workerCode}}</option>
                </select>
              </div>
            </div>
            <div class="memNum">
                <div class="left">
                  类型
                </div>
              <div class="right">
                <select v-model="config.type">
                  <option value="">请选择</option>
                  <option :value="item.key" v-for="(item, index) in dictList" :key="index">{{item.value}}</option>
                </select>
              </div>
            </div>
          <div class="memNum">
            <div class="left">
              进退场日期
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
            <div class="idHeader">
                    <span>凭证扫描件（单）</span>
                    <div class="upPic">
                        <input type="file" @change="upImage" id="theFile">
                        <img src="./upload.png"/>
                        <span>上传</span>
                      <div class="picBox" :style="{backgroundImage: `url(${picUrl})`}"></div>
                    </div>
            </div>
        </div>
        <div class="preservation" @click="preservation">
            保存
        </div>
    </div>
  <toast ref="toast" :text="toastText"></toast>
</div>
</template>
<script>
  import { formatDate } from 'common/js/util';
  import DatePicker from 'base/date-picker/date-picker';
  import {addEditInOut, userQueryList, userInOutDetail} from 'api/deal';
  import{getDictList} from 'api/general';
  import Toast from 'base/toast/toast';
export default {
    data(){
        return{
          title: '新增',
          exitYear: '',
          exitMonth: '',
          exitDay: '',
          config: {
            type: '',
            voucherUrl: '',
            date: ''
          },
          workerCode: '',
          userList: [],
          dictList: [],
          toastText: '',
          picUrl: '',
          toastText: ''
        }
    },
  created() {
      const {code} = this.$route.query;
      let organizationCode = sessionStorage.getItem('organizationCode');
      Promise.all([
        getDictList('entry_exit_type'),
        userQueryList({projectCode: organizationCode})
      ]).then(([data1,data2]) => {
        this.dictList = data1.map(item => ({
          key: item.dkey,
          value: item.dvalue
        }));
        this.userList = data2.map(item => ({
          workerName: item.workerName,
          workerCode: item.code
        }))
      });
      if(code) {
        this.title = '修改';
        userInOutDetail({code}).then(data => {
          this.workerCode = data.workerCode;
          this.picUrl = data.voucherUrl;
          this.config.type = data.type;
          this.config.date = formatDate(data.date);
        })
      }
  },
  methods: {
    updateExitDate(year, month, day) {
      this.exitYear = year;
      this.exitMonth = month;
      this.exitDay = day;
      this.config.date = `${this.exitYear}-${this.exitMonth}-${this.exitDay}`;
    },
    preservation() {
      const {code} = this.$route.query;
      if(code) {
        this.config.code = code;
        addEditInOut(631732, this.config).then(() => {
          this.toastText = '修改成功';
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.replace('/into-details');
          }, 1000);
        });
      }else {
        this.config.workerCode = this.workerCode;
        addEditInOut(631730, this.config).then(() => {
          this.toastText = '修改成功';
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.replace('/into-details');
          }, 1000);
        });
      }
    },
    upImage() {
      let theFile = document.getElementById('theFile').files[0];
      let fileReader = new FileReader();
      let _this = this;
      fileReader.readAsDataURL(theFile);
      if(theFile.size > 5512000) {
        this.toastText = '上传图片不得大于500KB';
        this.$refs.toast.show();
        return false;
      }
      fileReader.onload = function() {
        _this.config.voucherUrl = fileReader.result;
        _this.picUrl = fileReader.result;
      };
    },
  },
  components: {
    DatePicker,
    Toast
  }
}
</script>
<style lang="scss" scoped>
.add-wrapper{
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
            height: 2rem;
            width: 92%;
            margin: 0 auto;
            color:rgba(153,153,153,1);
            font-size: 0.24rem;
            span{
                display: inline-block;
                margin-top: 0.2rem;
            }
            .upPic{
                text-align: center;
                position: relative;
                border: 1px solid #ccc;
                width: 1.6rem;
                height: 1.6rem;
                margin-top: 0.5rem;
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


