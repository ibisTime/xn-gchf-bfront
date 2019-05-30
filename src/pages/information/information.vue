<template>
   <div class="full-screen-wrapper information-wrapper">
       <scroll ref="scroll" :hasMore="false">
            <div class="header" v-for="(item,index) in items" :key="index">
                <div class="infoBanner">
                    <p class="infoCenter">
                        基本信息
                    </p>
                </div>
                <div class="pepName">               
                        <span>姓名</span>
                        <div>{{item.pepName}}</div>    
                </div>
                <div class="idHeader">
                    <span>身份证头像（单）</span>
                    <div>{{item.imgUrl}}</div>
                </div>
                <div class="sex">               
                        <span>性别</span>
                        <div>{{item.sex}}</div>    
                </div>
                <div class="nation">               
                        <span>民族</span>
                        <div>{{item.nation}}</div>    
                </div>
                <div class="date">               
                        <span>出生日期</span>
                        <div>{{item.date}}</div>    
                </div>
                <div class="iden">               
                        <span>身份证号码</span>
                        <div>{{item.id}}</div>    
                </div>
                <div class="address">               
                        <span>地址</span>
                        <div>{{item.address}}</div>    
                </div>
                <div class="startDate">               
                        <span>有效开始日期</span>
                        <div>{{item.startDate}}</div>    
                </div>
                <div class="endDate">               
                        <span>有效截止日期</span>
                        <div>{{item.endDate}}</div>    
                </div>
                <div class="office">               
                        <span>签发机关</span>
                        <div>{{item.office}}</div>    
                </div>
                <div class="iFace">               
                        <span>政治面貌</span>
                        <div>{{item.iFace}}</div>    
                </div>
                <div class="culture">               
                        <span>文化程度</span>
                        <div>{{item.culture}}</div>    
                </div>
            </div>
            <div class="emptyOne"></div>
            <div class="middle" v-for="(item,index) in imgItem" :key="index">
                <div class="postive">
                    <span>身份证正面照（单）</span>
                    <div>{{item.posUrl}}</div>
                </div>
                <div class="other">
                    <span>身份证反面照（单）</span>
                    <div>{{item.othUrl}}</div>
                </div>
                <div class="hand">
                    <span>手持身份证照片（单）</span>
                    <div>{{item.handUrl}}</div>
                </div>
                <div class="attendance">
                    <span>考勤人脸照（单）</span>
                    <div>{{item.attendance}}</div>
                </div>
            </div>
            <div class="emptyTwo"></div>
            <div class="footer" v-for="(item,index) in otherItem" :key="index">
                <div class="tel">
                    <span>手机号码</span>
                    <div>{{item.tel}}</div>    
                </div>
                <div class="sosName">
                    <span>紧急联系人姓名</span>
                    <div>{{item.sosName}}</div>    
                </div>
                <div class="sosTel">
                    <span>紧急联系电话</span>
                    <div>{{item.sosTel}}</div>    
                </div>
                <div class="isEntry">
                    <span>是否加入公会</span>
                    <div>{{item.isEntry}}</div>    
                </div>
                <div class="entryTime">
                    <span>加入公会时间</span>
                    <div>{{item.entryTime}}</div>    
                </div>
                <div class="habits">
                    <span>特长</span>
                    <div>{{item.habits}}</div>    
                </div>
                <div class="flu">
                    <span>是否有重大病史</span>
                    <div>{{item.flu}}</div>    
                </div>
                <div class="isMarry">
                    <span>婚姻状况</span>
                    <div>{{item.isMarry}}</div>    
                </div>
                <div class="backTo">返回</div>
            </div>
       </scroll>
   </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import {info} from 'api/deal'
export default {
    data(){
        return{
            items:[{
                pepName:'王大锤',
                imgUrl:'',
                sex:'1',
                nation:'汉族',
                date:'2019-5-27',
                id:'3433331876222401',
                address:'杭州市余杭区',
                startDate:'2222-22-22',
                endDate:'3333-33-33',
                office:'杭州公安局',
                iFace:'党员',
                culture:'博士',
            }],
            imgItem:[{
                posUrl:'',
                othUrl:'',
                handUrl:'',
                attendance:'',
            }],
            otherItem:[{
                tel:'18221223121',
                sosName:'王大锤',
                sosTel:'18999111211',
                isEntry:'是',
                entryTime:'2019-02-12',
                habits:'踢球、看书',
                flu:'否',
                isMarry:'是'
            }]
        }
    },
    created(){
    },
    components:{
        scroll:Scroll
    }
}
</script>

<style lang="scss" scoped>
.information-wrapper{
    .header{
        width: 100%;
        background: #fff;
            .infoBanner{
            position: relative;
            height:0.8rem;
            width:100%;
            background:#028EFF;
            text-align: center;
            font-size: 0.32rem;
            color: #fff;
            .infoCenter{
                position: absolute;
                top: 50%;
                left: 50%;
                transform:translateX(-50%) translateY(-50%);
            }
        }
        .pepName{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 2rem;
            }
        }
        .idHeader{
            height: 2rem;
            width: 92%;
            margin: 0 auto;
            color:rgba(153,153,153,1);
            font-size: 0.24rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            span{
                display: inline-block;
                margin-top: 0.2rem;
            }
            div{
                width: 1rem;
                height: 1rem;
                margin-top: 0.2rem;
            }
        }
        .sex{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 2rem;
            }
        }
        .nation{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 2rem;
            }
        }
        .date{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 1.4rem;
            }
        }
        .iden{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 1.1rem;
            } 
        }
        .address{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            span{
                color:rgba(153,153,153,1);
                display: inline-block;
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 2rem;
            } 
        }
        .startDate{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            span{
                color:rgba(153,153,153,1);
                display: inline-block;
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: .9rem;
            } 
        }
        .endDate{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            span{
                color:rgba(153,153,153,1);
                display: inline-block;
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: .9rem;
            } 
        }
        .office{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            span{
                color:rgba(153,153,153,1);
                display: inline-block;
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 1.5rem;
            } 
        }
        .iFace{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            span{
                color:rgba(153,153,153,1);
                display: inline-block;
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 1.5rem;
            } 
        }
        .culture{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            span{
                color:rgba(153,153,153,1);
                display: inline-block;
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 1.5rem;
            } 
        }
    }
    .emptyOne{
        width: 100%;
        height: 0.2rem;
        background:rgba(240,240,240,1);
    }
    .middle{
        .postive{
             height: 2rem;
            width: 100%;
            margin: 0 auto;
            color:rgba(153,153,153,1);
            font-size: 0.24rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            span{
                display: inline-block;
                margin-top: 0.2rem;
            }
            div{
                width: 1rem;
                height: 1rem;
                margin-top: 0.2rem;
            }
        }
        .other{
             height: 2rem;
            width: 100%;
            margin: 0 auto;
            color:rgba(153,153,153,1);
            font-size: 0.24rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            span{
                display: inline-block;
                margin-top: 0.2rem;
            }
            div{
                width: 1rem;
                height: 1rem;
                margin-top: 0.2rem;
            }
        }
        .hand{
            height: 2rem;
            width: 100%;
            margin: 0 auto;
            color:rgba(153,153,153,1);
            font-size: 0.24rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            span{
                display: inline-block;
                margin-top: 0.2rem;
            }
            div{
                width: 1rem;
                height: 1rem;
                margin-top: 0.2rem;
            }
        }
        .attendance{
            height: 2rem;
            width: 100%;
            margin: 0 auto;
            color:rgba(153,153,153,1);
            font-size: 0.24rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
            span{
                display: inline-block;
                margin-top: 0.2rem;
            }
            div{
                width: 1rem;
                height: 1rem;
                margin-top: 0.2rem;
            }
        }
    }
    .emptyTwo{
        width: 100%;
        height: 0.2rem;
        background:rgba(240,240,240,1);
    }
    .footer{
        width: 100%;
        .tel{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 1.5rem;
            }
        }
        .sosName{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: .7rem;
            }
        }
        .sosTel{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 1rem;
            }
        }
        .isEntry{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 1rem;
            }
        }
        .entryTime{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 1rem;
            }
        }
        .habits{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 2.1rem;
            }
        }
        .flu{
           padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: .7rem;
            } 
        }
        .isMarry{
            padding: 0.25rem 0 0.25rem 0;
            width: 92%;
            margin:0 auto;
            font-size: 0.28rem;
            box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
             span{
                color:rgba(153,153,153,1);
                
            }
            div{
                display: inline-block;
                color: #333;
                margin-left: 1.5rem;
            } 
        }
        .backTo{
            border:2px solid rgba(2,142,255,1);
            width: 92%;
            height: .9rem;
            line-height:.9rem; 
            margin: 0 auto;
            margin-top: .4rem;
            color: #028EFF;
            font-size: 0.32rem;
            text-align: center;
        }
    }
}

</style>


