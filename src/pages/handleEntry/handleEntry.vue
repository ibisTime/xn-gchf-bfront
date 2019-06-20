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
                    <span class="red">*</span>所属班组
                  </div>
                  <div class="group-sele">
                    <select class="font-size-ram" v-model="config.teamSysNo">
                      <option value="">请选择</option>
                      <option :value="item.key" v-for="(item, index) in teamList" :key="index">{{item.value}}</option>
                    </select>
                    <div class="imgWrapper">
                      <img src="./pushdown.png"/>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="g_left">
                    <span class="red">*</span> 是否班长
                  </div>
                  <div class="group-sele">
                    <select class="font-size-ram" v-model="config.isTeamLeader">
                      <option value="">请选择</option>
                      <option value="1">是</option>
                      <option value="0">否</option>
                    </select>
                    <div class="imgWrapper">
                      <img src="./pushdown.png"/>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="g_left">
                    <span class="red">*</span>工种
                  </div>
                  <div class="group-sele">
                    <select class="font-size-ram" v-model="config.workType">
                      <option value="">请选择</option>
                      <option :value="item.key" v-for="(item, index) in workTypeList" :key="index">{{item.value}}</option>
                    </select>
                    <div class="imgWrapper">
                      <img src="./pushdown.png"/>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="g_left">
                    <span class="red">*</span>工人类型
                  </div>
                  <div class="group-sele">
                    <select class="font-size-ram" v-model="config.workRole">
                      <option value="">请选择</option>
                      <option :value="item.key" v-for="(item, index) in workList" :key="index">{{item.value}}</option>
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
                    <select class="font-size-ram" v-model="config.hasBuyInsurance">
                      <option value="">请选择</option>
                      <option value="1">是</option>
                      <option value="0">否</option>
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
      <loading :isLoading="isLoading"></loading>
    </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import Toast from 'base/toast/toast';
import Loading from 'base/loading/loading';
import { userInOut, xmbzList, addUserRz, authenticationDetail } from 'api/deal';
import{getDictList} from 'api/general';
import {getProjectCode} from 'common/js/util';
export default {
    data(){
        return{
          config: {
            teamSysNo: '',
            workType: '',
            workRole: '',
            isTeamLeader: '',
            hasBuyInsurance: ''
          },
          toastText: '操作完成',
          teamList: [],
          workTypeList: [],
          workList: [],
          code: '',
          from: '',
          isLoading: true,
          status: true
        }
    },
  created() {
    const { code, from } = this.$route.query;
    this.code = code;
    this.from = from;
      Promise.all([
        getDictList('work_type'),
        getDictList('work_role'),
        xmbzList({
          projectCode: getProjectCode()
        }),
        authenticationDetail(this.code)
      ]).then(([data1, data2, data3, data4]) => {
        this.workTypeList = data1.map(item => ({
          key: item.dkey,
          value: item.dvalue
        }));
        this.workList = data2.map(item => ({
          key: item.dkey,
          value: item.dvalue
        }));
        this.teamList = data3.map(item => ({
          key: item.code,
          value: item.teamName
        }));
        let config = {
          teamSysNo: data4.teamSysNo || '',
          workType: data4.workType || '',
          workRole: data4.workRole || '',
          isTeamLeader: data4.isTeamLeader || '',
          hasBuyInsurance: data4.hasBuyInsurance || ''
        };
        this.$set(this, 'config', config);
        this.isLoading = false;
      });
  },
    methods:{
      inputtingOk() {
        this.isLoading = true;
        this.loadingName = ""
        if(this.config.teamSysNo != "" && this.config.isTeamLeader != "" && this.config.workType != "" && this.config.workRole != ""){
          this.toastText = "";
          if(this.from === 'baseInfo') {
            if(this.status){
              addUserRz({
                ...this.config,
                workerCode: this.code
              }).then(() => {
                this.status = false;
                this.isLoading = false;
                this.toastText = "操作成功";
                this.$refs.toast.show();
                setTimeout(() => {
                  this.$router.push('/home');
                }, 1000);
              }).catch(() => {
                this.loadingFlag = false;
                this.status = true;
              });
            }
          } else {
            userInOut({
              ...this.config,
              workerCode: this.code
            }).then(() => {
              this.$refs.toast.show();
              setTimeout(() => {
                this.$router.push('/home');
              }, 1000);
            }).catch(() => {
              this.loadingFlag = false;
            });;
          }
        }else{
          this.toastText = "请将信息填写完整";
          this.$refs.toast.show();
          this.isLoading = false;
        }
      }
    },
    components:{
        scroll:Scroll,
      toast: Toast,
      Loading
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
          border-bottom: 1px solid #E6E6E6;
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
    margin-right: 0.1rem;
  }
  .font-size-ram{
    font-size: 0.28rem;
  }
}
</style>


