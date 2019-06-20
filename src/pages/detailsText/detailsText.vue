<template>
<div class="full-screen-wrapper details-wrapper">
  <scroll ref="scroll" :hasMore='false'>
    <div class="wrapper">
        <div class="baseBanner">
            <p class="toBack" @click="toBack">返回</p>
            <p class="baseCenter">
                进退场详情
            </p>
          <div class="right" @click='exitProject'>
            修改
          </div>
        </div>
      <ToHome></ToHome>
        <div class="banner">
          <div class="memNum">
            <div class="left">
              员工编号
            </div>
            <div class="right">
              {{userDetail.workerCode}}
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              员工姓名
            </div>
            <div class="right">
              {{userDetail.workerName}}
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              类型
            </div>
            <div class="right">
              {{dictObj[userDetail.type]}}
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              进退场日期
            </div>
            <div class="right">
              {{formatDate(userDetail.date, "yyyy-MM-dd hh:mm:ss")}}
            </div>
          </div>
          <div class="idHeader">
            <span>凭证扫描件（单）</span>
            <div class="upPic" v-if="userDetail.voucherUrl">
              <div class="picBox" :style="{backgroundImage: `url(${userDetail.voucherUrl})`}"></div>
            </div>
            <!--<img src="./upload.png" @click="clickImg($event)">-->
            <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
            <span style="border: 1px solid darkred;color:darkred;padding: 0.1rem;" @click="clickImg()">点击放大</span>
          </div>
          <!--<div>-->
            <!--<img src="./upload.png" @click="clickImg($event)">-->
            <!--&lt;!&ndash; 放大图片 &ndash;&gt;-->
            <!--<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>-->
          <!--</div>-->
        </div>
        <div class="empty"></div>
        <div class="footer">
            <p>操作日志</p>
            <!--<div class="logs">-->
              <!--<div class="jounal">-->
                <!--<div>操作人</div>-->
                <!--<div>操作类型</div>-->
                <!--<div>操作时间</div>-->
              <!--</div>-->
              <!--<ul class="log-list" v-if="operationLog.length > 0">-->
                <!--<li v-for="(item, index) in operationLog" :key="index">-->
                  <!--<p>{{item.operatorName}}</p>-->
                  <!--<p>{{item.operate}}</p>-->
                  <!--<p>{{formatDate(item.operateDatetime)}}</p>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
            <p class="txtCenter">{{operationLog ? "暂无数据" : ""}}</p>
          <div class="banner" v-for="(item, index) in operationLog" :key="index" >
            <div class="memNum">
              <div class="left">
                操作人
              </div>
              <div class="right">
                {{item.operatorName}}
              </div>
            </div>
            <div class="memNum">
              <div class="left">
                操作类型
              </div>
              <div class="right">
                {{item.operate}}
              </div>
            </div>
            <div class="memNum">
              <div class="left">
                操作时间
              </div>
              <div class="right">
                {{formatDate(item.operateDatetime)}}
              </div>
            </div>
            <div class="memNumRk">
              <div>
              <div class="top">备注</div>
              <div class="bottom">{{item.remark}}</div>
              </div>
            </div>
            </div>
          </div>
      <div class="preservationClear" @click="delDt">
        删除
      </div>
      <div class="preservation" @click="preservation">
        返回
      </div>
    </div>
    <toast ref="toast" :text="toastText"></toast>
    <loading :isLoading="isLoading" title="'正在努力加载中....'"></loading>
  </scroll>
</div>
</template>
<script>
  import { formatDate } from 'common/js/util';
  import DatePicker from 'base/date-picker/date-picker';
  import {userInOutDetail, queryOperationLog, deleteDetailsText} from 'api/deal';
  import{getDictList} from 'api/general';
  import Toast from 'base/toast/toast';
  import Scroll from 'base/scroll/scroll';
  import Loading from 'base/loading/loading';
  import BigImg from '../imgEnlarge/BigImgTwo.vue';
  import ToHome from 'base/toHome/toHome';
export default {
    data(){
        return{
          userDetail: {},
          dictObj: [],
          operationLog: [],
          toastText: '',
          picUrl: '',
          code: '',
          isLoading: true,
          showImg: false,
          imgSrc: ''
        }
    },
  created() {
    const {code} = this.$route.query;
    if(code) {
      this.code = code;
      Promise.all([
        getDictList('entry_exit_type'),
        userInOutDetail({code}),
        queryOperationLog(code)
      ]).then(([data1, data2, data3]) => {
        data3.forEach(item => {
          //item.operatorName
          //item.operate
          //formatDate(item.operateDatetime
        });
        this.operationLog = data3;
        console.log(this.operationLog);
        data1.forEach(item => {
          this.dictObj[item.dkey] = item.dvalue;
        });
        this.userDetail = data2;
        this.isLoading = false;
      });
    }
  },
  methods: {
    preservation() {
      this.$router.push('/into-details');
    },
    formatDate(time) {
      return formatDate(time);
    },
    formatType(status) {
      for (let i = 0; i < this.dictObj.length; i++) {
        if (this.dictObj[i].dkey === status) {
          return this.dictObj[i].dvalue;
        }
      }
      return '';
    },
    exitProject() {
      this.$router.replace(`/addProject?code=${this.code}`);
    },
    delDt() {
      this.loadingFlag = true;
      deleteDetailsText(this.code).then(() => {
        this.loadingFlag = false;
        this.$refs.toast.show();
        this.toastText = '删除成功';
        setTimeout(() => {
          this.$router.back();
        }, 1000);
      }).catch(() => {
        this.loadingFlag = false;
      });
    },
    toBack() {
      window.history.go(-1);
    },
    clickImg() {
      if(this.userDetail.voucherUrl === "" || this.userDetail.voucherUrl === undefined){
        console.log(this.userDetail.voucherUrl);
        this.toastText = '图片为空';
        this.$refs.toast.show();
      }else{
        this.showImg = true;
        // 获取当前图片地址
        this.imgSrc = this.userDetail.voucherUrl;
      }
    },
    viewImg(){
      this.showImg = false;
    },
  },
  components: {
    DatePicker,
    Toast,
    Scroll,
    Loading,
    'big-img': BigImg,
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
            color:#ccc;
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
        .memNumRk{
          display: flex;
          width:92%;
          margin: 0 auto;
          font-size: 0.2rem;
          .top{
            color:#ccc;
            margin-top: 0.3rem
          }
          .bottom{
            margin-top: 0.2rem
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
            .txtCenter{
              text-align: center;
            }
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
            background:rgba(255,255,255,1);
            margin: 0.2rem auto 0;
            color: #028EFF;
            text-align: center;
            border:2px solid rgba(2,142,255,1);
            border-radius: 2px;
            font-size: 0.32rem;
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
    }
}
.toBack{
  float: left;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
}
</style>


