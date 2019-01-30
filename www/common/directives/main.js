/**
 * 所有公共指令
 */

angular
  .module('rsc.common.directives', [])
  .directive('xnCall', function(
    smdkAlert,
    $rootScope,
    ionicToast,
    Storage
  ) {
    return {
      restrict: 'EAC',
      replace: true,
      scope: {
        telnum:"@"
      },
      link: function($scope, element, attributes) {
        var vm = ($scope.vm = this)
        vm.telPhone = function() {
          var obj = {
            templateUrl:'<p>'+$scope.telnum+'</p>',
            btn: '拨号'
          }

          if ($scope.telnum) {
            smdkAlert.tPopup($scope, obj, {}, vm.success, vm.err)
          } else {
            ionicToast.hide();
            ionicToast.show('获取电话失败，稍后再试', 'middle', false, 1500);
          }
        }

        //成功打电话
        vm.success = function() {
          window.plugins.CallNumber.callNumber(
            function onSuccess(res) {
              $log.debug('Succcess:call number' + res)
            },
            function onError(res) {
              $log.debug('Error:call number' + res)
            },
            vm.query.phone,
            true
          )
        }

        vm.err = function() {}
        element.on('click', vm.telPhone)
      }
    }
  })

  /**
   *
   * 上传图片组件
   */
  .directive('smdkImgTool', function(
    smdkAlert,
    FileUpload,
    fileReader,
    $rootScope,
    $ionicHistory,
    $log,
    $http,
    ionicToast,
    ENV,
    $ionicLoading,
    Storage
) {
    return {
        restrict: 'ECA',
        replace: true,
        scope: {
            fun: '='
        },
        link: function($scope, element, attr) {
            element.on('click', function() {
                // alert(33)
                $scope.upLoadOrderImg()
            })
            //获取input中files 信息
            $scope.getUploadPic = function(e) {
                $scope.file = e
                $scope.getFile()
            }

            $scope.getFile = function() {
                fileReader
                    .readAsDataUrl($scope.file[0], $scope)
                    .then(function(result) {
                        if (result) {
                            $scope.previewImageSrc = result
                        }
                    })
            }

            var _upimg = function(file, _url, $http) {
                var c = new FormData()
                c.append('file', file)
                c.append('type', 'file')
                console.log(c, file)
                // 上传图片
                return $http({
                    method: 'POST',
                    url: _url,
                    data: c,
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                })
            }
            //上传图片方法
            $scope.upLoadOrderImg = function() {
                $scope.previewImageSrc = ''

                if (ionic.Platform.isWebView()) {
                    //APP端
                    var opt = {
                        url: ENV.api.Home + '/upload/imgfile',
                        headers: {
                            'x-access-token': Storage.get('userInfo').token,
                            'Content-Type': undefined
                        }
                    }

                    FileUpload.upload('resizeImg', opt, function(res) {
                        $ionicLoading.show({
                            template: '上传中...'
                        })
                        res.then(
                            function(json) {
                                $log.debug('上传图片的回调', json)
                                var result = JSON.parse(json.response)

                                if (result.status == '200') {
                                    $ionicLoading.hide()
                                    ionicToast.show('上传成功','middle', false, 1500)

                                    $scope.fun.user_pho =
                                        result.data.img_url
                                    Storage.set('userInfo', $scope.fun)
                                    console.log($scope.fun)
                                } else {
									ionicToast.show('上传失败','middle', false, 1500)
                                    $ionicLoading.hide()
                                }
                            },
                            function(err) {
                                $ionicLoading.hide()
                                ionicToast.show('上传失败','middle', false, 1500)
                            },
                            function(progress) {}
                        ).finally(function() {
                            $ionicLoading.hide()
                        })
                    })
                } else {
                    //pc端

                    var data = {
                        type: 'file'
                    }
                    var obj = {
                        templateUrl:'<div>'
                        +'<label class="item item-input">'
                           +'<input type="file" name="file" accept=".jpg,.png,.jpeg,.bmp" ng-model="data.file" onchange="angular.element(this).scope().getUploadPic(this.files)" ng-disabled="0" />'
                    
                        +'</label>'
                        +'<h6 class="text-red">请选择小于5M的png格式的图片</h6>'
                        +'<img ng-if="previewImageSrc" class="img-size center-block" ng-src="{{previewImageSrc}}" alt="预览图片">'
                    +'</div>',
                        title: '上传头像',
                        btn:'确定'
                    }
                    smdkAlert.tPopup($scope, obj, data, function(res) {
                        if (res) {
                            if (!$scope.file) {
                                ionicToast.show('选择图片失败,再次上传','middle', false, 1500)
                                return false
                            }
                            var _url = ENV.api.Home + '/upload/imgfile';
                            _upimg($scope.file[0], _url, $http).success(
                                function(data) {
                                    if (data.status == '200') {
                                        ionicToast.show('上传成功','middle', false, 1500)
                                        $scope.fun.user_pho = data.data.img_url
                                        Storage.set('userInfo', $scope.fun)
                                        console.log($scope.fun)
                                    } else {
                                        ionicToast.show('上传失败,请稍后重试','middle', false, 1500)
                                    }
                                }
                            )
                        }
                    })
                }
            }
        }
    }
})