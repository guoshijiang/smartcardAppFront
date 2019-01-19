angular.module('rsc.development.config', []).constant('ENV', {
  api: {
    Home: 'http://120.78.206.130:8080'
  },
  encode: false, // false 不加密
  debug: true,
  version: '0.1.2',
  storage: window.sessionStorage,
  local: window.localStorage,
  // storage: window.localStorage,
  scroll: false,
  imgUrl: 'http://120.78.206.130:8989'
});
