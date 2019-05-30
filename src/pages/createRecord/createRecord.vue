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
                <div class="p-wrapper">
                    <div class="cross" @click="getMedia">
                        <img src="./upload.png"/>
                    </div>
                </div>
                <div class="empty"></div>
            </div>
            <div class="createUnder">
                <div class="other">身份证反面</div>
                <div class="o-wrapper">
                    <div class="ucross" @click="getMedia">
                        <img src="./upload.png"/>
                    </div>
                </div>
            </div>
            <router-link to="./recordCopy">
                <div class="next-step">下一步</div>
            </router-link>
        </div>
    </scroll>
</div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
export default {
    data(){
        return{

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
    components: {
        scroll: Scroll
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
            height: 3.2rem;
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
                transform: translate(-50%,-50%);
                img{
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
            height: 3.2rem;
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
}
</style>
