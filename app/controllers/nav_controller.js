'use strict';

app.controller('nav_controller', function ($scope, $routeParams, database) {
  // This is pulling a list of all technologies, and setting them equal to a variable
  const search_results = function () {
    database.get_technologies()
      .then((data) => {
        $scope.search_return = data.data.data;
        console.log('navbar search results', $scope.search_return);
      });
  };

  search_results();
});