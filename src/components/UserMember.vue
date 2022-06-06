<template>
  <el-card>
    <div class="app-container">
      <div class="box">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="chart2" style="height:600px;"></div>
      </div>
    </div>
  </el-card>
</template>

<script>
let echarts = require('echarts')
import _ from 'lodash'
export default {
  data(){

  },
  created(){
    // this.getReport()
  },
  methods:{
    // async getReport(){
    //   const {data:res} = await this.$http.get('/user/getreport')
    //   console.log(res);
    // }
  },
  async mounted(){
    var myChart = echarts.init(document.getElementById('chart2'))
    const {data:res} = await this.$http.get('/user/getreport')
    console.log(res);
    if(res.meta.status === 200){
      myChart.setOption(
        {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center',
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: res.data
            }
          ]
        }
      )
    }
  }
}
</script>

<style>

</style>