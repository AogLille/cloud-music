<template>
	<div>
		<!-- 头部 -->
		<van-nav-bar :title="title" fixed />
		<!-- 内容 -->
		<router-view></router-view>
		<!-- 底部标签栏 -->
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home-o" @click="change('home')">首页</van-tabbar-item>
			<van-tabbar-item icon="search" @click="change('search')">搜索</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: this.$route.name === 'home' ? 0 : 1,
			title: this.$route.meta.title,
			pinglun: [],
		}
	},
	methods: {
		// 编程式路由跳转的方法
		change(path) {
			this.$router.push({
				name: path,
			})
			this.title = this.$route.meta.title
			// console.log(this.active)
		},
	},
}
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
	padding-top: 46px;
	padding-bottom: 50px;
}
</style>
