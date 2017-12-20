'use strict';
//Sets up the use of angular with Aardvark, ngRoute sets up what is viewable in the ng-view portion of the index.
const app = angular.module("Codemunity", ["ngRoute", "ngCookies", "angular-cloudinary"]);

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
      controller: 'user_profile'
    })
    .when('/new_technology', {
      templateUrl: './partials/new_technology.html',
      controller: 'new_technology'
    })
    .when('/technology/:id', {
      templateUrl: './partials/technology.html',
      controller: 'technology'
    })
    .when('/message_board/:id', {
      templateUrl: './partials/message_board.html',
      controller: 'message_board'
    });

  app.config((cloudinaryProvider) => {
    cloudinaryProvider.config({
      upload_endpoint: 'https://api.cloudinary.com/v1_1/',
      cloud_name: 'codemunity',
      api_key: '631923789456471',
      api_secret: 'RRjMIuctafKwafpUsAiMcWKuiHU'
    });
  });
});