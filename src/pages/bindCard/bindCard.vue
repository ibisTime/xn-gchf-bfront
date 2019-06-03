<template>
    <div class="full-screen-wrapper supp-wrapper">
        <scroll ref="scroll":hasMore="hasMore" @pullingUp="getQueryList" :data="bankCardList">
                <div>
                    <div class="baseBanner">
                        <p class="baseCenter">
                            我的银行卡
                        </p>
                      <p class="bind" @click="toBindCard">绑定</p>
                    </div>

                    <div class="bankCard" v-for="(item, index) in bankCardList" :key="index">
                      <div class="card-msg">
                        <div class="back-name">
                          <p>{{item.bankName}}</p>
                          <p>储蓄卡</p>
                        </div>
                        <div class="card">{{formattingBankCode(item.bankNumber)}}</div>
                      </div>
                        <!--<div class="left">-->
                            <!--<label :for="`collect${index}`">-->
                              <!--<input-->
                                <!--type="checkbox"-->
                                <!--:id="`collect${index}`"-->
                                <!--@change="setCollect(index)"-->
                                <!--:class="setIndex === index ? 'setIup' : ''"-->
                              <!--/>-->
                              <!--默认收款-->
                            <!--</label>-->
                        <!--</div>-->
                        <!--<div class="right">-->
                            <!--解绑-->
                        <!--</div>-->
                    </div>
                </div>
          <noResult title="暂无银行卡" v-if="bankCardList.length === 0 && !hasMore" style="margin-top: 0.8rem"/>
        </scroll>
      <toast ref="toast" :text="toastText"></toast>
      <loading :isLoading="isLoading" title="'正在努力加载中....'"></loading>
    </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import Toast from 'base/toast/toast';
import Loading from 'base/loading/loading';
import NoResult from 'base/no-result/no-result';
import {queryPageBack} from 'api/deal';
import {formattingBankCode} from 'common/js/util';
export default {
    data(){
        return{
          setIndex: false,
          config: {
            start: 1,
            limit: 10,
            businessSysNo: ''
          },
          code: '',
          toastText: '',
          isLoading: true,
          hasMore: true,
          bankCardList: []
        }
    },
  created() {
    const { code } = this.$route.query;
    this.code = code;
    this.getQueryList();
  },
  methods: {
    setCollect(index) {
      this.setIndex = index;
    },
    getQueryList() {
      this.config.businessSysNo = this.code;
      return queryPageBack(this.config).then(data => {
        this.isLoading = false;
        this.hasMore = (data.pageNO < data.totalPage);
        this.config.start ++;
        this.bankCardList = [...this.bankCardList, ...data.list];
      });
    },
    toBindCard() {
      this.$router.push(`/bind?code=${this.code}`);
    },
    formattingBankCode(card) {
      return formattingBankCode(card)
    }
  },
  components: {
    Scroll,
    Toast,
    Loading,
    NoResult
  }
}
</script>

<style lang="scss" scoped>
.supp-wrapper{
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
        .bind{
            position: absolute;
            top: .5rem;
            right: .4rem;
            color: #fff;
        }
    }
    .bankCard{
        position: relative;
        width: 92%;
        margin: 0 auto;
        margin-top: .3rem;
      background-image: url('./zhaoshang.png');
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      color: #fff;
      .card-msg{
        padding: 0.48rem .9rem;
        .back-name{
          font-size: 0.3rem;
          margin-bottom: 0.4rem;
          p{
            margin-bottom: 0.2rem;
          }
        }
        .card{
          font-size: 0.42rem;
        }
      }
      .left{
          position: absolute;
          bottom: 0.5rem;
          left: 0.4rem;
          display: inline-block;
          z-index: 10;
          color: #fff;
          font-size: 0.24rem;
          input{
              width: 0.22rem;
              height: 0.22rem;
              border: 1px solid rgba(255,255,255,1);
              border-radius: 20px;
          }
      }
      .right{
          position: absolute;
          bottom: 0.5rem;
          right: 0.5rem;
          display: inline-block;
          z-index: 1;
          color: #fff;
          font-size: 0.24rem;
      }
    }
    .setIup{
      background: #028EFF !important;
    }
}
</style>

