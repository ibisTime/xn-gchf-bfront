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
                手机号码<input type="telphone"/>
            </div>
            <div class="outlook">
                政治面貌
                <div class="imgWrapper">
                    <img src="./pushdown.png"/>
                </div>
            </div>
            <div class="education">
                文化程度
                <div class="imgWrapper">
                    <img src="./pushdown.png"/>
                </div>
            </div>
            <div class="Labour">
                是否加入公会
                <div class="imgWrapper">
                    <img src="./pushdown.png"/>
                </div>
            </div>
        </div>
        <div class="empty"></div>
        <div class="baseFooter">
             <div class="habits">
                特长<input type="text"/>
            </div>
            <div class="medical">
                是否重大病史
                <div class="imgWrapper">
                    <img src="./pushdown.png"/>
                </div>
            </div>
            <div class="isMarry">
                婚姻状况
                <div class="imgWrapper">
                    <img src="./pushdown.png"/>
                </div>
            </div>
            <div class="familyM">
                紧急联系人<input type="text" placeholder="请输入联系人姓名"/>
            </div>
            <div class="familyTel">
                紧急联系人号码<input type="telphone" placeholder="请输入联系人号码"/>
            </div>
        </div>
        <router-link to="/handleEntry">
            <div class="next-step">
                下一步
            </div>
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

    },
    components:{
        scroll:Scroll
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


