<template>
  <div class="full-screen-wrapper class-detail-wrapper">
    <scroll :pullUpLoad="pullUpLoad" ref="scroll">
      <div class="form-wrapper form-gray-wrapper">
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title">所在企业</div>
            <select type="text" name="corpCode" v-model="corpCode" v-validate="'required'" class="item-input">
              <option v-for="item in corpList" :key="item.corpCode" :value="item.corpCode">{{item.corpName}}</option>
            </select>
            <i class="select-icon"></i>
            <span v-show="errors.has('corpCode')" class="error-tip">{{errors.first('corpCode')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title">班组名称</div>
            <input type="text" name="teamName" v-model="teamName" v-validate="'required'" class="item-input" />
            <span v-show="errors.has('teamName')" class="error-tip">{{errors.first('teamName')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">所在企业统一社会信用代码</div>
            <div class="item-input">{{corpCode}}</div>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title">责任人姓名</div>
            <input type="text" name="responsiblePersonName" v-model="responsiblePersonName" class="item-input" />
            <span v-show="errors.has('responsiblePersonName')" class="error-tip">{{errors.first('responsiblePersonName')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">责任人联系电话</div>
            <input type="text" name="responsiblePersonPhone" v-model="responsiblePersonPhone" v-validate="'mobile'" class="item-input" />
            <span v-show="errors.has('responsiblePersonPhone')" class="error-tip">{{errors.first('responsiblePersonPhone')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">责任人证件类型</div>
            <select type="text" name="responsiblePersonIdcardType" v-model="responsiblePersonIdcardType" class="item-input">
              <option v-for="item in cardTypeList" :key="item.dkey" :value="item.dkey">{{item.dvalue}}</option>
            </select>
            <i class="select-icon"></i>
            <span v-show="errors.has('responsiblePersonIdcardType')" class="error-tip">{{errors.first('responsiblePersonIdcardType')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">责任人证件号码</div>
            <input type="text" name="responsiblePersonIdNumber" v-model="responsiblePersonIdNumber" v-validate="'idCard'" class="item-input" />
            <span v-show="errors.has('responsiblePersonIdNumber')" class="error-tip">{{errors.first('responsiblePersonIdNumber')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title">进场时间</div>
            <date-picker class="item-input"
                         :year="entryYear"
                         :month="entryMonth"
                         :day="entryDay"
                         @change="updateEntryDate"></date-picker>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title">退场时间</div>
            <date-picker class="item-input"
                         :year="exitYear"
                         :month="exitMonth"
                         :day="exitDay"
                         @change="updateExitDate"></date-picker>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title">班组长姓名</div>
            <input type="text" name="teamLeaderName" v-model="teamLeaderName" class="item-input" />
            <span v-show="errors.has('teamLeaderName')" class="error-tip">{{errors.first('teamLeaderName')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">班组长联系电话</div>
            <input type="text" name="teamLeaderPhone" v-model="teamLeaderPhone" v-validate="'mobile'" class="item-input" />
            <span v-show="errors.has('teamLeaderPhone')" class="error-tip">{{errors.first('teamLeaderPhone')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">班组长证件类型</div>
            <select type="text" name="teamLeaderIdcardType" v-model="teamLeaderIdcardType" class="item-input">
              <option v-for="item in cardTypeList" :key="item.dkey" :value="item.dkey">{{item.dvalue}}</option>
            </select>
            <i class="select-icon"></i>
            <span v-show="errors.has('teamLeaderIdcardType')" class="error-tip">{{errors.first('teamLeaderIdcardType')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">班组长证件号码</div>
            <input type="text" name="teamLeaderIdNumber" v-model="teamLeaderIdNumber" class="item-input" />
            <span v-show="errors.has('teamLeaderIdNumber')" class="error-tip">{{errors.first('teamLeaderIdNumber')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-title">备注</div>
            <input type="text" name="remark" v-model="remark" class="item-input" />
            <span v-show="errors.has('remark')" class="error-tip">{{errors.first('remark')}}</span>
          </div>
        </div>
        <div class="form-btn">
          <button @click="save">保存</button>
        </div>
      </div>
    </scroll>
    <full-loading v-show="loadingFlag"></full-loading>
    <toast ref="toast" :text="toastText"></toast>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import Scroll from 'base/scroll/scroll';
  import FullLoading from 'base/full-loading/full-loading';
  import Toast from 'base/toast/toast';
  import DatePicker from 'base/date-picker/date-picker';
  import { getClassDetail, getCropList, addClassInfo, editClassInfo } from 'api/biz';
  import { getDictList } from 'api/general';
  import { formatDate } from 'common/js/util';

  export default {
    data() {
      return {
        corpCode: '',
        teamName: '',
        responsiblePersonName: '',
        responsiblePersonPhone: '',
        responsiblePersonIdcardType: '',
        responsiblePersonIdNumber: '',
        entryYear: '',
        entryMonth: '',
        entryDay: '',
        exitYear: '',
        exitMonth: '',
        exitDay: '',
        teamLeaderName: '',
        teamLeaderPhone: '',
        teamLeaderIdcardType: '',
        teamLeaderIdNumber: '',
        remark: '',
        corpList: [],
        cardTypeList: [],
        loadingFlag: true,
        toastText: ''
      };
    },
    computed: {
      entryTime() {
        if (this.entryYear && this.entryMonth && this.entryDay) {
          return this.entryYear + '-' + this.entryMonth + '-' + this.entryDay;
        }
        return '';
      },
      exitTime() {
        if (this.exitYear && this.exitMonth && this.exitDay) {
          return this.exitYear + '-' + this.exitMonth + '-' + this.exitDay;
        }
        return '';
      }
    },
    created() {
      this.pullUpLoad = null;
      let fetchList = [
        this.getCropList(),
        this.getCardTypeList()
      ];
      if (this.$route.path.indexOf('/class/edit') !== -1) {
        this.isEdit = true;
        fetchList.push(this.getClassDetail());
      }
      Promise.all(fetchList).then(() => {
        this.loadingFlag = false;
      }).catch(() => {
        this.loadingFlag = false;
      });
    },
    mounted() {
      setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 40);
    },
    methods: {
      getClassDetail() {
        return getClassDetail(this.$route.params.code).then(data => {
          this.corpCode = data.corpCode || '';
          this.teamName = data.teamName || '';
          this.responsiblePersonName = data.responsiblePersonName || '';
          this.responsiblePersonPhone = data.responsiblePersonPhone || '';
          this.responsiblePersonIdcardType = data.responsiblePersonIdcardType || '';
          this.responsiblePersonIdNumber = data.responsiblePersonIdNumber || '';
          if (data.entryTime) {
            let dates = formatDate(data.entryTime).split('-');
            this.entryYear = dates[0];
            this.entryMonth = dates[1];
            this.entryDay = dates[2];
          }
          if (data.exitTime) {
            let dates = formatDate(data.exitTime).split('-');
            this.exitYear = dates[0];
            this.exitMonth = dates[1];
            this.exitDay = dates[2];
          }
          this.teamLeaderName = data.teamLeaderName || '';
          this.teamLeaderPhone = data.teamLeaderPhone || '';
          this.teamLeaderIdcardType = data.teamLeaderIdcardType || '';
          this.teamLeaderIdNumber = data.teamLeaderIdNumber || '';
          this.remark = data.remark || '';
        });
      },
      getCropList() {
        return getCropList().then(data => {
          this.corpList = data;
        });
      },
      getCardTypeList() {
        return getDictList('legal_manid_card_type').then(data => {
          this.cardTypeList = data;
        });
      },
      updateEntryDate(year, month, day) {
        this.entryYear = year;
        this.entryMonth = month;
        this.entryDay = day;
      },
      updateExitDate(year, month, day) {
        this.exitYear = year;
        this.exitMonth = month;
        this.exitDay = day;
      },
      save() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadFlag = true;
            if (this.isEdit) {
              this.editClass(this.getParams());
            } else {
              this.addClass(this.getParams());
            }
          }
        });
      },
      addClass(params) {
        addClassInfo(params).then((data) => {
          params.code = data.code;
          params.uploadStatus = '0';
          this.addClassInfo({ data: params });
          this.doSuccess();
        }).catch(() => {
          this.loadFlag = false;
        });
      },
      editClass(params) {
        editClassInfo(params).then((data) => {
          params.uploadStatus = '0';
          this.editClassInfo({ data: params });
          this.doSuccess();
        }).catch(() => {
          this.loadFlag = false;
        });
      },
      doSuccess() {
        this.loadFlag = false;
        this.toastText = '保存成功';
        this.$refs.toast.show();
        setTimeout(() => {
          this.$router.push('/class');
        }, 1000);
      },
      getParams() {
        let params = {
          corpCode: this.corpCode,
          teamName: this.teamName,
          responsiblePersonName: this.responsiblePersonName,
          responsiblePersonPhone: this.responsiblePersonPhone,
          responsiblePersonIdcardType: this.responsiblePersonIdcardType,
          responsiblePersonIdNumber: this.responsiblePersonIdNumber,
          entryTime: this.entryTime,
          exitTime: this.exitTime,
          teamLeaderName: this.teamLeaderName,
          teamLeaderPhone: this.teamLeaderPhone,
          teamLeaderIdcardType: this.teamLeaderIdcardType,
          teamLeaderIdNumber: this.teamLeaderIdNumber,
          remark: this.remark
        };
        if (!params.teamLeaderName) {
          delete params.teamLeaderPhone;
          delete params.teamLeaderIdcardType;
          delete params.teamLeaderIdNumber;
        }
        if (this.isEdit) {
          params.code = this.$route.params.code;
        }
        return params;
      },
      ...mapActions([
        'addClassInfo',
        'editClassInfo'
      ])
    },
    components: {
      Scroll,
      FullLoading,
      Toast,
      DatePicker
    }
  };
</script>
<style lang="scss" scoped>
  .item1{
    width: 80%;
  }
  .item-title {
    padding-left: 0;
    color: #999;
  }
  input::-ms-input-placeholder{text-align: center;}
  input::-webkit-input-placeholder{text-align: center;}
</style>
