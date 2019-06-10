<template>
  <div class="full-screen-wrapper class-detail-wrapper">
    <scroll ref="scroll">
      <div class="form-wrapper form-gray-wrapper">
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">员工编号</div>
            <input type="text" v-validate="'required'" class="item-input" />
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">工人工资银行</div>
            <input type="text" v-validate="'required'" class="item-input" />
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">所在参建单位银行</div>
            <input type="text" v-validate="'required'" class="item-input" />
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">应发金额</div>
            <input type="text" v-validate="'required'" class="item-input" />
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">实发金额</div>
            <input type="text" v-validate="'required'" class="item-input" />
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">发放日期</div>
            <date-picker class="item-input"
                         :year="entryYear"
                         :month="entryMonth"
                         :day="entryDay"
                         @change="updateEntryDate"></date-picker>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">是否为补发</div>
            <select type="text" class="item-input">
              <option></option>
            </select>
            <i class="select-icon"></i>
            <span v-show="errors.has('responsiblePersonIdcardType')" class="error-tip">{{errors.first('responsiblePersonIdcardType')}}</span>
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">出勤天数</div>
            <input type="text" v-validate="'required'" class="item-input" />
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">总工时</div>
            <input type="text" v-validate="'required'" class="item-input" />
          </div>
        </div>
        <div class="form-item border-bottom-1px">
          <div class="item-input-wrapper">
            <div class="item-label">第三方工资单编号</div>
            <input type="text" v-validate="'required'" class="item-input" />
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

</script>
<style lang="scss" scoped>
</style>
