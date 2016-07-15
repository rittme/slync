import {updateHighlights, updateTopSites, updateHistory} from "actions";
import firebase from "firebase/app";
import "firebase/database";
import Immutable from "immutable";
import firebaseConfig from 'firebaseConfig';

class FirebaseManager {
  constructor () {
    const config = {
      apiKey: firebaseConfig.apiKey,
      databaseURL: firebaseConfig.url,
    };
    firebase.initializeApp(config);
    this.db = firebase.database();
  }

  init(dispatch){
    this.dispatch = dispatch;
  }

  startListening(user) {
    const self = this;
    this.db.ref(`clients/${user}/HIGHLIGHTS_LINKS_RESPONSE`).on("value", function(snapshot) {
    self.dispatch(updateHighlights(Immutable.Map(snapshot.val())));
    });

    this.db.ref(`clients/${user}/TOP_FRECENT_SITES_RESPONSE`).on("value", function(snapshot) {
      self.dispatch(updateTopSites(Immutable.Map(snapshot.val())));
    });

    this.db.ref(`clients/${user}/RECENT_LINKS_RESPONSE`).on("value", function(snapshot) {
      self.dispatch(updateHistory(Immutable.Map(snapshot.val())));
    });
  }

  stopListening(user) {
    this.db.ref(`clients/${user}/HIGHLIGHTS_LINKS_RESPONSE`).off();

    this.db.ref(`clients/${user}/TOP_FRECENT_SITES_RESPONSE`).off();

    this.db.ref(`clients/${user}/RECENT_LINKS_RESPONSE`).off();
  }

  uninit() {
    this.db.goOffline();
  }
}

let fb = new FirebaseManager();

export default fb;
