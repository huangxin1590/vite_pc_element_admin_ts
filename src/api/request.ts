import axios from 'axios'
import router from '@/router/index'

// import { getSession } from '@/utils/storage';
import { ElMessage } from 'element-plus'
import { loading, endLoading } from './loading'
import { errorCode } from '@/const/errorCode'

axios.defaults.timeout = 60000
axios.defaults.baseURL = ''

// 请求前
axios.interceptors.request.use(
  (config) => {
    // const token = getSession('token')

    // if (token) config.headers.Authorization = token
    // if (config.url && config.url.indexOf('globalLoading') > -1) {
    //   startLoading()
    // }

    config.headers.Authorization =
      'JSESSIONID=78E974BC48910965288DD0F17083597E; OAuth_Token_Request_State=6b4eea76-bba5-4062-820c-40cc972c55d4'
    return config
  },
  (err) => Promise.reject(err)
)

// 请求后
axios.interceptors.response.use(
  (response) => {
    const resCode = response.data.code

    if (errorCode.includes(resCode)) {
      ElMessage.error(response.data.msg)
      // token过期
      if (resCode === 11001 || resCode === 11002) {
        router.push({ path: '/login' })
      }
    }

    if (loading) endLoading()

    return response
  },
  (error) => {
    // 提示非后台返回的状态
    if (error.request.status !== 200) {
      ElMessage.error('服务器错误')
    }

    if (loading) endLoading()

    return Promise.reject(error.response.data)
  }
)

export default axios
