import {combineReducers} from "redux";
import fm from "lib/FirebaseManager";

/* This is a basic reducers for a firebase value event
   We should be using child_added, child_changed and child_removed events
   and have actions and reducers for each case */
const highlights = (state = [], action) => {
  switch (action.type) {
    case "HIGHLIGHTS_UPDATED":
      return action.highlightsMap.toArray();
    case "UPDATE_CREDENTIALS":
      return [];
    default:
      return state;
  }
};

const topSites = (state = [], action) => {
  switch (action.type) {
    case "TOP_SITES_UPDATED":
      return action.topSitesMap.toArray();
    case "UPDATE_CREDENTIALS":
      return [];
    default:
      return state;
  }
};

const history = (state = [], action) => {
  switch (action.type) {
    case "HISTORY_UPDATED":
      return action.historyMap.toArray();
    case "UPDATE_CREDENTIALS":
      return [];
    default:
      return state;
  }
};

const settingsOpen = (state = false, action) => {
  switch (action.type) {
    case "OPEN_SETTINGS":
      return true;
    case "UPDATE_CREDENTIALS":
      return false;
    default:
      return state;
  }
};

const credentials = (state = null, action) => {
  switch (action.type) {
    case "UPDATE_CREDENTIALS":
      if(state) {
        fm.stopListening(state);
      }
      if(action.credentials) {
        fm.startListening(action.credentials);
      }
      return action.credentials;
    default:
      return state;
  }
}

const slync = combineReducers({
  topSites,
  highlights,
  history,
  settingsOpen,
  credentials
});

export default slync;
