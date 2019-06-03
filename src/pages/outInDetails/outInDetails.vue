<template>
  <div class="full-screen-wrapper details-wrapper">
    <scroll ref="scroll" :hasMore='false'>
      <div class="wrapper">
        <div class="baseBanner">
          <p class="baseCenter">
            进出记录详情
          </p>
        </div>
        <div class="banner">
          <div class="memNum">
            <div class="left">
              设备序列号
            </div>
            <div class="right">
              {{userDetail.deviceKey}}
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              设备名称
            </div>
            <div class="right">
              {{userDetail.deviceName}}
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              方向
            </div>
            <div class="right">
              {{directionObj[userDetail.direction]}}
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              工人姓名
            </div>
            <div class="right">
              {{userDetail.workerName}}
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              证件号
            </div>
            <div class="right">
              {{userDetail.idcardNumber}}
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              所在班组
            </div>
            <div class="right">
              {{userDetail.teamName}}
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              记录时间
            </div>
            <div class="right">
              {{formatDate(userDetail.date)}}
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              现场照片
            </div>
            <div class="right">
              <div class="pic" :style="{backgroundImage: `url(${userDetail.image})`}"></div>
            </div>
          </div>
          <div class="memNum">
            <div class="left">
              类型
            </div>
            <div class="right">
              {{dictObj[userDetail.attendType]}}
            </div>
          </div>
        </div>
        <div class="preservation" @click="preservation">
          返回
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import { formatDate } from 'common/js/util';
  import DatePicker from 'base/date-picker/date-picker';
  import {queryOutInDetail} from 'api/deal';
  import{getDictList} from 'api/general';
  import Toast from 'base/toast/toast';
  import Scroll from 'base/scroll/scroll';
  export default {
    data(){
      return{
        userDetail: {},
        dictObj: {},
        directionObj: {},
        toastText: '',
        picUrl: '',
        code: ''
      }
    },
    created() {
      const {code} = this.$route.query;
      if(code) {
        this.code = code;
        Promise.all([
          getDictList('attend_type'),
          getDictList('direction'),
          queryOutInDetail(code),
        ]).then(([data1, data2, data3]) => {
          data1.forEach(item => {
            this.dictObj[item.dkey] = item.dvalue;
          });
          data2.forEach(item => {
            this.directionObj[item.dkey] = item.dvalue;
          });
          this.userDetail = data3;
        });
      }
    },
    methods: {
      preservation() {
        this.$router.push('/outDetails');
      },
      formatDate(time) {
        return formatDate(time);
      }
    },
    components: {
      DatePicker,
      Toast,
      Scroll
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
            .pic{
              width: 1.5rem;
              height: 1.5rem;
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
              margin: 0.2rem 0;
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
        background:rgba(255,255,255,1);
        margin: 1rem auto 0;
        color: #028EFF;
        text-align: center;
        border:2px solid rgba(2,142,255,1);
        border-radius: 2px;
        font-size: 0.32rem;
      }
    }
  }
</style>


