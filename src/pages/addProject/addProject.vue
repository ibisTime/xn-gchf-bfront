<template>
<div class="full-screen-wrapper add-wrapper">
    <div class="wrapper">
        <div class="baseBanner">
            <p class="toBack" @click="toBack">返回</p>
            <p class="baseCenter">
                {{title}}人员进退场
            </p>
        </div>
      <ToHome></ToHome>
        <div class="banner">
            <div class="memNum">
              <div class="left">
                <strong class="item-must">*</strong>
                员工编号
              </div>
              <div class="right">
                <select class="font-size-ram" v-model="workerCode">
                  <option value="">请选择</option>
                  <option :value="item.workerCode" v-for="(item, index) in userList" :key="index">{{item.workerName}}-{{item.workerCode}}</option>
                </select>
              </div>
            </div>
            <div class="memNum">
                <div class="left">
                  <strong class="item-must">*</strong>
                  类型
                </div>
              <div class="right">
                <select class="font-size-ram" v-model="config.type">
                  <option>请选择</option>
                  <option :value="item.key" v-for="(item, index) in dictList" :key="index">{{item.value}}</option>
                </select>
              </div>
            </div>
          <div class="memNum">
              <strong class="item-must">*</strong>
              进退场日期
              <date-picker
                            style="margin-left:0.1rem;"
                           :year="exitYear"
                           :month="exitMonth"
                           :day="exitDay"
                           :value="config.date"
                           @change="updateExitDate">
              </date-picker>
          </div>
          <div class="memNum">
              <strong class="item-must">*</strong>
              进退场时间
              <input type="text" v-model="payDate" style="margin-left: 0.1rem" />
          </div>
            <div class="idHeader">
                    <span>凭证扫描件（单）</span>
                    <span class="clear-img" @click="clearImg">清除图片</span>
                    <span class="clear-img" @click="clickImg">点击放大</span>
                    <div class="upPic" @click="getMediaSczp">
                        <img src="./upload.png"/>
                        <span>上传</span>
                      <!--<div class="picBox" :style="{backgroundImage: `url(${picUrl})`}"></div>-->
                      <div class="sfz_zm">
                        <canvas id="canvas" width="300" height="300"></canvas>
                      </div>
                      <div class="showImg" :style="{backgroundImage: `url(${picUrl})`}"></div>
                    </div>
            </div>
        </div>
      <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
        <div class="transparency" :class="isShow ? 'hidden' : ''" @click="() => {this.isShow = true;}">
          <div class="footer">
            <div class="reUpLoad" @click.stop>
              <input type="file" @change="upImage" accept="image/png,image/jpg" id="theFile">
              上传
            </div>
            <!--<div class="takePhoto" @click="getMedia">拍照</div>-->
            <div class="cancel">取消</div>
          </div>
        </div>
        <div class="sfz_modal" :class="isVideoSfz ? 'hidden' : ''">
          <video style="color:#fff;" id="video" width="100%" height="82.6%" muted="muted">您的浏览器不支持拍照上传功能</video>
          <div class="nextStep" style="marginTop: 0" @click="videoClick">
            拍 照
          </div>
        </div>
        <div class="preservation" @click="preservation">
            保存
        </div>
    </div>
  <toast ref="toast" :text="toastText"></toast>
  <loading :title="'正在努力加载中...'" :isLoading="isLoading"></loading>
</div>
</template>
<script>
  import { formatDate } from 'common/js/util';
  import DatePicker from 'base/date-picker/date-picker';
  import {addEditInOut, userQueryList, userInOutDetail} from 'api/deal';
  import{getDictList} from 'api/general';
  import Toast from 'base/toast/toast';
  import BigImg from '../imgEnlarge/BigImgTwo.vue';
  import Loading from 'base/loading/loading';
  import ToHome from 'base/toHome/toHome';
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
          sczzp: '',
          workerCode: '',
          userList: [],
          dictList: [],
          toastText: '',
          picUrl: '',
          status: '',
          userCode: '',
          dateArray: [],
          isShow: true,
          isVideoSfz: true,
          isVideo: true,
          payDate: '00:00:00',
          yMDArray: [],
          hMSArray: [],
          showImg: false,
          imgSrc: '',
          isLoading: true,
        }
    },
  created() {
    const {code, userCode} = this.$route.query;
    this.workerCode = userCode;
    let organizationCode = sessionStorage.getItem('organizationCode');
    Promise.all([
      getDictList('entry_exit_type'),
      userQueryList({projectCode: organizationCode})
    ]).then(([data1,data2]) => {
      this.dictList = data1.map(item => ({
        key: item.dkey,
        value: item.dvalue
      }));
      console.log(this.dictList);
      this.userList = data2.map(item => ({
        workerName: item.workerName,
        workerCode: item.code
      }
      ));
      this.isLoading = false;
    });
    if(code) {
      this.title = '修改';
      userInOutDetail({code}).then(data => {
        //console.log(data);
        this.workerCode = data.workerCode;
        this.picUrl = data.voucherUrl;
        this.config.voucherUrl = data.voucherUrl;
        this.config.type = data.type;
        this.config.date = formatDate(data.date, "yyyy-MM-dd hh:mm:ss");
        console.log(this.config.date);
        this.dateArray = this.config.date.split(" ");
        this.yMDArray = this.dateArray[0].split("-");
        this.exitYear = this.yMDArray[0];
        this.exitMonth = this.yMDArray[1];
        this.exitDay = this.yMDArray[2];
        this.payDate = this.dateArray[1];
      });
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
      this.config.voucherUrl = this.picUrl;
      //this.isLoading = true;
      if(this.config.type === ''){
        this.toastText = "类型不能为空";
        this.$refs.toast.show();
      }else if(this.exitYear === ''){
        this.toastText = "进退场日期不能为空";
        this.$refs.toast.show();
      }else{
        const {code} = this.$route.query;
        if(code) {
          this.config.code = code;
          this.config.date = this.exitYear + "-" + this.exitMonth + "-" + this.exitDay + " " + this.payDate;
          console.log(this.config.date);
          addEditInOut(631732, this.config).then(() => {
            this.isLoading = false;
            this.toastText = '修改成功';
            this.$refs.toast.show();
            setTimeout(() => {
              this.$router.replace('/into-details');
            }, 1000);
          }).catch(() => {
            this.loadingFlag = false;
          });
        }else {
          this.config.workerCode = this.workerCode;
          this.config.date = this.exitYear + "-" + this.exitMonth + "-" + this.exitDay + " " + this.payDate;
          addEditInOut(631730, this.config).then(() => {
            this.isLoading = false;
            this.toastText = '添加成功';
            this.$refs.toast.show();
            setTimeout(() => {
              this.$router.replace('/into-details');
            }, 1000);
          }).catch(() => {
            this.loadingFlag = false;
          });;
        }
      }
    },
    // upImage() {
    //   let theFile = document.getElementById('theFile').files[0];
    //   let fileReader = new FileReader();
    //   let _this = this;
    //   fileReader.readAsDataURL(theFile);
    //   if(theFile.size > 5512000) {
    //     this.toastText = '上传图片不得大于500KB';
    //     this.$refs.toast.show();
    //     return false;
    //   }
    //   fileReader.onload = function() {
    //     _this.config.voucherUrl = fileReader.result;
    //     _this.picUrl = fileReader.result;
    //   };
    // },
    getMediaSczp() {
      this.isShow = false;
    },
    getMedia() {
      this.isVideoSfz = false;
      //this.isLoading = true;
      let constraints = {
        video: {width: 500, height: 500},
        audio: true
      };
      //获得video摄像头区域
      let video = document.getElementById("video");
      let promise = null;
      if(navigator.mediaDevices.getUserMedia) {
        promise = navigator.mediaDevices.getUserMedia(constraints);
        promise.then((MediaStream) => {
          this.mediaStreamTrack = MediaStream;
          video.srcObject = MediaStream;
          this.isLoading = false;
          video.play();
        });
      }else if(navigator.webkitGetUserMedia){
        promise = navigator.webkitGetUserMedia(constraints);
        promise.then((stream) => {
          this.mediaStreamTrack = stream;
          video.src = stream;
          this.isLoading = false;
          video.play();
        });
      }else if(navigator.mozGetUserMedia){
        promise = navigator.mozGetUserMedia(constraints);
        promise.then((stream) => {
          this.mediaStreamTrack = stream;
          video.src = stream;
          this.isLoading = false;
          video.play();
        });
      }else if(navigator.getUserMedia){
        promise = navigator.getUserMedia(constraints);
        promise.then((stream) => {
          this.mediaStreamTrack = stream;
          video.src = stream;
          this.isLoading = false;
          video.play();
        });
      }
    },
    videoClick() {
      //获得Canvas对象
      let video = document.getElementById("video");
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, 300, 300);
      const dataUrl = canvas.toDataURL('image/jpeg',.3);
      this.isShow = true;
      this.isVideo = false;
      this.isVideoSfz = true;
      this.picUrl = dataUrl;
      this.mediaStreamTrack.getTracks().forEach(function (track) {
        track.stop();
      });
    },
    upImage() {
      let theFile = document.getElementById('theFile').files[0];
      let fileReader = new FileReader();
      let _this = this;
      // // 因为拍照的大小一般都会超过500kb，所以最好的方法就是讲照片压缩为500kb以下
      // if(theFile.size > 512000) {
      //   // _this.imgCompress(theFile, {quality: 0.2});
      //   this.toastText = '照片最大不得超过500kb';
      //   this.$refs.toast.show();
      //   this.isShow = true;
      //   this.isVideo = false;
      //   this.isVideoSfz = true;
      //   return;
      // }else {
      fileReader.readAsDataURL(theFile);

      let img = new Image(),
        width = 1024,
        quality = 0.2,
        canvas = document.createElement("canvas"),
        drawer = canvas.getContext("2d");
      fileReader.onload = function () {
        _this.isShow = true;
        _this.isVideoSfz = true;
        img.src = fileReader.result;
      };
      img.onload = function () {
        canvas.width = width;
        canvas.height = width * (img.height / img.width);
        drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
        var base64 = canvas.toDataURL("image/jpeg", quality);
        _this.isShow = true;
        _this.isVideo = false;
        _this.isVideoSfz = true;
        _this.picUrl = base64;
      };
    },
    clearImg() {
      this.picUrl = "";
      this.config.voucherUrl = "";
    },
    toBack() {
      window.history.go(-1);
    },
    clickImg() {
      this.showImg = true;
      // 获取当前图片地址
      this.imgSrc = this.picUrl;
    },
    viewImg(){
      this.showImg = false;
    },
  },
  components: {
    DatePicker,
    Toast,
    'big-img': BigImg,
    Loading,
    ToHome
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
                width: 26%;
              }
              .right {
                width: 74%;
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
  .font-size-ram{
    font-size: 0.29rem;
  }
  .clear-img{
    border:1px solid darkred;
    color:darkred;
    padding:2px;
  }
  .toBack{
    float: left;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
  }
  .item-must{
    color: darkred;
    margin-right: 0.1rem;
  }
  .sfz_modal{
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: fixed;
    z-index: 9;
    background-color: rgba(0, 0, 0, .6);
    padding-top: 0.5rem;
  }
  #canvasShow{
    margin-left: 50px;
  }
  .hidden{
    display: none;
  }
  .transparency{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.50);
  }
  .footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
    .reUpLoad{
      position: relative;
      box-shadow: 0 1px 0 0 #E6E6E6;
      width: 100%;
      height: 1.1rem;
      line-height: 1.1rem;
      font-size: 0.28rem;
      color: #999999;
      text-align: center;
      input{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        opacity: 0;
      }
    }
    .takePhoto{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.28rem;
      color: #999999;
      text-align: center;
      box-shadow: 0 1px 0 0 #E6E6E6;
    }
    .setTake{
      color: #028EFF;
    }
    .cancel{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.28rem;
      color: #333;
      text-align: center;
    }
  }
  .sfz_zm{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    opacity: 0;
  }
  .showImg{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    left: 0;
    top: 0;
    background-size: 100% 100%;
  }
  .clear-img{
    border:1px solid darkred;
    color:darkred;
    margin-left: 0.2rem;
    padding:2px;
  }
  .nextStep{
    height: 0.9rem;
    width: 92%;
    margin: 0 auto;
    margin-top: 1.2rem;
    line-height: 0.9rem;
    text-align: center;
    background: #028EFF;
    border-radius: 4px;
    font-family: PingFangSC-Semibold;
    font-size: 0.32rem;
    color: #FFFFFF;
    letter-spacing: 0;
  }
}
</style>


