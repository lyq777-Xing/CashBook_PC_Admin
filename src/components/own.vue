<template>
  <div class="centiner">
    <div style="width:1000px;margin: 0 auto;height: 100%;">
      <div class="left">
        <!-- <img :src="managerImg" class="headerImg" alt=""> -->
          <el-upload
              class="avatar-uploader"
              action="http://localhost:8888/upload/upload"
              :auto-upload="autoUpload"
              name="imgFile"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
                <img  v-if="managerImg" :src="managerImg" class="avatar headerImg">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
      </div>
      <div class="right">
        <el-form status-icon :model="updruleForm" :rules="updrules" ref="updruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="管理员名称" prop="mgName">
            <el-input v-model="updruleForm.mgName"></el-input>
          </el-form-item>
          <el-form-item label="管理员邮箱" prop="mgEmail">
            <el-input v-model="updruleForm.mgEmail"></el-input>
          </el-form-item>
          <el-form-item label="管理员手机号" prop="mgPhone">
            <el-input v-model="updruleForm.mgPhone"></el-input>
          </el-form-item>
          <el-form-item label="创建日期" prop="mgDate">
            <el-input disabled v-model="updruleForm.mgDate"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="upd">确认修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      managerImg:'',
      updruleForm:{
        mgPassword:'',
        mgEmail:'',
        mgHeader:'',
        mgName:'',
        mgPhone:'',
        roleId:'',
        mgDate:''
      },
      updrules:{
        mgName: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '选择管理员角色', trigger: 'blur' }
        ],
      },
      autoUpload:true,//自动上传
    }
  },
  created(){
    this.getManagerDetail()
  },
  methods:{
    async getManagerDetail(){
      const {data:res} = await this.$http.get('/manager/getImg');
      // console.log(res);
      console.log(JSON.parse(res.data)); 
      const logo = JSON.parse(res.data)
      if(res.meta.status === 200){
        this.managerImg = 'https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/'+logo.mgHeader;
        this.updruleForm = logo
      }
    },
    //文件上传成功后的钩子，response为服务端返回的值，file为当前上传的文件封装成的js对象
    handleAvatarSuccess(response, file) {
      console.log('a');
      this.imageUrl = "https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/"+response.data;
      // this.$message({
      //   message: response.message,
      //   type: response.flag ? 'success' : 'error'
      // });
      //设置模型数据（图片名称），后续提交ajax请求时会提交到后台最终保存到数据库
      this.addruleForm.mgHeader = response.data;
      console.log(this.addruleForm.mgHeader);
    },
    //上传文件之前的钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传套餐图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传套餐图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    async upd(){
      this.$refs.updruleForm.validate(async valid=>{
        if(!valid) return
        const {data:res} = await this.$http.post('/manager/upd',this.updruleForm);
        console.log(res); 
        if(res.meta.status === 200){
          this.getManagerDetail();
          this.$refs.updruleForm.resetFields();
          this.imageUrl=''
          this.$message.success('更新成功 请重新登录查看修改后的结果')
          this.updDialogVisible = false
        }else if(res.meta.status === 413){
          this.$message.error('该用户名已经被占用')
        }
        else{
          this.$message.error('更新失败')
        }
      })
    },
  }

}
</script>

<style lang="less" scoped>
.centiner{
  width: 100%;
  height: 100%;
}
.left{
  float: left;
  width: 30%;
  height: 100%;
  // background-color: aqua;
}
.right{
  float: left;
  width: 70%;
  height: 100%;
  // background-color: beige;
}
.headerImg{
  width: 250px;
  height: 250px;
  border-radius: 50%;
  // margin-top: 35px;
}
.avatar-uploader{
  width: 250px;
  height: 250px;
  // margin-top: 35px;
  margin: 35px auto;
}
.demo-ruleForm{
  width: 800px;
  margin: 150px auto;
}
.el-form-item{
  height: 100px;
}
</style>
