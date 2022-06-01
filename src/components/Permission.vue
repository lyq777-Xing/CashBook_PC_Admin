<template>
  <el-card>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="permissionName"
      label="权限名称">
    </el-table-column>
    <el-table-column
      prop="permissionLevel"
      label="权限等级">
    </el-table-column>
    <el-table-column
      prop="permissionPath"
      label="权限地址">
    </el-table-column>
  </el-table>
  </el-card>
</template>

<script>
export default {
  data(){
    return{
      tableData:[],
    }
  },
  created(){
    this.DateList()
  },
  methods:{
    async DateList(){
      const {data:res} = await this.$http.get('/permission/getall')
      console.log(res);
      if(res.meta.status === 200){
        this.$message.success('查询权限列表成功')
        // this.total = res.data.total
        this.tableData = res.data
      }else if(res.meta.status === 407){
        this.$message.error('当前登录人数过多 请刷新重试')
      }
      else{
        this.$message.error('查询权限列表失败')
      }
    },
  }
}
</script>

<style lang="less" scoped>

</style>