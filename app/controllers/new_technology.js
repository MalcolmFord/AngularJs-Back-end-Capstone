'use strict';

app.controller('new_technology', function ($scope, $routeParams, database) {
  let current_user = database.get_current_user();
  // This is taking the user's input for a new technology
  $scope.new_technology = {
    "Name": "",
    "Description": "",
    "User_id": current_user
  };
  // This is creating a new technology
  $scope.create_new_technology = function () {
    database.create_new_technology($scope.new_technology)
      .then((data) => {
        console.log('Data returned from creating new technology', data);
      });
  };
});