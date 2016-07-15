import React from "react";
import ReactDOM from "react-dom";
import Base from "components/Base/Base";

import {Provider} from "react-redux";
import {createStore} from "redux";
import slync from "reducers";
import fm from "lib/FirebaseManager";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js");
}

//let store = createStore(slync);
let store = createStore(slync, window.devToolsExtension && window.devToolsExtension());
fm.init(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <Base />
  </Provider>,
  document.getElementById("root"));
