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
// 项目人员
const ProjectMember = () => import('pages/project-member/project-member');
//搜索
const search = () => import('pages/search/search');
//考勤人员
const CheckWork = () => import('pages/check-work/check-work');
//考勤详情
const CheckWorkDetails = () =>import('pages/checkWorkDetails/checkWorkDetails');
//考勤补录
const Supp = () =>import('pages/supp/supp');
//进出详情
const InOut = () => import('pages/in-out/in-out');
//人员详情
const MemberDetails = () => import('pages/MemberDetails/MemberDetails');
//人脸采集
const FaceCollect = () => import('pages/faceCollect/faceCollect');
//人员建档
const CreateRecord = () => import('pages/createRecord/createRecord');
//人员建档 2
const RecordCopy = () => import('pages/recordCopy/recordCopy');
//手持照片
const Photo = () => import('pages/photo/photo');
//基本信息录入
const BaseInfo = () => import('pages/baseInfo/baseInfo');
//办理入职
const HandleEntry = () => import('pages/handleEntry/handleEntry');
//基本信息
const Information = () => import('pages/information/information');
//进退场
const Filed = () => import('pages/filed/filed');
//进退场 进出详情
const IntoDetails = () => import('pages/into-details/into-details');
//新增修改进退场
const AddProject = () => import('pages/addProject/addProject');
//进出记录
const IsEntryRecord = () => import('pages/isEntryRecord/isEntryRecord');
//进出详情 详情
const DetailsText = () => import('pages/detailsText/detailsText');
// 进出记录 进出详情
const OutDetails = () => import('pages/outDetails/outDetails');
//工资单
const Wage = () => import('pages/wage/wage');
//绑定银行卡
const BindCard = () => import('pages/bindCard/bindCard');
//绑定银行卡
const Bind =() => import('pages/bind/bind');
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
    }, {
      path: '/project-member',
      meta: { title: '项目人员', auto: true },
      component: ProjectMember
    }, {
      path: '/search',
      meta: { title: '搜索', auto: true },
      component: search
    }, {
      path: '/check-work',
      meta: { title: '考勤人员', auto: true },
      component: CheckWork
    }, {
      path: '/in-out',
      meta: { title: '考勤人员', auto: true },
      component: InOut
    }, {
      path: '/memberDetails',
      meta: { title: '人员详情', auto: true },
      component: MemberDetails,
    }, {
      path: '/faceCollect',
      meta: { title: '人脸采集', auto: true },
      component: FaceCollect
    }, {
      path: '/createRecord',
      meta: { title: '人员建档', auto: true },
      component: CreateRecord
    }, {
      path: '/recordCopy',
      meta: { title: '人员建档2', auto: true },
      component: RecordCopy
    }, {
      path: '/photo',
      meta: { title: '手持照片', auto: true },
      component: Photo
    }, {
      path: '/baseInfo',
      meta: { title: '基本信息录入', auto: true },
      component:BaseInfo
    }, {
      path: '/handleEntry',
      meta: { title: '基本信息录入', auto: true },
      component:HandleEntry
    }, {
      path: '/information',
      meta: { title: '项目人员', auto: true },
      component:Information
    }, {
      path: '/filed',
      meta: { title: '进退场记录', auto: true },
      component:Filed
    }, {
      path: '/into-details',
      meta: { title: '进出详情', auto: true },
      component:IntoDetails
    }, {
      path: '/addProject',
      meta: { title: '新增修改进退场', auto: true },
      component:AddProject
    }, {
      path: '/isEntryRecord',
      meta: { title: '进出记录', auto: true },
      component:IsEntryRecord
    }, {
      path: '/detailsText',
      meta: { title: '进出记录', auto: true },
      component:DetailsText
    }, {
      path: '/wage',
      meta: { title: '工资状况', auto: true },
      component:Wage
    }, {
      path: '/checkWorkDetails',
      meta: { title: '考勤详情', auto: true },
      component:CheckWorkDetails
    }, {
      path: '/supp',
      meta: { title: '考勤补录', auto: true },
      component:Supp
    }, {
      path: '/outDetails',
      meta: { title: '考勤补录', auto: true },
      component:OutDetails
    }, {
      path: '/bindCard',
      meta: { title: '绑定银行卡', auto: true },
      component:BindCard
    }, {
      path: '/bind',
      meta: { title: '绑定银行卡', auto: true },
      component:Bind
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
