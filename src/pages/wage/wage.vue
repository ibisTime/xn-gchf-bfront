<template>
    <div class="full-screen-wrapper project-member-wrapper">
        <scroll ref="scroll" :hasMore="false">
            <div>
                <div class="proBanner">
                    <p class="proCenter">
                        工资状况
                    </p>
                    <div class="right">
                        <router-link to='/search'>
                        <img src="./search@3x.png" />
                        </router-link>
                    </div>
                </div>
                    <router-link to="/into-details">
                        <div class="detailItems">
                            <div class="details" v-for="(item, index) in items" :key="index">
                                <p class="detailTop">
                                    <span>{{item.workName}}</span>
                                    <span>{{item.teamName}}</span>
                                    <span>{{item.infoNum}}</span>
                                </p>
                                <p class="detailUnder">
                                    <span>{{item.months}}</span>
                                    <span>应发:{{item.mustPay}}</span>
                                    <span>实发:{{item.actualPay}}</span>
                                </p>
                                
                                    <div class="detailImg">
                                        <img src="./to@2x.png"/>
                                    </div>
                            </div>
                        </div>
                    </router-link>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import {deal} from 'api/deal';
import{getDictList} from 'api/general'
    export default{
        data(){
            return{
                items:[{
                    workName:'张三',
                    teamName:'钢筋组',
                    infoNum:'共13条',
                    months:'1月',
                    mustPay:'5000',
                    actualPay:'5000'
                    }],
            }
        },
        created(){
        
        },components:{
            scroll:Scroll
        }
    }
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";
.project-member-wrapper{
    *{
    margin: 0;
    padding: 0;
    }
    .proBanner{
        position: relative;
        height:0.8rem;
        width:100%;
        background:#028EFF;
        text-align: center;
        font-size: 0.32rem;
        color: #fff;
        box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
        .proCenter{
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translateX(-50%) translateY(-50%);
        }
        .right{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: .3rem;
            img{
                width: .4rem;
                height: .4rem;
            }
        }
    }
    .detailItems{
        position: relative;
        width:100%;
        .details{
            position: relative;
            height:1.5rem;
            width: 92%;
            border-bottom: 1px solid #E6E6E6;
            margin: 0 auto;
            .detailTop{
                margin-top: 0.5rem;
                width: 100%;
                color: #333;
                font-size:0.32rem;
                :nth-child(2){
                    display: inline-block;
                    position: absolute;
                    right: 2.5rem;
                }
                :nth-child(3){
                    display: inline-block;
                    position: absolute;
                    right: .5rem;
                }
            }
            .detailUnder{
                width: 100%;
                font-size:0.24rem;
                margin-top:0.4rem;
                font-family: PingFangSC-Regular;
                color: #999999;
                letter-spacing: 0;
                text-align: justify;
                :nth-child(2){
                    display: inline-block;
                    position: absolute;
                    left: 1.5rem;
                }
                :nth-child(3){
                    display: inline-block;
                    position: absolute;
                    left: 3.5rem;
                }
            }
            .detailImg{
                width: 0.2rem;
                height: 0.3rem;
                display: inline-block;
                position: absolute;
                right: 0.1rem;
                top: 20%;
                img{
                width: 100%;
                height: 100%;
                }
            }
        }
    }
}
</style>


