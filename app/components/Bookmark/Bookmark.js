const React = require("react");
const moment = require("moment");
const getBestImage = require("lib/getBestImage");
const classNames = require("classnames");
const SiteIcon = require("components/SiteIcon/SiteIcon");

const Bookmark = React.createClass({
  getInitialState() {
    return {

    };
  },
  render() {
    const site = this.props;
    const title = site.bookmarkTitle;
    const image = getBestImage(site.images);
    const imageUrl = image ? image.url : null;
    const description = site.description || site.url;
    const isPortrait = image ? image.height > image.width : false;
    let contextMessage;
    if (site.context_message) {
      contextMessage = site.context_message;
    } else if (site.bookmarkDateCreated) {
      contextMessage = `Bookmarked ${moment(site.bookmarkDateCreated).fromNow()}`;
    } else if (site.lastVisitDate) {
      contextMessage = `Visited ${moment(site.lastVisitDate).fromNow()}`;
    } else if (site.type === "bookmark") {
      contextMessage = "Bookmarked recently";
    } else {
      contextMessage = "Visited recently";
    }

    const style = {};

    if (imageUrl) {
      style.backgroundImage = `url(${imageUrl})`;
    } else {
      style.backgroundColor = "#ccc";
    }

    return (<li className="bookmark-item">
      <a onClick={this.props.onClick} href={site.url} ref="link">
        <div className={classNames("bookmark-image", {portrait: isPortrait})} style={style} ref="image">
          <SiteIcon className="bookmark-icon" height={40} width={40} site={site} ref="icon" showBackground={true} border={false} faviconSize={32} />
        </div>
        <div className="bookmark-details">
          <div className="bookmark-info">
            <div className="bookmark-text">
              <h4 ref="title" className="bookmark-title">{title}</h4>
              <p className="bookmark-description" ref="description">{description}</p>
            </div>
            <div className="bookmark-context" ref="contextMessage">{contextMessage}</div>
          </div>
        </div>
        <div className="inner-border" />
      </a>
    </li>);
  }
});
Bookmark.propTypes = {
  accessTime: React.PropTypes.number,
  bookmarkDateCreated: React.PropTypes.number,
  bookmarkTitle: React.PropTypes.string,
  guid: React.PropTypes.string,
  description: React.PropTypes.string,
  favicon: React.PropTypes.string,
  favicon_color: React.PropTypes.arrayOf(React.PropTypes.number),
  favicon_url: React.PropTypes.string,
  frecency: React.PropTypes.number,
  images: React.PropTypes.arrayOf(React.PropTypes.object),
  lastModified: React.PropTypes.number,
  original_url: React.PropTypes.string,
  refreshTime: React.PropTypes.number,
  url: React.PropTypes.string
};
module.exports.Bookmark = Bookmark;
