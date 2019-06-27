<template>
	<div>
		<el-container>
			<el-header style="text-align: right; font-size: 12px">
				<div class="barand">
					<div class="img-box">
						<img src="../images/logo.png" alt="">
					</div>
					<span class="name">一键部署</span>
				</div>
				<el-dropdown>
					<div class="head">
						<div class="img">
							<img style="border-radius: 50%;width: auto;height: 100%;" src="../images/head200x200.jpg" alt="">
						</div>
						<span class="name">王小虎 <i class="el-icon-arrow-down"></i></span>
					</div>
					<!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item><router-link to="/login">注销</router-link></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>

			</el-header>
		</el-container>
		<el-container style="height: calc(100vh - 60px);">
			<el-aside width="200px" style="background-color: rgb(34,45,50)">
				<el-menu text-color="#fff" active-text-color="#ffd04b">
					<router-link to="/main/vm">
						<el-menu-item>
							<i class="el-icon-setting"></i>
							<span slot="title">我的VM</span>
						</el-menu-item>
					</router-link>
					<router-link to="/main/zw">
						<el-menu-item>
							<i class="el-icon-setting"></i>
							<span slot="title">我的组网</span>
						</el-menu-item>
					</router-link>
					<router-link to="/main/form">
						<el-menu-item>
							<i class="el-icon-setting"></i>
							<span slot="title">表单</span>
						</el-menu-item>
					</router-link>
					<router-link to="/main/timer">
						<el-menu-item>
							<i class="el-icon-setting"></i>
							<span slot="title">时间线</span>
						</el-menu-item>
					</router-link>
					<router-link to="/main/button">
						<el-menu-item>
							<i class="el-icon-setting"></i>
							<span slot="title">按钮</span>
						</el-menu-item>
					</router-link>
				</el-menu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>

</template>

<script>
	export default {
		data() {
			
			return {
				

			}
		}
	};
</script>

<style>
</style>
