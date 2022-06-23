<template>
  <el-card>
    <el-row>
        <v-btn style="float:left;margin-left:15px;background-color: blue;color:#fff" @click="showAddDialog">添加分类</v-btn>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      :fit="true"
      >
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="catName"
        label="分类名称">
      </el-table-column>
      <el-table-column
        prop="catDesc"
        label="分类属性">
      </el-table-column>
      <el-table-column
        width="200px"
        label="分类图标">
        <template slot-scope="scope">
          <img style="width:100px;height:100px;" :src="'https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/'+scope.row.catImg" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <v-btn style="margin-right:10px;" @click="del(scope.row)" >删除</v-btn>
          <v-btn style="margin-right:10px;" @click="showUpdDialog(scope.row)">修改</v-btn>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分类的dialog -->
    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form status-icon :model="addruleForm" :rules="addrules" ref="addruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="catName">
          <el-input v-model="addruleForm.catName"></el-input>
        </el-form-item>
        <el-form-item label="分类属性" prop="catDesc">
          <el-select style="float:left" v-model="addruleForm.catDesc" placeholder="请选择分类属性" >
            <el-option label="支出" value="支出"></el-option>
            <el-option label="收入" value="收入"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            action="http://120.48.85.254:8888/upload/upload"
            :auto-upload="autoUpload"
            name="imgFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
              <img  v-if="imageUrl" :src="imageUrl" style="height:150px" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button @click="resetForm()">重置</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>



    <!-- 修改分类的dialog -->
    <el-dialog
      title="修改分类信息"
      :visible.sync="updDialogVisible"
      width="50%"
      :before-close="updhandleClose">
      <el-form status-icon :model="updruleForm" :rules="updrules" ref="updruleForm" label-width="100px" class="demo-ruleForm">
         <el-form-item label="分类名称" prop="catName">
          <el-input v-model="updruleForm.catName"></el-input>
        </el-form-item>
        <el-form-item label="分类属性" prop="catDesc">
          <el-select style="float:left" v-model="updruleForm.catDesc" placeholder="请选择分类属性" >
            <el-option label="支出" value="支出"></el-option>
            <el-option label="收入" value="收入"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            action="http://120.48.85.254:8888/upload/upload"
            :auto-upload="autoUpload"
            name="imgFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
              <img  v-if="imageUrl" :src="imageUrl" style="height:150px" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updhandleClose">取 消</el-button>
        <el-button @click="updresetForm()">重置</el-button>
        <el-button type="primary" @click="upd">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data(){
    return{
      tableData:[],
      addDialogVisible:false,
      addruleForm:{
        catName:'',
        catDesc:'',
        catImg:''
      },
      addrules:{
        catName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        catDesc: [
          { required: true, message: '选择分类属性', trigger: 'blur' }
        ],
      },
      autoUpload:true,//自动上传
      imageUrl:null,//模型数据，用于上传图片完成后图片预览
      updDialogVisible:false,
      updruleForm:{
        catName:'',
        catDesc:'',
        catImg:''
      },
      updrules:{
        catName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        catDesc: [
          { required: true, message: '选择分类属性', trigger: 'blur' }
        ],
      },
      header:'',
    }
  },
  created(){
    this.DateList()
  },
  methods:{
    async DateList(){
      const {data:res} = await this.$http.get('/cat/getall')
      console.log(res);
      if(res.meta.status === 200){
        this.$message.success('查询分类成功')
        this.tableData = res.data
      }else if(res.meta.status === 407){
        this.$message.error('当前登录人数过多 请刷新重试')
      }
      else{
        this.$message.error('查询分类失败')
      }
    },
    showAddDialog(){
      this.addDialogVisible = true
    },
    handleClose(){
      this.addDialogVisible = false
      this.imageUrl=''
      this.$refs.addruleForm.resetFields();
    },
    //文件上传成功后的钩子，response为服务端返回的值，file为当前上传的文件封装成的js对象
    handleAvatarSuccess(response, file) {
      console.log('a');
      this.imageUrl = "https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/"+response.data;
      //设置模型数据（图片名称），后续提交ajax请求时会提交到后台最终保存到数据库
      // this.addruleForm.catImg = this.header
      this.header = response.data
      console.log(this.addruleForm.catImg);
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
    async add(){
      this.$refs.addruleForm.validate(async valid=>{
        if(!valid) return
        this.addruleForm.catImg = this.header
        if(this.addruleForm.catImg ==="" || this.addruleForm.catImg == null){
          return this.$message.error('请上传分类图标')
        }
        console.log(this.addruleForm);
        const {data:res} = await this.$http.post('/cat/add',this.addruleForm);
        console.log(res); 
        if(res.meta.status === 200){
          this.DateList();
          this.$refs.addruleForm.resetFields();
          this.imageUrl=''
          this.$message.success('添加成功')
          this.addDialogVisible = false
        }else if(res.meta.status === 413){
          this.$message.error('该分类名称已经被占用')
        }
        else{
          this.$message.error('添加失败')
        }
      })
    },
    resetForm(){
      this.imageUrl=''
      this.$refs.addruleForm.resetFields();
    },
    async showUpdDialog(row){
      const {data:res} = await this.$http.get('cat/findById?id='+row.id)
      if(res.meta.status === 200){
        this.updDialogVisible = true
        this.updruleForm = res.data
        this.imageUrl = "https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/"+res.data.catImg
      }else{
        return this.$message.error('查询该分类失败')
      }
    },
    updhandleClose(){
      this.updDialogVisible = false
      this.imageUrl=''
      this.$refs.updruleForm.resetFields();
    },
    updresetForm(){
      this.$refs.updruleForm.resetFields();
    },
    async upd(){
      this.$refs.updruleForm.validate(async valid=>{
        if(!valid) return
         this.updruleForm.catImg = this.header
        const {data:res} = await this.$http.post('/cat/upd',this.updruleForm);
        console.log(res); 
        if(res.meta.status === 200){
          this.DateList();
          this.$refs.updruleForm.resetFields();
          this.imageUrl=''
          this.$message.success('更新成功')
          this.updDialogVisible = false
        }else if(res.meta.status === 413){
          this.$message.error('该用户名已经被占用')
        }
        else{
          this.$message.error('更新失败')
        }
      })
    },
    async del(row){
      const confirmResult = await this.$confirm('此操作将永久删除该分类以及其对应的账单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err=>err)
      if(confirmResult !== 'confirm'){
          return this.$message.info('已取消删除')
      }
      const {data:res} = await this.$http.delete("/bill/delByCatId?catId=" + row.id)
      console.log(res);
      if(res.meta.status === 200){
        const {data:res1} = await this.$http.delete("/cat/del?id=" + row.id)
        if(res1.meta.status === 200){
          this.$message.success('删除成功')
          this.DateList()
        }else{
          this.$message.error('删除失败')
        }
      }else{
          this.$message.error('删除失败')
      }

    },
  }
}
</script>

<style lang="less" scoped>

</style>
