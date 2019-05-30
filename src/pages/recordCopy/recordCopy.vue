<template>
    <div class="full-screen-wrapper create-wrapper">  
        <scroll ref="scroll" :hasMore="false"> 
            <div>  
                <div class="createBanner">
                        <p class="createCenter">
                        人员建档
                        </p>
                </div>
                <div class="createTop">
                    <div class="positive">身份证正面</div>
                    <div class="p-wrapper">
                        <div class="cross">
                            <img src="./upload.png"/>
                        </div>
                    </div>
                    <div class="empty"></div>
                </div>
                <div class="createUnder">
                    <div class="other">身份证反面</div>
                    <div class="o-wrapper">
                        <div class="ucross">
                            <img src="./upload.png"/>
                        </div>
                    </div>
                </div>
                <div class="next-step">下一步</div>
                <div class="transparency"></div>
                <div class="footer">
                    <div class="reUpLoad">上传</div>
                    <router-link to="/photo">
                        <div class="takePhoto">拍照</div>
                    </router-link>
                    <div class="cancel">取消</div>
                </div>
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
    components:{
        scroll:Scroll
    }
}
</script>

<style lang="scss" scoped>
.create-wrapper{
    position: relative;
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
    .transparency{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        height: 85%;
        width: 100%;
        background: rgba(0,0,0,0.50);
    }
    .footer{
        width: 100%;
        height: 15%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #fff;
        .reUpLoad{
            box-shadow: 0 1px 0 0 #E6E6E6;
            width: 100%;
            height: 1.1rem;
            line-height: 1.1rem;
            font-size: 0.28rem;
            color: #999999;
            text-align: center;
        }
        .takePhoto{
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.28rem;
            color: #028EFF ;
            text-align: center;
            box-shadow: 0 1px 0 0 #E6E6E6;
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
}
</style>
