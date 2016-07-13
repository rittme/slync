import React from 'react';
import ReactDOM from 'react-dom';
import BookmarksPage from "components/BookmarksPage/BookmarksPage"

const sites = require("lib/shim.json").RECENT_BOOKMARKS_RESPONSE;

console.log(sites);
ReactDOM.render(<BookmarksPage sites={sites} />, document.getElementById("root"));
