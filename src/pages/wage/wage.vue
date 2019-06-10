<template>
    <div class="full-screen-wrapper project-member-wrapper">
        <scroll ref="scroll" :hasMore="hasMore" :data="items" @pullingUp="PagewageInfo">
            <div>
                <div class="proBanner">
                    <p class="proCenter">
                        工资状况
                    </p>
                    <div class="right">
                        <router-link to='/search'>
                        <img src="./search@3x.png" />
                        </router-link>
                    </div>
                </div>
                    <!--<router-link to="/into-details">-->
                        <!--<div class="detailItems">-->
                            <!--<div class="details" v-for="(item, index) in items" :key="index">-->
                                <!--<p class="detailTop">-->
                                    <!--<span>{{item.workName}}</span>-->
                                    <!--<span>{{item.teamName}}</span>-->
                                    <!--<span>{{item.infoNum}}</span>-->
                                <!--</p>-->
                                <!--<p class="detailUnder">-->
                                    <!--<span>{{item.months}}</span>-->
                                    <!--<span>应发:{{item.mustPay}}</span>-->
                                    <!--<span>实发:{{item.actualPay}}</span>-->
                                <!--</p>-->
                              <!--<noResult title="暂无工资信息" v-if="items.length === 0 && !hasMore" style="margin-top: 0.8rem"/>-->
                                    <!--<div class="detailImg">-->
                                        <!--<img src="./to@2x.png"/>-->
                                    <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</router-link>-->
              <div class="detailItems">
                <div class="details" v-for="(item, index) in items" :key="index" @click="checkWageDetails(item)">
                  <p class="detailTop">
                    <span>{{item.workerName}}</span>
                    <span>{{item.teamName}}</span>
                  </p>
                  <p class="detailUnder">
                  <span>日期:{{userFormatDate(item.lastPayMonth)}}</span>
                  <span>应发:{{item.lastPayTotalAmount}}</span>
                  <span>实发:{{item.lastPayActualAmount}}</span>
                  </p>
                  <div class="detailImg">
                    <img src="./to@2x.png"/>
                  </div>
                </div>
                <no-result title="抱歉，暂无工资状况记录" v-if="items.length === 0 && !hasMore" style="margin-top: 0.8rem"/>
              </div>
            </div>
        </scroll>
        <loading :title="'正在努力加载中...'" :isLoading="isLoading"></loading>
    </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import NoResult from 'base/no-result/no-result';
  import Loading from 'base/loading/loading';
import{PagewageInfo, deal} from 'api/deal';
import { formatDate } from 'common/js/util';
    export default{
        data(){
            return{
                items:[],
                isLoading: true,
                hasMore: true,
                config: {
                  start: 1,
                  limit: 10
                }
            }
        },
        created(){
          this.PagewageInfo();
        },
        methods: {
          PagewageInfo() {
            let teamUserConfig = sessionStorage.getItem('teamUserConfig') || '';
            if(teamUserConfig) {
              teamUserConfig = JSON.parse(teamUserConfig);
              this.config = {
                ...this.config,
                ...teamUserConfig
              };
              sessionStorage.removeItem('teamUserConfig');
            }
            return deal(this.config).then(data => {
              this.hasMore = (data.pageNO < data.totalPage);
              this.config.start ++;
              this.items = [...this.items, ...data.list];
              this.isLoading = false;
            });
          },
          userFormatDate(time) {
            return formatDate(time, "yyyy-MM-dd");
          },
          checkWageDetails(item) {
            sessionStorage.setItem('wageDetail', JSON.stringify(item));
            this.$router.push(`/wageDetail`);
          }
        },
        components:{
          scroll:Scroll,
          loading: Loading,
          noResult: NoResult
        }
    }
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";
.project-member-wrapper{
    *{
    margin: 0;
    padding: 0;
    }
    .proBanner{
        position: relative;
        height:0.8rem;
        width:100%;
        background:#028EFF;
        text-align: center;
        font-size: 0.32rem;
        color: #fff;
        box-shadow:0px 1px 0px 0px rgba(230,230,230,1);
        .proCenter{
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
                font-family: PingFangSC-Regular;
                color: #999999;
                letter-spacing: 0;
                text-align: justify;
            }
            .detailUnder span{
              margin-right: .5rem;
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
}
</style>


