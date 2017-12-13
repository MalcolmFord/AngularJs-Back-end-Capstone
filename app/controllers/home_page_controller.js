'use strict';

app.controller('home_page', function ($scope, $routeParams, database) {
  const pull_technologies = function () {
    database.get_technologies()
      .then((data) => {
        console.log('pulled tech', data.data.data);
        $scope.card = data.data.data;
      });
  };

  pull_technologies();
});