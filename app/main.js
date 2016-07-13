import React from 'react';
import ReactDOM from 'react-dom';
import BookmarksPage from 'components/BookmarksPage/BookmarksPage'
import BookmarksCollection from 'containers/BookmarksCollection'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import slync from 'reducers'

//const sites = require("lib/shim.json").RECENT_BOOKMARKS_RESPONSE;

let store = createStore(slync)

ReactDOM.render(
  <Provider store={store}>
    <BookmarksCollection />
  </Provider>,
  document.getElementById("root"));
