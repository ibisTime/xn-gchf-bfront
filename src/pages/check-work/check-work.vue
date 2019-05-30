<template>
    <div class="full-screen-wrapper project-wrapper">
       <scroll ref="scroll" :hasMore="false">
            <div>
                <div class="cheBanner">
                    <p class="cheCenter">
                        考勤人员
                    </p>
                    <div class="right">
                        <router-link to='/search'>
                        <img src="./search@3x.png" />
                        </router-link>
                    </div>
                </div>
                <div class="detailItems">
                    <div class="details" v-for="item in items1">
                        <p class="detailTop">
                            <span>{{item.name}}</span>
                            <span>{{item.group}}</span>
                        </p>
                        <p class="detailUnder">
                            <span>下班 记录时间:{{item.time}}</span>
                            <span>{{item.state}}</span>
                        </p>
                        <div class="detailImg">
                            <img src="./to@2x.png"/>
                        </div>
                    </div>
                    <div class="details" v-for="item in items2">
                        <p class="detailTop">
                            <span>{{item.name}}</span>
                            <span>{{item.group}}</span>
                        </p>
                        <p class="detailUnder">
                            <span>上班 记录时间:{{item.time}}</span>
                            <span>{{item.state}}</span>
                        </p>
                        <div class="detailImg">
                            <img src="./to@2x.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import DatePicker from 'base/date-picker/date-picker';
import Scroll from 'base/scroll/scroll';
    export default{
        data(){
            return{
                entryYear: '',
                entryMonth: '',
                entryDay: '',
                exitYear: '',
                items1:[
                    {
                    name:'王大锤',
                    group:'钢筋班组',
                    time:'2019-5-27',
                    state:'已上传'
                    }
                ],
                items2:[
                    {
                    name:'张三',
                    group:'钢筋班组',
                    time:'2019-5-27',
                    state:'已上传'
                    }
                ]
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
.cheBanner{
    position: relative;
    height:.6rem;
    width:100%;
    background:#028EFF;
    text-align: center;
    font-size: 0.32rem;
    color: #fff;
    .cheCenter{
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


