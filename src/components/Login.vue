<template>
  <div class="index">
    <div class="big">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账号密码登录" name="first">
          <el-form :model="LoginForm"  :rules="loginRules" ref="LoginForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="管理员账号" prop="username">
              <el-input id="text" @change="draw" v-model="LoginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="管理员密码" prop="password">
              <el-input type="password" v-model="LoginForm.password"></el-input>
            </el-form-item>
            <el-from-item>
              <div ref="demo" style="margin:0 auto"></div>
            </el-from-item>
            <el-form-item>
              <v-btn class="loginBtn" @click="login">登录</v-btn>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane label="手机号登录" name="second">
          <el-form :model="LoginPhoneForm"  :rules="PhoneRules" ref="LoginPhoneForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="管理员账号" prop="phone">
              <el-input v-model="LoginPhoneForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input class="codeInput" v-model="LoginPhoneForm.code"></el-input>
              <v-btn class="codeBtn">获取验证码</v-btn>
            </el-form-item>
            <el-form-item>
              <v-btn class="loginBtn">登录</v-btn>
            </el-form-item>
          </el-form>
        </el-tab-pane> -->
      </el-tabs>
     
      <div class="main" id="main">
        <span>A</span>
        <span>D</span>
        <span>M</span>
        <span>I</span>
        <span>N</span>
      </div>
    </div>
    
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data(){
    return{
      LoginForm:{
        client_id:'cl',
        client_secret:'secret',
        grant_type:'password',
        username:'admin',
        password:'',
        // rememberMe:false,
      },
      loginRules:{
        username:[{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password:[{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      LoginPhoneForm:{
        phone:''
      },
      PhoneRules:{
        phone:[{ required: true, message: '请输入手机号', trigger: 'blur' }],
        code:[{ required: true, message: '请输入手机号', trigger: 'blur' }],
      },
      activeName:'first',
      codetoken:'',
    }
  },
  mounted() {
    _dx.Captcha(this.$refs.demo, {
      // appId, 在控制台应用管理或应用配置模块获取
      appId: "40ba323954dfade3e33c299a192faa40",
      apiServer: 'https://dxvip.dingxiang-inc.com',  
      // apiServer域名地址在控制台页面->无感验证->应用管页面左上角获取，必须填写完整包括https://。
      success: token => {
        // 获取验证码token，用于后端校验，注意获取token若是sl开头的字符串，则是前端网络不通生成的降级token,请检查前端网络及apiServer地址。
        this.codetoken = token
        console.log(token);
      }
    });
  },
  methods:{
    draw(){
      var main = document.getElementById("main")
      var str = document.getElementById("text").value
      console.log(this.LoginForm.username);
      console.log(str);
      main.innerHTML = ""
      for (var i = 0; i < str.length; i++) {
          var span = document.createElement("span")
          // if (i != str.length - 1) {
              // document.createElement("span").style.setProperty("--c",this.color())
          // }
          span.innerHTML = str[i]
          main.appendChild(span)
      }
      // this.draw()
      // console.log(this.LoginForm);
    },
    handleClick(){

    },
    login(){
      this.$refs.LoginForm.validate(async valid=>{
        if(!valid) return
        if(!this.codetoken){
          return this.$message.error('请完成验证码验证')
        }
        const{data:res}=await this.$http.post('admin/oauth/token?'+qs.stringify(this.LoginForm))
        // console.log(this.LoginForm);
        console.log(res);

        if(res.access_token != null && res.access_token != ""){
          window.sessionStorage.setItem("token","bearer " + res.access_token);
          this.$router.push("/home")
        
        }

        // if(res.meta.status === 200){
          // window.sessionStorage.setItem("token",res.data.token);
        //   this.$router.push("/home")
        // }

      })
    },
  }
  
}
</script>

<style lang="less" scoped>
  .el-form{
    width: 400px;
    clear: #fff;
  }
  /deep/.el-form-item__label{
    color: #fff;
  }
  .index{
    background: #333;
    width: 100%;
    height: 100%;
  }
  @font-face {
  font-family: "friends font";
  src: url("../plugins/Gabriel Weiss' Friends Font.TTF")format('truetype');
  }
  * {
    margin: 0;
    padding: 0;
  }
  .big{
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
  #main {
    --c: transparent;
    color: white;
    font-family: "friends font";
    font-weight: bold;
    font-size: 10vw;
    text-shadow: 0.5vw 0.5vw 0 black;
    margin-left: 5vw;
    text-transform: uppercase;
    position: absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
// #main span {
//   --c: transparent;
//   color: white;
//   font-family: "friends font";
//   font-weight: bold;
//   font-size: 10vw;
//   text-shadow: 0.5vw 0.5vw 0 black;
//   margin-left: 5vw;
//   text-transform: uppercase;
// }
  .loginBtn{
    margin-right: 15px;
  }
  .return{
    margin-top: 15px;
    margin-right: 15px;
    float: right;
  }
  /deep/.el-tabs__item{
    color: #fff;
  }
  // .demo-ruleForm{
  //   width: 300px;
  // }
  .codeInput{
    width: 200px;
  }
  .codeBtn{
    margin-left: 10px;
    width: 90px;
  }

</style>