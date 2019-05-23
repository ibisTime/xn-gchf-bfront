<template>
  <div class="full-screen-wrapper class-wrapper">
    <div class="item-wrapper">
      <scroll ref="scroll" :hasMore="hasMore" @pullingUp="getPageClass" :data="classList">
        <div @click="goDetail(item.code)" v-for="item in classList" :key="item.code" class="item border-bottom-1px">
          <div class="item-info">
            <div class="title">{{item.teamName}}</div>
            <div class="tip">进场时间：2019-01-22</div>
          </div>
          <div class="status">已上传</div>
          <i></i>
        </div>
        <no-result v-show="!classList.length && !hasMore" class="no-result-wrapper" title="抱歉，暂无商品"></no-result>
      </scroll>
    </div>
    <div class="add-wrapper">
      <div @click="$router.push('/class/add')" class="add-logo"></div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import NoResult from 'base/no-result/no-result';
  import { getPageClass } from 'api/biz';

  export default {
    data() {
      return {
        start: 1,
        limit: 20,
        hasMore: true,
        classList: []
      };
    },
    created() {
      this.getPageClass();
    },
    methods: {
      getPageClass() {
        getPageClass(this.start, this.limit).then((data) => {
          this.classList = this.classList.concat(data.list);
          this.hasMore = data.pageNO > data.totalPage;
          this.start++;
        });
      },
      goDetail(code) {
        this.$router.push(`/class/${code}`);
      }
    },
    components: {
      Scroll,
      NoResult
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .class-wrapper {
    padding: 0.1rem 0.3rem 0;
    .item-wrapper {
      position: absolute;
      top: 0.1rem;
      left: 0.3rem;
      right: 0.3rem;
      bottom: 1.9rem;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 0.31rem 0;
      &.border-bottom-1px {
        @include border-bottom-1px($color-border-e6);
      }
      .item-info {
        flex: 1;
        .title {
          font-size: $font-size-medium-xx;
        }
        .tip {
          padding-top: 0.12rem;
          font-size: $font-size-small;
          color: $color-text-l;
        }
      }
      .status {
        font-size: $font-size-small;
        color: $color-text-l;
      }
      i {
        width: 0.28rem;
        height: 0.17rem;
        @include bg-image('right');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: right center;
      }
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
  }
</style>
