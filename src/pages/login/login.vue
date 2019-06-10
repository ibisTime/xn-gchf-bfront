<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="top-logo-wrap">
      <img src="./logo@3x.png" />
      <div class="top-app-name">工程核发</div>
    </div>
    <div class="form-wrapper login-form-wrapper">
      <div class="form-item border-bottom-2px">
        <div class="item-input-wrapper">
          <input type="text" class="item-input" name="loginName" v-model="loginName" v-validate="'required'" placeholder="请输入账号">
          <span v-show="errors.has('loginName')" class="error-tip">{{errors.first('loginName')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-2px">
        <div class="item-input-wrapper">
          <input type="password" class="item-input" name="loginPwd" v-model="loginPwd" v-validate="'required|min:6'" placeholder="请输入密码">
          <span v-show="errors.has('loginPwd')" class="error-tip">{{errors.first('loginPwd')}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button @click.stop="login">登录</button>
      </div>
      <div class="other-info">
        <router-link to="/find-pwd">找回密码</router-link>
      </div>
    </div>
    <full-loading v-show="loadFlag" title="登录中..."></full-loading>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  import { SET_USER } from 'store/mutation-types';
  import { getUser, login } from 'api/user';
  import { setUser, setProjectCode } from 'common/js/util';
  import { directiveMixin } from 'common/js/mixin';
  import FullLoading from 'base/full-loading/full-loading';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        loadFlag: false,
        loginName: '',
        loginPwd: ''
      };
    },
    methods: {
      login() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadFlag = true;
            login(this.loginName, this.loginPwd).then((data) => {
              setUser(data);
              return getUser();
            }).then((data) => {
              setProjectCode(data.projectCode);
              this.setUser(data);
              this.loadFlag = false;
              let url = this.$route.query.redirect || '/home';
              this.$router.replace(url);
            }).catch(() => {
              this.loadFlag = false;
            });
          }
        });
      },
      ...mapMutations({
        'setUser': SET_USER
      })
    },
    components: {
      FullLoading
    }
  };
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .change-mobile-wrapper {
    .other-info {
      margin-top: 0.44rem;
      a {
        font-size: $font-size-medium;
        color: $color-text-l;
        float: right;
      }
    }
    .top-logo-wrap {
      margin-top: 1.5rem;
      text-align: center;
      font-size: $font-size-large-s;
      img {
        width: 1.5rem;
      }
      .top-app-name {
        padding-top: 0.23rem;
      }
    }
  }
</style>
