'use strict';

app.controller('new_technology', function ($scope, $routeParams, database, cloudinary, $window) {
  let current_user = database.get_current_user();
  // This is taking the user's input for a new technology
  $scope.new_technology = {
    "Name": "",
    "Description": "",
    "User_id": current_user
  };
  // This is creating a new technology
  $scope.create_new_technology = function () {
    // $scope.image_to_upload;
    // $scope.$watch('upload_image', function (upload_image) {
    //   cloudinary.upload($scope.image_to_upload, {})
    //     // This returns a promise that can be used for result handling
    //     .then(function (resp) {
    //       console.log('image info returned', resp);
    //     });
    // });
    database.create_new_technology($scope.new_technology)
      .then((data) => {
        console.log('Data returned from creating new technology', data);
        var new_tech = data.data.data.id;
        $window.location.href = `#!/technology/${new_tech}`;
      });
  };
  $scope.image_to_upload;
  $scope.image = function () {
    console.log('image to upload', $scope.image_to_upload);
  };

});