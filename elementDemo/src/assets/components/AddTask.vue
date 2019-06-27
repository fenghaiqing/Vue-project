<template>
<div>
		<div class="seach-form">
			<el-form :inline="true"  class="demo-form-inline">
				<el-form-item>
					<el-button type="success" @click="payqu">获取</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div>
			{{content}}
		</div>
</div>
</template>

<script>
	export default {
    data() {
      return {
        content:''
      }
    },
    methods: {
      payqu(){
      	this.$http.get('/51job/list/071100,000000,0000,00,9,99,%2B,2,3.html?lang=c&stype=1&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=&dibiaoid=0&address=&line=&specialarea=00&from=&welfare=')
      		.then((response) => {
      			console.log(response.data);
						this.content = response.data;
      		})
      		.catch(function(error) {
      			console.log(error);
      		});
      }
    }
  }
</script>

<style>
</style>
