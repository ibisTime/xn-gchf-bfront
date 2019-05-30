<template>
    <div class="full-screen-wrapper inOut-wrapper">
        <scroll ref="scroll" :hasMore="false"> 
            <div>
                <div class="inOutBanner">
                    <p class="inOutCenter">
                        考勤人员
                    </p>
                    <div class="right">
                        <router-link to='/search'>
                        <img src="./search@3x.png" />
                        </router-link>
                    </div>
                </div>
                <router-link to="checkWorkDetails">
                    <div class="detailItems">
                    <div class="details" v-for="item in items1">
                        <p class="detailTop">
                            <span>{{item.name}}</span>
                            <span>{{item.group}}</span>
                        </p>
                        <p class="detailUnder">
                            <span style="color:#28C71F">下班 记录时间:{{item.id}}</span>
                            <span>{{item.state}}</span>
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
 import {formatDate} from 'common/js/util'
 import Scroll from 'base/scroll/scroll';
export default{
        data(){
            return{
                towork:'上班',
                offwork:'下班',
                items1:[
                    {
                        name:'王大锤',
                        group:'钢筋班组',
                        id: 123,
                        state:'已上传'
                    }
                ]
            }
        },
        methods: {
            formatDate: function(data) {
                return formatDate(data);
            }
        },
        components:{
            scroll:Scroll
        }
    }
</script>

<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";
*{
    margin: 0;
    padding: 0;
}
.inOutBanner{
    position: relative;
    height:.8rem;
    width:100%;
    background:#028EFF;
    text-align: center;
    font-size: 0.32rem;
    color: #fff;
    .inOutCenter{
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
        height:1.6rem;
        width: 92%;
        border-bottom: 1px solid #999;
        margin: 0 auto;
        .detailTop{
            margin-top: 0.5rem;
            position: relative;
            width: 100%;
            color: #333;
            font-size:0.4rem;
            :nth-child(2){
                display: inline-block;
                position: absolute;
                right: 0.5rem;
            }
        }
        .detailUnder{
            position: relative;
            width: 100%;
            color: #999;
            font-size:0.3rem;
            margin-top:0.4rem;
            :nth-child(2){
                display: inline-block;
                position: absolute;
                right: 0.5rem;
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
</style>