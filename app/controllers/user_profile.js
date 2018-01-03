'use strict';

app.controller('user_profile', function ($scope, $routeParams, database) {
  const get_current_user = function () {
    // console.log('aaa', database.get_current_user());
    return database.get_current_user();
  };
  $scope.post = {
    "User_id": get_current_user(),
    "Post": ""
  };
  // This will pull the down the post's from the user's profile.
  const pull_posts = function () {
    database.pull_posts()
      .then((data) => {
        console.log('these are the pulled posts', data.data.data);
        $scope.pulled_posts = data.data.data;
      });
  };

  // This is creating the post, and sending it to the database
  $scope.create_post = function () {
    // let post = $scope.new_post;
    // console.log('post', $scope.post);

    database.create_post($scope.post)
      .then((data) => {
        pull_posts();
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

  // This creates a new comment and sends it to the database
  $scope.create_comment = function (a) {
    let new_comment = {
      "Personal_post_id": a,
      "User_id": get_current_user(),
      "Comment": $scope.comment
    };
    database.create_comment(new_comment);

  };

  // let new_token = database.get_token();
  // console.log('Proper consol log', new_token);
  pulled_technologies();
  get_current_user();
  pull_posts();
});