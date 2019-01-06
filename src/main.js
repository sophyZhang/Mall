// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 引入公共css
import './assets/css/global.css'
// 引入公共js 全局使用js
import utils from './assets/js/utils.js' //获取url参数
Vue.prototype.$utils=utils               //注册全局方法

import Axios from 'axios'
import $ from 'jquery'
// // 引入图片预览插件
// import VuePreview from 'vue-preview'
// Vue.use(VuePreview)

Vue.config.productionTip = false

Vue.use(MintUI);

Vue.prototype.$axios = Axios
// 配置公共url
Axios.defaults.baseURL = 'http://231cj03230.imwork.net/MyProject'

//时间过滤器  <div>{{data | dataFormat('yyyy-MM-dd hh:mm:ss')}}</div>
Vue.filter('dataFormat', function (value, fmt) {
  let getDate = new Date(value);
  let o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    'S': getDate.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

