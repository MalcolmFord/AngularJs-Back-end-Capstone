'use strict';

app.controller('technology_photo', function ($scope, database, $routeParams, $window) {
  let route_id = $routeParams.id;
  $scope.profile_images = ["angular.png", "bootstrap.jpg", "css.jpg", "html.png", "node.png", "php.png", "pythonjpg.jpg", "rails.jpg", "react.png", "ruby.png", "sass.png", "c.jpg"];

  // This will set the user's profile image
  let profile_image = {};
  $scope.set_profile_image = function (a) {
    profile_image.photo_url = `./images/technology/${a}`;
    console.log('profile image', profile_image);

    database.update_technology(profile_image, route_id)
      .then((data) => {
        console.log('updated user profile', data.data.data);
        $window.location.href = `#!/technology/${route_id}`
      })
  }
});