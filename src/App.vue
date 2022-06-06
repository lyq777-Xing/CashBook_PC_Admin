<template>
	<div id="app">
		<!-- <p>If Echarts is successfully added to this project, you'll see an BarChart below</p>
		<div id="main" :style="{width: '300px', height: '300px'}"></div>
		<HelloWorld msg="Welcome to Your Vue.js App" /> -->
		<router-view></router-view>
	</div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
	name: "app",
};
</script>

<style>
#app {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
}

</style>
