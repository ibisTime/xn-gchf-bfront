<template>
    <div class="full-screen-wrapper faceCollect-wrapper">
        <scroll ref="scroll" :hasMore="false">
            <div>
            <div class="faceCollectBanner">
                <p class="faceCollectCenter">
                    手持照片
                </p>
            </div>
            <div class="startCollect" @click="getMediaSczp">
                <div class="opss">
                    <img src="./upload.png"/>
                </div>
              <div class="sfz_zm">
                <canvas id="canvas" width="300" height="300"></canvas>
              </div>
              <div class="showImg" :class="isVideo ? 'hidden' : ''" :style="{backgroundImage: `url(${sczzp})`}"></div>
            </div>
            <div class="phore">
                照片要求:{{requirement}}
            </div>
              <div class="nextStep" @click="nextStepFn">
                下一步
              </div>
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
        <div class="nextStep" @click="videoClick">
          拍 照
        </div>
      </div>
      <toast ref="toast" :text="toastText"></toast>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import Toast from 'base/toast/toast';
export default{
    data(){
       return{
          requirement:'xxxxxxxx',
          isShow: true,
          isVideoSfz: true,
         isVideo: true,
         sczzp: '',
         mediaStreamTrack: null,
          toastText: '照片请上传完整'
       }
    },
    methods:{
        getMediaSczp() {
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
        let video = document.getElementById("video");
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 300, 300);
        const dataUrl = canvas.toDataURL();
        this.isShow = true;
        this.isVideo = false;
        this.isVideoSfz = true;
        this.sczzp = dataUrl;
        this.mediaStreamTrack.getTracks().forEach(function (track) {
          track.stop();
        });
      },
      upImage() {
        let theFile = document.getElementById('theFile').files[0];
        let fileReader = new FileReader();
        let _this = this;
        fileReader.readAsDataURL(theFile);
        fileReader.onload = function() {
          _this.isShow = true;
          _this.isVideo = false;
          _this.isVideoSfz = true;
          _this.sczzp = fileReader.result;
        };
      },
      nextStepFn() {
          if(!this.sczzp) {
            sessionStorage.setItem('sczzp', this.sczzp);
            this.$refs.toast.show();
            return;
          }else {
            this.$router.push('/baseInfo');
          }
      }
    },
    components:{
        scroll:Scroll,
        toast: Toast
    }
}
</script>

<style lang="scss" scoped>
.faceCollect-wrapper{
    .faceCollectBanner{
        position: relative;
        height:0.8rem;
        width:100%;
        background:#028EFF;
        text-align: center;
        font-size: 0.32rem;
        color: #fff;
        .faceCollectCenter{
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translateX(-50%) translateY(-50%);
        }
    }
    .startCollect{
        position: relative;
        margin: 0  auto;
        margin-top: 1rem;
        width: 92%;
        height: 7rem;
        border: 1px solid #ccc;
        border-radius: 0.02rem;
        background: #fff;
        .opss{
            width: 1.2rem;
            height: 1.2rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .phore{
        width: 92%;
        height: 0.3rem;
        margin: 0 auto;
        margin-top: 0.3rem;
        font-family: PingFangSC-Regular;
        font-size: 0.24rem;
        color: #666666;
        letter-spacing: 0;
        text-align: justify;
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
    height: 24%;
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
}
</style>
