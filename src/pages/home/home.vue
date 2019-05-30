<template>
  <div class="full-screen-wrapper home-wrapper">
    <router-link to="/user" tag="div" class="card-wrapper">
      <div class="card-container">
        <div class="card-photo">
          <img :src="getAvatar()"/>
        </div>
        <div class="card-info">
          <div class="card-title">真实姓名：{{realName}}</div>
          <div class="card-tip">角色名称：xxx</div>
        </div>
        <i></i>
      </div>
    </router-link>
    <div class="bar-wrapper">
      <i></i>工程信息
    </div>
    <div class="smallIcons">
      <div>
        <div v-for="item in items1" class="item" @click="$router.push(item.to);">
          <img v-bind:src="item.src"><br>
          <span>{{item.text}}</span>
        </div>
      </div>
      <div class="">
        <div v-for="item in items2" class="item" @click="$router.push(item.to);">
          <img v-bind:src="item.src"><br>
          <span>{{item.text}}</span>
        </div>
      </div>
    </div>
    <full-loading v-show="loadingFlag"></full-loading>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { SET_USER } from 'store/mutation-types';
  import FullLoading from 'base/full-loading/full-loading';
  import { formatAvatar } from 'common/js/util';
  import { getUser } from 'api/user';

  export default {
    data() {
      return {
        items1: [{
          text: '班组信息',
          src: require('./班组信息@2x.png'),
          to: '/class'
        }, {
          text: '项目人员',
          src: require('./项目人员@2x.png'),
          to: '/project-member'
        }, {
          text: '进退场',
          src: require('./进退场@2x.png'),
          to: '/filed'
        }],
        items2: [{
          text: '进出记录',
          src: require('./进出记录@2x.png'),
          to: '/isEntryRecord'
        }, {
          text: '考勤记录',
          src: require('./考勤记录@2x.png'),
          to: '/in-out'
        }, {
          text: '工资单',
          src: require('./工资单@2x.png'),
          to: ''
        }],
        loadingFlag: true
      };
    },
    created() {
      this.getInitData();
    },
    computed: {
      realName() {
        return this.user ? this.user.realName : '';
      },
      mobile() {
        return this.user ? this.user.mobile : '';
      },
      ...mapGetters([
        'user'
      ])
    },
    methods: {
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
          this.setUser(data);
        });
      },
      getAvatar() {
        if (!this.user) {
          return require('./avatar.png');
        }
        return formatAvatar(this.user.photo);
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
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .home-wrapper {
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
        i {
          width: 0.255rem;
          height: 0.255rem;
          @include bg-image('right');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: right center;
        }
      }
    }
    .bar-wrapper {
      display: flex;
      align-items: center;
      padding: 0.43rem 0.3rem;
      font-size: $font-size-medium-xx;
      i {
        height: 0.3rem;
        width: 0.05rem;
        background: $primary-color;
        margin-right: 0.12rem;
      }
    }
    .smallIcons {
      width: 100%;
      background: #fff;
      border-top: 0.01rem solid $color-border;
      div {
        border-bottom: 0.01rem solid $color-border;
      }
      .item {
        float: left;
        width: 33.3%;
        height: 1.9rem;
        padding-top: 0.515rem;
        text-align: center;
        +.item {
          border-left: 1px solid $color-border-e6;
        }
        img {
          margin-bottom: 0.15rem;
          width: 0.72rem;
          height: 0.72rem;
        }
        span {
          font-size: $font-size-small;
          color: #666;
          margin: 0 auto;
        }
      }
    }
  }
</style>
