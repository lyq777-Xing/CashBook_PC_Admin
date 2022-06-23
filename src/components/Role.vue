<template>
  <el-card>
    <el-row>
      <el-input style="width:200px;float:left;margin-button:15px;" placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="find"></el-button>
      </el-input>
      <v-btn style="float:left;margin-left:15px;background-color: blue;color:#fff" @click="showAddDialog">添加角色</v-btn>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      :fit="true"
      >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- <pre>{{scope.row}}</pre> -->
          <el-row  :class="['bdbottom',i1===0 ?'bdtop':'','vcenter']" v-for="(item,i1) in scope.row.children" :key="item.id">
            <el-col :span="5" v-if="scope.row.id === 1">
              <el-tag >{{item.permissionName}}</el-tag>
              <i class="el-icon-caret-right"></i>
              <!-- <p>{{scope.row.id}}</p> -->
            </el-col> 
            <el-col :span="5" v-else>
              <el-tag closable @close = "removeRightById(scope.row.id,item.id)">{{item.permissionName}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col> 
            <el-col :span="19" v-if="scope.row.id === 1">
                <!-- <el-row :class="[i2===0 ? '':'bdtop','vcenter']" v-for="(ch,i2) in item.children" :key="ch.id"> -->
                  <!-- <el-col :span="6"> -->
                    <!-- @close="removeRightById(scope.row,item2.id)" -->
                    <el-tag v-for="ch in item.children" :key="ch.id" type="success">{{ch.permissionName}}</el-tag>
                    <!-- <el-tag closable  v-for="ch in item.children" :key="ch.id" type="success">{{ch.permissionName}}</el-tag> -->
                    <!-- <i class="el-icon-caret-right"></i> -->
                    <!-- </el-col> -->
                <!-- </el-row> -->
            </el-col>
            <el-col :span="19" v-else>
                <!-- <el-row :class="[i2===0 ? '':'bdtop','vcenter']" v-for="(ch,i2) in item.children" :key="ch.id"> -->
                  <!-- <el-col :span="6"> -->
                    <!-- @close="removeRightById(scope.row,item2.id)" -->
                    <el-tag closable @close = "removeRightById(scope.row.id,ch.id)"  v-for="ch in item.children" :key="ch.id" type="success">{{ch.permissionName}}</el-tag>
                    <!-- <el-tag closable  v-for="ch in item.children" :key="ch.id" type="success">{{ch.permissionName}}</el-tag> -->
                    <!-- <i class="el-icon-caret-right"></i> -->
                    <!-- </el-col> -->
                <!-- </el-row> -->
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="roleDescribe"
        label="角色描述">
      </el-table-column>
      <el-table-column
        prop="roleKeyword"
        label="角色关键">
      </el-table-column>
      <el-table-column
        prop="rolePojo"
        label="角色分类">
      </el-table-column>
      <el-table-column label="操作" width="400px">
        <template slot-scope="scope">
          <v-btn style="margin-right:10px;" @click="ShowPermissionDialog(scope.row)" v-if="scope.row.id === 1" disabled>分配权限</v-btn>
          <v-btn style="margin-right:10px;" @click="ShowPermissionDialog(scope.row)" v-else>分配权限</v-btn>
          <v-btn style="margin-right:10px;" @click="del(scope.row)" v-if="scope.row.id === 1" disabled>删除</v-btn>
          <v-btn style="margin-right:10px;" @click="del(scope.row)" v-else>删除</v-btn>
          <v-btn style="margin-right:10px;" @click="showUpdDialog(scope.row)" v-if="scope.row.id === 1" disabled>修改</v-btn>
          <v-btn style="margin-right:10px;" @click="showUpdDialog(scope.row)" v-else>修改</v-btn>
        </template>
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

<!-- 添加角色的dialog -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form status-icon :model="addruleForm" :rules="addrules" ref="addruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDescribe">
          <el-input v-model="addruleForm.roleDescribe"></el-input>
        </el-form-item>
        <el-form-item label="角色关键" prop="roleKeyword">
          <el-input v-model="addruleForm.roleKeyword"></el-input>
        </el-form-item>
        <el-form-item label="角色分类" prop="rolePojo">
          <el-select style="float:left" v-model="addruleForm.rolePojo" placeholder="请选择角色分类">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="用户" value="user"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button @click="resetForm()">重置</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>

<!-- 修改角色的dialog -->
    <el-dialog
      title="修改角色信息"
      :visible.sync="updDialogVisible"
      width="50%"
      :before-close="updhandleClose">
      <el-form status-icon :model="updruleForm" :rules="updrules" ref="updruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="updruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDescribe">
          <el-input v-model="updruleForm.roleDescribe"></el-input>
        </el-form-item>
        <el-form-item label="角色关键" prop="roleKeyword">
          <el-input v-model="updruleForm.roleKeyword"></el-input>
        </el-form-item>
        <el-form-item label="角色分类" prop="rolePojo">
          <el-input disabled v-model="updruleForm.rolePojo"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updhandleClose">取 消</el-button>
        <el-button @click="updresetForm()">重置</el-button>
        <el-button type="primary" @click="upd">确 定</el-button>
      </span>
    </el-dialog>

<!-- 修改角色权限的dailog -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%">
      <el-tree 
        :data="rightlist" 
        :props="treeProps" 
        show-checkbox
        node-key="id" 
        default-expand-all 
        :default-checked-keys="defkeys" 
        @close = "setRightsDialogClosed"
        ref="treeRef">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialogClosed">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
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
      total:0,
      addDialogVisible:false,
      addruleForm:{
        roleName:'',
        roleDescribe:'',
        roleKeyword:'',
        rolePojo:'',
      },
      addrules:{
        rolePojo: [
          { required: true, message: '请输入选择角色分类', trigger: 'blur' },
          { required: true, trigger: 'blur' },
        ],
        roleKeyword: [
          { required: true, message: '请输入角色关键', trigger: 'blur' },
          { required: true, trigger: 'blur' },
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
      },
      // autoUpload:true,//自动上传
      // imageUrl:null,//模型数据，用于上传图片完成后图片预览
      updDialogVisible:false,
      updruleForm:{
        roleName:'',
        roleDescribe:'',
        roleKeyword:'',
        rolePojo:'',
      },
      updrules:{
       roleKeyword: [
          { required: true, message: '请输入角色关键', trigger: 'blur' },
          { required: true, trigger: 'blur' },
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
      },
      roleData:[],
      setRightDialogVisible:false,
      rightlist:[],
      defkeys:[],
      treeProps:{
        label:'permissionName',
        children:'children'
      },
      roleId:''
    }
  },
  created(){
    this.DateList()
    this.getRole()
  },
  methods:{
    async DateList(){
      const {data:res} = await this.$http.get('/role/getall',{params:this.queryInfo})
      console.log(res);
      if(res.meta.status === 200){
        this.$message.success('查询角色成功')
        this.total = res.data.total
        this.tableData = res.data.records
      }else if(res.meta.status === 407){
        this.$message.error('当前登录人数过多 请刷新重试')
      }
      else{
        this.$message.error('查询角色失败')
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
    // //文件上传成功后的钩子，response为服务端返回的值，file为当前上传的文件封装成的js对象
    // handleAvatarSuccess(response, file) {
    //   console.log('a');
    //   this.imageUrl = "https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/"+response.data;
    //   // this.$message({
    //   //   message: response.message,
    //   //   type: response.flag ? 'success' : 'error'
    //   // });
    //   //设置模型数据（图片名称），后续提交ajax请求时会提交到后台最终保存到数据库
    //   this.addruleForm.mgHeader = response.data;
    //   console.log(this.addruleForm.mgHeader);
    // },
    // //上传文件之前的钩子
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === 'image/jpeg';
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isJPG) {
    //     this.$message.error('上传套餐图片只能是 JPG 格式!');
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传套餐图片大小不能超过 2MB!');
    //   }
    //   return isJPG && isLt2M;
    // },
    handleClose(){
      this.addDialogVisible = false
      // this.imageUrl=''
      this.$refs.addruleForm.resetFields();
    },
    resetForm(){
      // this.imageUrl=''
      this.$refs.addruleForm.resetFields();
    },
    async add(){
      this.$refs.addruleForm.validate(async valid=>{
        if(!valid) return
        console.log(this.addruleForm);

        const {data:res} = await this.$http.post('/role/add',this.addruleForm);
        console.log(res); 
        if(res.meta.status === 200){
          this.DateList();
          this.$refs.addruleForm.resetFields();
          // this.imageUrl=''
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
      const confirmResult = await this.$confirm('此操作将永久删除该角色以及其对应的用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err=>err)
      if(confirmResult !== 'confirm'){
          return this.$message.info('已取消删除')
      }
      const {data:res} = await this.$http.delete( row.rolePojo + "/del/" + row.rolePojo +"?rid=" + row.id)
      console.log(res);
      if(res.meta.status === 200){
        const {data:res1} = await this.$http.delete("role/del?id=" + row.id)
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
    updhandleClose(){
      this.updDialogVisible = false
      // this.imageUrl=''
      this.$refs.updruleForm.resetFields();
    },
    async showUpdDialog(row){
      const {data:res} = await this.$http.get('role/getById?id='+row.id)
      if(res.meta.status === 200){
        this.updDialogVisible = true
        this.updruleForm = res.data
        // this.imageUrl = "https://cashbook-1310707740.cos.ap-shanghai.myqcloud.com/"+res.data.mgHeader
      }else{
        return this.$message.error('查询该角色失败')
      }
    },
    updresetForm(){
      this.$refs.updruleForm.resetFields();
    },
    async upd(){
      this.$refs.updruleForm.validate(async valid=>{
        if(!valid) return
        const {data:res} = await this.$http.post('/role/upd',this.updruleForm);
        console.log(res); 
        if(res.meta.status === 200){
          this.DateList();
          this.$refs.updruleForm.resetFields();
          // this.imageUrl=''
          this.$message.success('更新成功')
          this.updDialogVisible = false
        }else if(res.meta.status === 413){
          this.$message.error('该角色名已经被占用')
        }
        else{
          this.$message.error('更新失败')
        }
      })
    },
    find(){
      this.DateList();
    },
    async ShowPermissionDialog(row){
      // 在此之前获取所有权限数据
      this.roleId = row.id
      console.log(row);
      const {data:res} = await this.$http.get(`/permission/get${row.rolePojo}tree`)
      console.log(res);
      if(res.meta.status === 200){
        this.rightlist = res.data
        this.getLeafKeys(row,this.defkeys)
        this.setRightDialogVisible = true;
        console.log(this.rightlist);
      }
    },
    // 根据id删除对应的权限
    async removeRightById(rid,pid){
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err=>err)
      if(confirmResult!=='confirm'){
        return this.$message.info('已取消删除')
      }
      console.log(rid);
      console.log(pid);
      const{data:res}= await this.$http.delete("role/delrolepermission?roleId=" + rid + "&permissionId=" + pid );
      console.log(res)
      if(res.meta.stsatus === 200){
        this.$message.success('已删除')
      }
      this.DateList()
    },
    // 通过递归的形式，获取角色下的所有三级权限的id，并保存到defkeys数组中
    getLeafKeys(node,arr){
      if(!node.children){
        return arr.push(node.id)
      }
      node.children.forEach(item=>this.getLeafKeys(item,arr))
    },
    // 监听分配权限的对话框关闭事件
    setRightsDialogClosed(){
      this.setRightDialogVisible = false
      this.defkeys = []
    },
    // 分配权限
    async allotRights(){
      const keys = [
        // ...表示展开符号
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      console.log(keys);
      const {data:res} = await this.$http.post(`/role/updrolerights/${this.roleId}/${keys}`)
      if(res.meta.status === 200){
        this.$message.success('更新权限成功')
        this.defkeys = []
      }
      this.DateList()
      this.setRightDialogVisible=false
      console.log(res);
    }
  }
}
</script>

<style lang="less" scoped>
  .el-tag{
    margin: 7px;
  }
  .bdtop{
    border-top: 1px solid #eee;
  }
  .bdbottom{
    border-bottom: 1px solid #eee;
  }
  .vcenter{
    display: flex;
    align-items: center;
  }
</style>