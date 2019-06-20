<template>
    <div class="full-screen-wrapper into-wrapper">
        <scroll ref="scroll" :hasMore="false">
            <div>
                <div class="baseBanner">
                    <p class="toBack" @click="toBack">返回</p>
                    <p class="baseCenter">
                      进出场详情
                    </p>
                </div>
              <ToHome></ToHome>
              <div class="detailItems" @click="toDetailItems">
                <div class="details">
                  <p class="detailTop">
                    <span>{{outInDetails[0].workerName}}</span>
                    <span>{{outInDetails[0].teamName.length > 4 ? outInDetails[0].teamName.substring(0,4) + "..." : outInDetails[0].teamName}}</span>
                    <!--:class="outInDetails[0].direction === '01' ? 'in' : 'out'"-->
                    <!--<span>{{outInDetails[0].direction}}</span>-->
                    <span>{{this.uploadStatusList[outInDetails[0].uploadStatus]}}</span>
                  </p>
                  <p class="detailUnder">
                    <span>身份证号: {{outInDetails[0].idcardNumber}}</span>
                  </p>
                  <div class="detailImg">
                    <img src="./to@2x.png"/>
                  </div>
                </div>
              </div>
                <div class="empty"></div>
              <scroll ref="scroll" :hasMore="false" :data="entryOutList">
              <div class="pushAdd" v-for="(item, index) in entryOutList" :key="index">
                <div class="item" @click="toOutInDetails(item.code)">
                  <div class="entry" :class="item.direction == '01' ? 'in' : 'out'">
                    <span>{{item.direction}}</span>
                  </div>
                  <div class="entryImg">
                    <span>{{item.date}}</span> <img src="./to@2x.png"/>
                  </div>
                </div>
              </div>
              </scroll>
            </div>
          <no-result title="抱歉，暂无进出场记录" v-if="entryOutList.length === 0" style="margin-top: 0.8rem"/>
        </scroll>
      <loading :title="'正在努力加载中...'" :isLoading="isLoading"></loading>
      <toast ref="toast" :text="toastText"></toast>
    </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import NoResult from 'base/no-result/no-result';
  import Loading from 'base/loading/loading';
  import Toast from 'base/toast/toast';
  import {queryOutInList} from 'api/deal';
  import {getDictList} from 'api/general';
  import {formatDate} from 'common/js/util';
  import ToHome from 'base/toHome/toHome';
  export default {
    data(){
        return{
          outInDetails: [{}],
          entryOutList: [],
          isLoading: true,
          toastText: '',
          uploadStatusList: {}
        }
    },
    created() {
      let outInDetails = sessionStorage.getItem('outInDetails') || '';
      if(outInDetails) {
        this.outInDetails = [JSON.parse(outInDetails)];
        console.log(this.outInDetails);
        Promise.all([
          getDictList('direction'),
          queryOutInList(this.outInDetails[0].workerName)
        ]).then(([data1, data2]) => {
          let entryExitType = {};
          data1.forEach(item => {
            entryExitType[`${item.dkey}`] = item.dvalue;
          });
          this.entryOutList = data2.map(item => {
            item.date = formatDate(item.date, "yyyy-MM-dd hh:mm:ss");
            item.direction = entryExitType[item.direction];
            return item;
          });
          this.isLoading = false;
        });
      }
      Promise.all([
        getDictList('upload_status')
      ]).then(([data1]) => {
        data1.forEach(item => {
          this.uploadStatusList[item.dkey] = item.dvalue;
        });
      });
      console.log(this.uploadStatusList);
    },
    methods: {
      toOutInDetails(code) {
        this.$router.push(`/outInDetails?code=${code}`);
      },
      formatDate(time) {
        return formatDate(time);
      },
      toDetailItems() {
        this.$router.push(`/memberDetails?code=${this.outInDetails[0].code}`);
      },
      toBack() {
        //window.history.go(-1);
        //isEntryRecord
        this.$router.push('/isEntryRecord');
      }
    },
    components: {
      Scroll,
      NoResult,
      Loading,
      Toast,
      ToHome
    }
  }
</script>

<style lang="scss" scoped>
  .into-wrapper{
    .baseBanner{
      position: relative;
      height: 1.28rem;
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
      .toBack{
        float: left;
        margin-left: 0.5rem;
        margin-top: 0.5rem;
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
            right: 2.2rem;
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
          color: #333;
          letter-spacing: 0;
          text-align: justify;
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
    .empty{
      height: .2rem;
      background: #f0f0f0;
      width: 100%;
    }
    .pushAdd{
      position: relative;
      width: 92%;
      margin: 0 auto;
      height: 1rem;
      line-height: 1rem;
      border-bottom: 1px solid #E6E6E6;
      font-size:.32rem;
      .item{
        display: flex;
      }
      span{
        display: inline-block;
      }
      .entryImg{
        display: inline-block;
        position: absolute;
        right: 0.1rem;
        img{
          width: 0.2rem;
          height: 0.2rem;
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
</style>


