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



meanApp.service('mongoDb', function($http) { debugger;
    var self = this;
    var url = "http://localhost:3030";
    var cachedResponse;
    self.getRecord = function () {
      console.log('Get record from mongodb');
      return $http.post(url + '/getRecord', {action: 'getRecord'})
       .then(function(response) {
            cachedResponse = response;
            console.log("Server response");debugger;
            return response.data.responseAction;
            
      });
    }
});

meanApp.controller('listCtrl', function($http, mongoDb) {
    var self = this;
    var url = "http://localhost:3030";
    
    
    self.getAllDataDb = function(){ debugger;
      mongoDb.getRecord().then(function(data){
          self.items = data;
       });
       debugger;
    }
    
    
    
    /*
    self.getAllDataDb = function(){
      
      console.log('Get record from mongodb');
      $http.post(url + '/getAllRecord', {recordAddClient: self.recordInput})
       .then(function(response) {
            console.log("Server response");
            self.responseAction = response.data.responseAddRecord;
      });
      
    }
    */
    
    self.addRecord = function(){ 
      
      console.log('Add record button clicked');
      $http.post(url + '/addRecord', {recordAddClient: self.recordInput})
       .then(function(response) {
            console.log("Server response");
            self.responseAction = response.data.responseAddRecord;
      });
      
    }
    
    
    
    self.removeRecord = function(){ 
    
    }
    
    
});
