<template>
	<div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
				<el-button type="primary" @click="autodeploy">一键部署</el-button>
			</el-form-item>
		</el-form>
		<el-row :gutter="20">
			<el-col :span="6" v-for="item in data">
				<div v-if="item.status === 1 ">
					<div class="grid-content bg-purple">
						<div>
							<div class="pc-icon">
								<img src="../images/pc.png" alt="">
							</div>
							<div class="text" ><table class="bs-tb" >
							<tbody>
									<tr><td>ID</td><td>IP</td><td>ROLE</td><td>status</td></tr>
								<tr v-for="lis in item.items">
									<td>{{lis.id}}</td><td>{{lis.ip}}</td><td>{{lis.role}}</td><td>{{lis.status}}</td>
								</tr>
							</tbody>
						
							</table>
								
							</div>
						
						</div>
						<div class="update">
							<el-button type="warning" @click="opUpdateDiolg(item)">修改</el-button>
							<el-button type="danger" @click="opUpdateDiolg(item)">删除</el-button>
							<el-button type="primary" @click="opDetail(item)">详情</el-button>
						</div>
					</div>
				</div>
				<div v-else-if="item.status === 2">
					<div class="grid-content bg-purple new">
						<div class="add" @click="openAddModal(item)">
							<i class="el-icon-plus"></i>
						</div>
						<div class="delete">
							<span @click="deleteData(item.id)">
								<i class="el-icon-circle-close"></i>
							</span>
						</div>

						<div class="check" v-if="item.allow ">
							<span @click="item.ischeck=!item.ischeck" :class="item.ischeck? 'green' : 'def'">
								<i class="el-icon-circle-check"></i>
							</span>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>

		<el-dialog title="新增" width="35%" :visible.sync="dialogFormVisible">
			<el-form>
				<el-table :data="tableData" height="260" border @selection-change="handleSelectionChange" ref="multipleTable">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="ip" label="IP">
					</el-table-column>
					<el-table-column prop="role" label="role">
						<template scope="scope">
							<el-select v-model="scope.row.role" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</template>
						</el-option>
						</el-select>
					</el-table-column>

				</el-table>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addvm">确 定</el-button>
			</div>
		</el-dialog>
		
		<el-dialog title="修改"   ref="multipleTable" width="35%"
		
		 :visible.sync="updatedialogVisible">
			<el-form :model='updateItem'>
			<el-table :data="updateItem.items" height="260" border @selection-change="handleSelectionChange" ref="multipleTable">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="ip" label="IP">
				</el-table-column>
				<el-table-column prop="role" label="ROLE">
					<template scope="scope">
						<el-select v-model="scope.row.role" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
					</el-option>
					</el-select>
				</el-table-column>
			
			</el-table>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addvm">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="详情" width="35%" :visible.sync="detailVisible">
			<el-form>
				<el-table :data="detailData" height="260" border @selection-change="handleSelectionChange" ref="multipleTable">
					<el-table-column  prop="id" label="ID">
					</el-table-column>
					<el-table-column prop="ip" label="IP">
					</el-table-column>
					<el-table-column prop="role" label="role">
					</el-table-column>
					<el-table-column prop="status" label="STATUS">
					</el-table-column>
				</el-table>
			</el-form>
			
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
						id: 1,
						items:[
							{
								id:1,
								ip:'192.168.13.131',
								role:'cpu',
								status:'成功'
							},{
								id:2,
								ip:'192.168.13.132',
								role:'mpu',
								status:'部署中'
							},{
								id:3,
								ip:'192.168.13.133',
								role:'mpu',
								status:'失败'
							}
						] ,
						status: 1,
						ischeck: false,
						allow: false
					},
					{
						id: 2,
						items:[],
						status: 2,
						ischeck: false,
						allow: false
					},
					{
						id: 3,
						items:[],
						status: 2,
						ischeck: false,
						allow: false
					},
					{
						id: 4,
						items:[],
						status: 2,
						ischeck: false,
						allow: false
					},
					{
						id: 5,
						items:[],
						status: 2,
						ischeck: false,
						allow: false
					},
					{
						id: 6,
						items:[],
						status: 2,
						ischeck: false,
						allow: false
					},
					{
						id: 7,
						ip1: '',
						ip2: '',
						status: 2,
						ischeck: false,
						allow: false
					},
					{
						id: 8,
						items:[],
						status: 2,
						ischeck: false,
						allow: false
					},
				],
				options: [
					{
						value: 'cpu',
						label: 'cpu'
					}, 
					{
						value: 'mpu',
						label: 'mpu'
					}
				],
				value: '',
				dialogFormVisible: false,
				tableData: [{
						id: 1,
						ip: '192.168.13.131',
						name: 'root',
						password: 'root',
						status: 'selected',
						role: '',

					}, {
						id: 2,
						ip: '192.168.13.132',
						name: 'root',
						password: 'root',
						status: '',
						role: '',

					},
					{
						id: 3,
						ip: '192.168.13.133',
						name: 'root',
						password: 'root',
						status: '',
						role: '',

					},
					{
						id: 4,
						ip: '192.168.13.134',
						name: 'root',
						password: 'root',
						status: '',
						role: '',
					
					},
					{
						id: 5,
						ip: '192.168.13.135',
						name: 'root',
						password: 'root',
						status: '',
						role: '',
					
					},
					{
						id: 6,
						ip: '192.168.13.136',
						name: 'root',
						password: 'root',
						status: '',
						role: '',
					
					},
					{
						id: 7,
						ip: '192.168.13.137',
						name: 'root',
						password: 'root',
						status: '',
						role: '',
					
					}
				],
				multipleSelection: [],
				ischeck: 0,
				updatedialogVisible:false,
				updateItem:{
					id: 0,
					ip1: '',
					ip2: '',
					status: 0,
					ischeck: false,
					allow: false
				},
				detailVisible:false,
				detailData:[]
			}
		},
		methods: {
			deleteData(index) {
				this.data.splice(index - 1, 1);
				console.log(this.data.length);
			},
			openAddModal(item) {
				this.ischeck = item.id;
				this.dialogFormVisible = true;

			},
			addvm() {
				console.log(this.multipleSelection);
				this.data[this.ischeck - 1].allow = true;
				console.log(this.data[this.ischeck]);
				this.data[this.ischeck].ip1 = this.multipleSelection[0].ip;
				this.data[this.ischeck].ip2 = '';
				this.toggleSelection();
				this.dialogFormVisible = false;

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			autodeploy() {
				this.data.forEach(function(item, i) {

					if (item.ischeck) {
						item.status = 1;
					}
				})
			},
			opUpdateDiolg(item){
				this.updatedialogVisible=true;
				this.updateItem =item;
				this.toggleSelection(item.items);
			},
			toggleSelection(rows) {
				if (rows) {
				  rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				  });
				} else {
				  this.$refs.multipleTable.clearSelection();
				}
			},
			opDetail(item){
				this.detailVisible=true;
				this.detailData = item.items
			}
		}
	}
</script>

<style>
</style>
