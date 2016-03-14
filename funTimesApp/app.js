var funtimesapp = angular.module('funTimesApp', ['ngRoute']) 
//var modalApp = angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);

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
          .when('/games', {
            templateUrl: 'partials/games.html',
            controller: 'allGamesCtrl'
          })
          .when('/games/:gameId', {
            templateUrl: 'partials/game-details.html',
            controller: 'gameDetailsCtrl'
          })
          .when('/games/:gameId/reviews', {
            templateUrl: 'partials/game-reviews.html',
            controller: 'GameReviewCtrl'
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
/*
     funtimesapp.controller('GameReviewCtrl', ['$scope',
       'GameService', 
       '$routeParams',
       function ($scope,GameService ,$routeParams) {
             $scope.games = GameService.getGames($routeParams.game)
      }])
*/
      funtimesapp.controller('allGamesCtrl', ['$scope', 'GameService',
      function($scope, GameService) {
         GameService.getAllGames().success(function(data) {
               $scope.games = data
             })
         $scope.orderProp = 'age';
      }])


      funtimesapp.controller('gameDetailsCtrl', 
         ['$scope', '$location', '$routeParams', 'GameService', 
         function($scope, $location, $routeParams, GameService) {
             GameService.getGame($routeParams.gameId)
                .success(function(data) {
                   $scope.game = data
                   })
                .error(function(err) {
                    $location.path('./games') 
                  })
      }])

      funtimesapp.controller('GameReviewCtrl', 
         ['$scope', '$location', '$routeParams', 'GameService', 
         function($scope, $location, $routeParams, GameService) {
             GameService.getGame($routeParams.gameId)
                .success(function(data) {
                   $scope.game = data
                   //$scope.comments = $scope.game.comments[0]
                   //$scope.img = $scope.phone.images[0]
                   })
                .error(function(err) {
                    $location.path('./homepage-items') 
                  })
            $scope.incrementUpvotes = function(comment) {
                  comment.upvotes += 1;
            }
            $scope.addComment = function(){
	            $scope.game.comments.push({
                    "body": $scope.comment.body,
                    "author": $scope.comment.author,
                    "upvotes": 0
                });
	            //$scope.comment = {} ;
          	}

      }])

      funtimesapp.controller('aboutFunTimes', ['$scope', function($scope) {
    }]) 

     funtimesapp.factory('GameService', ['$http' , function($http){
            var api = {
                getGames : function() {
                    return $http.get('games/games.json')            
                }, 
               getGame : function(id) {  // NEW
                    return $http.get('games/' + id + '.json')
                },
                getAllGames : function() {
                    return $http.get('games/allGames.json')            
                }
            }
            return api
        }])

     //angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
