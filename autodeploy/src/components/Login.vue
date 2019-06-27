<template>
	<div>
		<div class="login">
			<div class="bg"></div>
			<div class="login-form">
				<h4><i class="el-icon-user-solid"></i>登录</h4>
				<div class="line"></div>
				<div class="input-group">
				<label for="">用户名</label>
				 <el-input v-model="form.name" autocomplete="off" placeholder="请输入用户名"></el-input>
				</div>
				<div  class="input-group">
				<label for="">密码</label>
				<el-input v-model="form.password" autocomplete="off" show-password placeholder="请输入密码"></el-input>
				</div>
				
				<div  class="login-footer">
				  <el-button type="primary" @click="login">登录</el-button>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return{
				
					form:{
					  name: '',
					  region: '',
					  date1: '',
					  date2: '',
					  delivery: false,
					  type: [],
					  resource: '',
					  desc: ''
					}
				
			}
			
		},
		methods: {
			login() {
					this.$router.push({path:'/main/vm'})
			},
			
		}
	}
</script>

<style>
</style>
