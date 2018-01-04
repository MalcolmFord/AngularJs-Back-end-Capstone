'use strict';

app.controller('nav_controller', function ($scope, $routeParams, database, $window, $location) {
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
    // console.log('log in a', a);
    // console.log('cu', $scope.current_user);

    if ($scope.current_user === "" || $scope.current_user === undefined)
      return true;
    // $scope.$apply;
    else
      return false;
    // $scope.$apply;
  };
  // This logs the user out, and returns to the home screen.
  $scope.logout = function () {
    database.logout();
    $scope.current_user = "";
    $scope.validate($scope.current_user);
    $scope.apply;
    $window.location.href = '#!/';
  };
  // This checks to see if the current path is the user profile, if so it will run the validate function
  const check_route = function () {
    if ($location.$$path == "/user_profile") {
      $scope.validate($scope.current_user);
      console.log('validating path');

    };

  };

  get_user();
  console.log('route params', $location.$$path);

});