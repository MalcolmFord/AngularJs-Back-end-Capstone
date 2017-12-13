'use strict';

app.controller('technology', function ($scope, $routeParams, database) {
  let current_user = database.get_current_user();
  $scope.new_technology = {
    "Name": "",
    "Description": "",
    "User_id": current_user
  };
  $scope.create_new_technology = function () {
    database.create_new_technology($scope.new_technology)
      .then((data) => {
        console.log('Data returned from creating new technology', data);
      });
  };
});