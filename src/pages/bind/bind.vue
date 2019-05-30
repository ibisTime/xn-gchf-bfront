<template>
    <div class="full-screen-wrapper supp-wrapper">
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
    </div>
</template>
<script>
</script>
<style lang="scss" scoped>
.supp-wrapper{
    *{
        padding: 0;
        margin: 0;
    }
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
            width: 20%;
            display: inline-block;
            font-size: 0.3rem;
            color: #333;
        }
        .right{
            width:80%;
            display: inline-block;  
            font-size: 0.3rem;
            color:#999;
            .imgPic{
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
}
</style>
