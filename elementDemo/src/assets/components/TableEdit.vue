<template>
	<span>
		
		<el-button type="success" size="small" @click.stop.prevent="runRow(rowData,index)"  plain>立即执行</el-button>
		<el-button type="warning" size="small" v-show="rowData.jobStatus == '未启动'" @click.stop.prevent="startRow(rowData,index)" plain>启动</el-button>
		<el-button type="info" size="small" v-show="rowData.jobStatus == '启动'"   @click.stop.prevent="stopRow(rowData,index)"  plain>暂停</el-button>
		<el-button type="warning" size="small" v-show="rowData.jobStatus == '暂停'"   @click.stop.prevent="resumeRow(rowData,index)"  plain>恢复</el-button>
        <el-button type="info" size="small"    @click.stop.prevent="updateRow(rowData,index)"  plain>修改</el-button>
		</span>
</template>

<script>
	export default{
		data(){return{
			/* isRun:false */
		}},
		 props:{
            rowData:{
                type:Object
            },
            field:{
                type:String
            },
            index:{
                type:Number
            },
			
        },
		methods:{
			runRow(rowData,index){
				let params = {type:'run',index:this.index,rowData:this.rowData};
				  this.$emit('on-custom-comp',params);
			},
			startRow(rowData,index){
				  // 参数根据业务场景随意构造
               let params = {type:'start',index:this.index,rowData:this.rowData};
                this.$emit('on-custom-comp',params);
			},
			stopRow(rowData,index){
				  // 参数根据业务场景随意构造
			   let params = {type:'stop',index:this.index,rowData:this.rowData};
			   this.$emit('on-custom-comp',params);
			},
			resumeRow(rowData,index){
				  // 参数根据业务场景随意构造
			   let params = {type:'resume',index:this.index,rowData:this.rowData};
			   this.$emit('on-custom-comp',params);
			},
			updateRow(rowData,index){
				  // 参数根据业务场景随意构造
			   let params = {type:'update',index:this.index,rowData:this.rowData};
			   this.$emit('on-custom-comp',params);
			}
		}
	}
	
</script>

<style>
</style>
