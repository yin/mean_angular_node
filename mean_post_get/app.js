var meanApp = angular.module('meanApp', ['ngRoute']);


meanApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html",
        controller : "appCtrl"
    })
    .when("/city", {
        templateUrl : "city.html",
        controller : "cityCtrl"
    })
    .when("/town", {
        templateUrl : "town.html",
        controller : "townCtrl"
    });
});

meanApp.controller('appCtrl', function($http) {
    var apc = this;
    var url = "http://localhost:3000";
    
    apc.thingsFromMongo = [];
    
    apc.submit = function(thing){
      console.log('apc submited');
      $http.post(url + '/add', {thing: thing});
    }
    
});