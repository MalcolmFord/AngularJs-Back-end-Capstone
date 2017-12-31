'use strict';

app.controller('login', function ($scope, $routeParams, database, $window) {
  // These are the user inputs for the login
  $scope.credentials = {
    email: "",
    password: ""
  };
  // This takes the user's input and sends it to the api to sign the user in.
  $scope.login = function () {
    database.login($scope.credentials)
      .then((data) => {
        // console.log('Logged in data', data);
        $window.location.href = '#!/user_profile';
      });
  };

});