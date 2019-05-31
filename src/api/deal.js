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

// 分页查人员进退场
export function userInOutSite(config) {
  return fetch(631745, {
    ...config,
    userId: getUserId()
  });
}

// 列表查人员进退场
export function getEntryOutList(config) {
  return fetch(631747, {
    userId: getUserId(),
    ...config
  });
}

// 添加人员进退场
export function addEditInOut(code, config) {
  return fetch(code, {
    ...config,
    userId: getUserId()
  });
}

// 列表查询班组人员
export function userQueryList(config) {
  return fetch(631607, {
    ...config,
    userId: getUserId()
  });
}

// 考勤人员列表
export function projectLists(config) {
  return fetch(631845, {
    ...config,
    userId:getUserId()
  });
}

//考勤记录
export function inOutLists(config) {
  return fetch(631725, {
    ...config,
    userId:getUserId()
  });
}

// 详细查人员进退场
export function userInOutDetail(config) {
  return fetch(631746, {
    ...config,
    userId: getUserId()
  });
}

// 详细查实名认证信息
export function authenticationDetail(code) {
  return fetch(631806, {
    code,
    userId: getUserId()
  });
}

// 录入考勤照片
export function inKaoQingPic(config) {
  return fetch(631794, {
    ...config,
    userId: getUserId()
  });
}

// 添加班组人员
export function addUserRz(config) {
  return fetch(631696, {
    ...config,
    userId: getUserId()
  });
}

// 添加银行卡
export function addBackCard(config) {
  return fetch(631750, {
    ...config,
    userId: getUserId()
  });
}
