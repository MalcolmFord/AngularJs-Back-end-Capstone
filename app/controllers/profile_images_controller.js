'use strict';

app.controller('profile_photo', function ($scope, database, $routeParams, $window) {
  let route_id = $routeParams.id;
  $scope.profile_images = ["emoji_1.jpg", "emoji_2.jpg", "emoji_3.jpg", "emoji_4.png", "emoji_5.jpg", "emoji_6.jpg", "emoji_7.jpg", "emoji_8.jpg", "emoji_9.jpg", "emoji_10.jpg", "minion_1.jpg", "minion_2.jpg", "minion_5.jpg", "minion_6.jpg", "orange_square_rounded.png", "light_blue_square_rounded.png", "red_square_rounded.png", "green_square_rounded.png"];

  // This will set the user's profile image
  let profile_image = {};
  $scope.set_profile_image = function (a) {
    profile_image.Profile_photo_url = `./images/profile_logos/${a}`;
    console.log('profile image', profile_image);

    database.update_user(profile_image, route_id)
      .then((data) => {
        console.log('updated user profile', data.data.data);
        $window.location.href = "#!/user_profile"

      })
  }
});