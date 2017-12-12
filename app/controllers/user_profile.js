'use strict';

app.controller('user_profile', function ($scope, $routeParams, database) {
  const get_current_user = function () {
    console.log('aaa', database.get_current_user());

    return database.get_current_user();
  };
  $scope.post = {
    "User_id": get_current_user(),
    "Post": ""
  };

  // This is creating the post, and sending it to the database
  $scope.create_post = function () {
    let post = $scope.new_post;
    // console.log('post', $scope.post);

    database.create_post($scope.post)
      .then((data) => {
        // pull_posts();
      });
  };


  // This will pull the down the post's from the user's profile.
  const pull_posts = function () {
    database.pull_posts
      .then((data) => {
        $scope.pulled_posts = data;
      });
  };
  // This is calling the database to pull down a list of technologies, which will then be displayed in the dom through a ng-repeat
  const pulled_technologies = function () {
    database.get_technologies()
      .then((data) => {
        $scope.technologies = data.data.data;
        // console.log('tech returned', data.data.data);
      });
  };
  const user_data = function () {
    let token = database.get_token;
    let user_id = database.current_user;
  };
  pulled_technologies();

  let new_token = database.get_token();
  // console.log('Proper consol log', new_token);
  get_current_user();
});