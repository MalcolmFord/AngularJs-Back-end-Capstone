'use strict';

app.factory('database', function ($q, $http, $window) {
  // Gloabal variables
  const URL = 'http://localhost:3001';

  // This is the user auth token and user id.
  let token;
  let current_user;
  const get_current_user = function () {
  };

  // **************************** These are the auth functions ****************************************

  // This will take the user's email and password before they'er hashed, send them to the api, get the token and store it.
  const set_token = function (a) {
    let data = JSON.stringify(a);
    $http.post(`${URL}/authenticate`, data)
      .then((data) => {
        token = data.data.auth_token;
        current_user = data.data.user_id;
        // console.log('set token data', current_user);
      });
  };



  // This will take the user's sign up input, and send it to the database, creating a new user.
  const create_account = function (a) {
    return $q((resolve, reject) => {
      let user_inputs = JSON.stringify(a);
      $http.post(`${URL}/users`, user_inputs)
        .then((data) => {
          resolve(data);
          set_token(a);
        }).then(() => {
          $window.location.href = '#!/user_profile';
        })
        .catch((error) => {
          // console.log('error creating a new user', error);
          reject(error);
        });
    });
  };

  // This will log the user in, and set their user_id, and auth token
  const login = function (a) {
    return $q((resolve, reject) => {
      let user_inputs = JSON.stringify(a);
      $http.post(`${URL}/authenticate`, user_inputs)
        .then((data) => {
          token = data.data.auth_token;
          current_user = data.data.user_id;
        })
        .then(() => {
          $window.location.href = '#!/user_profile';
        });
    });
  };


  // This will return the auth token
  const get_token = function () {
    // console.log('database token', token);

    return token;
  };
  // This will return the user's id
  // ***************************** End of auth functions *****************************************





















  // This will pull down all of the Technologies
  const get_technologies = function (token) {
    return $q((resolve, reject) => {
      $http.get(`${URL}/technologies`)
        .then((data) => {
          // console.log('returned technologies', data);

          resolve(data);
        });
    });
  };
  // This will create posts
  const create_post = function (a) {
    return $q((resolve, reject) => {
      let post = JSON.stringify(a);
      $http.post(`${URL}/users/${current_user}/personal_posts`, post, {
        headers: { 'Authorization': `${token}` }
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          // console.log('Error creating post', error.message);
          reject(error);
        });
    });
  };
  return { create_account, get_technologies, set_token, login, create_post, get_current_user, get_token };
});
// const getAllCompetitions = () => {
//   return $q((resolve, reject) => {
//     $http.get(`http://localhost:3000/api/v1/competitions`, {
//       headers: { 'Authorization': `${userFactory.authTokenGetter()}` }
//     }).then(results => {
//       console.log("results", results);
//       resolve(results.data);
//     });
//   });
// };