<template>
	<div class="main">
		<!-- 搜索框 -->
		<van-search v-model="value" placeholder="请输入搜索关键词" shape="round" @input="inputFn" />
		<!-- 热搜关键词 -->
		<div class="search_wrap" v-if="searchList.length === 0">
			<p class="hot_title">热搜</p>
			<div class="hot_name_wrap">
				<span class="hot_item" v-for="(obj, index) in hots" :key="index" @click="keySearch(obj.first)">{{ obj.first }}</span>
			</div>
		</div>
		<!-- 搜索结果 -->
		<div class="search_wrap" v-else>
			<p class="title">最佳匹配</p>
			<van-cell-group>
				<!-- van-list是触底加载组件 -->
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<!-- 每一条数据 -->
					<Songitem v-for="obj in searchList" :id="obj.id" :key="obj.id" :name="obj.name" :author="obj.artists[0].name"></Songitem>
				</van-list>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
import { hotAPI, searchAPI } from '@/api'
import Songitem from '@/components/Songitem.vue'
export default {
	components:{
		Songitem
	},
	data() {
		return {
			value: '', //搜索框的值
			hots: [], //热搜关键词列表
			searchList: [], //搜索结果
			timer: null, //防抖延时器
			loading: false, //加载状态,如果为false就是能够加载
			finished: false, //是否加载全部数据
			page: 1,
		}
	},
	methods: {
		// 对热搜关键字的点击事件
		async keySearch(val) {
			this.page = 1
			this.finished = false
			this.value = val
			let res = await this.getSearchList(val)
			this.searchList = res.data.result.songs
			this.loading = false
		},
		// 用于根据输入框的值获得搜索结果的一个Promise对象
		async getSearchList() {
			return await searchAPI({
				keywords: this.value,
				limit: 20,
				offset: (this.page - 1) * 20,
			})
		},
		// 对于搜索框的输入事件
		inputFn() {
			if (this.timer) {
				//如果计时器存在
				clearTimeout(this.timer) //清除防抖延时器
			}
			// 设置延时器
			this.timer = setTimeout(async () => {
				this.page = 1	//每次重新搜索的时候都先获取第一页的数据
				this.finished = false
				if (this.value.trim() === '') {
					this.searchList = []
					this.loading = false
					return
				}
				let res = await this.getSearchList()
				if (!res.data.result.songs) {
					//如果搜索结果为空
					this.searchList = []
				} else {
					//如果搜索结果不为空
					this.searchList = res.data.result.songs
				}
				this.loading = false
			}, 600)
		},
		// 触底加载事件
		async onLoad() {
			this.page++ //页码加一
			let res = await this.getSearchList() //拿到数据
			let newData = res.data.result.songs
			if (!res.data.result.songs) {
				//如果加载不到新的数据了
				this.finished = true //加载完成
				return
			}
			this.searchList = [...this.searchList, ...newData] //将加载的数据与原有数据连接起来
			this.loading = false //每次加载完成将loading设为false，结束加载状态
		},
	},
	async created() {
		let res = await hotAPI() //获取热搜关键词
		this.hots = res.data.result.hots
		// console.log(this.hots)
	},
}
</script>

<style scoped>
.main {
	padding: 46px 0 50px;
}
/* 标题 */
.title {
	padding: 0.266667rem 0.24rem;
	margin: 0 0 0.24rem 0;
	background-color: #eee;
	color: #333;
	font-size: 15px;
}
/* 搜索容器的样式 */
.search_wrap {
	padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
	font-size: 0.32rem;
	color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
	margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
	display: inline-block;
	height: 0.853333rem;
	margin-right: 0.213333rem;
	margin-bottom: 0.213333rem;
	padding: 0 0.373333rem;
	font-size: 0.373333rem;
	line-height: 0.853333rem;
	color: #333;
	border-color: #d3d4da;
	border-radius: 0.853333rem;
	border: 1px solid #d3d4da;
}
</style>
