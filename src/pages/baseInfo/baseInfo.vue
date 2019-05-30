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
              手机号码<input type="telphone" v-model="config.phone" placeholder="请输入手机号码"/>
            </div>
          <div class="outlook">
            <label>政治面貌</label>
            <select style="width: 80%;" v-model="config.politicsType">
              <option value="">请选择</option>
              <option :value="item.dkey" v-for="(item, index) in politicsTypeData" v-bind:key="index">{{item.dvalue}}</option>
            </select>
          </div>
          <div class="outlook">
            <label>文化程度</label>
            <select style="width: 80%;" v-model="config.cultureLevelType">
              <option value="">请选择</option>
              <option :value="item.dkey" v-for="(item, index) in cultureLevelTypeData" v-bind:key="index">{{item.dvalue}}</option>
            </select>
          </div>
          <div class="outlook">
            <label>是否加入公会</label>
            <select style="width: 60%;" v-model="config.isJoined">
              <option value="">请选择</option>
              <option key='1' value='1'>是</option>
              <option key='0' value='0'>否</option>
            </select>
          </div>
          </div>
        </div>
        <div class="empty"></div>
        <div class="baseFooter">
          <!--<div class="medical">-->
            <!--加入公会时间 <datePicker-->
            <!--:year="addYear"-->
            <!--:month="addMonth"-->
            <!--:day="addDay"-->
            <!--@change="updateAddDate"-->
          <!--/>-->
          <!--</div>-->
          <div class="habits">
            特长<input type="text" v-model="config.specialty"/>
          </div>
            <div class="medical">
              <label>是否重大病史</label>
              <select style="width: 60%;" v-model="config.hasBadMedicalHistory">
                <option value="">请选择</option>
                <option key='1' value='1'>是</option>
                <option key='0' value='0'>否</option>
              </select>
            </div>
            <div class="isMarry">
              <label>婚姻状况</label>
              <select style="width: 60%;" v-model="config.maritalStatus">
                <option value="">请选择</option>
                <option :value="item.dkey" v-for="(item, index) in maritalStatusData" v-bind:key="index">{{item.dvalue }}</option>
              </select>
            </div>
            <div class="familyM">
                紧急联系人<input type="text" placeholder="请输入紧急联系人" v-model="config.urgentLinkMan"/>
            </div>
            <div class="familyTel">
                紧急联系人号码<input type="telphone" placeholder="请输入联系人号码" v-model="config.urgentLinkManPhone"/>
            </div>
        </div>
        <router-link to="/handleEntry">
            <div class="next-step">
                下一步
            </div>
        </router-link>
        </scroll>
      <toast ref="toast" :text="toastText"></toast>
    </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import Toast from 'base/toast/toast';
import DatePicker from 'base/date-picker/date-picker';
import{getDictList} from 'api/general';
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
            code: '',
            userId: getUserId()
          }
        }
    },
    created() {
      Promise.all([
        getDictList('politics_type'),
        getDictList('culture_level_type'),
        getDictList('marital_status')
      ]).then(([data1, data2, data3]) => {
        this.politicsTypeData = data1;
        this.cultureLevelTypeData = data2;
        this.maritalStatusData = data3;
      });
    },
    methods:{
      updateEntryDate(year, month, day) {
        this.entryYear = year;
        this.entryMonth = month;
        this.entryDay = day;
      },
      updateStartEntryDate(year, month, day) {
        this.entryStartYear = year;
        this.entryStartMonth = month;
        this.entryStartDay = day;
      },
      updateEndEntryDate(year, month, day) {
        this.entryEndYear = year;
        this.entryEndMonth = month;
        this.entryEndDay = day;
      },
      updateAddDate(year, month, day) {
        this.addYear = year;
        this.addMonth = month;
        this.addDay = day;
      },
    },
    components:{
        scroll:Scroll,
        toast: Toast,
        datePicker: DatePicker
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
        .tel{
            position: relative;
            height: .9rem;
            width: 92%;
            margin: 0 auto;
            line-height: .9rem;
            color: #999999;
            font-size: 0.28rem;
            box-shadow: 0 1px 0 0 #E6E6E6;
            input{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                margin-left: .8rem;
                color: #333;
                font-size: 0.28rem;
            }
        }
        .outlook{
            position: relative;
            height: .9rem;
            width: 92%;
            margin: 0 auto;
            line-height: .9rem;
            color: #999999;
            font-size: 0.28rem;
            box-shadow: 0 1px 0 0 #E6E6E6;
            .imgWrapper{
                position: absolute;
                right: 0;
                top: 50%;
                width: 0.18rem;
                height: 0.14rem;
                img{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .education{
            position: relative;
            height: .9rem;
            width: 92%;
            margin: 0 auto;
            line-height: .9rem;
            color: #999999;
            font-size: 0.28rem;
            box-shadow: 0 1px 0 0 #E6E6E6;
            .imgWrapper{
                position: absolute;
                right: 0;
                top: 50%;
                width: 0.18rem;
                height: 0.14rem;
                img{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .Labour{
            position: relative;
            height: .9rem;
            width: 92%;
            margin: 0 auto;
            line-height: .9rem;
            color: #999999;
            font-size: 0.28rem;
            box-shadow: 0 1px 0 0 #E6E6E6;
            .imgWrapper{
                position: absolute;
                right: 0;
                top: 50%;
                width: 0.18rem;
                height: 0.14rem;
                img{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .empty{
        width: 100%;
        height: 0.2rem;
        background: #F0F0F0;
    }
    .baseFooter{
         .habits{
            position: relative;
            height: .9rem;
            width: 92%;
            margin: 0 auto;
            line-height: .9rem;
            color: #999999;
            font-size: 0.28rem;
            box-shadow: 0 1px 0 0 #E6E6E6;
            input{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                margin-left: .8rem;
                color: #333;
                font-size: 0.28rem;
            }
        }
        .medical{
            position: relative;
            height: .9rem;
            width: 92%;
            margin: 0 auto;
            line-height: .9rem;
            color: #999999;
            font-size: 0.28rem;
            box-shadow: 0 1px 0 0 #E6E6E6;
            .imgWrapper{
                position: absolute;
                right: 0;
                top: 50%;
                width: 0.18rem;
                height: 0.14rem;
                img{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .isMarry{
            position: relative;
            height: .9rem;
            width: 92%;
            margin: 0 auto;
            line-height: .9rem;
            color: #999999;
            font-size: 0.28rem;
            box-shadow: 0 1px 0 0 #E6E6E6;
            .imgWrapper{
                position: absolute;
                right: 0;
                top: 50%;
                width: 0.18rem;
                height: 0.14rem;
                img{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .familyM{
            position: relative;
            height: .9rem;
            width: 92%;
            margin: 0 auto;
            line-height: .9rem;
            color: #999999;
            font-size: 0.28rem;
            box-shadow: 0 1px 0 0 #E6E6E6;
            input{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                margin-left: .8rem;
                color: #333;
                font-size: 0.28rem;
            }
        }
        .familyTel{
            position: relative;
            height: .9rem;
            width: 92%;
            margin: 0 auto;
            line-height: .9rem;
            color: #999999;
            font-size: 0.28rem;
            box-shadow: 0 1px 0 0 #E6E6E6;
            input{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                margin-left: .8rem;
                color: #333;
                font-size: 0.28rem;
            }
        }
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
}
</style>


