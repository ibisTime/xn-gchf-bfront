<template>
<div class="full-screen-wrapper memberDetails-wrapper">
    <router-link to="/user" tag="div" class="card-wrapper">
        <p class="detailsCenter">
            人员详情
        </p>
        <div class="card-container">
            <div class="card-photo">
            <img :src="getAvatar()"/>
            </div>
            <div class="card-info">
            <div class="card-title">姓名：{{userInfo.workerName}}</div>
            <div class="card-tip">班组：{{userInfo.teamName}}</div>
            <div class="card-time">入职时间: {{}}</div>
            </div>
        </div>
    </router-link>
    <router-link to="/faceCollect">
        <div class="faceCollect">人脸采集
                <div class="facePhoto">
                    <img src="./person.png"/>
                </div>
        </div>
    </router-link>
    <router-link to="bindCard">
        <div class="cashCard">绑定工资卡
                <div class="cardPhoto">
                    <img src="./person.png"/>
                </div>
        </div>
    </router-link>
    <router-link to="/information">
        <div class="baseInfo">基本信息
            <div class="infoPhoto">
                <img src="./person.png"/>
            </div>
        </div>
    </router-link>
    <div class="empty"></div>
    <router-link to="/createRecord">
        <div class="reRecord">重新建档
            <div class="recordPhoto">
                <img src="./person.png"/>
            </div>
        </div>
    </router-link>
</div>
</template>

<script>
import { formatAvatar, formatDate } from 'common/js/util';
import { teamUserDetail } from 'api/deal';
export default{
  data(){
    return{
      userInfo: {}
    }
  },
  created() {
    const { code } = this.$route.query;
    teamUserDetail(code).then(data => {
      this.userInfo = data;
    })
  },
  methods:{
      getAvatar() {
          if (!this.user) {
            return require('./avatar.png');
          }
          return formatAvatar(this.user.photo);
        }
      }
  }
</script>

<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";
*{
    padding:0;
    margin: 0;
}
.memberDetails-wrapper{
    .header-wapper{
        width: 100%;
        height: 2.07rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .card-wrapper {
        .detailsCenter{
            text-align: center;
            color: #fff;
            font-size:0.36rem;
        }
        padding: 0.4rem 0.3rem 0.21rem 0.3rem;
        @include bg-image('bg');
        background-repeat: no-repeat;
        background-position: left top;
        background-size: contain;
        .card-container {
            margin-top:.4rem;
            display: flex;
            align-items: center;
            padding: 0.7rem 0.48rem;
            border-radius: 0.16rem;
            box-shadow: 0 6px 12px 0 #EBEBEB;
            background: #fff;
            .card-photo {
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
            }
            .card-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 0.3rem;
            align-items: stretch;
            .card-title {
                font-size: $font-size-large-s;
                padding-bottom: 0.2rem;
            }
            .card-tip {
                color: #666;
                font-size: $font-size-medium;
            }
            .card-time{
                color:#666;
                font-size: $font-size-medium;
                margin-top: 0.2rem;
            }
            }
        }
        }
        .bar-wrapper {
        display: flex;
        align-items: center;
        padding: 0.43rem 0.3rem;
        font-size: $font-size-medium-xx;
        i {
            height: 0.3rem;
            width: 0.05rem;
            background: $primary-color;
            margin-right: 0.12rem;
        }
    }
    .faceCollect{
        position: relative;
        margin: 0 auto;
        width:92%;
        height: 1rem;;
        line-height: 1rem;
        margin-top:.1rem;
        font-size:0.28rem;
        color: #333;
        border-bottom:1px solid #f0f0f0;
        .facePhoto{
            position: absolute;
            right: 0.2rem;
            top: 0.01rem;
            width:0.17rem;
            height: 0.17rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .cashCard{
        position: relative;
        margin: 0 auto;
        width:92%;
        height: 1rem;;
        line-height: 1rem;
        margin-top:.1rem;
        font-size:0.28rem;
        color: #333;
        border-bottom:1px solid #f0f0f0;
        .cardPhoto{
            position: absolute;
            right: 0.2rem;
            top: 0.01rem;
            width:0.17rem;
            height: 0.17rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .baseInfo{
        position: relative;
        margin: 0 auto;
        width:92%;
        height: 1rem;;
        line-height: 1rem;
        margin-top:.1rem;
        font-size:0.28rem;
        color: #333;
        .infoPhoto{
            position: absolute;
            right: 0.2rem;
            top: 0.01rem;
            width:0.17rem;
            height: 0.17rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .empty{
        width: 100%;
        height: 0.2rem;
        background:#f0f0f0;
    }
    .reRecord{
        position: relative;
        margin: 0 auto;
        width:92%;
        height: 1rem;;
        line-height: 1rem;
        margin-top:.1rem;
        font-size:0.28rem;
        color: #333;
        border-bottom:1px solid #f0f0f0;
        .recordPhoto{
            position: absolute;
            right: 0.2rem;
            top: 0.01rem;
            width:0.17rem;
            height: 0.17rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
