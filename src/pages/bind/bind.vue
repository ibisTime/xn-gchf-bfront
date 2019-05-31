<template>
    <div class="full-screen-wrapper supp-wrapper">
        <div class="wrapper">
            <div class="baseBanner">
                <p class="baseCenter">
                    绑定银行卡
                </p>
            </div>
            <div class="bank">
                <div class="left">银行</div>
                <div class="right">
                    <select>
                        <option value="">请选择</option>
                        <option :value="item.key" v-for="(item, index) in backNameList" :key="index">{{item.value}}</option>
                    </select>
                </div>
            </div>
            <div class="bank">
                <div class="left">开户支行</div>
                <div class="right">
                  <input type="number" placeholder="请输入开户支行"/>
                </div>
            </div>
            <div class="bank">
                <div class="left">银行卡号</div>
                <div class="right">
                    <input type="number" placeholder="请输入银行卡号"/>
                </div>
            </div>
            <div class="bank">
                <div class="left">银行联号</div>
                <div class="right">
                    <input type="number" placeholder="请输入银行联号"/>
                </div>
            </div>
            <div class="footer">
                确定
            </div>
        </div>
    </div>
</template>
<script>
  import{getDictList} from 'api/general';
export default{
    data(){
        return{
          backNameList: []
        }
    },
  created() {
    getDictList('bank_code').then(data => {
      this.backNameList = data.map(item => ({
        key: item.dkay,
        value: item.dvalue
      }));
    });
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
        height:.8rem;
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
   }
}
</style>
