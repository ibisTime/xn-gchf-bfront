<template>
  <div class="full-screen-wrapper class-detail-wrapper">
    <div class="faceCollectBanner">
      <p class="toBack" @click="toBack">返回</p>
      <p class="faceCollectCenter">
        班组详情
      </p>
      <p class="headerChange" @click="edit()">
        修改
      </p>
    </div>
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
            <div class="item-input" id="iiClzOne">{{detail ? uploadStatus[detail.responsiblePersonIdcardType] : ''}}</div>
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
            <div class="item-input" id="iiClzTwo">{{detail ? uploadStatus[detail.teamLeaderIdcardType] : ''}}</div>
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
        <div class="form-btn form-btn-clear" style="margin-bottom: 2rem">
          <button @click="deleteConfirm">删除</button>
        </div>
      </div>
      <ToHome>testtasdasdasd</ToHome>
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
  import { getDictList } from 'api/general';
  import ToHome from 'base/toHome/toHome';

  export default {
    mixins: [commonMixin],
    data() {
      return {
        detail: null,
        loadingFlag: true,
        loadingText: '正在载入...',
        toastText: '',
        cardTypeList: [],
        cardList: [],
        i: 1,
        uploadStatus: {},
        // legal_manid_card_type
      };
    },
    created() {
      this.pullUpLoad = null;
      Promise.all([
        getDictList('legal_manid_card_type'),
        getClassDetail(this.$route.params.code)
      ]).then(([data1, data2]) => {
        data1.forEach(item => {
          this.uploadStatus[item.dkey] = item.dvalue;
        });
        this.detail = data2;
        this.loadingFlag = false;
      });
    },
    methods: {
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
      showEidt() {
        let status = this.detail && this.detail.uploadStatus || '';
        return status !== '3' && status !== '4' && status !== '5';
      },
      toBack() {
        window.history.go(-1);
      },
      ...mapActions([
        'deleteClassInfo'
      ])
    },
    components: {
      Scroll,
      FullLoading,
      Toast,
      Confirm,
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
    .headerChange{
      float: right;
      margin-top: 0.5rem;
      margin-right: .3rem;
    }
    .toBack{
      float: left;
      margin-left: 0.5rem;
      margin-top: 0.5rem;
    }
  }
  .class-detail-wrapper {
    z-index: 1;
  }
</style>
