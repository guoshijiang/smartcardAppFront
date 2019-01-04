angular
  .module('starter.controllers', [])

  /**
   *  A:指令之间的控制器的方法公用的逻辑使用；require: ['?^add', '?^minor'], 
  指令的使用要有包含关系才能用到该依赖的指令控制器
   */
  .directive('add', function() {
    return {
      restrict: 'ECMA',
      controller: function($scope) {
        var self = this
        self.addCount = function() {
          $scope.$apply(function() {
            $scope.count++
            self.getConsole($scope.count)
          })
        }
        self.getConsole = function(ele) {
          console.log(ele)
        }
        self.set = function(n) {
          $scope.count = 20
        }
      }
    }
  })
  .directive('minor', function() {
    return {
      restrict: 'ECAM',
      controller: function($scope) {
        this.reduceCount = function() {
          $scope.$apply(function() {
            $scope.count--
          })
        }
      }
    }
  })

  .directive('figure', function() {
    return {
      restrict: 'ECMA',
      template:
        '<button id="add" class="btn btn-default">增加</button>' +
        '<button id="minor" class="btn btn-danger">减少</button>' +
        '<div ng-click="call(temp)">{{ figureCtrl.temp }}{{temp}}</div>' +
        '<span ng-click="set()">初始化<span>',
      require: ['?^add', '?^minor'],
      controller: function() {
        this.temp = '这个属性被隔离开，可通过controllerAs创建的动态对象调用'
      },
      controllerAs: 'figureCtrl',
      link: function(scope, element, attrs, resultCtrl) {
        scope.temp = '重新写的'
        scope.count = 12
        scope.call = resultCtrl[0].getConsole
        scope.set = resultCtrl[0].set
        console.log(resultCtrl)
        angular
          .element(document.querySelector('#minor'))
          .on('click', resultCtrl[1].reduceCount)
        angular
          .element(document.querySelector('#add'))
          .on('click', resultCtrl[0].addCount)
      }
    }
  })

  /**
   * B:定义服务的控制器的指令公共用的
   */
  .controller('$huiCtr', [
    '$scope',
    '$element',
    function($scope, $element) {
      var self = this
      self.init = function() {
        console.log('使用该模式', $element)
      }
    }
  ])

  .directive('huiSz', function() {
    return {
      restrict: 'EA',
      priority: 1000, //优先级高低 >1
      controller: '$huiCtr', //使用该控制器
      compile: function(tElement) {
        return function link($scope, $element, $attrs, szCtrls) {
          console.log(szCtrls)
          // szCtrl.init();
        }
      }
    }
  })
  /**
   * C:既用嵌套指令的控制器又使用自己的控制器（自己的控制器可以是自己新写的也可以是使用公共的控制器的服务）
   *
   */
  .directive('jieRuSz', function() {
    return {
      restrict: 'ECMA',
      require: ['?^add', 'jieRuSz'],
      template:
        '<div id="add">jieRuSz既使其他的指令用控制器又使用公共的裸露控制器<p>p段落的点击事件</p></div>',
      controller: '$huiCtr',
      // 两种使用写法的方式
      // compile: function (tElement) {
      //   return function link($scope, $element, $attrs, szCtrls) {
      //     console.log(szCtrls);
      //     szCtrls[1].init();
      //   };
      // }
      link: function($scope, element, $attrs, szCtrls) {
        console.log(element, szCtrls)
        // 全局的标签绑定事件
        element.on('click', function() {
          //获取当前的dom绑定事件
          console.log('我是点击了element的事件')
        })
        console.log(element[0])
        // 获取指定的标签绑定事件
        angular
          .element(element[0].querySelector('a'))
          .on('click', function(event) {
            event.stopPropagation() //阻止事件冒泡
            // event.preventDefault()//
            // return false;
            console.log('我是点击了$element内p段落的事件')
          })

        szCtrls[1].init()
      }
    }
  })
