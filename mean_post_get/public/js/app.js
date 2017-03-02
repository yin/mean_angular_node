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
    .when("/list", {
        templateUrl : "partials/list.html",
        controller : "listCtrl"
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
        });
       /*.success(function(data, status, headers, config){
        apc.respost = data; 
       })
       .error(function(data, status, headers, config){
        apc.respost = status; 
      });*/
      
      
      
    }
    

    
});



meanApp.controller('townCtrl', function($http) {
    var town = this;
    var url = "http://localhost:3030";
    
    town.townButtonClick = function(townItem){
      debugger;
      console.log('town button clicked');
       $http.post(url + '/townAdd', {townItemClient: townItem})
       .then(function(response) {
            console.log("Server response ");
            town.responsePost = response.data.townA;
        });
    }
    
    
});


meanApp.controller('listCtrl', function($http) {
    var self = this;
    var url = "http://localhost:3030";
    
    self.addRecord = function(){ debugger;
      debugger;
      console.log('Add record button clicked');
       $http.post(url + '/addRecord', {recordAddClient: self.recordInput})
       .then(function(response) {
            console.log("Server response");
            self.responseAction = response.data.responseAddRecord;
        });
    }
    
    self.removeRecord = function(){ debugger;
    
    }
    
    
});
