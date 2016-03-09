var funtimesapp = angular.module('funTimesApp', ['ngRoute']) 

    funtimesapp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/homepage', {
            templateUrl: 'partials/homepage-items.html',
            controller: 'GameListController'
          })
          .when('/about', {
            templateUrl: 'partials/about.html',
            controller: 'aboutFunTimes'
          })
          .otherwise({
            redirectTo: '/homepage'
          })
      }])

     funtimesapp.controller('GameListController', ['$scope', 'GameService',
          function($scope, GameService) {
             GameService.getGames().success(function(data) {
                   $scope.games = data
                 })
             $scope.orderProp = 'age';
     }])

        funtimesapp.controller('aboutFunTimes', ['$scope', function($scope) {
    }]) 

     funtimesapp.factory('GameService', ['$http' , function($http){
            var api = {
                getGames : function() {
                    return $http.get('games/games.json')            
                }, 
               // getPhone : function(id) {  // NEW
                //     return $http.get('games/' + id + '.json')
                //}
            }
            return api
        }])

