<template>
    <div class="full-screen-wrapper supp-wrapper">
        <scroll ref="scroll" :hasMore="false">
                <div>
                    <div class="baseBanner">
                        <p class="baseCenter">
                            我的银行卡
                        </p>
                        <router-link to="/bind">
                            <p class="bind">绑定</p>
                        </router-link>
                    </div>
                    
                    <div class="bankCard">
                        <img src="./zhaoshang.png"/>
                        <div class="left">
                            <input type="radio" id="collect" name="collect">
                            <label for="collect">默认收款</label>
                        </div>
                        <div class="right">
                            解绑
                        </div>
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
    }
}
</script>

<style lang="scss" scoped>
.supp-wrapper{
    .baseBanner{
        position: relative;
        height:.8rem;
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
        .bind{
            position: absolute;
            top: .25rem;
            right: .4rem;
            color: #fff;
        }
    }
    .bankCard{
        position: relative;
        width: 92%;
        margin: 0 auto;
        height: 2.4rem;
        margin-top: .3rem;
        img{
            width: 100%;
            height: 100;
        }
        .left{
            position: absolute;
            bottom:-0.5rem;
            left: 0.2rem;
            display: inline-block;
            z-index: 1;
            color: #fff;
            font-size: 0.24rem;
            input{
                width: 0.16rem;
                height: 0.16rem;
                border: 1px solid rgba(255,255,255,1);
                border-radius: 20px;
            }
        }
        .right{
            position: absolute;
            bottom:-0.5rem;
            right: 0.5rem;
            display: inline-block;
            z-index: 1;
            color: #fff;
            font-size: 0.24rem;
        }
    }
}
</style>

