var funtimesapp = angular.module('funTimesApp', ['ngRoute', 'ajoslin.promise-tracker']) 


    funtimesapp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/homepage', {
            templateUrl: 'partials/homepage-items.html',
            controller: 'gameListCtrl'
          })
          .when('/about', {
            templateUrl: 'partials/about.html',
            controller: 'aboutFunTimesCtrl'
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
            controller: 'gameReviewCtrl'
          })
          .when('/contact', {
            templateUrl: 'partials/contact-us.html',
            controller: 'contactUsCtrl'
          })
          .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
          })
          .when('/myaccount', {
              resolve: {
                user: function(AuthenticationService, $location){
                  if(!AuthenticationService.isAuthenticated){ 
                    $location.url("/login");
                  }
                  return AuthenticationService.user;
                }
              },
              templateUrl: 'partials/my-account.html',
              controller: 'myAcountCtrl'
          })
          .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'registerCtrl'
          })
          .otherwise({
            redirectTo: '/homepage'
          })
      }])

     funtimesapp.controller('gameListCtrl', ['$scope', 'GameService',
          function($scope, GameService) {
             GameService.getAllGames().success(function(data) {
                   $scope.games = data
                 })
             $scope.orderProp = 'age';
              $scope.greaterThan = function(prop, val){
                  return function(releaseDate){
                    if (releaseDate[prop] > val) return true;
              }}
     }])

      funtimesapp.controller('allGamesCtrl', ['$scope', 'GameService',
      function($scope, GameService) {
         GameService.getAllGames().success(function(data) {
               $scope.games = data
                $scope.buttonText = "Newest";
             })

             $scope.predicate = 'age';
              $scope.reverse = true;
              $scope.order = function(predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
              };

         $scope.orderProp = 'releaseDate';
      }])


      funtimesapp.controller('gameDetailsCtrl', 
         ['$scope', '$location', '$routeParams', 'GameService', 
         function($scope, $location, $routeParams, GameService) {
             GameService.getGame($routeParams.gameId)
                .success(function(data) {
                   $scope.game = data
                   $scope.img = $scope.game.images[0]
                   })
                .error(function(err) {
                    $location.path('./pnones') 
                  })
             $scope.setImage = function(img) {
                  $scope.img = img
               }
      }])

      funtimesapp.controller('gameReviewCtrl', 
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

    funtimesapp.controller('aboutFunTimesCtrl', ['$scope', function($scope) {
    }]) 

    funtimesapp.controller('LoginCtrl', function($scope, $http, $location, AuthenticationService, UserService) {
      var users = UserService.getUsers()
        $scope.login = function() {
          for(var i=0;i<users.length;i++){
            if ($scope.username === users[i].username && $scope.password === users[i].password) {
              console.log('successful')
              AuthenticationService.isAuthenticated = true;
              AuthenticationService.user = { name: users[i].username,
                                      address: users[i].address,
                                      mobileNumber: users[i].mobileNumber };
              $location.url("/myaccount");
            } else {
              $scope.loginError = "Sorry. Invalid username/password combination";
              console.log('Login failed..');
            };
          }
        };
        $scope.cancel = function(){
          $location.url('/homepage');
        };
    })


    funtimesapp.controller('myAcountCtrl', function($scope, user) {
      $scope.user = user.name;
      $scope.address = user.address;
      $scope.mobileNumber = user.mobileNumber;
    });

    funtimesapp.controller('contactUsCtrl', function ($scope, $http, $log, promiseTracker, $timeout) {
        $scope.subjectListOptions = {
          'bug': 'Report a Bug',
          'account': 'Account Problems',
          'other': 'Other'
        };

        // Inititate the promise tracker to track form submissions.
        $scope.progress = promiseTracker();

        // Form submit handler.
        $scope.submit = function(form) {
          // Trigger validation flag.
          $scope.submitted = true;

          // If form is invalid, return and let AngularJS show validation errors.
          if (form.$invalid) {
            return;
          }

          // Default values for the request.
          var config = {
            params : {
              'callback' : 'JSON_CALLBACK',
              'name' : $scope.name,
              'email' : $scope.email,
              'subjectList' : $scope.subjectList,
              'url' : $scope.url,
              'comments' : $scope.comments
            },
          };

          // Perform JSONP request.
          var $promise = $http.jsonp('../support/response.json', config)
            .success(function(data, status, headers, config) {
              if (data.status == 'OK') {
                $scope.name = null;
                $scope.email = null;
                $scope.subjectList = null;
                $scope.url = null;
                $scope.comments = null;
                $scope.messages = 'Your form has been sent!';
                $scope.submitted = false;
              } else {
                $scope.messages = 'Oops, we received your request, but there was an error processing it.';
                $log.error(data);
              }
            })
            .error(function(data, status, headers, config) {
              $scope.progress = data;
              $scope.messages = 'There was a network error. Try again later.';
              $log.error(data);
            })
            .finally(function() {
              // Hide status messages after three seconds.
              $timeout(function() {
                $scope.messages = null;
              }, 3000);
            });

          // Track the request and show its progress to the user.
          $scope.progress.addPromise($promise);
        };
    }); 

    funtimesapp.controller('registerCtrl', function ($scope,$location,UserService) {
    $scope.users = UserService.getUsers();
    $scope.register = function () {
        UserService.register($scope.newUser)
        $scope.newUser = {}
        $location.path('/login')
    }
    $scope.cancel = function(){
        $location.url('/homepage');
      };
    })

     funtimesapp.factory('GameService', ['$http' , function($http){
            var api = {
               getGame : function(id) {  // NEW
                    return $http.get('games/' + id + '.json')
                },
                getAllGames : function() {
                    return $http.get('games/allGames.json')            
                }
            }
            return api
        }])

     funtimesapp.factory('AuthenticationService', function() {
        return {
          isAuthenticated: false,
          user: null
        }
      });

     funtimesapp.factory('UserService', [function(){
        var users = [ 
                { 
                    username : 'seanieoc',
                    password : 'pass1234',
                    address : 'Wexford',
                    mobileNumber : '0861234567', 
                    id: 1
                  },
                { 
                    username : 'admin',
                    password : 'password',
                    address : 'Waterford',
                    mobileNumber : '0861234567', 
                    id: 2
                  },
                ]

         var api = {
             getUsers : function() {
                return users
             },
              register : function(user) {
               users.push({ username: user.username, password: user.password, 
                    address: user.address, mobileNumber: user.mobileNumber })
            }
          }
          return api
      }])

     //youtTube Player
     funtimesapp.directive('youtube', function($window) {
      return {
        restrict: "E",

        scope: {
          height: "@",
          width: "@",
          videoid: "@"
        },

        template: '<div></div>',

        link: function(scope, element) {
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          var player;

          $window.onYouTubeIframeAPIReady = function() {

            player = new YT.Player(element.children()[0], {
              playerVars: {
                autoplay: 0,
                html5: 1,
                theme: "light",
                modesbranding: 0,
                color: "white",
                iv_load_policy: 3,
                showinfo: 1,
                controls: 1
              },

              height: scope.height,
              width: scope.width,
              videoId: scope.videoid, 
            });
          }

          scope.$watch('videoid', function(newValue, oldValue) {
            if (newValue == oldValue) {
              return;
            }

            player.cueVideoById(scope.videoid);

          }); 

          scope.$watch('height + width', function(newValue, oldValue) {
            if (newValue == oldValue) {
              return;
            }

            player.setSize(scope.width, scope.height);

          });
        }  
      };
    });

    funtimesapp.controller("YouTubeCtrl", function($scope) {
      //initial settings
      $scope.yt = {
        width: 560, 
        height: 315, 
        videoid: "mlaxs1Ur-NU",
      };

    });
