const React = require("react");
const ReactDOM = require("react-dom");

const {BookmarksPage} = require("components/BookmarksPage/BookmarksPage");
const sites = require("lib/shim.json").RECENT_BOOKMARKS_RESPONSE;

ReactDOM.render(<BookmarksPage sites={sites} />, document.getElementById("root"));
