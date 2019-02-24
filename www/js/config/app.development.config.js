angular.module('rsc.development.config', []).constant('ENV', {
  api: {
    Home: 'http://120.78.206.130:8080',
    // ImgUpload:'http://120.78.206.130:8080'
    businesscard:'https://recognition.image.myqcloud.com/ocr/businesscard'
  },
  encode: false, // false 不加密
  debug: true,
  version: '0.1.2',
  // storage: window.sessionStorage,//临时
  local: window.localStorage,
  storage: window.localStorage,
  scroll: false,
  imgUrl: 'http://120.78.206.130:8899/image/'
});
