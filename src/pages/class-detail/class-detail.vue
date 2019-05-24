<template>
  <div class="full-screen-wrapper class-detail-wrapper">
    <scroll :pullUpLoad="pullUpLoad" ref="scroll">
      <div class="form-wrapper form-gray-wrapper">
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">所在企业</div>
            <div class="item-input">{{detail ? detail.corpName : ''}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">班组名称</div>
            <div class="item-input">{{detail ? detail.teamName : ''}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">所在企业统一社会信用代码</div>
            <div class="item-input">{{detail ? detail.corpCode : ''}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">责任人姓名</div>
            <div class="item-input">{{detail ? detail.responsiblePersonName : ''}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">责任人联系电话</div>
            <div class="item-input">{{detail ? detail.responsiblePersonPhone : ''}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">责任人证件类型</div>
            <div class="item-input">{{detail ? detail.responsiblePersonIdcardType : ''}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">责任人证件号码</div>
            <div class="item-input">{{detail ? detail.responsiblePersonIdNumber : ''}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">进场时间</div>
            <div class="item-input">{{(detail ? detail.entryTime : '') | formatDate}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">退场时间</div>
            <div class="item-input">{{(detail ? detail.exitTime : '') | formatDate}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">班组长姓名</div>
            <div class="item-input">{{detail ? detail.teamLeaderName : ''}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">班组长联系电话</div>
            <div class="item-input">{{detail ? detail.teamLeaderPhone : ''}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">班组长证件类型</div>
            <div class="item-input">{{detail ? detail.teamLeaderIdcardType : ''}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">班组长证件号码</div>
            <div class="item-input">{{detail ? detail.teamLeaderIdNumber : ''}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">备注</div>
            <div class="item-input">{{detail ? detail.remark : ''}}</div>
          </div>
        </div>
      </div>
    </scroll>
    <full-loading v-show="loadingFlag"></full-loading>
  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import NoResult from 'base/no-result/no-result';
  import FullLoading from 'base/full-loading/full-loading';
  import { commonMixin } from 'common/js/mixin';
  import { getClassDetail } from 'api/biz';

  export default {
    mixins: [commonMixin],
    data() {
      return {
        detail: null,
        loadingFlag: true
      };
    },
    created() {
      this.pullUpLoad = null;
      this.getClassDetail();
    },
    methods: {
      getClassDetail() {
        getClassDetail(this.$route.params.code).then((data) => {
          this.detail = data;
          this.loadingFlag = false;
        }).catch(() => {
          this.loadingFlag = false;
        });
      }
    },
    components: {
      Scroll,
      NoResult,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .class-detail-wrapper {
    z-index: 1;
  }
</style>
