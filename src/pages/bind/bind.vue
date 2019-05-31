<template>
    <div class="full-screen-wrapper supp-wrapper">
        <div class="wrapper">
            <div class="baseBanner">
                <p class="baseCenter">
                    绑定银行卡
                </p>
            </div>
            <div class="bank">
                <div class="left">银行</div>
                <div class="right">
                    <select>
                        <option value="银行名称">银行名称</option>
                    </select>
                    <div class="imgPic">
                        <img src="./down.png"/>
                    </div>
                </div>
            </div>
            <div class="bank">
                <div class="left">开户支行</div>
                <div class="right">
                    <select>
                        <option value="银行名称">请输入开户支行</option>
                        <option value="中国工商银行">中国工商银行</option>
                    </select>
                    <div class="imgPic">
                        <img src="./down.png"/>
                    </div>
                </div>
            </div>
            <div class="bank">
                <div class="left">银行卡号</div>
                <div class="right">
                    <input type="number" placeholder="请输入银行卡号"/>
                </div>
            </div>
            <div class="bank">
                <div class="left">银行联号</div>
                <div class="right">
                    <input type="number" placeholder="请输入银行联号"/>
                </div>
            </div>
            <div class="footer">
                确定
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
        }
    }
}
</script>
<style lang="scss" scoped>
.supp-wrapper{
    *{
        padding: 0;
        margin: 0;
    }
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
    .bank{
        height: 1.1rem;
        width: 92%;
        margin: 0 auto;
        line-height: 1.1rem;
        box-shadow:0px 1px 0px 0px rgba(235,235,235,1);
        .left{
            width: 24%;
            display: inline-block;
            font-size: 0.3rem;
            color: #333;
        }
        .right{
            position: relative;
            width:75%;
            display: inline-block;  
            font-size: 0.3rem;
            color:#999;
            select{
                z-index: 1;
                width: 98%;
            }
            .imgPic{
                position: absolute;
                right: 0;
                display: inline-block;
                width: .18rem;
                height: .15rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .footer{
        width: 92%;
        margin: 0 auto;
        background:#028EFF;
        padding: 0.24rem 3.15rem 0.24rem 3.15rem;
        color: #fff;
        font-size: .3rem;
        margin-top: 1.5rem;
    }
   }
}
</style>
