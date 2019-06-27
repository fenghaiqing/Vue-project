import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routes from './router/routes'
import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
/* import Main from './assets/components/Main.vue'
import ZuWang from './assets/components/ZuWang.vue'
import Content from './assets/components/Content.vue' */

Vue.use(Router) 
Vue.use(ElementUI)
 
/* const routes = [
	{
		path:'/main',
		component: Main,
		 children:[
			{
				path:'/index',
				component: Content
			},
			{
				path:'/zuWang',
				component:ZuWang
			}
		] 
	}
	
	
]; */
const router = new Router({
	routes
}); 
new Vue({
  el: '#app',
 	router, 
  render: h => h(App)
})
