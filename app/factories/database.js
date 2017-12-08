'use strict';

app.factory('database', function () {
  // This will take the user's sign up input, and send it to the database, creating a new user.
  const create_account = function (a) {
    console.log('the user', a);

  };

  return { create_account };
});