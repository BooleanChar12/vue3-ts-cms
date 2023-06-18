// 1.手动修改(略)

// 2.根据process.env.NODE_ENV区分
let BASE_URL = ''
let BASE_NAME = ''

if (process.env.NODE_ENV === 'development') {
  ;(BASE_URL = 'http://qiaoqi.org/dev'), (BASE_NAME = 'qiaoqi')
} else if (process.env.NODE_ENV === 'production') {
  ;(BASE_URL = 'http://qiaoqi.org/prod'), (BASE_NAME = 'kobe')
} else {
  ;(BASE_URL = 'http://qiaoqi.org/test'), (BASE_NAME = 'james')
}

export { BASE_URL, BASE_NAME }
