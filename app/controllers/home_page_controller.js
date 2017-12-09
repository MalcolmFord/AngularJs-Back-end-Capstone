'use strict';

app.controller('home_page', function ($scope, $routeParams, database) {
  database.get_technologies();
});