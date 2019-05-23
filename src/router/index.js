import Vue from 'vue';
import Router from 'vue-router';
import { isLogin } from 'common/js/util';

Vue.use(Router);

// 首页
const Home = () => import('pages/home/home');

// 用户
const User = () => import('pages/user/user');
// 修改手机号
const ChangeMobile = () => import('pages/change-mobile/change-mobile');

// 登录
const Login = () => import('pages/login/login');
// 找回密码
const FindPwd = () => import('pages/find-pwd/find-pwd');
// 班组信息
const ClassList = () => import('pages/class/class');
// 新增修改班组信息
const ClassAddEdit = () => import('pages/class-addedit/class-addedit');
// 班组详情
const ClassDetail = () => import('pages/class-detail/class-detail');

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      meta: { title: '首页', auth: true },
      component: Home
    },
    {
      path: '/user',
      meta: { title: '用户中心', auth: true },
      component: User
    },
    {
      path: '/change-pwd',
      meta: { title: '修改密码', auth: true },
      component: FindPwd
    },
    {
      path: '/change-mobile',
      meta: { title: '修改手机号', auth: true },
      component: ChangeMobile
    },
    {
      path: '/login',
      meta: { title: '登录' },
      component: Login
    },
    {
      path: '/find-pwd',
      meta: { title: '找回密码' },
      component: FindPwd
    },
    {
      path: '/class',
      meta: { title: '班组信息', auto: true },
      component: ClassList,
      children: [{
        path: 'add',
        meta: { title: '新增班组', auto: true },
        component: ClassAddEdit
      }, {
        path: 'edit/:code',
        meta: { title: '修改班组', auto: true },
        component: ClassAddEdit
      }, {
        path: ':code',
        meta: { title: '班组详情', auto: true },
        component: ClassDetail
      }]
    }
  ]
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  // 判断该路由是否需要登录权限
  if (to.meta.auth) {
    if (isLogin()) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
