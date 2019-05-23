import fetch from 'common/js/fetch';
import { getUserId } from 'common/js/util';
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
