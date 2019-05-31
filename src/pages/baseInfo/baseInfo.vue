<template>
    <div class="full-screen-wrapper baseInfo-wrapper">
        <scroll ref="scroll" :hasMore="false">
        <div>
         <div class="baseBanner">
            <p class="baseCenter">
                基本信息录入
            </p>
        </div>
        <div class="baseTop">
            <div class="tel">
              <div class="left">
                手机号码 <span class="red">*</span>
              </div>
              <div class="right">
                <input type="telphone" v-model="config.phone" placeholder="请输入手机号码"/>
              </div>
            </div>
          <div class="tel">
            <div class="left">
              <label>政治面貌 <span class="red">*</span></label>
            </div>
            <div class="right">
              <select v-model="config.politicsType">
                <option value="">请选择</option>
                <option :value="item.dkey" v-for="(item, index) in politicsTypeData" v-bind:key="index">{{item.dvalue}}</option>
              </select>
            </div>
          </div>
          <div class="tel">
            <div class="left">
              <label>文化程度 <span class="red">*</span></label>
            </div>
            <div class="right">
              <select v-model="config.cultureLevelType">
                <option value="">请选择</option>
                <option :value="item.dkey" v-for="(item, index) in cultureLevelTypeData" v-bind:key="index">{{item.dvalue}}</option>
              </select>
            </div>
          </div>
          <div class="tel">
            <div class="left">
              <label>是否加入公会</label>
            </div>
            <div class="right">
              <select v-model="config.isJoined">
                <option value="">请选择</option>
                <option key='1' value='1'>是</option>
                <option key='0' value='0'>否</option>
              </select>
            </div>
          </div>
          </div>
        </div>
        <div class="empty"></div>
        <div class="baseFooter">
          <div class="tel">
            特长<input type="text" v-model="config.specialty"/>
          </div>
            <div class="tel">
              <div class="left">
                <label>是否重大病史</label>
              </div>
              <div class="right">
                <select v-model="config.hasBadMedicalHistory">
                  <option value="">请选择</option>
                  <option key='1' value='1'>是</option>
                  <option key='0' value='0'>否</option>
                </select>
              </div>
            </div>
            <div class="tel">
              <div class="left">
                <label>婚姻状况</label>
              </div>
              <div class="right">
                <select v-model="config.maritalStatus">
                  <option value="">请选择</option>
                  <option :value="item.dkey" v-for="(item, index) in maritalStatusData" v-bind:key="index">{{item.dvalue }}</option>
                </select>
              </div>
            </div>
            <div class="tel">
                <div class="left">
                  紧急联系人
                </div>
                <div class="right">
                  <input type="text" placeholder="请输入紧急联系人" v-model="config.urgentLinkMan"/>
                </div>
            </div>
            <div class="tel">
                <div class="left">
                  紧急联系人号码
                </div>
                <div class="right">
                  <input type="number" placeholder="请输入联系人号码" v-model="config.urgentLinkManPhone"/>
                </div>
            </div>
        </div>
          <div class="next-step" @click="nextStepFn">
            下一步
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
import DatePicker from 'base/date-picker/date-picker';
import{getDictList} from 'api/general';
import{baseInfoEntry, authenticationDetail} from 'api/deal';
import {getUserId} from "common/js/util";

export default {
    data(){
        return{
          toastText: '请填写完整',
          politicsTypeData: [],
          cultureLevelTypeData: [],
          maritalStatusData: [],
          config: {
            phone: '',
            politicsType: '',
            cultureLevelType: '',
            isJoined: '',
            specialty: '',
            hasBadMedicalHistory: '',
            maritalStatus: '',
            urgentLinkMan: '',
            urgentLinkManPhone: '',
            userId: getUserId()
          },
          code: '',
          isLoading: true
        }
    },
    created() {
      const { code } = this.$route.query;
      this.code = code;
      Promise.all([
        getDictList('politics_type'),
        getDictList('culture_level_type'),
        getDictList('marital_status'),
        authenticationDetail(code)
      ]).then(([data1, data2, data3, data4]) => {
        this.politicsTypeData = data1;
        this.cultureLevelTypeData = data2;
        this.maritalStatusData = data3;
        let config = {
          phone: data4.phone || '',
          politicsType: data4.politicsType || '',
          cultureLevelType: data4.cultureLevelType || '',
          isJoined: data4.isJoined || '',
          specialty: data4.specialty || '',
          hasBadMedicalHistory: data4.hasBadMedicalHistory || '',
          maritalStatus: data4.maritalStatus || '',
          urgentLinkMan: data4.urgentLinkMan || '',
          urgentLinkManPhone: data4.urgentLinkManPhone || ''
        };
        this.$set(this, 'config', config);
        this.isLoading = false;
      });
    },
    methods:{
      nextStepFn() {
        if(!this.config.phone ||
          !this.config.politicsType ||
          !this.config.cultureLevelType ||
          !this.config.cultureLevelType) {
          this.toastText = '请填写完整';
          this.$refs.toast.show();
          return false;
        }
        baseInfoEntry({
          code: this.code,
          ...this.config
        }).then(data => {
          this.toastText = '操作成功';
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.push(`/handleEntry?code=${data.code}&from=baseInfo`);
          }, 1000);
        });
      }
    },
    components:{
        scroll:Scroll,
        toast: Toast,
        datePicker: DatePicker,
      Loading
    }
}
</script>
<style lang="scss" scoped>
.baseInfo-wrapper{
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
    }
  .tel{
    position: relative;
    display: flex;
    height: .9rem;
    width: 92%;
    margin: 0 auto;
    line-height: .9rem;
    color: #999999;
    font-size: 0.28rem;
    box-shadow: 0 1px 0 0 #E6E6E6;
    .left{
      width: 35%;
    }
    .right{
      width: 65%;
      input{
        color: #333;
        font-size: 0.28rem;
      }
      select{
        width: 100%;
      }
    }
  }
    .empty{
        width: 100%;
        height: 0.2rem;
        background: #F0F0F0;
    }
    .next-step{
        background: #028EFF;
        border-radius: 4px;
        font-size: 0.32rem;
        color: #FFFFFF;
        text-align: center;
        height: .9rem;
        line-height: .9rem;
        width: 92%;
        margin: 0 auto;
        margin-top: 1.6rem;
    }
  .red{
    color: red;
  }
}
</style>


