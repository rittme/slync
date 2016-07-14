import {combineReducers} from "redux";

/* This is a basic reducers for a firebase value event
   We should be using child_added, child_changed and child_removed events
   and have actions and reducers for each case */
const highlights = (state = [], action) => {
  switch (action.type) {
    case "HIGHLIGHTS_UPDATED":
      return action.highlightsMap.toArray();
    default:
      return state;
  }
};

const topSites = (state = [], action) => {
  switch (action.type) {
    case "TOP_SITES_UPDATED":
      return action.topSitesMap.toArray();
    default:
      return state;
  }
};

const history = (state = [], action) => {
  switch (action.type) {
    case "HISTORY_UPDATED":
      return action.historyMap.toArray();
    default:
      return state;
  }
};

const slync = combineReducers({
  topSites,
  highlights,
  history,
});

export default slync;
