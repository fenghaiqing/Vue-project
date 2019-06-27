import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Axios from 'axios'
import x2js from 'x2js'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable, VPagination} from 'vue-easytable'
import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import TaskInfo from './assets/components/TaskInfo.vue'
import TableEdit from './assets/components/TableEdit.vue'
 import AddTask from './assets/components/AddTask.vue' 

Vue.use(Router)
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


Vue.use(ElementUI)
Vue.use(VTable)
Vue.use(VPagination)
Vue.component('table-operation',TableEdit)

Vue.config.productionTip = false
const routes = [
	{
		path:'/task',
		component:TaskInfo,
	},
	{
		path:'/pa',
		component:AddTask,
	},
	{
		path:'/',
		component:TaskInfo
	}
];
const router = new Router({
	routes
});
new Vue({
  el: '#app',
	router,
  render: h => h(App)
})
