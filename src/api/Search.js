import request from '@/utils/Request'

// 热搜关键字
export const hot = (params) =>
	request({
		url: '/search/hot',
		params,
	})

// 搜索结果
export const search = params => request({
	url:'/search',
	params
})