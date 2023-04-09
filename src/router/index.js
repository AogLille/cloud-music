import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Play from '@/views/Play'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/layout',
	},
	{
		path: '/layout',
		redirect: '/layout/home',
		name: 'layout',
		component: Layout,
		children: [
			{
				path: 'home',
				component: Home,
				name: 'home',
				meta: {
					title: '首页',
				},
			},
			{
				path: 'search',
				component: Search,
				name: 'search',
				meta: {
					title: '搜索',
				},
			},
		],
	},
	{
		path: '/play',
		component: Play,
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
