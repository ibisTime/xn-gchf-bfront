<template>
    <div class="full-screen-wrapper project-member-wrapper">
        <scroll ref="scroll" :hasMore="hasMore" :data="items" @pullingUp="userInOutSite">
            <div>
                <div class="proBanner">
                    <p class="proCenter">
                        进退场记录
                    </p>
                    <div class="right">
                        <router-link to='/search?origin=filed'>
                        <img src="./search@3x.png" />
                        </router-link>
                    </div>
                </div>
              <div class="detailItems">
                <div class="details" v-for="(item, index) in items" :key="index" @click="toFiledFn(item)">
                  <p class="detailTop">
                    <span>{{item.workerName}}</span>
                    <span>{{item.teamName}}</span>
                    <span>{{item.uploadStatus}}</span>
                  </p>
                  <p class="detailUnder">
                    <span>{{item.type}}</span>
                    <span>记录时间: {{item.date}}</span>
                  </p>
                  <div class="detailImg">
                    <img src="./to@2x.png"/>
                  </div>
                </div>
              </div>
            </div>
          <no-result title="暂无进出记录" v-if="items.length === 0 && !hasMore" style="margin-top: 0.8rem"/>
        </scroll>
      <loading :title="'正在努力加载中...'" :isLoading="isLoading"></loading>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import NoResult from 'base/no-result/no-result';
import Loading from 'base/loading/loading';
import {deal} from 'api/deal';
import{getDictList} from 'api/general';
import {userInOutSite} from 'api/deal';
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
              },
              entryExitType: {},
              workerPicUploadStatus: {}
            }
        },
        created(){
          Promise.all([
            getDictList('entry_exit_type'),
            getDictList('workerPicUploadStatus'),
          ]).then(([data1, data2]) => {
            data1.forEach(item => {
              this.entryExitType[item.dkey] = item.dvalue;
            });
            data2.forEach(item => {
              this.workerPicUploadStatus[item.dkey] = item.dvalue;
            });
            this.userInOutSite();
          });
        },
        methods: {
          userInOutSite() {
            let teamUserConfig = sessionStorage.getItem('teamUserConfig') || '';
            if(teamUserConfig) {
              teamUserConfig = JSON.parse(teamUserConfig);
              this.config = {
                ...this.config,
                ...teamUserConfig
              };
              sessionStorage.removeItem('teamUserConfig');
            }
            return userInOutSite(this.config).then(data => {
              let arr = data.list.map(item => ({
                workerName: item.workerName,
                workerCode: item.workerCode,
                teamName: item.teamName,
                uploadStatus: this.workerPicUploadStatus[item.uploadStatus],
                type: this.entryExitType[item.type],
                date: this.userFormatDate(item.date),
                idcardNumber: item.idcardNumber
              }));
              this.hasMore = (data.pageNO < data.totalPage);
              this.config.start ++;
              this.items = [...this.items, ...arr];
              this.isLoading = false;
            });
          },
          userFormatDate(time) {
            return formatDate(time);
          },
          toFiledFn(item) {
            sessionStorage.setItem('inOutData', JSON.stringify(item));
            this.$router.push(`/into-details`);
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
        height: 1.28rem;
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
            height: 1.5rem;
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
                :nth-child(2){
                    display: inline-block;
                    margin-left: 0.5rem;
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
}
</style>


