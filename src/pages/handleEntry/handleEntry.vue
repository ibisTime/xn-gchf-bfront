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
                所属班组
                    <div class="imgWrapper">
                        <img src="./pushdown.png"/>
                    </div>
                </div>
                <div class="monitor">
                    是否班长
                    <div class="imgWrapper">
                        <img src="./pushdown.png"/>
                    </div>
                </div>
                <div class="work">
                    工种
                    <div class="imgWrapper">
                        <img src="./pushdown.png"/>
                    </div>
                </div>
                <div class="workerType">
                    工人类型
                    <div class="imgWrapper">
                        <img src="./pushdown.png"/>
                    </div>
                </div>
            </div>
            <div class="empty"></div>
            <div class="baseFooter">
                <div class="Insurance">
                    是否购买保险
                    <div class="imgWrapper">
                        <img src="./pushdown.png"/>
                    </div>
                </div>
            </div>
            <div class="ok">
                完成建档
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
    methods:{

    },
    components:{
        scroll:Scroll
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
        .monitor{
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
        .work{
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
         .workerType{
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
        .Insurance{
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
}
</style>


