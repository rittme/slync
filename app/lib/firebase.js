const firebase = require("firebase/app");
require("firebase/database");

function firebaseConnect(apiKey) {
  var config = {
    apiKey,
    databaseURL: "https://slynk-7fa8b.firebaseio.com/",
  };

  firebase.initializeApp(config);
  // Get a reference to the database service
  return firebase.database();
}


