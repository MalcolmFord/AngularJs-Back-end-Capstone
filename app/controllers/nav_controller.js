'use strict';

app.controller('nav_controller', function ($scope, $routeParams, database, $window) {
  // GLOBAL VARIABLE
  $scope.current_user = "";

  // This function gets the cookie data, and sets the current_user variable to the user id
  const get_user = function () {
    let a = database.get_cookies();
    // console.log('a', a.user_id);
    $scope.current_user = a.user_id;
    // console.log('b', $scope.current_user);

  };
  // This logic checks to see if the variable "current_user" is empty
  $scope.validate = function (a) {
    if (a === "")
      return true;
    // $scope.$apply;
    else
      return false;
    // $scope.$apply;

  };
  console.log('c', $scope.validate($scope.current_user));
  console.log('d', $scope.current_user);



  get_user();
});