<template>
	<div>
		<!-- 每一条数据 -->
		<van-cell :title="name" :label="author" center :key="id">
			<!-- 播放按钮 -->
			<template #right-icon>
				<van-icon name="play-circle-o" size="0.75rem" @click="play" />
			</template>
		</van-cell>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true,
			default: '歌曲名',
		},
		author: {
			type: String,
			required: true,
			default: '作者',
		},
		id: {
			type: Number,
			required: true,
		},
	},
	methods: {
		play() {
			this.$router.push({
				path: '/play',
				query: {
					id: this.id,
				},
			})
		},
	},
}
</script>

<style></style>
