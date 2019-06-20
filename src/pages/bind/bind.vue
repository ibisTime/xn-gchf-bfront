<template>
    <div class="full-screen-wrapper supp-wrapper">
        <div class="wrapper form-wrapper">
            <div class="baseBanner">
                <p class="toBack" @click="toBack">返回</p>
                <p class="baseCenter">
                    绑定银行卡
                </p>
            </div>
            <div class="bank form-item">
                <div class="left"><span class="red">*</span>银行</div>
                <div class="right">
                    <select v-model="config.bankCode">
                        <option value="">请选择</option>
                        <option :value="item.key" v-for="(item, index) in backNameList" :key="index">{{item.value}}</option>
                    </select>
                </div>
            </div>
            <div class="bank">
                <div class="left"><span class="red">*</span>开户支行</div>
                <div class="right">
                  <input type="text" placeholder="请输入开户支行" v-model="config.subranch" v-validate="'required'" name="subranch"/>
                  <span v-show="errors.has('subranch')" class="error-tip">{{errors.first('subranch')}}</span>
                </div>
            </div>
            <div class="bank">
                <div class="left"><span class="red">*</span>银行卡号</div>
                <div class="right">
                  <input type="number" placeholder="请输入银行卡号" v-model="config.bankNumber" name="bankNumber"/>
                  <!--<span v-show="errors.has('bankNumber')" class="error-tip">{{errors.first('bankNumber')}}</span>-->
                  <!--<span v-show="errors.has('bankNumber')" class="error-tip">{{errors.first('bankNumber')}}</span>-->
                </div>
            </div>
            <div class="bank">
                <div class="left"><span class="red">*</span>银行联号</div>
                <div class="right">
                    <input type="text" placeholder="请输入银行联号" v-model="config.bankLinkNumber"/>
                </div>
            </div>
            <div class="next-step" @click="bindBankCard">
                确定
            </div>
        </div>
      <toast ref="toast" :text="toastText"></toast>
      <loading :isLoading="isLoading"></loading>
    </div>
</template>
<script>
  import{getDictList} from 'api/general';
  import{addBackCard} from 'api/deal';
  import Toast from 'base/toast/toast';
  import Loading from 'base/loading/loading';
export default{
    data(){
        return{
          backNameList: [],
          config: {
            businessType: '002',
            businessSysNo: '',
            subranch: '',
            bankCode: '',
            bankNumber: '',
            bankLinkNumber: ''
          },
          code: '',
          isLoading: true,
          toastText: '操作成功'
        }
    },
  created() {
      const {code} = this.$route.query;
      this.config.businessSysNo = code;
    getDictList('bank_code').then(data => {
      this.backNameList = data.map(item => ({
        key: item.dkey,
        value: item.dvalue
      }));
      this.isLoading = false;
    });
  },
  methods: {
    bindBankCard() {
      if(
        !this.config.subranch ||
        !this.config.bankCode ||
        !this.config.bankNumber ||
        !this.config.bankLinkNumber
      ) {
        this.toastText = '请填写完整';
          this.$refs.toast.show();
      }else {
        this.$validator.validateAll().then((result) => {
          if (result) {
            addBackCard(this.config).then(() => {
              this.toastText = '操作成功';
              this.$refs.toast.show();
              this.$router.replace(`/bindCard?code=${this.config.businessSysNo}`);
            });
          }});
      }
    },
    toBack(){
      window.history.go(-1);
    }
  },
  components: {
    Toast,
    Loading
  }
}
</script>
<style lang="scss" scoped>
.supp-wrapper{
    *{
        padding: 0;
        margin: 0;
    }
   .wrapper{
     .baseBanner{
        position: relative;
        height: 1.28rem;
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
    .bank{
      display: flex;
        height: 1.1rem;
        width: 92%;
        margin: 0 auto;
        line-height: 1.1rem;
        border-bottom: 1px solid rgba(235,235,235,1);
        .left{
            width: 24%;
            font-size: 0.3rem;
            color: #333;
        }
        .right{
            position: relative;
            width:75%;
            font-size: 0.3rem;
            color:#999;
            select{
                width: 100%;
            }
            .imgPic{
                position: absolute;
                right: 0;
                display: inline-block;
                width: .18rem;
                height: .15rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .footer{
        width: 92%;
        margin: 0 auto;
        background:#028EFF;
        padding: 0.24rem 3.15rem 0.24rem 3.15rem;
        color: #fff;
        font-size: .3rem;
        margin-top: 1.5rem;
    }
     .error-tip{
       color: #ff0000;
     }
     .next-step{
       margin: 0 auto;
       width: 92%;
       height: 0.9rem;
       text-align: center;
       line-height: 0.9rem;
       font-family: PingFangSC-Semibold;
       font-size: 0.32rem;
       color: #FFFFFF;
       letter-spacing: 0;
       margin: 1.5rem auto;
       background: #028EFF;
       border-radius: 4px;
     }
   }
    .red{
      color: red;
      margin-right: 0.1rem;
    }
}
</style>
