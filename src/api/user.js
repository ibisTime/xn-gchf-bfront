import {USER_TYPE} from './config';
import fetch from 'common/js/fetch';
import {getUserId} from 'common/js/util';

/**
 * 用户手机号注册
 * @param {string} mobile
 * @param {string} smsCaptcha
 * @param {string} loginPwd
 */
export function register(mobile, smsCaptcha, loginPwd) {
  return fetch(805041, {
    kind: USER_TYPE,
    mobile,
    smsCaptcha,
    loginPwd
  });
}

/**
 * 用户名密码登录
 * @param {string} loginName
 * @param {string} loginPwd
 */
export function login(loginName, loginPwd) {
  return fetch(631071, {
    type: USER_TYPE,
    loginName,
    loginPwd
  });
}

/**
 * 获取用户详情
 */
export function getUser() {
  return getUserById(getUserId());
}

/**
 * 获取用户详情
 * @param {string} userId
 */
export function getUserById(userId) {
  return fetch(631087, { userId });
}

// 修改手机号旧手机验证码校验
export function changeMobCaptValid (mobile, captcha, bizType) {
  return fetch(804082, {
    mobile,
    captcha,
    bizType
  });
}
/**
 * 修改手机号
 * @param {string} newMobile
 * @param {string} smsCaptcha
 */
export function changeMobile(newMobile, smsCaptcha) {
  return fetch(805061, {
    newMobile,
    smsCaptcha,
    userId: getUserId()
  });
}

/**
 * 修改登录密码
 * @param {string} oldLoginPwd
 * @param {string} newLoginPwd
 */
export function changePwd(oldLoginPwd, newLoginPwd) {
  return fetch(805064, {
    oldLoginPwd,
    newLoginPwd,
    userId: getUserId()
  });
}

/**
 * 设置支付密码
 * @param {string} tradePwd
 * @param {string} smsCaptcha
 */
export function setTradePwd(tradePwd, smsCaptcha) {
  return fetch(805066, {
    tradePwd,
    smsCaptcha,
    userId: getUserId()
  });
}

/**
 * 重置登录密码
 * @param {string} mobile
 * @param {string} smsCaptcha
 * @param {string} newLoginPwd
 */
export function resetPwd(mobile, smsCaptcha, newLoginPwd) {
  return fetch(631080, {
    mobile,
    smsCaptcha,
    newLoginPwd
  });
}

/**
 * 修改昵称
 * @param {string} nickname
 */
export function changeNickname(nickname) {
  return fetch(805082, {
    nickname,
    userId: getUserId()
  });
}

/**
 * 修改用户头像
 * @param {string} photo
 */
export function changeAvatar(photo) {
  return fetch(805080, {
    photo,
    userId: getUserId()
  });
}

/**
 * 实名认证
 * @param {string} realName
 * @param {string} idNo
 */
export function certification (realName, idNo) {
  return fetch(805190, {
    realName,
    idNo,
    idKind: 1,
    userId: getUserId()
  });
}

/**
 * 保存登录日志
 */
export function saveLoginLog () {
  return fetch(805350, {
    userId: getUserId()
  });
}
