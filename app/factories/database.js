'use strict';

app.factory('database', function ($q, $http, $window) {
  // Gloabal variables
  const URL = 'http://localhost:3001';


  // This is the user auth token and user id.
  let token;
  let current_user;


  // This will take the user's email and password before they'er hashed, send them to the api, get the token and store it.
  const set_token = function (a) {
    let data = JSON.stringify(a);
    $http.post(`${URL}/authenticate`, data)
      .then((data) => {
        // console.log('token', data.data.auth_token);
        token = data.data.auth_token;
        current_user = data.data.user_id;
      });
  };


  // This will take the user's sign up input, and send it to the database, creating a new user.
  const create_account = function (a) {
    return $q((resolve, reject) => {
      let user_inputs = JSON.stringify(a);
      $http.post(`${URL}/user`, user_inputs)
        .then((data) => {
          resolve(data);
          set_token(a);
          $window.location.href = '#!/user_profile';
        }).catch((error) => {
          console.log('error creating a new user', error);
          reject(error);
        });
    });
  };


  const get_token = function () {
    return token;
  };


  // This will pull down all of the Technologies
  const get_technologies = function (token) {
    return $q((resolve, reject) => {
      $http.get(`${URL}/technology`)
        .then((data) => {
          console.log('returned technologies', data);

          resolve(data);
        });
    });
  };
  // $scope.getPlans = function () {
  //   $http({
  //     url: '/api/plans',
  //     method: 'get',
  //     headers: {
  //       'x-access-token': $rootScope.token
  //     }
  //   }).then(function (response) {
  //     $scope.plans = response.data;
  //   });
  // }


  // This will log the user in, and set their user_id, and auth token
  const login = function (a) {
    return $q((resolve, reject) => {
      let user_inputs = JSON.stringify(a);
      $http.post(`${URL}/authenticate`, user_inputs)
        .then((data) => {
          token = data.data.auth_token;
          current_user = data.data.user_id;
          $window.location.href = '#!/user_profile';
        });
    });
  };


  return { create_account, get_technologies, set_token, login };
});
