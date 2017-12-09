'use strict';

app.controller('user_profile', function ($scope, $routeParams, database) {
  // This will pull the down the post's from the user's profile.

  // This is calling the database to pull down a list of technologies, which will then be displayed in the dom through a ng-repeat
  const pulled_technologies = function () {
    database.get_technologies()
      .then((data){

      })
  }
});