import {updateHighlights, updateTopSites, updateHistory} from "actions";
import firebase from "firebase/app";
import "firebase/database";
import Immutable from "immutable";
import firebaseConfig from 'firebaseConfig';

function FirebaseManager(store) {
  const config = {
    apiKey: firebaseConfig.apiKey,
    databaseURL: firebaseConfig.url,
  };
  const user = firebaseConfig.user;

  firebase.initializeApp(config);
  this.db = firebase.database();

  this.db.ref(`clients/${user}/HIGHLIGHTS_LINKS_RESPONSE`).on("value", function(snapshot) {
    store.dispatch(updateHighlights(Immutable.Map(snapshot.val())));
  });

  this.db.ref(`clients/${user}/TOP_FRECENT_SITES_RESPONSE`).on("value", function(snapshot) {
    store.dispatch(updateTopSites(Immutable.Map(snapshot.val())));
  });

  this.db.ref(`clients/${user}/RECENT_LINKS_RESPONSE`).on("value", function(snapshot) {
    store.dispatch(updateHistory(Immutable.Map(snapshot.val())));
  });
}

export default FirebaseManager;
