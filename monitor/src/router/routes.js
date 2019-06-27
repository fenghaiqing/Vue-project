import Monitor from '../components/Monitor.vue'
import List from '../components/List.vue'
export default [
	{
		path:'/main',
		component: Monitor,
		/* children:[
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
		] */
	},
	{
		path: '/list',
		component: List,
		
	},{
		path:'*',
		redirect:'/main'
	} 	 
]