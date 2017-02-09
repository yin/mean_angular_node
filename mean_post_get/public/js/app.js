var meanApp = angular.module('meanApp', ['ngRoute']);


meanApp.config(function($routeProvider,$locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
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
    })
    .otherwise({ redirectTo: '/' });
});

meanApp.controller('appCtrl', function($http) {
    var apc = this;
    var url = "http://localhost:3030";
    
    apc.thingsFromMongo = [];
    
    apc.submit = function(thing){
      console.log('apc submited');
       $http.post(url + '/add', {thingInput: thing})
       .then(function(response) {
            console.log("Server response ");
            apc.respost = response.data.a;
            apc.$apply(); 
        });
       /*.success(function(data, status, headers, config){
        apc.respost = data; 
       })
       .error(function(data, status, headers, config){
        apc.respost = status; 
      });*/
      
      
      
    }
    
});