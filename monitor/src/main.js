import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routes from './router/routes'
import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import echarts from 'echarts'
import Axios from 'axios'
import x2js from 'x2js'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)
Vue.prototype.$echarts = echarts

Vue.use(Router) 
Vue.use(ElementUI)
 Vue.prototype.$x2js = new x2js();
 Axios.defaults.headers.post['Content-Type'] = 'application/json';
 Axios.defaults.headers.get['Content-Type'] = 'text/html;charset=gbk';
 // 添加请求拦截器
 Axios.interceptors.request.use(function (config) {
     // 在发送请求之前做些什么
 	console.log(config);
 	config.data = JSON.stringify(config.data);
     return config;
   }, function (error) {
     // 对请求错误做些什么
     return Promise.reject(error);
   });
 
 Vue.prototype.$http = Axios

const router = new Router({
	routes
}); 
new Vue({
  el: '#app',
 	router, 
  render: h => h(App)
})
