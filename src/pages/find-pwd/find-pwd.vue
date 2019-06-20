<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <ToHome></ToHome>
    <div class="baseBanner">
      <p class="toBack" @click="toBack">返回</p>
      <p class="baseCenter" id="titleCg">
        修改登录密码
      </p>
      </div>
    <div class="form-wrapper login-form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <input v-focus type="tel" class="item-input" name="mobile" v-model="mobile" v-validate="'required|mobile'" placeholder="请输入手机号">
          <span v-show="errors.has('mobile')" class="error-tip">{{errors.first('mobile')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" name="captcha" v-model="captcha" v-validate="'required|captcha'" placeholder="请输入验证码">
          <span v-show="errors.has('captcha')" class="error-tip">{{errors.first('captcha')}}</span>
        </div>
        <div class="item-btn border-left-1px">
          <button :disabled="sending" @click="sendCaptcha">{{captBtnText}}</button>
          <!--@click="resetPwd"-->
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <input type="password" class="item-input" name="pwdOne" v-model="pwd" v-validate="'required|min:6'" placeholder="新密码（不少于6位）">
          <span v-show="errors.has('pwd')" class="error-tip">{{errors.first('pwdOne')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-input-wrapper">
          <input type="password" @blur="restPwdJudge" class="item-input" name="pwd" v-model="pwdTwo" v-validate="'required|min:6'" placeholder="确认密码">
          <span v-show="errors.has('pwd')" class="error-tip">{{errors.first('pwd')}}{{this.restJudge}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button @click="resetPwd">确 定</button>
      </div>
      <toast ref="toast" :text="toastText"></toast>
      <full-loading v-show="loadFlag" title="重置中..."></full-loading>
    </div>
  </div>
</template>
<script>
  import { sendCaptchaTwo } from 'api/general';
  import { resetPwd } from 'api/user';
  import { directiveMixin } from 'common/js/mixin';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import { teamUserDetail } from 'api/deal';
  import ToHome from 'base/toHome/toHome';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        sending: false,
        loadFlag: false,
        captcha: '',
        captBtnText: '获取验证码',
        mobile: '',
        pwd: '',
        repwd: '',
        pwdTwo: '',
        userDetail: [{}],
        toastText: '密码重置成功',
        restJudge: '',
        restFlag: false
      };
    },
    created(){
      const {mobile} = this.$route.query;
      this.mobile = mobile;
    },
    mounted: function() {
      this.titleChange();
    },
    methods: {
      sendCaptcha() {
        this.$validator.validate('mobile').then((result) => {
          if (result) {
            this.sending = true;
            sendCaptchaTwo(this.mobile, 631080).then(() => {
              this._setInterval();
            }).catch(() => {
              this._clearInterval();
            });
          }
        });
      },
      resetPwd() {
        //captcha,pwd,pwdTwo
        if(this.captcha === "" || this.captcha === undefined){
          this.toastText = "请输入验证码!";
          this.$refs.toast.show();
        }else if(this.pwd === "" || this.pwd === undefined){
          this.toastText = "请输入新密码!";
          this.$refs.toast.show();
        }else if(this.pwdTwo === "" || this.pwdTwo === undefined){
          this.toastText = "请输入确认密码!";
          this.$refs.toast.show();
        }else{
          if(this.restFlag) {
            this.$validator.validateAll().then((result) => {
              if (result) {
                this.loadFlag = true;
                resetPwd(this.mobile, this.captcha, this.pwd).then(() => {
                  this.loadFlag = false;
                  this.toastText = "修改成功";
                  this.$refs.toast.show();
                  setTimeout(() => {
                    this.$router.push('/user');
                  }, 500);
                }).catch(() => {
                  this.loadFlag = false;
                });
              }
            });
          }else{
            this.toastText = "两次密码输入不一致!";
            this.$refs.toast.show();
          }
        }
      },
      restPwdJudge() {
        if(this.pwd != this.pwdTwo){
          this.toastText = "两次密码输入不一致!";
          this.$refs.toast.show();
          this.restFlag = false;
        }else{
          this.restFlag = true;
        }
      },
      _setInterval() {
        let i = 60;
        this.timer = setInterval(() => {
          if (i === 0) {
            this._clearInterval();
          } else {
            this.captBtnText = i-- + 's';
          }
        }, 1000);
      },
      _clearInterval() {
        if (this.timer) {
          clearInterval(this.timer);
          this.sending = false;
          this.captBtnText = '获取验证码';
        }
      },
      titleChange() {
        if(location.pathname == '/find-pwd'){
          document.getElementById('titleCg').innerHTML = "找回密码";
        }else if(location.pathname == 'change-pwd'){
          document.getElementById('titleCg').innerHTML = "修改登录密码";
        }
      },
      toBack() {
        window.history.go(-1);
      }
    },
    beforeDestroy() {
      this.timer && clearInterval(this.timer);
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
  @import "~common/scss/mixin";
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
    .form-wrapper.login-form-wrapper {
      .form-item {
        margin-top: 0.1rem;
      }
      .form-btn {
        margin-top: 2.7rem;
      }
    }
  }
</style>
