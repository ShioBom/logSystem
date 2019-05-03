import Vue from 'vue'
import VueRouter from "vue-router";

//注册
Vue.use(VueRouter);

//引入路由对应组件地址
import Home from '../pages/Home/index';
import Frontpage from "../pages/Frontpage/index";
import StaffManage from '../pages/StaffManage'
import UserInfo from '../pages/UserInfo';
import WorkLog from '../pages/WorkLog';
import Bulletin from '../pages/Bulletin';
import Examine from '../pages/Examine';

//配置路由
const routes = [
    { path: "/", component: Home },
    { path: "/index", component: Frontpage },
    { path: "/StaffManage", component: StaffManage },
    { path: "/UserInfo", component: UserInfo },
    { path: "/WorkLog", component: WorkLog },
    { path: "/Bulletin", component: Bulletin },
    { path: "/Examine", component: Examine },
];
const router = new VueRouter({
    routes,
    mode:"history"
})

export default router;