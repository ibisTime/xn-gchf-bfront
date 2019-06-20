<template>
   <div class="full-screen-wrapper information-wrapper">
       <scroll ref="scroll" :hasMore="false">
            <div class="header">
                <div class="infoBanner">
                    <p class="toBack" @click="toBack">返回</p>
                    <p class="infoCenter">
                        基本信息
                    </p>
                </div>
                <div class="pepName">
                  <div class="left">
                    姓名
                  </div>
                  <div class="right">{{userDetail.name}}</div>
                </div>
                <div class="pepName">
                  <div class="left">
                    身份证头像
                  </div>
                  <div class="right">
                    <div
                      class="pic-box"
                      :style="{backgroundImage: `url(${userDetail.headImageUrl})`}"
                      :class="userDetail.headImageUrl ? '' : 'hidden'"
                      @click="clickImg(userDetail.headImageUrl)"
                    ></div>
                  </div>
                </div>
              <div class="pepName">
                <div class="left">证件类型</div>
                <div class="right">{{idcardTypeTypeData[userDetail.idCardType]}}</div>
              </div>
                <div class="pepName">
                  <div class="left">性别</div>
                  <div class="right">{{userDetail.idCardType ? userDetail.gender === 0 ? '男' : '女' : ''}}</div>
                </div>
                <div class="pepName">
                  <div class="left">民族</div>
                  <div class="right">{{userDetail.nation}}</div>
                </div>
                <div class="pepName">
                  <div class="left">出生日期</div>
                  <div class="right">{{userDetail.birthday && formatDate(userDetail.birthday)}}</div>
                </div>
                <div class="pepName">
                  <div class="left">身份证号码</div>
                  <div class="right">{{userDetail.idCardNumber}}</div>
                </div>
                <div class="pepName">
                  <div class="left">地址</div>
                  <div class="right">{{userDetail.address}}</div>
                </div>
                <div class="pepName">
                  <div class="left">有效开始日期</div>
                  <div class="right">{{userDetail.startDate && formatDate(userDetail.startDate)}}</div>
                </div>
                <div class="pepName">
                  <div class="left">有效截止日期</div>
                  <div class="right">{{userDetail.expiryDate && formatDate(userDetail.expiryDate)}}</div>
                </div>
                <div class="pepName">
                  <div class="left">签发机关</div>
                  <div class="right">{{userDetail.grantOrg}}</div>
                </div>
                <div class="pepName">
                  <div class="left">政治面貌</div>
                  <div class="right">{{politicsTypeData[userDetail.politicsType]}}</div>
                </div>
                <div class="pepName">
                  <div class="left">文化程度</div>
                  <div class="right">{{cultureLevelTypeData[userDetail.cultureLevelType]}}</div>
                </div>
            </div>
            <div class="emptyOne"></div>
            <div class="middle">
                <div class="pepName">
                  <div class="left">
                    身份证正面照（单）
                  </div>
                  <div class="right">
                    <div
                      class="pic-box"
                      :class="userDetail.positiveIdCardImageUrl ? '' : 'hidden'"
                      :style="{backgroundImage: `url(${userDetail.positiveIdCardImageUrl})`}"
                      @click="clickImg(userDetail.positiveIdCardImageUrl)"
                    ></div>
                  </div>
                </div>
                <div class="pepName">
                  <div class="left">
                    身份证反面照（单）
                  </div>
                  <div class="right">
                    <div
                      class="pic-box"
                      :class="userDetail.negativeIdCardImageUrl ? '' : 'hidden'"
                      :style="{backgroundImage: `url(${userDetail.negativeIdCardImageUrl})`}"
                      @click="clickImg(userDetail.negativeIdCardImageUrl)"
                    ></div>
                  </div>
                </div>
                <div class="pepName">
                  <div class="left">
                    手持身份证照片（单）
                  </div>
                  <div class="right">
                    <div
                      class="pic-box"
                      :class="userDetail.handIdCardImageUrl ? '' : 'hidden'"
                      :style="{backgroundImage: `url(${userDetail.handIdCardImageUrl})`}"
                      @click="clickImg(userDetail.handIdCardImageUrl)"
                    ></div>
                  </div>
                </div>
                <div class="pepName">
                  <div class="left">
                    考勤人脸照（单）
                  </div>
                  <div class="right">
                    <div class="pic-box"
                         :class="userDetail.attendancePicture ? '' : 'hidden'"
                         :style="{backgroundImage: `url(${userDetail.attendancePicture})`}"
                         @click="clickImg(userDetail.attendancePicture)"
                    ></div>
                  </div>
                </div>
            </div>
            <div class="emptyTwo"></div>
            <div class="footer">
                <div class="pepName">
                  <div class="left">
                    手机号码
                  </div>
                  <div class="right">{{userDetail.cellPhone}}</div>
                </div>
                <div class="pepName">
                  <div class="left">
                    紧急联系人姓名
                  </div>
                  <div class="right">{{userDetail.urgentLinkMan}}</div>
                </div>
                <div class="pepName">
                  <div class="left">
                    紧急联系电话
                  </div>
                  <div class="right">{{userDetail.urgentLinkManPhone}}</div>
                </div>
                <div class="pepName">
                  <div class="left">
                    是否加入公会
                  </div>
                  <div class="right">{{userDetail.isJoined == "1" ? "是" : "否"}}</div>
                </div>
                <div class="pepName">
                  <div class="left">
                    加入公会时间
                  </div>
                  <div class="right">{{userDetail.joinedTime && formatDate(userDetail.joinedTime) ? formatDate(userDetail.joinedTime) : "暂无数据" }}</div>
                </div>
                <div class="pepName">
                  <div class="left">
                    特长
                  </div>
                  <div class="right">{{userDetail.specialty}}</div>
                </div>
                <div class="pepName">
                  <div class="left">
                    是否有重大病史
                  </div>
                  <div class="right">{{userDetail.hasBadMedicalHistory == "1" ? "是" : "否"}}</div>
                </div>
                <div class="pepName">
                  <div class="left">
                    婚姻状况
                  </div>
                  <div class="right">{{maritalStatusData[userDetail.maritalStatus]}}</div>
                </div>
                <!--<div class="backTo" @click="toBack">返回</div>-->
            </div>
       </scroll>
     <loading :isLoading="isLoading" title="'正在努力加载中....'"></loading>
     <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
   </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading';
import { authenticationDetail, teamUserDetail } from 'api/deal';
import { getDictList } from 'api/general';
import { formatDate } from 'common/js/util';
import BigImg from '../imgEnlarge/BigImgInfo.vue';
export default {
    data(){
        return{
          userDetail: [],
          politicsTypeData: {},
          cultureLevelTypeData: {},
          maritalStatusData: {},
          idcardTypeTypeData: {},
          code: '',
          isLoading: true,
          showImg: false,
          imgSrc: ''
        }
    },
    created(){
      const {code} = this.$route.query;
      this.code = code;
      Promise.all([
        getDictList('politics_type'),
        getDictList('culture_level_type'),
        getDictList('marital_status'),
        getDictList('legal_manid_card_type'),
      ]).then(([data1, data2, data3, data4]) => {
        data1.forEach(item => {
          this.politicsTypeData[`${item.dkey}`] = item.dvalue;
        });
        data2.map(item => {
          this.cultureLevelTypeData[`${item.dkey}`] = item.dvalue;
        });
        data3.map(item => {
          this.maritalStatusData[`${item.dkey}`] = item.dvalue;
        });
        data4.map(item => {
          this.idcardTypeTypeData[`${item.dkey}`] = item.dvalue;
        });
      });
      this.getTeamUserDetail();
    },
    methods: {
      toBack() {
        this.$router.replace(`/memberDetails?code=${this.code}`);
      },
      formatDate(time) {
        return formatDate(time);
      },
      async getAuthenticationDetail(workCode) {
        return authenticationDetail(workCode).then(data => {
          this.userDetail = data;
          console.log(this.userDetail);
          this.isLoading = false;
        });
      },
      async getTeamUserDetail() {
        return teamUserDetail(this.code).then(data => {
          this.getAuthenticationDetail(data.workerCode);
        });
      },
      clickImg(imgSrc) {
        if(imgSrc != "" && imgSrc != undefined){
          console.log(imgSrc);
          this.showImg = true;
          // 获取当前图片地址
          this.imgSrc = imgSrc;
        }
      },
      viewImg(){
        this.showImg = false;
      },
    },
  components: {
    Scroll,
    Loading,
    'big-img': BigImg
  }
}
</script>

<style lang="scss" scoped>
.information-wrapper{
    .header{
        width: 100%;
        background: #fff;
            .infoBanner{
            position: relative;
            height:1.28rem;
            width:100%;
            background:#028EFF;
            text-align: center;
            font-size: 0.32rem;
            color: #fff;
            .infoCenter{
                position: absolute;
                top: 50%;
                left: 50%;
                transform:translateX(-50%) translateY(-50%);
            }
            .toBack{
              float: left;
              margin-left: 0.5rem;
              margin-top: 0.5rem;
            }
        }
    }
    .emptyOne{
        width: 100%;
        height: 0.2rem;
        background:rgba(240,240,240,1);
    }
    .emptyTwo{
        width: 100%;
        height: 0.2rem;
        background:rgba(240,240,240,1);
    }
  .pepName{
    padding: 0.25rem 0 0.25rem 0;
    width: 92%;
    margin:0 auto;
    display: flex;
    font-size: 0.28rem;
    border-bottom: 1px solid rgba(230,230,230,1);
    .left{
      color:rgba(153,153,153,1);
      width: 40%;
    }
    .right{
      width: 60%;
      color: #333;
      .pic-box{
        width: 1.8rem;
        height: 1.8rem;
        border: 1px solid #ccc;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }
  .backTo{
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
  .footer{
    padding-bottom: 1rem;
  }
  .clear-img{
    border:1px solid darkred;
    color:darkred;
    padding:1px;
    font-size: 0.24rem;
    margin-left: 0.1rem;
  }
}

</style>


