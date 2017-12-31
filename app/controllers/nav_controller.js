'use strict';

app.controller('nav_controller', function ($scope, $routeParams, database, $window) {
  // GLOBAL VARIABLE
  var current_user = "";

  // This function gets the cookie data, and sets the current_user variable to the user id
  const get_user = function () {
    let a = database.get_cookies();
    console.log('a', a.user_id);
    current_user = a.user_id;
    console.log('b', current_user);

  };
  // This logic checks to see if the variable "current_user" is empty
  $scope.validate = function () {
    if (current_user == "") {
      return false;
      $scope.$apply;
    }
    else {
      return true;
      $scope.$apply;
    };
  };
  console.log('c', $scope.validate());


  get_user();
});