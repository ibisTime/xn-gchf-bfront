<template>
<div class="full-screen-wrapper add-wrapper">
    <div class="wrapper">
        <div class="baseBanner">
            <p class="baseCenter">
                新增修改进退场  
            </p>
        </div>
        <div class="banner" v-for="(item,index) in items" :key="index">
            <div class="memNum">
                员工编号<span>{{item.Num}}</span>
            </div>
            <div class="date">
                进退场日期<span>{{item.date}}</span>
            </div>
            <div class="type">
                类型<span>{{item.type}}</span>
            </div>
            <div class="idHeader">
                    <span>身份证头像（单）</span>
                    <div>
                        <input type="file">
                        <img src="./upload.png"/>
                        <span>上传</span>
                    </div>
            </div>
        </div>
        <div class="preservation">
            保存
        </div>
    </div>
</div>    
</template>
<script>
export default {
    data(){
        return{
            items:[{
                Num:'323868',
                date:'2019-5-27',
                type:'身份证',
                imgUrl:''
            }]
        }
    }
}
</script>
<style lang="scss" scoped>
.add-wrapper{
    .wrapper{
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
        .banner{
            width: 100%;
            .memNum{
            width:92%;
            margin: 0 auto;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.3rem;
            box-shadow:0px 1px 0px 0px rgba(235,235,235,1);
            span{
                display: inline-block;
                margin-left: 1rem;
                }
            }
            .date{
            width:92%;
            margin: 0 auto;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.3rem;
            box-shadow:0px 1px 0px 0px rgba(235,235,235,1);
            span{
                display: inline-block;
                margin-left: .7rem;
                }
            }
            .type{
            width:92%;
            margin: 0 auto;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.3rem;
            box-shadow:0px 1px 0px 0px rgba(235,235,235,1);
            span{
                display: inline-block;
                margin-left: 1.6rem;
                }
            }

            .idHeader{
            height: 2rem;
            width: 92%;
            margin: 0 auto;
            color:rgba(153,153,153,1);
            font-size: 0.24rem;
            span{
                display: inline-block;
                margin-top: 0.2rem;
            }
            div{
                text-align: center;
                position: relative;
                border:1px solid #ccc;
                width: 1.3rem;
                height: 1.3rem;
                margin-top: 0.2rem;
                input{
                    opacity: 0;

                }
                img{
                    width: .5rem;
                    height:.5rem;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
                span{
                    display: inline-block;
                    margin-top:.6rem; 
                    font-size: .2rem;   
                }
            }
            }
        }
        .preservation{
            width: 92%;
            height: 1rem;
            line-height: 1rem;
            background: #028EFF;
            margin: 0 auto;
            color: #fff;
            text-align: center;
            border-radius: 2px;
            margin-top:2rem;
        }
    }
}
</style>


