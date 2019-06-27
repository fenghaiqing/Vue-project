<template>
	<div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="用户名">
    <el-input v-model="formInline.user" placeholder="用户名"></el-input>
  </el-form-item>
  <el-form-item label="IP">
     <el-input v-model="formInline.ip" placeholder="ip地址"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
	 <el-button type="success" @click="dialogFormVisible = true">新增</el-button>
  </el-form-item>
</el-form>
 <el-table
    :data="tableData"
		:height="height"
    border
    style="width: 100%;height:calc(100vh - 200px);"  @selection-change="handleSelectionChange">
	 <el-table-column
      type="selection"
      width="55"></el-table-column>
	  <el-table-column
	    prop="id"
	    label="ID"
	    width="80">
	  </el-table-column>
    <el-table-column
      prop="ip"
      label="IP"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码">
    </el-table-column>
	<el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  
  <el-dialog title="新增" width="30%" :visible.sync="dialogFormVisible">
  <el-form :model="vm">
    <el-form-item label="IP" :label-width="formLabelWidth">
      <el-input v-model="vm.ip" placeholder="请输入IP地址" autocomplete="off"></el-input>
    </el-form-item>
   <el-form-item label="用户" :label-width="formLabelWidth">
    <el-input v-model="vm.name" placeholder="请输入用户名" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item label="密码" :label-width="formLabelWidth" >
    <el-input v-model="vm.password" placeholder="请输入密码" autocomplete="off" show-password></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>

  
</div>
	 
</template>

<script>
export default {
    data() {
		const item = {
		  ip: '192.168.131.123',
		  name: 'root',
		  password: 'root',
		  id:1
		};
      return {
        formInline: {
          username: '',
          ip: ''
        }, 
		tableData: Array(20).fill(item),
        multipleSelection: [],
		height:0,
		dialogFormVisible:false,
		vm:{
			ip:'',
			password:'',
			name:''
		},
		formLabelWidth:'80px'
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
	    handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        this.tableData.splice(index,1);
		console.log( this.tableData.length);
      }
    },
	mounted() {
		const ht = document.documentElement.clientHeight;
		console.log(ht);
		this.height = ht-200;
		console.log(this.height);
	}
  }
</script>

<style>

</style>
