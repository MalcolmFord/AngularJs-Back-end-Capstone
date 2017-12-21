'use strict';

app.controller('technology', function ($scope, $routeParams, database, $window) {
  // ********************************** GLOBAL VARIABLES ***********************************
  let route_id = $routeParams.id;
  let current_user;
  let returned_user_block = database.get_cookies();
  let returned_user = returned_user_block.user_id;
  var update_id;
  // ********************************** END OF GLOBAL VARIABLES ***************************************

  // This will pull the technology posts based on the technology id, which is (route_id).
  const pull_technology_info = function () {
    database.pull_technology(route_id)
      .then((data) => {
        $scope.technology_name = data.data.data.Name;
        $scope.technology_description = data.data.data.Description;
      });
  };

  // This will pull the admin posts using (route_id)
  const pull_admin_posts = function () {
    database.pull_admin_posts(route_id)
      .then((data) => {
        $scope.admin_posts = data.data.data;
      });
  };

  // This is taking takeing the user's input and creating a new post.
  $scope.new_admin_post = function () {
    let admin_input = $scope.admin_post;
    let new_post = {
      "User_id": returned_user,
      "Technology_id": route_id,
      "Post": admin_input
    };
    console.log('clicked add new admin post', new_post);
    database.new_admin_post(route_id, new_post)
      .then((data) => {
        pull_admin_posts();
      });
  };

  // Redirects the user to the specific message board
  $scope.redirect = function () {
    $window.location.href = `#!/message_board/${route_id}`;
  };

  // This will update the input box with the post to be updated
  $scope.edit = function (a) {
    console.log('edit clicked', a);
    // This is taking the post's id, sending it to the database, getting that same post back, and setting the input box equal to that post's value
    console.log('fetched post data', a.Post);
    $scope.admin_post = a.Post;
    update_id = a.id;
    // This will mark a variable true, so that the update button shows
  };

  // this will update the post
  $scope.update = function () {
    let new_update_post = {
      "User_id": returned_user,
      "Technology_id": route_id,
      "Post": $scope.admin_post
    };
    database.update_tech_post(update_id, new_update_post)
      .then(() => {
        pull_admin_posts();
      });
  };

  // This will delete the post
  $scope.delete = function (a) {
    database.delete_post(route_id, a)
      .then(() => {
        pull_admin_posts();
      });
  };


  pull_technology_info();
  pull_admin_posts();
});