'use strict';

app.controller('technology', function ($scope, $routeParams, database, $window) {
  // ********************************** GLOBAL VARIABLES ***********************************
  let route_id = $routeParams.id;

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
    // console.log('clicked add new admin post', new_post);
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
    // console.log('edit clicked', a);
    // This is taking the post's id, sending it to the database, getting that same post back, and setting the input box equal to that post's value
    // console.log('fetched post data', a.Post);
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

  // ************************** Beggining of the upcoming events functions
  // Pulls down the events
  const pull_events = function () {
    database.pull_events(route_id)
      .then((data) => {
        $scope.events = data.data.data;
        // console.log('events data', $scope.events);
      });
  };
  // Make new event
  $scope.new_event = {
    "User_id": returned_user,
    "Technology_id": route_id,
    "post": "",
    "location": "",
    "time": "",
    "date": ""
  };
  // Creates a new event
  $scope.add_new_event = function () {
    // console.log('the sent data', $scope.new_event);

    database.add_new_event($scope.new_event)
      .then((data) => {
        pull_events();
      });
  };

  // This lets the user attend an event
  $scope.go_to_event = {};
  $scope.going_to_event = function (a) {
    $scope.go_to_event.User_id = returned_user;
    $scope.go_to_event.Upcoming_event_id = a;
    // console.log('going to event', $scope.go_to_event);
    database.attending_event($scope.go_to_event)
      .then((data) => {
        console.log('attending event ', data);

      });
  };


  pull_technology_info();
  pull_admin_posts();
  pull_events();
});