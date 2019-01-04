angular.module('rsc.development.config', []).constant('ENV', {
  api: {
    Home: 'http://10.23.3.183:8080'
  },
  encode: false, // false 不加密
  debug: true,
  version: '0.1.2',
  storage: window.sessionStorage,
  local: window.localStorage,
  // storage: window.localStorage,
  scroll: false,
  imgUrl: 'http://10.23.3.183:8989'
})
