<template>
    <div class="full-screen-wrapper supp-wrapper">
            <div>
                <div class="baseBanner">
                    <p class="baseCenter">
                        考勤补录
                    </p>
                </div>
                <div class="dir">
                    <label>考勤方向</label>
                    <select v-for="(item,index) in items" :key="index">
                        <option>{{item.num}}</option>
                    </select>
                    <div>
                        <img src="./down.png"/>
                    </div>
                </div>
                <div class="empty">
                </div>
                 <div class="dir">
                    <label>考勤时间</label>
                    <select v-for="(item,index) in items" :key="index">
                        <option>{{item.times}}</option>
                    </select>
                    <div>
                        <img src="./down.png"/>
                    </div>
                </div>
            </div>
            <div class="isOk">
                确认
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            items:[
                {
                num:'钢筋组韩大强哇哈哈哈哈',
                times:'2019-08-09 19:28:59'
            }
            ]
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
    }
    .dir{
        height: 0.9rem;
        line-height: 0.9rem;
        width: 92%;
        margin: 0 auto;
        font-size: 0.28rem;
        color: #999;
        box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
        select{
            width: 56%;
            margin-left: 1.6rem;
        }
        div{
            position: absolute;
            display: inline-block;
            right: .3rem;
            width: 0.18rem;
            height: 0.14rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .empty{
        height: 0.2rem;
        width: 100%;
        background:rgba(240,240,240,1); 
    }
    .isOk{
        margin:0 auto;
        bottom: .6rem;
        width: 92%;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        color: #fff;
        background: #028EFF;
        margin-top: 8rem;
        border-radius: 2px;
    }
}
</style>

