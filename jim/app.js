'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.router'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/orderList'});
}])
    .run(['$rootScope',function($rootScope){
        angular.element(document.getElementById("menu-toggle")).click(function(e) {
            e.preventDefault();
            angular.element(document.getElementById("wrapper")).toggleClass("toggled");
        });
        angular.element(document.getElementById("menu-toggle")).click();
        var  height = window.screen.height;
        angular.element(document.getElementById("menu-toggle"))
        angular.element(document.getElementsByClassName("row-head")).css("height",height+'px');
        angular.element(document.getElementsByClassName("collapsed")).click(function (e) {
                e.preventDefault();
                var cls_right='i.fa.fa-angle-right';
                var cls_down='i.fa.fa-angle-down';
                if(angular.element(e.target).parent().children(cls_right).length>0){
                    angular.element(e.target).parent().children(cls_right).attr("class","fa fa-angle-down fa-16x");
                    return;
                }else if(angular.element(e.target).children(cls_right).length>0){
                    angular.element(e.target).children(cls_right).attr("class","fa fa-angle-down fa-16x");
                    return;
                }else if(angular.element(e.target).hasClass(cls_right)){
                    angular.element(e.target).attr("class","fa fa-angle-down fa-16x");
                    return;
                }
            if(angular.element(e.target).parent().children(cls_down).length>0){
                angular.element(e.target).parent().children(cls_down).attr("class","fa fa-angle-right fa-16x");
                return;
            }else if(angular.element(e.target).children(cls_down).length>0){
                angular.element(e.target).children(cls_down).attr("class","fa fa-angle-right fa-16x");
                return;
                // angular.element(e.target).attr("class","fa fa-angle-down fa-16x");
                // .removeClass("fa-angle-right").addClass("fa-angle-down");
            }else if(angular.element(e.target).hasClass(cls_down)){
                angular.element(e.target).attr("class","fa fa-angle-right fa-16x");
                return;
            }
            });
}]);;


