import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import classify from '@/components/classify/classify'
import sortdetail from '@/components/classify/sortdetail'
import cart from '@/components/cart/cart'
import my from '@/components/my/my'
import myAddress from '@/components/my/myAddress'
import addAddress from '@/components/my/addAddress'
import editAddress from '@/components/my/editAddress'
import login from '@/components/my/login'
import register from '@/components/my/register'
import forgive from '@/components/my/forgive'
import myOrder from '@/components/my/myOrder'
import goodlist from '@/components/home/goodlist'
import gooddetail from '@/components/home/gooddetail'
import searchDetail from '@/components/home/searchDetail'
import orderDetail from '@/components/cart/orderDetail'
Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      redirect:'/home'
    },
    // 首页
    {
      meta: {title: '首页'},
      name: 'home',
      path: '/home',
      component: home,
    },
    //热门商品（全部）
    {
      meta: {title: '热门商品'},
      name: 'goodlist',
      path: '/home/goodlist',
      component: goodlist
    },
    // 商品详情
    {
      meta: {title: '商品详情'},
      name: 'gooddetail',
      path: '/home/gooddetail',
      component: gooddetail
    },
    // 分类
    {
      meta: {title: '分类'},
      name: 'classify',
      path: '/classify',
      component: classify
    },
    //分类详情
    {
      meta: {title: '详情'},
      name: 'sortdetail',
      path: '/classify/sortdetail',
      component: sortdetail
    },
    // 购物车
    {
      meta: {title: '购物车'},
      name: 'cart',
      path: '/cart',
      component: cart,
      // meta: { requiresAuth: true } //登录才能访问
    },
    // 订单详情
    {
      meta: {title: '订单详情'},
      name: 'orderDetail',
      path: '/cart/orderDetail',
      component: orderDetail,
      // meta: { requiresAuth: true } //登录才能访问
    },
    //我的
    {
      meta: {title: '我的'},
      name: 'my',
      path: '/my',
      component: my
    },
    //我的订单
    {
      meta: {title: '所有订单'},
      name: 'myOrder',
      path: '/my/myOrder',
      component: myOrder
    },
    //我的地址
    {
      meta: {title: '我的收货地址'},
      name: 'myAddress',
      path: '/my/myAddress',
      component: myAddress
    },
    //添加地址
    {
      meta: {title: '添加地址'},
      name: 'addAddress',
      path: '/my/addAddress',
      component: addAddress
    },
    //修改地址
    {
      meta: {title: '修改地址'},
      name: 'editAddress',
      path: '/my/editAddress',
      component: editAddress
    },
    //登录
    {
      meta: {title: '登录'},
      name: 'login',
      path: '/my/login',
      component: login
    },
    //注册
    {
      meta: {title: '注册'},
      name: 'register',
      path: '/my/register',
      component: register
    },
    //修改密码
    {
      meta: {title: '修改'},
      name: 'forgive',
      path: '/my/forgive',
      component: forgive
    },
    // 搜索列表
    {
      meta: {title: '搜索'},
      name: 'searchDetail',
      path: '/home/searchDetail',
      component: searchDetail
    },
  ]
})
