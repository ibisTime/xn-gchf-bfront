<template>
    <div class="full-screen-wrapper inOut-wrapper">
        <scroll ref="scroll" :hasMore="hasMore" @pullingUp="getQueryList" :data="items">
            <div>
                <div class="inOutBanner">
                    <p class="inOutCenter">
                        考勤人员
                    </p>
                    <div class="right" @click="toSearch">
                      <img src="./search@3x.png" />
                    </div>
                </div>
              <div class="detailItems">
                <div class="details" v-for="(item, index) in items" :key="index" @click="checkWorkDetails(item)">
                  <p class="detailTop">
                    <span>{{item.workerName}}</span>
                    <span>{{item.teamName}}</span>
                  </p>
                  <p class="detailUnder" :class="item.uploadStatus !== '1' ? 'in' : 'out'">
                    <span>{{item.direction}} 记录时间:{{item.date}}</span>
                    <span>{{item.uploadStatus}}</span>
                  </p>
                  <div class="detailImg">
                    <img src="./to@2x.png"/>
                  </div>
                </div>
              </div>
            </div>
          <noResult title="抱歉，暂无考勤人员记录" v-if="items.length === 0 && !hasMore" style="margin-top: 0.8rem"/>
        </scroll>
      <toast ref="toast" :text="toastText"></toast>
      <loading :isLoading="isLoading" title="'正在努力加载中....'"></loading>
    </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import Toast from 'base/toast/toast';
  import Loading from 'base/loading/loading';
  import NoResult from 'base/no-result/no-result';
 import {formatDate} from 'common/js/util';
 import {getDictList} from 'api/general';
 import {deal} from 'api/deal'
export default{
  data(){
      return{
        items:[],
        config: {
          start: 1,
          limit: 10
        },
        staticObj: {},
        attendanceStatusObj: {},
        toastText: '',
        isLoading: true,
        hasMore: true
      }
  },
  created(){
      Promise.all([
        getDictList('upload_status'),
        getDictList('direction'),
      ]).then(([data1, data2]) => {
        data1.forEach(item => {
          this.staticObj[`${item.dkey}`] = item.dvalue;
        });
        data2.forEach(item => {
          this.attendanceStatusObj[`${item.dkey}`] = item.dvalue;
        });
        this.getQueryList()
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
        let arr = data.list.map(item => {
          item.date = this.userFormatDate(item.lastAttendanceDatetime);
          item.static = item.uploadStatus;
          item.uploadStatus = this.staticObj[item.uploadStatus];
          item.direction = this.attendanceStatusObj[item.direction];
          return item;
        });
        this.hasMore = (data.pageNO < data.totalPage);
        this.config.start ++;
        this.items = [...this.items, ...arr];
        this.isLoading = false;
      });
    },
    userFormatDate(time) {
      return formatDate(time, "yyyy-MM-dd hh-mm-ss");
    },
    toSearch() {
      this.$router.push(`/search?origin=inOut`);
    },
    checkWorkDetails(item) {
      sessionStorage.setItem('inOutDetail', JSON.stringify(item));
      this.$router.push(`/checkWorkDetails`);
    }
  },
  components:{
    Scroll,
    Toast,
    Loading,
    NoResult
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";
*{
    margin: 0;
    padding: 0;
}
.inOutBanner{
    position: relative;
    height: 1.28rem;
    width:100%;
    background:#028EFF;
    text-align: center;
    font-size: 0.32rem;
    color: #fff;
    .inOutCenter{
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
        border-bottom: 0.01rem solid #ccc;
        margin: 0 auto;
        .detailTop{
            margin-top: 0.5rem;
            position: relative;
            width: 100%;
            color: #333;
            font-size:0.32rem;
            :nth-child(2){
                display: inline-block;
                position: absolute;
                right: 0.5rem;
            }
        }
        .detailUnder{
            position: relative;
            width: 100%;
            color: #999;
            font-size:0.24rem;
            margin-top:0.4rem;
            :nth-child(2){
                display: inline-block;
                position: absolute;
                right: 0.5rem;
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
    color: #E93535 !important;
  }
  .out{
    color: #28C71F !important;
  }
}
</style>
