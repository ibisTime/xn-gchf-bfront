<template>
    <div class="full-screen-wrapper user-wrapper">
      <ToHome></ToHome>
      <div to="/user" tag="div" class="card-wrapper">
        <div class="card-container">
          <div class="card-photo">
            <img :src="getAvatar()"/>
          </div>
          <div class="card-info">
            <div class="card-title">真实姓名：{{realName}}</div>
            <div class="card-tip">角色名称：{{roleName}}</div>
          </div>
          <i></i>
        </div>
      </div>
      <div class="items-wrapper">
        <div class="item border-bottom-1px">
          <div class="title">登录名</div>
          <div class="tip">{{loginName}}</div>
        </div>
        <div tag="div" class="item border-bottom-1px" @click="toCgTel(mobile)">
          <div class="title">手机号</div>
          <div class="tip">{{mobile}}</div>
          <i></i>
        </div>

        <div @click="toCgPwd(mobile)" tag="div" class="item border-bottom-1px">
          <div class="title">修改登录密码</div>
          <i></i>
        </div>
      </div>
      <div class="btn-wrapper">
        <button @click="logout">切换账号</button>
      </div>
      <full-loading v-show="loadingFlag"></full-loading>
    </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { SET_USER } from 'store/mutation-types';
  import FullLoading from 'base/full-loading/full-loading';
  import { formatAvatar, clearUser } from 'common/js/util';
  import { getUser } from 'api/user';
  import ToHome from 'base/toHome/toHome';
  export default {
    data() {
      return {
        loadingFlag: true
      };
    },
    computed: {
      realName() {
        return this.user ? this.user.realName : '';
      },
      loginName() {
        return this.user ? this.user.loginName : '';
      },
      mobile() {
        return this.user ? this.user.mobile : '';
      },
      roleName() {
        return this.user ? this.user.RoleName : '';
      },
      ...mapGetters([
        'user'
      ])
    },
    created() {
      this.getInitData();
    },
    methods: {
      toCgPwd(mobile) {
        this.$router.push(`/change-pwd?mobile=${mobile}`);
      },
      toCgTel(mobile) {
        this.$router.push(`/change-mobile?mobile=${mobile}`);
      },
      getInitData() {
        this.loadingFlag = true;
        this.queryUser().then(() => {
          this.loadingFlag = false;
        }).catch(() => {
          this.loadingFlag = false;
        });
      },
      queryUser() {
        return getUser().then((data) => {
          sessionStorage.setItem('organizationCode', data.organizationCode);
          this.setUser(data);
        });
      },
      logout() {
        clearUser();
        this.$router.push('/login');
      },
      getAvatar() {
        if (!this.user) {
          return require('./avatar.png');
        }
        return formatAvatar(this.user.photo);
      },
      iconCls(amount) {
        return amount >= 0 ? 'in' : 'out';
      },
      ...mapMutations({
        'setUser': SET_USER
      })
    },
    components: {
      FullLoading,
      ToHome
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .user-wrapper {
    .card-wrapper {
      padding: 0.4rem 0.3rem 0.21rem 0.3rem;
      @include bg-image('bg');
      background-repeat: no-repeat;
      background-position: left top;
      background-size: contain;
      .card-container {
        display: flex;
        align-items: center;
        padding: 0.7rem 0.48rem;
        border-radius: 0.16rem;
        box-shadow: 0 6px 12px 0 #EBEBEB;
        background: #fff;
        .card-photo {
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .card-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 0.3rem;
          align-items: stretch;
          .card-title {
            font-size: $font-size-large-s;
            padding-bottom: 0.2rem;
          }
          .card-tip {
            color: #666;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .items-wrapper {
      padding: 0 0.3rem;
      .item {
        display: flex;
        align-items: center;
        height: 1rem;
        &.border-bottom-1px {
          @include border-bottom-1px($color-border-e6);
        }
        .title {
          font-size: $font-size-medium;
          flex: 1;
        }
        .tip {
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
    }
    .btn-wrapper {
      padding: 0.8rem 0.3rem 0;
      button {
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        border: 1px solid $primary-color;
        font-size: $font-size-medium;
        color: $primary-color;
        background: transparent;
      }
    }
  }
</style>
