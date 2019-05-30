import fetch from 'common/js/fetch';

// 获取七牛token
export function getQiniuToken() {
  return fetch(631091, {});
}

// 发送验证码
export function sendCaptcha(mobile, bizType) {
  return fetch(631090, {
    bizType,
    mobile
  });
}

// 列表查寻数据字典
export function getDictList(parentKey) {
  if (getDictList[parentKey]) {
    return Promise.resolve(getDictList[parentKey]);
  }
  return fetch(631006, {
    parentKey
  }).then((data) => {
    getDictList[parentKey] = data;
    return Promise.resolve(data);
  });
}

//根据type列表查数据字典
export function getTypeDicList(type) {
  return fetch(631006, {
    type
  }).then((data) => {
    return Promise.resolve(data);
  });
}
