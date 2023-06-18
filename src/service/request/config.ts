// 1.手动修改(略)

// 2.根据process.env.NODE_ENV区分
let BASE_URL = ''
// let BASE_NAME = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://httpbin.org/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://qiaoqi.org/prod'
} else {
  BASE_URL = 'http://qiaoqi.org/test'
}

export { BASE_URL, TIME_OUT }
