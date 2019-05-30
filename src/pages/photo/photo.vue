<template>
    <div class="full-screen-wrapper faceCollect-wrapper">
        <scroll ref="scroll" :hasMore="false">
            <div>
            <div class="faceCollectBanner">
                <p class="faceCollectCenter">
                    手持照片
                </p>
            </div>
            <div class="startCollect" @click="getMedia">
                <div class="opss">
                    <img src="./upload.png"/>
                </div>   
            </div>
            <div class="phore">
                照片要求:{{requirement}}
            </div>
            <router-link to="/baseInfo">
                <div class="nextStep">
                    下一步
                </div>
            </router-link>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
export default{
    data(){
       return{
            requirement:'xxxxxxxx'
       }
    },
    methods:{
        getMedia:function(){
            let constraints = {
                video: {width: 500, height: 500},
                audio: true
            };
            //获得video摄像头区域
            let video = document.getElementById("video");
            let promise = navigator.mediaDevices.getUserMedia(constraints);
            promise.then(function (MediaStream) {
                video.srcObject = MediaStream;
                video.play();
            });
            function takePhoto() {
            //获得Canvas对象
            let video = document.getElementById("video");
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, 500, 500);
            }
        }
    },
    components:{
        scroll:Scroll
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
}
</style>