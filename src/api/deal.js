import fetch from 'common/js/fetch';
import {getUserId} from 'common/js/util';

const projectCode = sessionStorage.getItem('organizationCode');
// 项目人员
export function deal(config) {
  return fetch(631605, {
    limit: 10,
    userId: getUserId(),
    projectCode,
    ...config
  });
}

// 列表查询项目班组
export function xmbzList(config) {
  return fetch(631667, {
    ...config,
    userId: getUserId()
  });
}

// OCR识别身份证
export function orcIdNo(config) {
  return fetch(631795, {
    ...config,
    userId: getUserId()
  });
}

// 手持身份证照片录入
export function scPicEntry(config) {
  return fetch(631796, config);
}

// 基本信息录入
export function baseInfoEntry(config) {
  return fetch(631797, config);
}

// 添加人员进退场
export function userInOut(config) {
  return fetch(631730, {
    ...config,
    userId: getUserId()
  });
}

// 详细查询班组人员
export function teamUserDetail(code) {
  return fetch(631606, {
    code,
    userId: getUserId()
  });
}

//考勤人员列表
export function projectLists(config){
  return fetch(631845,config);
}
