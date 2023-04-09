// api文件夹下 各个请求模块js, 都统一来到index.js再向外导出
import { recommendMusic, recommendNewMusic } from './Home'
import { hot, search } from './Search'
import { getSongById, getLyricById } from './Play'

// 首页
export const recommendMusicAPI = recommendMusic // 请求推荐歌单的方法导出
export const recommendNewMusicAPI = recommendNewMusic //首页-推荐新音乐

// 搜索页
export const hotAPI = hot //搜索页-热搜关键词
export const searchAPI = search //搜索页-搜索结果

// 播放页
export const getSongByIdAPI = getSongById //获取歌曲详情
export const getLyricByIdAPI = getLyricById //获取歌词

