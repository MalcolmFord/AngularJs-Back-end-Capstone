'use strict';

app.controller('signin', function ($scope, $routeParams, database, $window) {
  // These are the functions for the sign up view

  // This is taking the inputs from the sign up page and assiging them to variables.
  $scope.user_inputs = {
    First_name: "",
    Last_name: "",
    email: "",
    password: "",
    Profile_photo_url: "./images/images.jpg"
  };
  // These are the variables for the user's email and password. This is needed so I can send the email and password to the api, so i can get their auth token.
  $scope.email = $scope.user_inputs.email;
  $scope.password = "";
  // This will be the function that takes user's input and sends it to the factory
  $scope.create_account = function () {
    database.create_account($scope.user_inputs)
      .then((data) => {
        // console.log('data returned', data.data);
        $window.location.href = '#!/user_profile';
      });
  };



  // There are the functions for the login view







});