import * as types from './mutation-types';

// 新增项目班组
export const addClassList = function({ commit, state }, { data }) {
  let classList = state.classList.slice();
  classList.unshift(data);
  commit(types.SET_CLASS_LIST, classList);
};
