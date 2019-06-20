<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <ToHome></ToHome>
    <div class="form-wrapper">
      <div class="baseBanner">
        <p class="toBack" @click="toBack">返回</p>
        <p class="baseCenter">
            修改手机号
        </p>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <span class="item-input" style="color: #ccc;">{{oldMobile}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">新手机号</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" v-model="mobile" name="mobile" v-validate="'required|mobile'" placeholder="请输入新手机号">
          <span v-show="errors.has('mobile')" class="error-tip">{{errors.first('mobile')}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">验证码</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" name="captcha" v-model="captcha" v-validate="'required|captcha'" placeholder="请输入验证码">
          <span v-show="errors.has('captcha')" class="error-tip">{{errors.first('captcha')}}</span>
        </div>
        <div class="item-btn border-left-1px">
          <button :disabled="sending" @click="sendCaptcha(true)">{{captBtnText}}</button>
        </div>
      </div>
      <div class="form-btn">
        <button @click="_changeMobile">保存</button>
      </div>
      <toast ref="toast" text="修改成功"></toast>
      <full-loading v-show="loadFlag" title="修改中..."></full-loading>
    </div>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex';
  import {SET_USER_MOBILE} from 'store/mutation-types';
  import {sendCaptcha} from 'api/general';
  import {changeMobile} from 'api/user';
  import {setTitle} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import ToHome from 'base/toHome/toHome';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        sending: false,
        sending2: false,
        loadFlag: false,
        captcha: '',
        captBtnText: '获取验证码',
        captBtnText2: '获取验证码',
        mobile: '',
        newMobile: '',
        oldMobile: ''
      };
    },
    created() {
      setTitle('修改手机号');
      const {mobile} = this.$route.query;
      this.oldMobile = mobile;
    },
    methods: {
      sendCaptcha(flag) {
        if(flag) {
          this.$validator.validate('mobile').then((result) => {
            if (result) {
              this.sending = true;
              sendCaptcha(this.mobile, 631072).then(() => {
                this._setInterval(true);
              }).catch(() => {
                this._clearInterval(true);
              });
            }
          });
        }else{
          this.$validator.validate('mobile').then((result) => {
            if (result) {
              this.sending = true;
              sendCaptcha(this.mobile, 631072).then(() => {
                this._setInterval(false);
              }).catch(() => {
                this._clearInterval(false);
              });
            }
          });
        }
      },
      _changeMobile() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadFlag = true;
            changeMobile(this.mobile, this.captcha)
              .then(() => {
                this.$refs.toast.show();
                this.loadFlag = false;
                this.setUserMobile(this.mobile);
                setTimeout(() => {
                  this.$router.back();
                }, 500);
              }).catch(() => {
                this.loadFlag = false;
              });
          }
        });
      },
      _setInterval(flag) {
        if(flag) {
          let i = 60;
          this.timer = setInterval(() => {
            if (i === 0) {
              this._clearInterval(true);
            } else {
              this.captBtnText = i-- + 's';
            }
          }, 1000);
        }else{
          let i = 60;
          this.timer2 = setInterval(() => {
            if (i === 0) {
              this._clearInterval(false);
            } else {
              this.captBtnText2 = i-- + 's';
            }
          }, 1000);
        }
      },
      _clearInterval(flag) {
        if(flag) {
          if (this.timer) {
            clearInterval(this.timer);
            this.sending = false;
            this.captBtnText = '获取验证码';
          }
        }else{
          if (this.timer2) {
            clearInterval(this.timer2);
            this.sending2 = false;
            this.captBtnText2 = '获取验证码';
          }
        }
      },
      toBack() {
        window.history.go(-1);
      },
      ...mapMutations({
        setUserMobile: SET_USER_MOBILE
      })
    },
    beforeDestroy() {
      this.timer && clearInterval(this.timer);
      this.timer2 && clearInterval(this.timer2);
    },
    components: {
      Toast,
      FullLoading,
      ToHome
    }
  };
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/scss/variable";
   .baseBanner{
    position: relative;
    height:1.28rem;
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
  .change-mobile-wrapper {
    background-color: $color-background;
  }
</style>
