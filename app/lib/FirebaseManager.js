import {updateBookmarks} from "actions";
import firebase from "firebase/app";
import "firebase/database";
import Immutable from "immutable";

function FirebaseManager(store) {
  let apiKey = null;
  let user = null;
  const config = {
    apiKey,
    databaseURL: "https://slynk-7fa8b.firebaseio.com/",
  };

  firebase.initializeApp(config);
  this.db = firebase.database();

  this.db.ref(`clients/${user}/RECENT_BOOKMARKS_RESPONSE`).on("value", function(snapshot) {
    store.dispatch(updateBookmarks(Immutable.Map(snapshot.val())));
  });
}

export default FirebaseManager;
