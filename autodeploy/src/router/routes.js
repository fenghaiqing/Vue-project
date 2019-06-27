import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import Vm from '../components/Vm.vue'
import Zw from '../components/ZuWang.vue'
import Timer from '../components/Timer.vue'
import Form from '../components/Form.vue'
import Button from '../components/Button.vue'
export default [
	{
		path:'/main',
		component: Main,
		children:[
			{
				path:'vm',
				component: Vm
			},{
				path:'zw',
				component: Zw
			},{
				path:'form',
				component: Form
			},{
				path:'button',
				component: Button
			},{
				path:'timer',
				component: Timer
			}
		]
	},
	{
		path: '/login',
		component: Login,
		
	},{
		path:'*',
		redirect:'/main/vm'
	} 	 
]