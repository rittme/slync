import React, {PropTypes} from "react";
import moment from "moment";
import getBestImage from "lib/getBestImage";
import classNames from "classnames";
import SiteIcon from "components/SiteIcon/SiteIcon";

const Highlight = (site) => {
  const title = site.title;
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

  return (<li className="highlight-item">
    <a href={site.url}>
      <div className={classNames("highlight-image", {portrait: isPortrait})} style={style}>
        <SiteIcon className="highlight-icon" height={40} width={40} site={site} showBackground={true} border={false} faviconSize={32} />
      </div>
      <div className="highlight-details">
        <div className="highlight-info">
          <div className="highlight-text">
            <h4 className="highlight-title">{title}</h4>
            <p className="highlight-description">{description}</p>
          </div>
          <div className="highlight-context">{contextMessage}</div>
        </div>
      </div>
      <div className="inner-border" />
    </a>
  </li>);
};

Highlight.propTypes = {
  accessTime: PropTypes.number,
  bookmarkDateCreated: PropTypes.number,
  title: PropTypes.string,
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

export default Highlight;
