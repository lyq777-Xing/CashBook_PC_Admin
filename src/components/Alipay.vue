<template>
<div><v-btn @click="a">aaa</v-btn>
  <div id="payDiv" v-html="conent">

</div></div>

</template>

<script>
export default {
created(){
  let oid=this.getquery("out_trade_no")
      this.aliPayCheckBean.out_trade_no=oid
   this.AlipayCheck()
},
data(){
  return{
    aliPayCheckBean:{
      out_trade_no:''
    },
    conent:'',
    list:{
      subject:'充值会员',
		   			 total_amount:'9.99',
		   			 body:'充值会员'
    }
  }
},
methods:{
  async AlipayCheck(){
   const{data:res}=await this.$http.post('alipay/paycheck',this.aliPayCheckBean)
   console.log(res);
  },
async a(){
const{data:res}=await this.$http.post('/alipay/pay',this.list)
this.conent=res.data
console.log(res);
             this.$nextTick(()=>{
  let form=document.getElementsByName("punchout_form")[0]
             form.submit()
             console.log(res);
             })
},
getquery(name){
      var url=window.location.href
      var query=url.substring(url.indexOf("?")+1)
      var vars=query.split("&")
      console.log("vars",query);
      for (let index = 0; index < vars.length; index++) {
       var pay=vars[index].split("=");
       if(pay[0]==name){return pay[1]}
        
      }
    }

}

}
</script>

<style lang="less" scoped>

</style>