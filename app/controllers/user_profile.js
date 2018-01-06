'use strict';

app.controller('user_profile', function ($scope, $routeParams, database) {
  const account = function () {
    database.account_info()
      .then((data) => {
        console.log('returned account', data.data.data);
        $scope.pulled_account = data.data.data;
      });
  };
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
  // This pulls the user's comments
  $scope.pull_comments = function (a) {
    database.pull_personal_post_comments(a)
      .then((data) => {
        console.log('pulled comments', data.data.data);
        $scope.pulled_comments = data.data.data;
        $scope.comment_id = a;
        console.log('pulled id', $scope.comment_id);

      });
  };
  // This creates a new comment and sends it to the database
  $scope.new_comment = {};
  $scope.create_comment = function (a) {
    let user_comment = $scope.user_comment;
    $scope.new_comment.Personal_post_id = a;
    $scope.new_comment.User_id = get_current_user();
    console.log('personal comment sent', $scope.new_comment);
    database.create_comment($scope.new_comment)
      .then((data) => {
        $scope.pull_comments(a);
      });
  };
  // This code will 1) create a boolean value that will decide if the comments section is shown, 2) display the original post, a section to make new comments, and all of the comments that have already been made.

  // This will return true of false, (logic to display comments section)
  $scope.show_comments_table = function (a) {
    if (a == 1) {
      console.log('show_comments_table', true);
      return true;
    } else {
      console.log('show_comments_table', false);
      return false;
    };
  };


  // let new_token = database.get_token();
  // console.log('Proper consol log', new_token);
  account();
  pulled_technologies();
  get_current_user();
  pull_posts();
});