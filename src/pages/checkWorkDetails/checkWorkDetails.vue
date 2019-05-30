<template>
    <div class="full-screen-wrapper into-wrapper">
        <scroll ref="scroll" :hasMore="false">
            <div>
                <div class="baseBanner">
                    <p class="baseCenter">
                        考勤详情
                    </p>
                </div>
                <router-link to="/memberDetails">
                    <div class="detailItems">
                        <div class="details" v-for="(item, index) in items" :key="index">
                            <p class="detailTop">
                                <span>{{item.workName}}</span>
                                <span>{{item.teamName}}</span>
                                <span>{{item.status}}</span>
                            </p>
                            <p class="detailUnder">
                                <span>身份证号:{{item.iden}}</span>
                            </p>
                            <router-link to="/memberDetails">
                                <div class="detailImg">
                                    <img src="./to@2x.png"/>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </router-link>
                <router-link to="/detailsText">
                    <div class="pushAdd" v-for="(item,index) in isEntry" :key="index">
                        <div class="entry">
                            {{item.entryTo}}<span>{{item.times}}</span>
                        </div>
                        <div class="entryImg">
                            <img src="./to@2x.png"/>
                        </div>
                    </div>
                </router-link>
            </div>
        </scroll>
        <router-link to="/supp">
            <div class="footer">
                        <div class="footer-wrapper">
                            <img src="./addnew@2x.png"/>
                        </div>
            </div>
        </router-link>
    </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
export default {
    data(){
        return{
            items:[{
                    workName:'张三',
                    teamName:'钢筋组',
                    status:'已入场',
                    iden:'324444187902202112',
                    }],
            isEntry:[{
                    entryTo:'下班',
                    times:'2019-2-12'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
.into-wrapper{
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
                color: #333;
                letter-spacing: 0;
                text-align: justify;
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
    .pushAdd{
        position: relative;
        width: 92%;
        margin: 0 auto;
        height: 1rem;
        line-height: 1rem;
        box-shadow: 0 1px 0 0 #E6E6E6;
        font-size:.32rem;
        span{
            position: absolute;
            display: inline-block;
            margin-left: 2rem;
        }
        .entryImg{
            width: 0.2rem;
            height: 0.3rem;
            display: inline-block;
            position: absolute;
            right: 0.1rem;
            top: 0.1rem;
            img{
            width: 100%;
            height: 100%;
            }
        }
    }
    .footer{
        box-shadow: 0 -1px 0 0 #E6E6E6;
        position: fixed;
        background: #fff;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1.9rem;
        .footer-wrapper{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 92%;
            height: 1.5rem;
            background: #F5F5F5;
            border-radius: 4px;
            img{
                width:100%;
                height: 100%;
            }
        }
    }
}
</style>


