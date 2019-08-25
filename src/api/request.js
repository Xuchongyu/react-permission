// axios.defaults.baseURL = '/api/'
axios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  if (config.data) {
    config.data.token = localStorage.getItem("token");
    config.data.serialId = uuidv4();
    config.data = {
      ...config.data,
      ...base.baseParams,
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
axios.interceptors.response.use((response) => {
  let responseData = response.data
  if (!responseData) {
    console.log('接口没有返回数据')
    return null
  }
  if (responseData.code === "000000") {
    // let backData = {}
    // for (let key in responseData) {
    //   if (key !== 'code' && key !== 'message') {
    //     backData[key] = key === 'data' && !responseData[key] ? {} : responseData[key]
    //   }
    // }
    // if (JSON.stringify(backData) === '{}') {
    //   backData = { data: {} }
    // }
    return Promise.resolve({data: responseData.data, isContinue: true})
  }
  let message = ''
  switch (responseData.code) {
    case '999999':
      message = '网络错误'
      break
    case '011001':
      message = '登录过期，请重新登录！'
      break
    default:
      message = responseData.message
      break
  }
  Message.error(message)
  if (responseData.code === '011001') {
    window.location.href = '/#/user/login'
  }
  return Promise.resolve({ data: null, isContinue: false})
}, (error) => {
  Message.warning('请求失败，请稍后再试！')
  return Promise.reject(error)
})
// 所有API语义化封装
export default {
  axios,
  get: axios.get,
  post: axios.post
}