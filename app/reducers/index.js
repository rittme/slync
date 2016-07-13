import { combineReducers } from 'redux'

/* This is a basic reducer for a firebase value event
   We should be using child_added, child_changed and child_removed events
   and have actions and reducers for each case */
const bookmarks = (state = [], action) => {
  switch (action.type) {
    case "BOOKMARKS_UPDATED":
      return action.sites
    default:
      return state
  }
}

const slync = combineReducers({
  bookmarks
})

export default slync
