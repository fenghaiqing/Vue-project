<template>
	<div id="app">
		<el-container>
			<el-header>

				<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
				 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
					<el-menu-item index="5" style="float: left;font-size: 16px;">任务调度平台</el-menu-item>
					<el-menu-item index="4">个人中心</el-menu-item>
					<el-menu-item index="3">订单管理</el-menu-item>
					<el-menu-item index="2"><router-link to="/pa" >消息中心</router-link></el-menu-item>
					<el-menu-item index="1"><router-link to="/task" >任务中心</router-link></el-menu-item>
				</el-menu>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				closwidt: '200px',
				activeIndex: '1',
				activeIndex2: '1',
				

			};
		},
		methods: {
			changeWidth() {
				this.isCollapse ? this.closwidt = '64px' : this.closwidt = '200px'
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			
		}
	}
</script>

<style>

</style>
