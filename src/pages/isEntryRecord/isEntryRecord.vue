<template>
    <div class="full-screen-wrapper project-member-wrapper">
      <scroll ref="scroll" :hasMore="hasMore" @pullingUp="getQueryList" :data="items">
      <div class="proBanner">
        <p class="toBack" @click="toBack">返回</p>
        <p class="proCenter">
          进出记录
        </p>
        <div class="right" @click="toSearchFn">
          <img src="./search@3x.png" />
        </div>
      </div>
      <ToHome></ToHome>
            <div style="padding-top: 0.1rem;">
              <div class="detailItems">
                <div class="details" v-for="(item, index) in items" :key="index" @click="toOutDetails(item)">
                  <p class="detailTop">
                    <span>{{item.workerName}}</span>
                    <span>{{item.teamName.length > 4 ? item.teamName.substring(0,4) + "..." : item.teamName}}</span>
                    <span>{{item.inOutStatus}}</span>
                  </p>
                  <p class="detailUnder" :class="item.inOutStatus == '01' ? 'in' : 'out'">
                    <span>{{item.inOutType}}</span>
                    <span>记录时间: {{item.date === "NaN-aN-aN aN:aN:aN" ? '暂无记录' : item.date}}</span>
                  </p>
                  <router-link to="/into-details">
                    <div class="detailImg">
                      <img src="./to@2x.png"/>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          <noResult title="抱歉，暂无进出记录" v-if="items.length === 0 && !hasMore" style="margin-top: 0.8rem"/>
      <toast ref="toast" :text="toastText"></toast>
      <loading :isLoading="isLoading" title="'正在努力加载中....'"></loading>
      </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import Toast from 'base/toast/toast';
import Loading from 'base/loading/loading';
import NoResult from 'base/no-result/no-result';
import {projectLists, deal} from 'api/deal';
import {getDictList} from 'api/general';
import {formatDate} from 'common/js/util';
import ToHome from 'base/toHome/toHome';
    export default{
      data(){
          return{
            items:[],
            entryExitType: {},
            config: {
              start: 1,
              limit: 10
            },
            toastText: '',
            isLoading: true,
            hasMore: true
          }
      },
      created(){
        Promise.all([
          getDictList('direction'),
        ]).then(([data1]) => {
          data1.forEach(item => {
            this.entryExitType[item.dkey] = item.dvalue;
          });
          this.getQueryList();
        });
      },
      methods: {
        getQueryList() {
          let teamUserConfig = sessionStorage.getItem('teamUserConfig') || '';
          if(teamUserConfig) {
            teamUserConfig = JSON.parse(teamUserConfig);
            this.config = {
              ...this.config,
              ...teamUserConfig
            };
            sessionStorage.removeItem('teamUserConfig');
          }
          return deal(this.config).then((data) => {
            this.isLoading = false;
            console.log(data);
            let arr = data.list.map(item => {
              item.date = formatDate(item.lastInOutDatetime, "yyyy-MM-dd hh:mm:ss");
              console.log(item.inOutStatus);
              if(item.inOutStatus === "01"){
                item.inOutStatus = "在场内";
                item.inOutType = "进入";
              }else if(item.inOutStatus === "00"){
                item.inOutStatus = "已出场";
                item.inOutType = "出去";
              }else{
                item.inOutStatus = "暂无数据";
                item.inOutType = "暂无数据";
              }
              return item;
            });
            this.hasMore = (data.pageNO < data.totalPage);
            this.config.start ++;
            this.items = [...this.items, ...arr];
          });
        },
        toSearchFn() {
          this.$router.push(`/search?origin=entryRecord`);
        },
        toOutDetails(item) {
          sessionStorage.setItem('outInDetails', JSON.stringify(item));
          this.$router.push(`/outDetails`);
        },
        toBack() {
          this.$router.push('/home');
        }
      },
      components:{
        Scroll,
        Toast,
        Loading,
        NoResult,
        ToHome
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
        height:1.28rem;
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
                    right: 2.8rem;
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
                :nth-child(2){
                    display: inline-block;
                    right: 3.5rem;
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
      .in{
        color: #28C71F !important;
      }
      .out{
        color: #E93535 !important;
      }
    }
  .toBack{
    float: left;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
  }
}
</style>


