import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/reset.css'
import '@/mobile/flexible.js'
import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Lazyload, Cell, CellGroup, Icon, Search,List  } from 'vant'

Vue.use(List)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Lazyload)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Col)
Vue.use(Row)
Vue.use(VanImage)

// 测试封装的api方法
import { recommendMusicAPI } from './api'
async function recommendMusic() {
	let res = await recommendMusicAPI()
	console.log(res)
}

// vant组件库自动适配
// 1、下载postcss，postcss-pxtorem
// 2、postcss.config.js-配置
// 3、重启服务器即可生效

Vue.config.productionTip = false
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
