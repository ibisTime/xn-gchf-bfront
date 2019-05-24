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
        <div class="form-btn form-btn-clear">
          <button @click="edit">修改</button>
          <button @click="deleteConfirm">删除</button>
        </div>
      </div>
    </scroll>
    <full-loading v-show="loadingFlag" :title="loadingText"></full-loading>
    <toast ref="toast" :text="toastText"></toast>
    <confirm ref="confirm" text="确定删除该班组吗" @confirm="deleteClass"></confirm>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import Scroll from 'base/scroll/scroll';
  import FullLoading from 'base/full-loading/full-loading';
  import Toast from 'base/toast/toast';
  import Confirm from 'base/confirm/confirm';
  import { commonMixin } from 'common/js/mixin';
  import { getClassDetail, deleteClass } from 'api/biz';

  export default {
    mixins: [commonMixin],
    data() {
      return {
        detail: null,
        loadingFlag: true,
        loadingText: '正在载入...',
        toastText: ''
      };
    },
    created() {
      this.pullUpLoad = null;
      this.getClassDetail();
    },
    methods: {
      // 班组详情
      getClassDetail() {
        getClassDetail(this.$route.params.code).then((data) => {
          this.detail = data;
          this.loadingFlag = false;
        }).catch(() => {
          this.loadingFlag = false;
        });
      },
      // 删除确认
      deleteConfirm() {
        this.$refs.confirm.show();
      },
      // 删除
      deleteClass() {
        this.loadingFlag = true;
        this.loadingText = '删除中...';
        deleteClass(this.$route.params.code).then(() => {
          this.loadingFlag = false;
          this.toastText = '删除成功';
          this.$refs.toast.show();
          this.deleteClassInfo({
            code: this.$route.params.code
          });
          setTimeout(() => {
            this.$router.back();
          }, 1000);
        }).catch(() => {
          this.loadingFlag = false;
        });
      },
      // 进入修改页面
      edit() {
        this.$router.push(`/class/edit/${this.$route.params.code}`);
      },
      ...mapActions([
        'deleteClassInfo'
      ])
    },
    components: {
      Scroll,
      FullLoading,
      Toast,
      Confirm
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
