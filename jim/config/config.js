angular.module('myApp.router', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/orderList', {
            templateUrl: './view/orderList.html',
            controller: 'orderListCtrl'
        })
            .when('/orderInfo', {
            templateUrl: './view/orderInfo.html',
            controller: 'orderInfoCtrl'
        });
    }])
