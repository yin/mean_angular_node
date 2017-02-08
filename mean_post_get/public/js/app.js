var meanApp = angular.module('meanApp', ['ngRoute']);


meanApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "partials/home.html",
        controller : "appCtrl"
    })
    .when("/city", {
        templateUrl : "partials/city.html",
        controller : "cityCtrl"
    })
    .when("/town", {
        templateUrl : "partials/town.html",
        controller : "townCtrl"
    });
});

meanApp.controller('appCtrl', function($http) {
    var apc = this;
    var url = "http://localhost:3030";
    
    apc.thingsFromMongo = [];
    
    apc.submit = function(thing){
      console.log('apc submited');
      $http.post(url + '/add', {thing: thing});
    }
    
});