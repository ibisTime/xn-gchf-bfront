import fetch from 'common/js/fetch';
import { getUserId, getProjectCode } from 'common/js/util';
import { LIMIT } from './config';

/**
 * 分页查询班组信息
 * @param {string} limit
 * @param {string} start
 */
export function getPageClass(start = 1, limit = LIMIT) {
  return fetch(631665, {
    limit,
    start,
    userId: getUserId()
  });
}

/**
 * 详情查询班组信息
 * @param {string} code
 */
export function getClassDetail(code) {
  return fetch(631666, {
    code,
    userId: getUserId()
  });
}

/**
 * 新增班组
 * @param {object} params
 */
export function addClassInfo(params) {
  return fetch(631650, {
    ...params,
    projectCode: getProjectCode(),
    userId: getUserId()
  });
}

/**
 * 修改班组
 * @param {object} params
 */
export function editClassInfo(params) {
  return fetch(631652, {
    ...params,
    projectCode: getProjectCode(),
    userId: getUserId()
  });
}

/**
 * 删除班组
 * @param {string} code
 */
export function deleteClass(code) {
  return fetch(631651, {
    codeList: [code],
    userId: getUserId()
  });
}

/**
 * 列表查询某个项目下的参建单位列表
 */
export function getCropList() {
  return fetch(631647, {
    projectCode: getProjectCode(),
    userId: getUserId()
  });
}
