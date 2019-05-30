import * as types from './mutation-types';

// 新增班组信息
export const addClassInfo = function({ commit, state }, { data }) {
  let classList = state.classList.slice();
  classList.unshift(data);
  commit(types.SET_CLASS_LIST, classList);
};

// 修改班组信息
export const editClassInfo = function({ commit, state }, { data }) {
  let classList = state.classList.slice();
  let index = classList.findIndex(item => item.code === data.code);
  if (index !== -1) {
    classList.splice(index, 1, data);
  }
  commit(types.SET_CLASS_LIST, classList);
};

// 删除班组信息
export const deleteClassInfo = function({ commit, state }, { code }) {
  let classList = state.classList.slice();
  let index = classList.findIndex(item => item.code === code);
  if (index !== -1) {
    classList.splice(index, 1);
  }
  commit(types.SET_CLASS_LIST, classList);
};
