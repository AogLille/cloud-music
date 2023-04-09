<template>
	<div class="main">
		<!-- 推荐歌单模块 -->
		<p class="title">推荐歌单</p>
		<van-row gutter="10">
			<van-col span="8" v-for="obj in recommendMusic" :key="obj.id">
				<van-image width="100%" height="3rem" fit="cover" :src="obj.picUrl" lazy-load />
				<p class="song_name">{{ obj.name }}</p>
			</van-col>
		</van-row>
		<!-- 推荐新音乐模块 -->
		<p class="title">最新音乐</p>
		<van-cell-group>
			<!-- 每一条数据 -->
			<!-- 引入自己的音乐组件-->
			<Songitem v-for="obj in recommendNewMusic" :id="obj.id" :key="obj.id" :name="obj.name" :author="obj.song.artists[0].name"></Songitem>
		</van-cell-group>
	</div>
</template>

<script>
import { recommendMusicAPI, recommendNewMusicAPI } from '@/api'
import Songitem from '@/components/Songitem.vue'
export default {
	components: {
		Songitem,
	},
	data() {
		return {
			recommendMusic: [], //推荐歌单列表
			recommendNewMusic: [], //推荐音乐列表
		}
	},
	async created() {
		let res = await recommendMusicAPI({ limit: 6 }) //获取推荐歌单数据
		this.recommendMusic = res.data.result
		// console.log(this.recommendMusic)
		res = await recommendNewMusicAPI({ limit: 20 }) //获取推荐新音乐数据
		this.recommendNewMusic = res.data.result
		// console.log(this.recommendNewMusic)
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
/* 推荐歌单 - 歌名 */
.song_name {
	font-size: 0.346667rem;
	padding: 0 0.08rem;
	margin-bottom: 0.266667rem;
	word-break: break-all;
	text-overflow: ellipsis;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 2; /** 显示的行数 **/
	overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
