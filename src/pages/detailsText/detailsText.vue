<template>
<div class="full-screen-wrapper details-wrapper">
    <div class="wrapper">
        <div class="baseBanner">
            <p class="baseCenter">
                进退场详情  
            </p>
            <router-link to="addProject">
                <div class="right">
                    修改
                </div>
            </router-link>
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
                    <div></div>
            </div>
        </div>
        <div class="empty"></div>
        <div class="footer" v-for="(item,index) in jounal" :key="index">
            <p>操作日志</p>
            <div class="jounal">
                操作人<span>{{item.name}}</span>
            </div>
            <div class="mdeical">
                操作类型<span>{{item.mdeical}}</span>
            </div>
            <div class="mdeical">
                操作时间<span>{{item.operation}}</span>
            </div>
            <div class="Remarks">
                备注
                <p>{{item.remarks}}</p>
            </div>
        </div>
        <router-link to="outDetails">
            <div class="preservation">
            返回
            </div>
        </router-link>
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
            }],
            jounal:[{
                name:'王大锤',
                mdeical:'上传',
                operation:'2019-05-30',
                remarks:'请按时完成要求，并保持项目安全，稳固,保证业主可以住的放心，开心'
                
            }]
        }
    }
}
</script>
<style lang="scss" scoped>
.details-wrapper{
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
            .right{
                position: absolute;
                right: .3rem;
                top: .25rem;;
                color: #fff;
                font-size: 0.32rem;
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
            color: #999;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(235,235,235,1);
            span{
                display: inline-block;
                font-size: 0.28rem;
                margin-left: 1rem;
                color: #333;
                }
            }
            .date{
            width:92%;
            margin: 0 auto;
            font-size: 0.28rem;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.3rem;
            color: #999;
            box-shadow:0px 1px 0px 0px rgba(235,235,235,1);
            span{
                display: inline-block;
                font-size: 0.28rem;
                color: #333;
                margin-left: .7rem;
                }
            }
            .type{
            width:92%;
            margin: 0 auto;
            font-size: 0.28rem;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.3rem;
            color: #999;
            box-shadow:0px 1px 0px 0px rgba(235,235,235,1);
            span{
                display: inline-block;
                font-size: 0.28rem;
                margin-left: 1.6rem;
                color: #333;
                }
            }

            .idHeader{
            height: 2rem;
            width: 92%;
            margin: 0 auto;
            font-size: 0.28rem;
            color:rgba(153,153,153,1);
            font-size: 0.24rem;
            span{
                display: inline-block;
                margin-top: 0.2rem;
                font-size: 0.28rem;
            }
            div{
                text-align: center;
                position: relative;
                width: 1.3rem;
                height: 1.3rem;
                margin-top: 0.2rem;
            }
            }
        }
        .empty{
            height: 0.2rem;
            width: 100%;
            background:rgba(240,240,240,1); 
        }
        .footer{
            p{
                width: 92%;
                padding:.3rem 0 0 0;
                margin: 0 auto;
                color: #333;
                font-size: 0.28rem;
                font-weight: 500;
            }
            .jounal{
                width: 92%;
                margin: 0 auto;
                height: .9rem;
                line-height: .9rem;
                color:rgba(153,153,153,1);
                font-size: 0.28rem;
                box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
                span{
                    display: inline-block;
                    color: #333;
                    margin-left: 1.5rem;
                }
            }
            .mdeical{
                width: 92%;
                margin: 0 auto;
                height: .9rem;
                line-height: .9rem;
                color:rgba(153,153,153,1);
                font-size: 0.28rem;
                box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
                span{
                    display: inline-block;
                    color: #333;
                    margin-left: 1.2rem;
                }
            }
            .Remarks{
                width: 92%;
                margin: 0 auto;
                padding:0.25rem 0 0.92rem 0;
                color:rgba(153,153,153,1);
                font-size: 0.28rem;
                box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            }
        }
        .preservation{
            width: 92%;
            height: 1rem;
            line-height: 1rem;
            background:rgba(255,255,255,1);
            margin: 0 auto;
            color: #028EFF;
            text-align: center;
            border:2px solid rgba(2,142,255,1);
            border-radius: 2px;
            margin-top:.5rem;
            font-size: 0.32rem;
        }
    }
}
</style>


