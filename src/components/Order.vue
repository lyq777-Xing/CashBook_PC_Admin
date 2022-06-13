<template>
    <el-card>
    <!-- <el-row>
      <el-input style="width:200px;float:left;margin-button:15px;" placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="find"></el-button>
      </el-input>
    </el-row> -->
    <el-table
      :data="tableData"
      stripe
      :fit="true"
      >
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="buyer_logon_id"
        label="支付账号">
      </el-table-column>
      <el-table-column
        prop="buyer_user_type"
        label="账单属性">
      </el-table-column>
      <el-table-column
        prop="out_trade_no"
        label="账单编号">
      </el-table-column>
      <el-table-column
        prop="trade_no"
        label="账单号">
      </el-table-column>
      <el-table-column
        prop="send_pay_date"
        label="付款时间">
      </el-table-column>
      <el-table-column
        prop="total_amount"
        label="付款金额">
      </el-table-column>
    </el-table>

<!-- 添加管理员的dialog -->
    <!-- <el-dialog
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
            <template >
              <el-option v-for="item in roleData" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
            </template>
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
    </el-dialog> -->

<!-- 修改管理员的dialog -->
    <!-- <el-dialog
      title="修改管理员信息"
      :visible.sync="updDialogVisible"
      width="50%"
      :before-close="updhandleClose">
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
    </el-dialog> -->

    <!-- 分配角色的dailog -->
    <!-- <el-dialog
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
    </el-dialog> -->
  </el-card>
</template>

<script>
export default {
  data(){
    return{
      tableData:[]
    }
  },
  created(){
    this.DateList()
  },
  methods:{
    async DateList(){
      const {data:res} = await this.$http.get('/alipay/getall')
      console.log(res);
      if(res.meta.status === 200){
        this.$message.success('查询订单成功')
        this.tableData = res.data
      }else if(res.meta.status === 407){
        this.$message.error('当前登录人数过多 请刷新重试')
      }
      else{
        this.$message.error('查询订单失败')
      }
    },
  }
}
</script>

<style>

</style>