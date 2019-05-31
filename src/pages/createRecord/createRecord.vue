<template>
<div class="full-screen-wrapper create-wrapper">
    <scroll ref="scroll" :hasMore='false'>
        <div>
            <div class="createBanner">
                <p class="createCenter">
                人员建档
                </p>
            </div>
            <div class="createTop">
                <div class="positive">身份证正面</div>
                <div class="p-wrapper" @click="getMediaZm">
                    <div class="cross" :style="{opacity: isVideoZm ? 1 : 0}">
                        <img src="./upload.png"/>
                    </div>
                  <div class="sfz_zm">
                    <canvas id="canvasZm" width="300" height="300"></canvas>
                  </div>
                  <div class="showImg" :class="isVideoZm ? 'hidden' : ''" :style="{backgroundImage: `url(${sfzzm})`}"></div>
                </div>
                <div class="empty"></div>
            </div>
            <div class="createUnder">
                <div class="other">身份证反面</div>
                <div class="o-wrapper" @click="getMediaFm">
                    <div class="ucross" :style="{opacity: isVideoFm ? 1 : 0}">
                        <img src="./upload.png"/>
                    </div>
                  <div class="sfz_zm">
                    <canvas id="canvasFm" width="300" height="300"></canvas>
                  </div>
                  <div class="showImg" :class="isVideoFm ? 'hidden' : ''" :style="{backgroundImage: `url(${sfzfm})`}"></div>
                </div>
            </div>
          <div class="next-step" @click="nextStepFn">下一步</div>
        </div>
    </scroll>
  <div class="transparency" :class="isShow ? 'hidden' : ''" @click="() => {this.isShow = true;}">
    <div class="footer">
      <div class="reUpLoad" @click.stop>
        <input type="file" @change="upImage" accept="image/png,image/jpg" id="theFile">
        上传
      </div>
      <div class="takePhoto" @click="getMedia">拍照</div>
      <div class="cancel">取消</div>
    </div>
  </div>
    <div class="sfz_modal" :class="isVideoSfz ? 'hidden' : ''">
      <video id="video" width="100%" height="82.6%" muted="muted">您的浏览器不支持拍照上传功能</video>
      <div class="next-step" @click="videoClick">
        拍 照
      </div>
    </div>
  <toast ref="toast" :text="toastText"></toast>
  <loading :isLoading="isLoading"></loading>
</div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import Toast from 'base/toast/toast';
import Loading from 'base/loading/loading';
import {orcIdNo, authenticationDetail} from 'api/deal';
export default {
    data(){
        return{
          isVideoZm: true,
          isVideoFm: true,
          isVideoSfz: true,
          isShow: true,
          pzType: '',
          mediaStreamTrack: null,
          sfzzm: '',
          sfzfm: '',
          toastText: '照片请上传完整',
          isLoading: false,
          code: ''
        }
    },
  created() {
    const {code} = this.$route.query;
    if(code) {
      this.isLoading = true;
      this.code = code;
      authenticationDetail(code).then(data => {
        this.sfzzm = data.positiveIdCardImageUrl;
        this.sfzfm = data.negativeIdCardImageUrl;
        this.isVideoZm = false;
        this.isVideoFm = false;
        this.isLoading = false;
      })
    }
  },
    methods:{
      getMediaZm() {
        this.pzType = '1';
        this.isShow = false;
      },
      getMediaFm() {
        this.pzType = '2';
        this.isShow = false;
      },
      getMedia() {
        this.isVideoSfz = false;
          let constraints = {
              video: {width: 500, height: 500},
              audio: true
          };
          //获得video摄像头区域
          let video = document.getElementById("video");
          let promise = navigator.mediaDevices.getUserMedia(constraints);
          promise.then((MediaStream) => {
            this.mediaStreamTrack = MediaStream;
            video.srcObject = MediaStream;
            video.play();
          });
      },
      videoClick() {
        //获得Canvas对象
        let canvasName = this.pzType === '1' ? 'canvasZm' : 'canvasFm';
        let video = document.getElementById("video");
        let canvas = document.getElementById(canvasName);
        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 300, 300);
        const dataUrl = canvas.toDataURL();
        this.isShow = true;
        this.isVideoSfz = true;
        if(this.pzType === '1') {
          this.isVideoZm = false;
          this.sfzzm = dataUrl;
        }else {
          this.isVideoFm = false;
          this.sfzfm = dataUrl;
        }
        this.mediaStreamTrack.getTracks().forEach(function (track) {
          track.stop();
        });
      },
      upImage() {
        let theFile = document.getElementById('theFile').files[0];
        let fileReader = new FileReader();
        let _this = this;
        fileReader.readAsDataURL(theFile);
        console.log(theFile.size);
        if(theFile.size > 512000) {
          this.toastText = '上传图片不得大于500KB';
          this.$refs.toast.show();
          _this.isShow = true;
          _this.isVideoSfz = true;
          return false;
        }
        fileReader.onload = function() {
          _this.isShow = true;
          _this.isVideoSfz = true;
          if(_this.pzType === '1') {
            _this.isVideoZm = false;
            _this.sfzzm = fileReader.result;
          }else {
            _this.isVideoFm = false;
            _this.sfzfm = fileReader.result;
          }
        };
      },
      nextStepFn() {
        if(!this.sfzfm || !this.sfzzm) {
          this.$refs.toast.show();
          return false;
        }else {
          this.isLoading = true;
          orcIdNo({
            positiveImage: this.sfzzm,
            negativeImage: this.sfzfm
          }).then((data) => {
            this.toastText = '操作成功';
            this.$refs.toast.show();
            setTimeout(() => {
              if(this.code) {
                this.$router.push(`/photo?code=${this.code}`);
              }else {
                this.$router.push(`/photo?code=${data}`);
              }
            }, 1000);
          }, () => {
            this.toastText = '操作失败';
            this.$refs.toast.show();
          });
        }
      }
    },
    components: {
      scroll: Scroll,
      toast: Toast,
      loading: Loading
    }
}
</script>

<style lang="scss" scoped>
.create-wrapper{
    .createBanner{
        position: relative;
        height:1.5rem;
        width:100%;
        background:#028EFF;
        text-align: center;
        font-size: 0.36rem;
        color: #fff;
        .createCenter{
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translateX(-50%) translateY(-50%);
        }
    }
    .createTop{
        .positive{
            width: 92%;
            margin: 0 auto;
            margin-top: .3rem;
            font-family: PingFangSC-Regular;
            font-size: 0.28rem;
            color: #999999;
            letter-spacing: 0;
            text-align: justify;
        }
        .p-wrapper{
            position: relative;
            width: 92%;
            height: 4rem;
            margin: 0 auto;
            margin-top: .3rem;
            margin-bottom: .3rem;
            background: #FFFFFF;
            border: 1px solid #CCCCCC;
            border-radius: 2px;
            .cross{
                width: 1.3rem;
                height: 1.3rem;
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: 5;
                transform: translate(-50%,-50%);
                img {
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
    .createUnder{
        .other{
            width: 92%;
            margin: 0 auto;
            margin-top: .3rem;
            font-family: PingFangSC-Regular;
            font-size: 0.28rem;
            color: #999999;
            letter-spacing: 0;
            text-align: justify;
        }
        .o-wrapper{
            position: relative;
            width: 92%;
            height: 4rem;
            margin: 0 auto;
            margin-top: .3rem;
            margin-bottom: 1rem;
            background: #FFFFFF;
            border: 1px solid #CCCCCC;
            border-radius: 2px;
            .ucross{
                width: 1.3rem;
                height: 1.3rem;
                position: absolute;
                top: 50%;
                left: 50%;
              z-index: 5;
                transform: translate(-50%,-50%);
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .next-step{
        margin: 0 auto;
        width: 92%;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        font-family: PingFangSC-Semibold;
        font-size: 0.32rem;
        color: #FFFFFF;
        letter-spacing: 0;
        margin: 0 auto;
        background: #028EFF;
        border-radius: 4px;
    }
  .sfz_modal{
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: fixed;
    z-index: 9;
    background-color: rgba(0, 0, 0, .8);
    padding-top: 0.5rem;
  }
  #canvasShow{
    margin-left: 0.5rem;
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
    background: rgba(0,0,0,0.8);
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
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
