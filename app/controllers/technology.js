'use strict';

app.controller('technology', function ($scope, $routeParams, database, $window) {
  // This is taking the route params id, also getting the current user
  let route_id = $routeParams.id;
  let user_id = database.get_current_user();
  // This will pull the technology posts based on the technology id.
  const pull_technology_info = function () {
    database.pull_technology(route_id)
      .then((data) => {
        console.log('data from technologies', data.data.data.Name);
        $scope.technology_name = data.data.data.Name;
        $scope.technology_description = data.data.data.Description;
      });
  };
  // This will pull the admin posts
  const pull_admin_posts = function () {
    database.pull_admin_posts(route_id)
      .then((data) => {
        console.log('pulled admin posts', data.data.data);
        $scope.admin_posts = data.data.data;
      });
  };

  // This is taking takeing the user's input and sending it to the database.
  $scope.new_admin_post = function () {
    let admin_input = $scope.admin_post;
    let new_post = {
      "User_id": user_id,
      "Technology_id": route_id,
      "Post": admin_input
    };
    console.log('clicked add new admin post', new_post);
    database.new_admin_post(route_id, new_post)
      .then((data) => {
        pull_admin_posts();
      });
  };
  $scope.redirect = function () {
    $window.location.href = `#!/message_board/${route_id}`;
  };
  pull_technology_info();
  pull_admin_posts();
});