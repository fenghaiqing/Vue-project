<template>
	<div>
		<div class="seach-form">
			<el-form :inline="true" :model="queryParam" class="demo-form-inline">
				<el-form-item label="任务名">
					<el-input v-model="queryParam.jobName" placeholder="任务名"></el-input>
				</el-form-item>
				<el-form-item label="任务组">
					<el-input v-model="queryParam.jobGroup" placeholder="任务组"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="query">查询</el-button>
					<el-button type="success" @click="initAddModel">新增</el-button>
					
					<el-button type="warning" v-show="tableData.length>0" @click="deleteSelect">删除</el-button>
					<el-button>重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div>
			<v-table column-width-drag 
			is-horizontal-resize
			 @on-custom-comp="customCompFunc" 
			 :select-all="selectAll" 
			 :select-group-change="selectGroupChange"
			 row-hover-color="#eee"
             row-click-color="#edf7ff"
			 title-bg-color ="#eee"
			 style="width:100%" 
			 :columns="columns" 
			 :table-data="tableData"></v-table>
			
		</div>
		<div class="pagination">
			  <v-pagination :total="total" :page-size="pageSize"  @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
		</div>
		<div>
			<el-dialog :title="type" :visible.sync="dialogVisible" width="30%" >
				<el-form  :model="job" :rules="rules" ref="job" label-width="80px" class="demo-ruleForm">
					<el-form-item label="任务组" prop="jobGroup">
						<el-input v-model="job.jobGroup" :disabled="isReadOnly"></el-input>
					</el-form-item>
					<el-form-item label="任务名" prop="jobName">
						<el-input v-model="job.jobName" :disabled="isReadOnly"></el-input>
					</el-form-item>

					<el-form-item label="执行类名" prop="className">
						<el-input v-model="job.className" :disabled="isReadOnly"></el-input>
					</el-form-item>
					<el-form-item label="方法名" prop="methodName">
						<el-input v-model="job.methodName" :disabled="isReadOnly"></el-input>
					</el-form-item>
					<el-form-item label="cron" prop="cron">
						<el-input v-model="job.cron"></el-input>
					</el-form-item>
					<el-form-item label="任务描述">
						<el-input v-model="job.jobDesc" ></el-input>
					</el-form-item>

				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible=false,handleClose('job')">取 消</el-button>
					<el-button type="primary" @click="addTask('job')">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				tableData: [],
				selectColumns: [],
				pageSize:10,
				total:0,
				page:1,
				columns: [{
						width: 60,
						titleAlign: 'center',
						columnAlign: 'center',
						type: 'selection'
					}, {
						field: 'jobName',
						title: '任务名',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true
					},
					{
						field: 'jobGroup',
						title: '任务组',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true
					},
					{
						field: 'className',
						title: '类名',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true
					},
					{
						field: 'methodName',
						title: '方法名',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true
					},
					{
						field: 'cron',
						title: '执行规则',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true
					},
					{
						field: 'jobStatus',
						title: '状态',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true
					},
					{
						field: 'jobDesc',
						title: '任务描述',
						width: 180,
						titleAlign: 'center',
						columnAlign: 'left',
						isResize: true
					},
					{
						field: '',
						title: '操作',
						width: 200,
						titleAlign: 'center',
						columnAlign: 'center',
						componentName: 'table-operation',
						isResize: true
					}
				],
				queryParam: {
					jobName: '',
					jobGroup: '',
					pageSize:'',
					page:''
				},
				job: {
					jobName: '',
					jobGroup: '',
					className: '',
					methodName: '',
					cron: '',
					jobDesc: ''
				},
				rules:{
					jobName:[
						{required: true, message: '请输入任务名称', trigger: 'blur'},
						 { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					jobGroup:[
						{required: true, message: '请输入任务组名称', trigger: 'blur'},
					],
					className:[
						{required: true, message: '请输入类名', trigger: 'blur'},
			
					],
					methodName:[
						{required: true, message: '请输入方法名', trigger: 'blur'},
						
					],
					cron:[
						{required: true, message: '请输入执行规则', trigger: 'blur'},
					
					],
				},
				type:"新增",
				isReadOnly:false
			}
		},
		methods: {
			onSubmit() {

			},
			initAddModel(){
				this.dialogVisible=true;
				this.type='新增';
				this.job={
					jobName: '',
					jobGroup: '',
					className: '',
					menthodName: '',
					cron: '',
					jobDesc: ''
				}
				this.isReadOnly=false;
			},
			customCompFunc(params) {
				console.log(params);
				if (params.type === 'run') { // do delete operation
					this.$http.get("/api/scheduler/run",{params:{taskId:params.rowData.id}})
					.then((res)=>{
						this.query();
						this.$message({
							type: 'success',
							message: '执行成功!'
						});
						
					})
					.catch((err)=>{
						
					})
				} else if (params.type === 'start') { // do edit operation
					this.$http.get("/api/scheduler/start",{params:{taskId:params.rowData.id}})
					.then((res)=>{
						this.query();
						this.$message({
							type: 'success',
							message: '启动成功!'
						});
					})
					.catch((err)=>{
						
					})
					//alert(`行号：${params.rowData.id} 姓名：${params.rowData['name']}`)
				}else if (params.type === 'stop') { // do edit operation
					//alert(`行号：${params.index} 姓名：${params.rowData['name']}`)
					this.$http.get("/api/scheduler/stop",{params:{taskId:params.rowData.id}})
					.then((res)=>{
						this.query();
						this.$message({
							type: 'success',
							message: '暂停成功!'
						});
					})
					.catch((err)=>{
						
					})
				}else if(params.type === 'resume'){
					this.$http.get("/api/scheduler/resumeJob",{params:{taskId:params.rowData.id}})
					.then((res)=>{
						this.query();
						this.$message({
							type: 'success',
							message: '恢复成功!'
						});
					})
					.catch((err)=>{
						
					})
				}else if(params.type === 'update'){
					this.type='修改';
					this.job = params.rowData;
					this.isReadOnly=true;
					this.dialogVisible=true;
				}

			},
			handleClose(formName) {
				this.dialogVisible = false;
				this.$refs[formName].resetFields();
			},
			addTask(formName) {
				this.$refs[formName].validate((valid) => {
					  if (valid) {
						//alert('submit!');
						if(this.type === '新增'){
							this.$http.post('/api/quartz/add', this.job)
								.then((response) => {
									console.log(response);
									this.dialogVisible = false;
									this.$message({
										type: 'success',
										message: '添加成功!'
									});
									this.query();
								})
								.catch(function(error) {
									console.log(error);
								});
						}else if(this.type === '修改'){
							 this.$http.post("/api/scheduler/updateJobCron",this.job)
							.then((res)=>{
								this.query();
								this.dialogVisible = false;
								this.$message({
									type: 'success',
									message: '更新成功!'
								});
							})
							.catch((err)=>{
								
							}) 	
						}
					  } else {
						console.log('error submit!!');
						return ;
					  }
				});
			},
			query() {
				this.queryParam.pageSize =this.pageSize;
				this.queryParam.page = this.page;
				this.$http.post('/api/quartz/query', this.queryParam)
					.then((response) => {
						console.log(response);
						this.tableData = response.data.data.list;
						this.total = response.data.data.total;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			selectGroupChange(selection) {
				console.log(selection[0]);
				this.selectColumns = selection;
			},
			selectAll(selection) {
				this.selectColumns = selection;
			},
			deleteSelect() {
				if(this.selectColumns.length<1){
					this.$message({
						type: 'warning',
						message: '请选择数据！'
					});
					return;
				}
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var ids = [];
					this.selectColumns.forEach((columData)=>{
						ids.push(columData.id);
					});
					this.$http.post('/api/quartz/delete',ids)
						.then((response) => {
								this.query();
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							
						})
						.catch(function(error) {
							this.$message({
								type: 'warning',
								message: '删除失败！'
							});
							console.log(error);
						});
				
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			pageChange(page){
				this.page = page;
				this.query();
			},
			pageSizeChange(pageSize){
				this.pageSize = pageSize;
				this.query();
			}
			
		},
		mounted() {
			this.query();
		}
	}
</script>

