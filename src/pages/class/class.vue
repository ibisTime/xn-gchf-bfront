<template>
  <div class="full-screen-wrapper">
    <div class="faceCollectBanner">
      <span class="toBack" @click="toBack">返回</span>
      <p class="faceCollectCenter">
        班组列表
      </p>
    </div>
    <div class="class-wrapper">
      <div class="item-wrapper">
        <scroll ref="scroll" :hasMore="hasMore" @pullingUp="getPageClass" :data="items">
          <div class="detailItems">
            <div v-for="(item, index) in items" :key="index" class="details">
              <div @click="goDetail(item.code)">
                <p class="detailTop">
                  <span class="">{{item.teamName}}</span>
                  <span class="">{{formatUploadStatus(item.uploadStatus)}}</span>
                </p>
                <p class="detailUnder">进场时间：{{formatDate(item.entryTime) === "NaN-aN-aN" ? "暂无数据" : formatDate(item.entryTime)}}</p>
                <div class="detailImg">
                  <img src="./right@2x.png"/>
                </div>
              </div>
            </div>
          </div>
          <no-result v-show="!items.length && !hasMore" class="no-result-wrapper" title="抱歉，暂无班组信息"></no-result>
        </scroll>
        <!--mescroll滚动区域的基本结构-->
        <!--<mescroll-vue class="mescroll" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">-->
          <!--<div class="detailItems">-->
            <!--<div v-for="(item, index) in dataList" :key="index" class="details">-->
              <!--<div @click="goDetail(item.list[index].code)">-->
                <!--<p class="detailTop">-->
                <!--<span class="">{{item.list[index].teamName ? item.list[index].teamName : ""}}</span>-->
                <!--<span class="">{{formatUploadStatus(item.list[index].uploadStatus)}}</span>-->
                <!--</p>-->
                <!--<p class="detailUnder">进场时间：{{formatDate(item.list[index].entryTime) === "NaN-aN-aN" ? "暂无数据" : formatDate(item.list[index].entryTime)}}</p>-->
                <!--<div class="detailImg">-->
                <!--<img src="./right@2x.png"/>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<no-result v-show="!items.length && !hasMore" class="no-result-wrapper" title="抱歉，暂无班组信息"></no-result>-->
        <!--</mescroll-vue>-->
      </div>
      <div class="add-wrapper">
        <div @click="$router.push('/class/add')" class="add-logo"></div>
      </div>
      <ToHome></ToHome>
    </div>
  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import NoResult from 'base/no-result/no-result';
  import { getPageClass } from 'api/biz';
  import { getDictList } from 'api/general';
  import {formatDate} from 'common/js/util';
  import ToHome from 'base/toHome/toHome';

  export default {
    data() {
      return {
        items:[],
        start: 1,
        limit: 10,
        hasMore: true,
        uploadStatusList: []
      };
    },
    created() {
      getDictList('upload_status').then(data => {
        this.uploadStatusList = data;
      });
      this.getPageClass();
    },
    watch: {
      '$route' (to, from) {
        // 路由发生变化页面刷新
        this.$router.go(0);
      }
    },
    methods: {
      getPageClass() {
        // 重复显示的问题出在这里
        return getPageClass(this.start, this.limit).then((data) => {
          // this.loadFlag = false;
          // let list = this.classList.slice();
          // list = list.concat(data.list);
          // this.setClassList(list);
          // this.hasMore = data.pageNO > data.totalPage;
          // this.start++;
          this.isLoading = false;
          let arr = data.list.map(item => {
            return item;
          });
          this.hasMore = (data.pageNO < data.totalPage);
          this.start ++;
          this.items = [...this.items, ...arr];
          console.log(this.items);
        });
      },
      goDetail(code) {
        this.$router.push(`/class/${code}`);
      },
      formatUploadStatus(status) {
        for (let i = 0; i < this.uploadStatusList.length; i++) {
          if (this.uploadStatusList[i].dkey === status) {
            return this.uploadStatusList[i].dvalue;
          }
        }
        return '';
      },
      formatDate(time) {
        return formatDate(time, "yyyy-MM-dd");
      },
      toBack() {
        window.history.go(-1);
      }
    },
    components: {
      Scroll,
      NoResult,
      ToHome
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";
  .faceCollectBanner{
    position: relative;
    height: 1.28rem;
    width:100%;
    background:#028EFF;
    text-align: center;
    font-size: 0.32rem;
    color: #fff;
    .faceCollectCenter{
      position: absolute;
      top: 50%;
      left: 50%;
      transform:translateX(-50%) translateY(-50%);
    }
    .toBack{
      float: left;
      margin-left: .5rem;
      margin-top: 0.5rem;
    }
  }
  .class-wrapper {
    padding: 0.1rem 0.3rem 0;
    .item-wrapper {
      position: absolute;
      top: 1.3rem;
      left: 0.3rem;
      right: 0.3rem;
      bottom: 1.9rem;
    }

    .add-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1.9rem;
      width: 100%;
      padding: 0.2rem 0.3rem;
      .add-logo {
        height: 100%;
        background: #F5F5F5;
        border-radius: 2px;
        @include bg-image('add');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
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
    .detailItems{
      position: relative;
      padding-top: .1rem;
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
            right: 0.5rem;
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
    }
  }
</style>
