'use strict';

app.controller('message_board', function ($scope, $routeParams, database) {
  let route_id = $routeParams.id;
  // This will pull the technology's name
  const pull_tech = function () {
    database.pull_tech()
      .then((data) => {
        $scope.technology_name = data.data.data.Name;
      });
  };
  // This pulls the messages down from the database
  const pull_messages = function () {
    database.pull_message_board_messages(route_id)
      .then((data) => {
        // console.log('pulled messages', data);
        $scope.messages = data.data.data;
      });
  };
  // This creates a new post
  $scope.add_post = function () {
    let new_message = {
      "User_id": database.get_current_user(),
      "Technology_id": route_id,
      "post": $scope.message_input
    };
    // console.log('new message', new_message);
    // console.log('route id', route_id);

    database.add_new_message_post(new_message, route_id)
      .then((data) => {
        // console.log('message data', data);
        pull_messages();
      });
  };


  pull_messages();
});