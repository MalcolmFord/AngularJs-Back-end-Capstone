'use strict';

app.factory('database', function ($q, $http, $window, $cookies) {
  // Gloabal variables
  const URL = 'http://localhost:3001';

  // This is the user auth token and user id.
  var token;
  var current_user;
  // *************************** Cookies ************************************
  const set_cookies = function () {
    var new_cookie = $cookies.put('auth_token', token);
    var new_cookie_user = $cookies.put('current_user', current_user);
    return new_cookie, new_cookie_user;
  };
  const get_cookies = function () {
    // Getting the cookies
    var cookie_user_auth = $cookies.get('auth_token');
    var cookie_user_id = $cookies.get('current_user');
    // Setting the gloabal variables and the cookies equal
    current_user = cookie_user_id;
    token = cookie_user_auth;
    // Placing them both into an object to be returned
    var both_cookies = {
      "user_id": cookie_user_id,
      "user_auth": cookie_user_auth
    };
    return both_cookies;

  };
  const get_current_user = function () {
    return current_user;
  };
  // This will return the auth token
  const get_token = function () {
    // console.log('database token', token);
    return token;
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
          set_token(a);
        })
        .then((data) => {
          resolve(data);
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
          set_cookies();
          console.log('cookies', get_cookies());
          resolve(data);

        });
    });
  };
  // This will return the user's id
  // ***************************** End of auth functions *****************************************

  // **************************** Technology ************************************************
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
  // This will create a technology communtiy
  const create_new_technology = function (a) {
    return $q((resolve, reject) => {
      let data = JSON.stringify(a);
      $http.post(`${URL}/technologies`, data, {
        headers: { 'Authorization': `${get_cookies()}` }
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const pull_technology = function (a) {
    return $q((resolve, reject) => {
      $http.get(`${URL}/technologies/${a}`, {
        header: { 'Authorization': `${get_cookies()}` }
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.log('There was a problem getting the technology posts', error);
        });
    });
  };
  const new_admin_post = function (a, b) {
    return $q((resolve, reject) => {
      let new_data = JSON.stringify(b);
      $http.post(`${URL}/technologies/${a}/technology_posts`, new_data, {
        header: { 'Authorization': `${get_cookies()}` }
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const pull_admin_posts = function (a) {
    return $q((resolve, reject) => {
      $http.get(`${URL}/technologies/${a}/technology_posts/${a}`)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };











  // ************************** Posts ****************************************
  // This will create posts
  const create_post = function (a) {
    return $q((resolve, reject) => {
      let post = JSON.stringify(a);
      $http.post(`${URL}/users/${current_user}/personal_posts`, post, {
        headers: { 'Authorization': `${get_cookies()}` }
      })
        .then((data) => {
          console.log('post data', data);

          resolve(data);
        })
        .catch((error) => {
          // console.log('Error creating post', error.message);
          reject(error);
        });
    });
  };
  // This pulls the user's post
  const pull_posts = function () {
    return $q((resolve, reject) => {
      var toke = get_cookies();
      console.log('pulling post cookiees', toke.user_auth);
      var authorization = toke.user_auth;
      var user = toke.user_id;
      $http.get(`${URL}/users/${user}/personal_posts/${user}`, {
        headers: { 'Authorization': `${authorization}` }
      })
        .then((data) => {
          console.log('pulled data cookies', get_cookies());

          // console.log('database pulled posts', data);

          resolve(data);
        })
        .catch((error) => {
          console.log('error pulling posts', error);

        });
    });
  };

  // *************************End of post functions ******************************************

  // ****************************** Message board functions ****************************
  const add_new_message_post = function (a, b) {
    var toke = get_cookies();
    console.log('pulling post cookiees', toke.user_auth);
    var authorization = toke.user_auth;
    var user = toke.user_id;
    return $q((resolve, reject) => {
      let data = JSON.stringify(a);
      console.log('stringified data', a);

      $http.post(`${URL}/technologies/${b}/messageboards`, a, {
        headers: { 'Authorization': `${get_cookies().user_auth}` }
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // Pull messages
  const pull_message_board_messages = function (a) {
    var toke = get_cookies();
    console.log('pulling post cookiees', toke.user_auth);
    var authorization = toke.user_auth;
    var user = toke.user_id;
    return $q((resolve, reject) => {
      $http.get(`${URL}/technologies/${a}/messageboards`, {
        headers: { 'Authorization': `${authorization}` }
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  // get_cookies();
  // ********************************* End of Message board functions ***********************
  return { create_account, get_technologies, set_token, login, create_post, pull_posts, get_current_user, get_token, create_new_technology, pull_technology, new_admin_post, pull_admin_posts, add_new_message_post, pull_message_board_messages, set_cookies, get_cookies };
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