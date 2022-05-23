<template>
  <el-container>
    <el-header>
      <el-row :gutter="0">
        <el-col :span="4">
          <img class="logo_header" src="../assets/蓝鲸记账11.png" alt="">
        </el-col>
        <el-col class="right_header" :span="3">
          <el-dropdown class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <img src="../assets/logo_1.png" class="headerImg" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人信息</el-dropdown-item>
              <el-dropdown-item command="b">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <v-btn class="right_btn" @click="logout">退出</v-btn> -->
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">| | |</div>
        <!-- <draggable v-model="myArray"> -->
          <!-- <transition-group> -->
              <el-menu unique-opened :collapse="isCollapse"
              :collapse-transition="false" router :default-active="activepath">
                <!-- 一级菜单 -->
                <el-submenu :index="item.id+''" v-for="item in MenuList" :key="item.id">
                  <template slot="title">
                    <i :class="icons[item.id]"></i>
                    <span>{{item.menuName}}</span>
                  </template>
                  <!--二级菜单-->
                  <el-menu-item :index="sub.menuPath" v-for="sub in item.children" :key="sub.id" @click="save(sub.menuPath)">
                    <template slot="title">
                    <i :class="icons[sub.id]"></i>
                    <span>{{sub.menuName}}</span>
                  </template>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
          <!-- </transition-group> -->
      <!-- </draggable> -->
      </el-aside>
      <!--右侧主体-->
      <el-main>
        <!-- @rightClick = "openContextMenu($event)" -->
        <el-tabs type="card" @contextmenu.prevent.native="openContextMenu($event)"  @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane v-for="item in tabsItem"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name"
                        :closable="item.closable"
                        :ref="item.ref">
            </el-tab-pane>
        </el-tabs> 
        <!-- 路由的占位符 -->
        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <router-view v-if="!$route.meta.keepAlive"></router-view> 

        <div v-show="contextMenuVisible">
          <ul class="contextmenu">
              <li><el-button style="color:#333" type="text" @click="curTabReload()" size="mini">重新加载</el-button></li>
              <li><el-button style="color:#333" type="text" @click="closeAllTabs()" size="mini">关闭所有</el-button></li>
              <!-- <li><el-button type="text" @click="closeOtherTabs('left')" :disabled="isDisabledCloseLeftBtnFlag" size="mini">关闭左边</el-button></li> -->
              <!-- <li><el-button type="text" @click="closeOtherTabs('right')" :disabled="isDisabledCloseRightBtnFlag" size="mini">关闭右边</el-button></li> -->
              <!-- <li><el-button style="color:#333" type="text" @click="closeOtherTabs()" size="mini">关闭其他</el-button></li> -->
              <li><el-button style="color:#333" type="text" @click="closeContextMenu()" size="mini">关闭该菜单</el-button></li>
          </ul>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Welcome from '../components/Welcome.vue';
export default {
  data(){
    return{
      name: "Home",
      MenuList:[],
      isCollapse:false, //false为展开 true为收缩
      activepath:'',
      tabIndex: 1, //tab目前显示数
      tabsItem: [
          {
              title: 'welcome',
              name: '1',
              closable: false,
              ref: 'tabs',
              content: Welcome
          }
      ],
      tabsPath: [
          {
              name: "1",
              path: '/welcome'
          }
      ],
      // editableTabsValue: '',//tab页当前active的item
      // editableTabs: [],//tab页数组
      icons:{
        500:'el-icon-user-solid',
        501:'el-icon-user',
        502:'el-icon-data-line',
        503:'el-icon-pie-chart',
        504:'el-icon-data-analysis',
        505:'el-icon-s-tools',
        506:'el-icon-s-tools',
        508:'el-icon-user',
        509:'el-icon-user',
        510:'el-icon-user',
      },
      contextMenuVisible:false,
    }
  },
  computed: {
    activeNav() { //当前**的导航
      return this.$route.path
    }
  },
  watch: {
    '$route': function (to) {  //监听路由的变化，动态生成tabs
      let flag = true //判断是否需要新增页面
      const path = to.path
      if (Object.keys(to.meta).length != 0) {
        for (let i = 0; i < this.$refs.tabs.length; i++) {
          // if (i != 0) { //首页不判断 如果页面已存在，则直接定位当页面，否则新增tab页面
            if (this.$refs.tabs[i].label == to.meta.name) {
              this.activeTab = this.$refs.tabs[i].name  //定位到已打开页面
              flag = false
              break
            }
          // }
        }
        //新增页面
        if (flag) {
          //获得路由元数据的name和组件名
          const thisName = to.meta.name
          const thisComp = to.meta.comp
          //对tabs的当前**下标和tabs数量进行自加
          let newActiveIndex = ++this.tabIndex + ''
          //动态双向追加tabs
          this.tabsItem.push({
            title: thisName,
            name: String(newActiveIndex),
            closable: true,
            ref: 'tabs',
            content: thisComp
          })
          this.activeTab = newActiveIndex
          /*
          * 当添加tabs的时候，把当前tabs的name作为key，path作为value存入tabsPath数组中
          * key:tabs的name
          * value:tabs的path
          * {
          *   key: name,
          *   value: path
          * }
          * ///后面需要得到当前tabs的时候可以通过当前tabs的name获得path
          * */
          if (this.tabsPath.indexOf(path) == -1) {
            this.tabsPath.push({
              name: newActiveIndex,
              path: path
            })
          }
        }
      }
    }
  },
  components: {
    // Welcome
    // Admin,
  },
  created(){
    this.getMenu();
    this.activepath=window.sessionStorage.getItem('activepath')
    
  },
  methods:{
    logout(){

    },
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    async getMenu(){
      const {data:res} = await this.$http.get('/menus/menus');
      console.log(res);
      if(res.meta.status === 200){
        this.MenuList = res.data
      }
    },
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    },
    save(activepath){
      window.sessionStorage.setItem('activepath',activepath)
      this.activepath=activepath
    },
    removeTab(targetName) { //删除Tab
        let tabs = this.tabsItem; //当前显示的tab数组
        let activeName = this.activeTab; //点前活跃的tab

        //如果当前tab正活跃 被删除时执行
        if (activeName === targetName) {
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
                activeName = nextTab.name;
                this.tabClick(nextTab)
            }
            }
        });
        }
        this.activeTab = activeName;
        this.tabsItem = tabs.filter(tab => tab.name !== targetName);
        //在tabsPath中删除当前被删除tab的path
        this.tabsPath = this.tabsPath.filter(item => item.name !== targetName)
    },
    tabClick(thisTab) {
        /*
        * thisTab:当前选中的tabs的实例
        * 通过当前选中tabs的实例获得当前实例的path 重新定位路由
        * */
        let val = this.tabsPath.filter(item => thisTab.name == item.name)
        this.$router.push({
        path: val[0].path
        })
    },
    openContextMenu(e) {
      this.contextMenuVisible = true;
      console.log(e.srcElement);
      // if (e.srcElement.id) {
      //   let currentContextTabId = e.srcElement.id.split("-")[1];
      //   this.contextMenuVisible = true;
      //   this.$store.commit("saveCurContextTabId", currentContextTabId);
      //   this.left = e.clientX;
      //   this.top = e.clientY + 10;
      // }
    },
    // 关闭所有标签页
    closeAllTabs() {
      this.tabIndex=1 //tab目前显示数
      this.tabsItem= [
          {
              title: 'welcome',
              name: '1',
              closable: false,
              ref: 'tabs',
              content: Welcome
          }
      ]
      this.tabsPath= [
          {
              name: "1",
              path: '/welcome'
          }
      ]
      // this.$store.commit("closeAllTabs");
      // console.log(this.tabsItem);
      // console.log(this.tabsItem);
      // console.log(this.tabsPath);
      this.activeTab = '1';
      // let tabs = this.tabsItem; //当前显示的tab数组
      // this.tabsItem = tabs.filter(tab => '1' );
      this.$router.push({
        path: '/welcome'
      })
      location.reload();
      this.contextMenuVisible = false;
    },
    // 关闭其它标签页
    // closeOtherTabs(par) {
    //   //  let activeName = this.activeTab; //点前活跃的tab
    //   // this.$store.commit("closeOtherTabs", par);
    //   console.log(par);
    //   this.contextMenuVisible = false;
    // },
    // 关闭contextMenu
    closeContextMenu() {
      this.contextMenuVisible = false;
    },
    curTabReload(){
      this.tabIndex=1 //tab目前显示数
      this.tabsItem= [
          {
              title: 'welcome',
              name: '1',
              closable: false,
              ref: 'tabs',
              content: Welcome
          }
      ]
      this.tabsPath= [
          {
              name: "1",
              path: '/welcome'
          }
      ]
      // this.$store.commit("closeAllTabs");
      // console.log(this.tabsItem);
      // console.log(this.tabsItem);
      // console.log(this.tabsPath);
      this.activeTab = '1';
      // let tabs = this.tabsItem; //当前显示的tab数组
      // this.tabsItem = tabs.filter(tab => '1' );
      this.$router.push({
        path: '/welcome'
      })
      this.contextMenuVisible = false;
    }
  },
  mounted() {
    
  }
}
</script>

<style lang="less" scoped>
  .el-header {
    // z-index:9999;
    position: relative;
    // background-color: #94c5dc;
    background-color:#0076b2;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    // z-index:2;
    background-color: #fffef7;
    color: #333;
    text-align: center;
    // line-height: 160px;
  }
  .el-container{
    height: 100%;
  }
  .logo_header{
    // float: left;
    height: 60px;
    width: 200px;
  }
  .right_header{
    float: right;
  }
  .right_btn{
    border-style:none;
    background-color: #F8FEFF;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .headerImg{
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .dropdown{
    margin-top: 7px;
  }
  .el-aside {
    background-color: #4ca6cf;
    color: #94c5dc;
    text-align: center;
    line-height: 200px;
  }
  .el-menu{
    color: #fff;
    background-color: #4ca6cf;
    border-right: none;
  }
  /deep/.el-submenu__title {
    color: #fff;
  }
  .el-submenu .el-menu-item {
    color: #fff;
    background-color: #0f8ac4;
  }
  .toggle-button{
    background-color:#4ca6cf;
    font-size: 10px;
    line-height: 24px;
    color:#fff ;
    text-align: center;
    letter-spacing: o.3em;
    cursor: pointer;
  }
  .el-row{
    height: 60px;
  }
  .el-col{
    height: 60px;
  }
  /deep/.el-icon-user-solid:before {
      content: "\e7a5";
      color: #fff;
  }
  /deep/.el-icon-user:before {
      content: "\e6e3";
      color: #fff;
  }
  /deep/.el-submenu__title:hover {
    background-color: rgb(42, 105, 156);
  }
  /deep/.el-icon-data-line:before {
      content: "\e76d";
      color: #fff;
  }
  /deep/.el-icon-s-tools:before {
    content: "\e7ac";
    color: #fff;
  }

  .menu-tags {
    margin-left: 16px;
  
    .menu-tags_item {
      padding: 2px 10px;
      cursor: pointer;
    }
  
    .menu-tags_item:hover {
      color: #63d5ce;
    }
  
    .item_active {
      color: #63d5ce;
    }
  }
  .contextmenu {
    width: 100px;
      margin: 0;
      border: 1px solid #ccc;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 14px;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
  }
  .contextmenu li {
      margin: 0;
      padding: 0px 22px;

  }
  .contextmenu li:hover {
      background: #f2f2f2;
      cursor: pointer;
  }
  .contextmenu li button{
    color: #2c3e50;
  }
  /deep/.el-button{
    // color: #333;
  }

</style>