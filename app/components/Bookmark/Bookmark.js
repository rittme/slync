import React, {PropTypes} from "react";
import moment from "moment";
import getBestImage from "lib/getBestImage";
import classNames from "classnames";
import SiteIcon from "components/SiteIcon/SiteIcon";

const Bookmark = (site) => {
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
    <a href={site.url} ref="link">
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
};

Bookmark.propTypes = {
  accessTime: PropTypes.number,
  bookmarkDateCreated: PropTypes.number,
  bookmarkTitle: PropTypes.string,
  guid: PropTypes.string,
  description: PropTypes.string,
  favicon: PropTypes.string,
  favicon_color: PropTypes.arrayOf(PropTypes.number),
  favicon_url: PropTypes.string,
  frecency: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.object),
  lastModified: PropTypes.number,
  original_url: PropTypes.string,
  refreshTime: PropTypes.number,
  url: PropTypes.string
};

export default Bookmark;
