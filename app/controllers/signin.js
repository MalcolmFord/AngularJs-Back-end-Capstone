'use strict';

app.controller('signin', function ($scope, $routeParams, database) {
  // These are the functions for the sign up view

  // This is taking the inputs from the sign up page and assiging them to variables.
  $scope.user_inputs = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };
  // This will be the function that takes user's input and sends it to the factory
  $scope.create_account = function () {
    database.create_account($scope.user_inputs)
      .then(() => {
      });
  };



  // There are the functions for the login view







});