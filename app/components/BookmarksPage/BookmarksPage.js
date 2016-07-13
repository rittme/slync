const React = require("react");
const {Bookmark} = require("components/Bookmark/Bookmark");

const BookmarksPage = React.createClass({
  getInitialState() {
    return {
      showSettingsMenu: false
    };
  },
  render() {
    console.log(this.props.sites);
    let sites = this.props.sites;
    return (
      <div className="bookmarks">
        <ul className="bookmark-list">
          {sites.map((site, i) => <Bookmark
            index={i}
            key={site.guid || i}
            {...site} />)}
        </ul>
      </div>
    );
  }
});
BookmarksPage.propTypes = {
  sites: React.PropTypes.array
};
module.exports.BookmarksPage = BookmarksPage;
