import axios from 'axios'

// axios 发送get请求
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'qiaoqi',
//       age: 19
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios 发送post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'qiaoqi',
//       age: 19
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 4.axios的配置选项
// 4.1 全局配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000

// 4.2 每个请求单独配置
axios
  .get('/get', {
    params: {
      name: 'qiaoqi',
      age: 19
    },
    timeout: 5000,
    headers: {}
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('/post', {
    data: {
      name: 'qiaoqi',
      age: 19
    }
  })
  .then((res) => {
    console.log(res.data)
  })

// 5.axios.all -> 多个请求，一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'why', age: 19 } }),
    axios.post('/post', { data: { name: 'qiaoqi', age: '19' } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })

// 6.axios的拦截器
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 修改config
    // 1.给请求添加token
    // 2.isLoading动画
    console.log('请求成功拦截')
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)

// fn1: 请求响应成功会执行的函数 20x
// fn2: 请求响应失败会执行的函数 40x
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
