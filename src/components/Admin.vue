<template>
  <el-card>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;height:100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="mgName"
        label="管理员名称">
      </el-table-column>
      <el-table-column
        prop="mgDate"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="mgEmail"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mgHeader"
        label="用户头像地址">
      </el-table-column>
      <el-table-column
        prop="mgPhone"
        label="电话号码">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="管理员角色">
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template>
          <v-btn style="margin-right:10px;">分配角色</v-btn>
          <v-btn style="margin-right:10px;">删除</v-btn>
          <v-btn style="margin-right:10px;">修改</v-btn>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data(){
    return{
      queryInfo:{
        pagenum:1,
        pagesize:5,
        query:''
      },
      tableData:{
        id:'',
        mgDate:'',
        mgEmail:'',
        mgHeader:'',
        mgName:'',
        mgPhone:'',
        roleId:'',
        roleName:''
      }

    }
  },
  created(){
    this.DateList()
  },
  methods:{
    async DateList(){
      const {data:res} = await this.$http.get('/manager/getall',{params:this.queryInfo})
      console.log(res);
      if(res.meta.status === 200){
        this.$message.success('查询管理员成功')
        this.tableData = res.data.records
      }else{
        this.$message.error('查询管理员失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>