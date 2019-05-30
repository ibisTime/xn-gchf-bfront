<template>
    <div class="full-screen-wrapper search-wrapper">
        <div class="seaBanner">
            <p class="seaCenter">
                搜索
            </p>
        </div>
        <div class="seaSelect">
            所在班组
           <img src="./selectBottom.png"/>
        </div>
        <div class="seaSelect">
           项目人员
           <img src="./selectBottom.png"/>
        </div>
        <div class="seaSelect">
            状态
           <img src="./selectBottom.png"/>
        </div>
        <div class="footer">
            搜索
        </div>
    </div>
</template>
<script>

</script>

<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";
*{
    padding: 0;
    margin: 0;
}
.seaBanner{
    position: relative;
    height:1.28rem;
    width:100%;
    background:#028EFF;
    text-align: center;
    font-size: 0.36rem;
    color: #fff;
    .seaCenter{
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translateX(-50%) translateY(-50%);
    }
}
.seaSelect{
        position: relative;
        width: 100%;
        height: 1rem;
        font-size: 0.28rem;
        color: #999;
        padding:0.375rem;
        box-shadow: 0 1px 0 0 #E6E6E6;
        line-height: .55rem;
        img{
            position: absolute;
            right: 0.2rem;
            display: inline-block;
            width: 0.2rem;
            height: 0.175rem;
            top:.55rem;
        }
}
.footer{
    width:92%;
    height: .9rem;
    line-height: .9rem;
    margin: 0 auto;
    margin-top: 2rem;
    text-align:center;
    background: #028EFF;
    color: #fff;
    font-size: 0.32rem;
}
// .selectDis{
//     width: 100%;
//     color: #999;
//     font-size:0.3rem;
//     ul{
//         width:90%;
//         margin:0 auto;
//             li{
//                 width: 100%;
//                 list-style: none;
//                 border-bottom: 1px solid #999;
//         }
//     }
// }

</style>