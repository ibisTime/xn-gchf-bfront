<template>
    <div class="full-screen-wrapper search-wrapper">
        <div class="seaBanner">
            <p class="seaCenter">
                搜索
            </p>
        </div>
        <div class="seaSelect">
            <div class="left">
              所在班组
            </div>
          <div class="right">
            <select v-model="config.teamSysNo">
              <option
                :value="item.code"
                v-for="(item, index) in teamData"
                :key="index"
              >{{item.teamName}}</option>
            </select>
          </div>
        </div>
        <div class="seaSelect">
           <div class="left">
             项目人员
           </div>
           <div class="right">
             <input type="text" v-model="config.workerName" placeholder="请输入项目人员">
           </div>
        </div>
        <div class="seaSelect">
          <div class="left">
            上传状态
          </div>
          <div class="right">
            <select v-model="config.uploadStatus">
              <option
                :value="item.key"
                v-for="(item, index) in statusList"
                :key="index"
              >{{item.value}}</option>
            </select>
          </div>
        </div>
        <div class="footer" @click="searchUser">
            搜索
        </div>
    </div>
</template>
<script>
  import { xmbzList } from 'api/deal';
  import{getDictList} from 'api/general';
  export default {
    data() {
      return {
        config: {
          workerName: '',
          teamSysNo: '',
          uploadStatus: ''
        },
        teamData: [],
        statusList: []
      }
    },
    created() {
      let projectCode = sessionStorage.getItem('organizationCode');
      Promise.all([
        xmbzList({projectCode}),
        getDictList('upload_status')
      ]).then(([data1, data2]) => {
        this.teamData = data1;
        this.statusList = data2.map(item => ({
          key: item.dkey,
          value: item.dvalue
        }));
      });
    },
    methods: {
      searchUser() {
        if(this.config.teamSysNo || this.config.uploadStatus || this.config.workerName) {
          sessionStorage.setItem('teamUserConfig', JSON.stringify(this.config));
        }
        let { origin } = this.$route.query;
        switch(origin) {
          case 'project': this.$router.push('/project-member'); break;
          case 'filed': this.$router.push('/filed'); break;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";
*{
    padding: 0;
    margin: 0;
}
.seaBanner{
    position: relative;
    height:1.28rem;
    width:100%;
    background:#028EFF;
    text-align: center;
    font-size: 0.36rem;
    color: #fff;
    .seaCenter{
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translateX(-50%) translateY(-50%);
    }
}
.seaSelect{
      position: relative;
  display: flex;
      width: 100%;
      height: 1rem;
      font-size: 0.28rem;
      color: #999;
      padding:0.375rem;
      box-shadow: 0 1px 0 0 #E6E6E6;
      line-height: .55rem;
  .left{
    width: 30%;
  }
  .right{
    width: 70%;
    select{
      width: 100%;
    }
  }
}
.footer{
    width:92%;
    height: .9rem;
    line-height: .9rem;
    margin: 0 auto;
    margin-top: 2rem;
    text-align:center;
    background: #028EFF;
    color: #fff;
    font-size: 0.32rem;
}
// .selectDis{
//     width: 100%;
//     color: #999;
//     font-size:0.3rem;
//     ul{
//         width:90%;
//         margin:0 auto;
//             li{
//                 width: 100%;
//                 list-style: none;
//                 border-bottom: 1px solid #999;
//         }
//     }
// }

</style>
