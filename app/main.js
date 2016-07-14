import React from "react";
import ReactDOM from "react-dom";
import Base from "components/Base/Base";
import FirebaseManager from "lib/FirebaseManager";
import {Provider} from "react-redux";
import {createStore} from "redux";
import slync from "reducers";

//const sites = require("lib/shim.json").RECENT_BOOKMARKS_RESPONSE;

//let store = createStore(slync);
let store = createStore(slync, window.devToolsExtension && window.devToolsExtension());
let fm = new FirebaseManager(store); // eslint-disable-line no-unused-vars

ReactDOM.render(
  <Provider store={store}>
    <Base />
  </Provider>,
  document.getElementById("root"));
