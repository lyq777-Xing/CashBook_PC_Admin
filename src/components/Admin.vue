<template>
  <el-card>
    <el-row>
      <el-input style="width:200px;float:left;margin-button:15px;" placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="find"></el-button>
      </el-input>
      <v-btn style="float:left;margin-left:15px;background-color: blue;color:#fff" @click="showAddDialog">添加管理员</v-btn>
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
        width="200px"
        label="用户头像地址">
        <template slot-scope="scope">
          <img style="width:100px;height:100px;" :src="'https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/'+scope.row.mgHeader" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="mgPhone"
        label="电话号码">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="管理员角色">
      </el-table-column>
      <el-table-column label="操作" width="400px">
        <template slot-scope="scope">
          <v-btn style="margin-right:10px;" v-if="scope.row.id != 500" @click="showRoleDialog(scope.row)">分配角色</v-btn>
          <v-btn style="margin-right:10px;" @click="del(scope.row)" v-if="scope.row.id != 500">删除</v-btn>
          <v-btn style="margin-right:10px;" v-if="scope.row.id === 500" disabled @click="showRoleDialog(scope.row)">分配角色</v-btn>
          <v-btn style="margin-right:10px;" @click="del(scope.row)" v-if="scope.row.id === 500" disabled>删除</v-btn>
          <v-btn style="margin-right:10px;" @click="showUpdDialog(scope.row)">修改</v-btn>
          <v-btn style="margin-right:10px;" @click="showUpdPwdDialog(scope.row)">重置密码</v-btn>
        </template>
        <!-- <template slot-scope="scope" v-else>
          <v-btn style="margin-right:10px;">分配角色</v-btn>
          <v-btn style="margin-right:10px;" @click="del(scope.row)">删除</v-btn>
          <v-btn style="margin-right:10px;" @click="showUpdDialog(scope.row)">修改</v-btn>
          <v-btn style="margin-right:10px;" @click="showUpdPwdDialog(scope.row)">重置密码</v-btn>
        </template> -->
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

<!-- 添加管理员的dialog -->
    <el-dialog
      title="添加管理员"
      :visible.sync="addDialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form status-icon :model="addruleForm" :rules="addrules" ref="addruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="管理员名称" prop="mgName">
          <el-input v-model="addruleForm.mgName"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="mgPassword">
          <el-input type="password" v-model="addruleForm.mgPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="addruleForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员角色" prop="roleId">
          <el-select style="float:left" v-model="addruleForm.roleId" placeholder="请选择管理员角色" >
            <!-- <el-option label="子管理员" value="2"></el-option> -->
            <template >
              <el-option v-for="item in roleData" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
            </template>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="管理员邮箱" prop="mgEmail">
          <el-input v-model="addruleForm.mgEmail"></el-input>
        </el-form-item>
        <el-form-item label="管理员手机号" prop="mgPhone">
          <el-input v-model="addruleForm.mgPhone"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8888/upload/upload"
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

<!-- 修改管理员的dialog -->
    <el-dialog
      title="修改管理员信息"
      :visible.sync="updDialogVisible"
      width="50%"
      :before-close="updhandleClose">
      <el-form status-icon :model="updruleForm" :rules="updrules" ref="updruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="管理员名称" prop="mgName">
          <el-input v-model="updruleForm.mgName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="管理员密码" prop="mgPassword">
          <el-input type="password" v-model="updruleForm.mgPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="updruleForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员角色" prop="roleId">
          <el-select style="float:left" v-model="updruleForm.roleId" placeholder="请选择管理员角色">
            <el-option label="子管理员" value="2"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="管理员邮箱" prop="mgEmail">
          <el-input v-model="updruleForm.mgEmail"></el-input>
        </el-form-item>
        <el-form-item label="管理员手机号" prop="mgPhone">
          <el-input v-model="updruleForm.mgPhone"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8888/upload/upload"
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

    <!-- 分配角色的dailog -->
    <el-dialog
      title="分配角色"
      :visible.sync="RoleDialogVisible"
      width="30%"
      :before-close="RoleHandleClose">
      <el-form status-icon :model="RoleruleForm" ref="RoleruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="管理员名称">
          <el-input v-model="RoleruleForm.mgName" disabled></el-input>
        </el-form-item>
        <el-form-item label="管理员角色">
          <el-select style="float:left" v-model="RoleruleForm.roleId" placeholder="请选择管理员角色">
            <template >
              <el-option v-for="item in roleData" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>  
      <span slot="footer" class="dialog-footer">
        <el-button @click="RoleHandleClose">取 消</el-button>
        <el-button type="primary" @click="updRole()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data(){
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.addruleForm.checkPassword !== '') {
          this.$refs.addruleForm.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.addruleForm.mgPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      queryInfo:{
        pagenum:1,
        pagesize:5,
        query:''
      },
      tableData:[],
        // id:'',
        // mgDate:'',
        // mgEmail:'',
        // mgHeader:'',
        // mgName:'',
        // mgPhone:'',
        // roleId:'',
        // roleName:''
      total:0,
      addDialogVisible:false,
      addruleForm:{
        mgPassword:'',
        mgEmail:'',
        mgHeader:'',
        mgName:'',
        mgPhone:'',
        roleId:'',
        roleName:'',
        checkPassword:'',
      },
      addrules:{
        mgPassword: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, trigger: 'blur' },
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' },
          { required: true, trigger: 'blur' },
        ],
        mgName: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '选择管理员角色', trigger: 'blur' }
        ],
      },
      autoUpload:true,//自动上传
      imageUrl:null,//模型数据，用于上传图片完成后图片预览
      updDialogVisible:false,
      updruleForm:{
        mgPassword:'',
        mgEmail:'',
        mgHeader:'',
        mgName:'',
        mgPhone:'',
        roleId:'',
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
      roleData:[],
      RoleDialogVisible:false,
      RoleruleForm:{},
      header:''
    }
  },
  created(){
    this.DateList()
    this.getRole()
  },
  methods:{
    async DateList(){
      const {data:res} = await this.$http.get('/manager/getall',{params:this.queryInfo})
      console.log(res);
      if(res.meta.status === 200){
        this.$message.success('查询管理员成功')
        this.total = res.data.total
        this.tableData = res.data.records
      }else if(res.meta.status === 407){
        this.$message.error('当前登录人数过多 请刷新重试')
      }
      else{
        this.$message.error('查询管理员失败')
      }
    },
    async getRole(){
      const {data:res} = await this.$http.get('/role/getalladmin')
      console.log(res);
      if(res.meta.status === 200){
        this.$message.success('ok!')
        this.roleData = res.data
      }else if(res.meta.status === 407){
        this.$message.error('当前登录人数过多 请刷新重试')
      }
      else{
        this.$message.error('error!')
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pagesize = val;
      this.DateList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pagenum = val;
      this.DateList();
    },
    showAddDialog(){
      this.addDialogVisible = true
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
      // this.addruleForm.mgHeader = response.data;
      this.header = response.data
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
    handleClose(){
      this.addDialogVisible = false
      this.imageUrl=''
      this.$refs.addruleForm.resetFields();
    },
    resetForm(){
      this.imageUrl=''
      this.$refs.addruleForm.resetFields();
    },
    async add(){
      this.$refs.addruleForm.validate(async valid=>{
        if(!valid) return
        this.addruleForm.mgHeader = this.header
        if(this.addruleForm.mgHeader ==="" || this.addruleForm.mgHeader == null){
          this.addruleForm.mgHeader = "efcc1544-cb75-416e-9477-ffc4900fd017.jpg";
        }
        console.log(this.addruleForm);
        const {data:res} = await this.$http.post('/manager/add',this.addruleForm);
        console.log(res); 
        if(res.meta.status === 200){
          this.DateList();
          this.$refs.addruleForm.resetFields();
          this.imageUrl=''
          this.$message.success('添加成功')
          this.addDialogVisible = false
        }else if(res.meta.status === 413){
          this.$message.error('该用户名已经被占用')
        }
        else{
          this.$message.error('添加失败')
        }
      })
      
    },
    async del(row){
      const confirmResult = await this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err=>err)
      if(confirmResult !== 'confirm'){
          return this.$message.info('已取消删除')
      }
      const {data:res} = await this.$http.delete("manager/del?id=" + row.id)
      if(res.meta.status === 200){
        this.$message.success('删除成功')
        this.DateList()
      }else{
        this.$message.error('删除失败')
      }
    },
    updhandleClose(){
      this.updDialogVisible = false
      this.imageUrl=''
      this.$refs.updruleForm.resetFields();
    },
    async showUpdDialog(row){
      const {data:res} = await this.$http.get('manager/getById?id='+row.id)
      if(res.meta.status === 200){
        this.updDialogVisible = true
        this.updruleForm = res.data
        this.imageUrl = "https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/"+res.data.mgHeader
      }else{
        return this.$message.error('查询该管理员失败')
      }
    },
    updresetForm(){
      this.$refs.updruleForm.resetFields();
    },
    async upd(){
      this.$refs.updruleForm.validate(async valid=>{
        if(!valid) return
         this.updruleForm.mgHeader = this.header
        const {data:res} = await this.$http.post('/manager/upd',this.updruleForm);
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
    showUpdPwdDialog(row){

    },
    find(){
      this.DateList();
    },
    async showRoleDialog(row){
      const {data:res} = await this.$http.get('manager/getById?id='+row.id)
      if(res.meta.status === 200){
        this.RoleDialogVisible = true
        this.RoleruleForm = res.data
        // this.getRole()
      }else{
        return this.$message.error('查询该管理员失败')
      }
      this.RoleDialogVisible = true
    },
    RoleHandleClose(){
      this.RoleDialogVisible = false
      this.$refs.RoleruleForm.resetFields();
    },
    async updRole(){
        const {data:res} = await this.$http.post('/manager/upd',this.RoleruleForm);
        console.log(res); 
        if(res.meta.status === 200){
          this.DateList();
          this.$refs.RoleruleForm.resetFields();
          // this.imageUrl=''
          this.$message.success('更新角色成功')
          this.RoleDialogVisible = false
        }
        else{
          this.$message.error('更新角色失败')
        }
    }
  }
}
</script>

<style lang="less" scoped>

</style>