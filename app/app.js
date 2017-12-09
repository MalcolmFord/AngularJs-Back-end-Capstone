'use strict';
//Sets up the use of angular with Aardvark, ngRoute sets up what is viewable in the ng-view portion of the index.
const app = angular.module("Codemunity", ["ngRoute"]);

app.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: './partials/homepage.html',
      controller: 'home_page'
    })
    .when('/login', {
      templateUrl: './partials/login.html',
      controller: 'login'
    })
    .when('/signup', {
      templateUrl: './partials/signup.html',
      controller: 'signin'
    })
    .when('/user_profile', {
      templateUrl: './partials/user_profile.html',
      controller: 'home_page'
    });
});