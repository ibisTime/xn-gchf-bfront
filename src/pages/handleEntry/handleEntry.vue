<template>
    <div class="full-screen-wrapper handle-wrapper">
         <scroll ref="scroll" :hasMore="false">
            <div>
            <div class="baseBanner">
                <p class="baseCenter">
                    办理入职
                </p>
            </div>
            <div class="baseTop">
                <div class="group">
                  <div class="g_left">
                    所属班组 <sapn class="red">*</sapn>
                  </div>
                  <div class="group-sele">
                    <select v-model="config.teamSysNo">
                      <option value=""></option>
                    </select>
                    <div class="imgWrapper">
                      <img src="./pushdown.png"/>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="g_left">
                    是否班长 <sapn class="red">*</sapn>
                  </div>
                  <div class="group-sele">
                    <select v-model="config.isTeamLeader">
                      <option value=""></option>
                    </select>
                    <div class="imgWrapper">
                      <img src="./pushdown.png"/>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="g_left">
                    工种 <sapn class="red">*</sapn>
                  </div>
                  <div class="group-sele">
                    <select v-model="config.workType">
                      <option value=""></option>
                    </select>
                    <div class="imgWrapper">
                      <img src="./pushdown.png"/>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="g_left">
                    工人类型 <sapn class="red">*</sapn>
                  </div>
                  <div class="group-sele">
                    <select v-model="config.workRole">
                      <option value=""></option>
                    </select>
                    <div class="imgWrapper">
                      <img src="./pushdown.png"/>
                    </div>
                  </div>
                </div>
            </div>
            <div class="empty"></div>
            <div class="baseFooter">
                <div class="Insurance">
                    <div class="g_left">
                      是否购买保险
                    </div>
                  <div class="group-sele">
                    <select v-model="config.hasBuyInsurance">
                      <option value=""></option>
                    </select>
                    <div class="imgWrapper">
                      <img src="./pushdown.png"/>
                    </div>
                  </div>
                </div>
            </div>
            <div class="ok" @click="inputtingOk">
                完成建档
            </div>
            </div>
        </scroll>
      <toast ref="toast" :text="toastText"></toast>
    </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import Toast from 'base/toast/toast';
import { userInOut } from 'api/deal';
export default {
    data(){
        return{
          config: {
            workerCode: '',
            teamSysNo: '',
            workType: '',
            workRole: '',
            isTeamLeader: '',
            hasBuyInsurance: ''
          },
          toastText: '操作完成'
        }
    },
    methods:{
      inputtingOk() {
        const { code } = this.$route.query;
        userInOut({
          ...this.config,
          workerCode: code
        }).then(() => {
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.push('/home');
          }, 1000);
        });
      }
    },
    components:{
        scroll:Scroll,
      toast: Toast
    }
}
</script>
<style lang="scss" scoped>
.handle-wrapper{
    .baseBanner{
    position: relative;
    height:1.5rem;
    width:100%;
    background:#028EFF;
    text-align: center;
    font-size: 0.4rem;
    color: #fff;
    .baseCenter{
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translateX(-50%) translateY(-50%);
        }
    }
    .baseTop{
        width: 100%;
        .group{
            position: relative;
          display: flex;
            height: .9rem;
            width: 92%;
            margin: 0 auto;
            line-height: .9rem;
            color: #999999;
            font-size: 0.28rem;
            box-shadow: 0 1px 0 0 #E6E6E6;
        }
    }
    .empty{
        width: 100%;
        height: 0.2rem;
        background: #F0F0F0;
    }
  .Insurance{
    position: relative;
    display: flex;
    height: .9rem;
    width: 92%;
    margin: 0 auto;
    line-height: .9rem;
    color: #999999;
    font-size: 0.28rem;
    box-shadow: 0 1px 0 0 #E6E6E6;
  }
    .ok{
        background: #028EFF;
        border-radius: 4px;
        font-size: 0.32rem;
        color: #FFFFFF;
        text-align: center;
        height: .9rem;
        line-height: .9rem;
        width: 92%;
        margin: 0 auto;
        margin-top: 3rem;
    }
  .imgWrapper{
    position: absolute;
    right: 0;
    top: 45%;
    width: 0.18rem;
    height: 0.14rem;
    img{
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  .g_left{
    width: 30%;
  }
  .group-sele{
    position: relative;
    width: 70%;
    select{
      width: 100%;
    }
  }
  .red{
    color: red;
  }
}
</style>


