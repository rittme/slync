import React, {PropTypes} from "react";
import classNames from "classnames";
import SiteIcon from "components/SiteIcon/SiteIcon";
import moment from "moment";
import {prettyUrl, getRandomFromTimestamp} from "lib/utils";
//mediapreview
//selector selectSitePreview
//const MediaPreview = require("components/MediaPreview/MediaPreview");

const SHOW_DATE_HEADINGS = true;
const DEFAULT_LENGTH = 15;
const ICON_SIZE = 16;
const TOP_LEFT_ICON_SIZE = 20;
const SESSION_DIFF = 600000;
const CALENDAR_HEADINGS = {
  sameDay: "[Today]",
  nextDay: "[Tomorrow]",
  nextWeek: "dddd",
  lastDay: "[Yesterday]",
  lastWeek: "[Last] dddd",
  sameElse: "dddd MMMM D, YYYY"
};

const ActivityFeedItem = ({site, showDate}) => {
  const title = site.title || site.provider_display || (site.parsedUrl && site.parsedUrl.hostname);
  const date = site.dateDisplay;

  let icon;
  const iconProps = {
    className: "feed-icon",
    site,
    iconSize: ICON_SIZE
  };
  if (site.showImage && site.images && site.images[0]) {
    icon = (<div className="feed-icon-image" style={{backgroundImage: `url(${site.images[0].url})`}}>
      <SiteIcon {...iconProps} width={TOP_LEFT_ICON_SIZE} height={TOP_LEFT_ICON_SIZE} />
    </div>);
  } else {
    icon = (<SiteIcon {...iconProps} />);
  }

  let dateLabel = "";
  if (date && showDate) {
    dateLabel = moment(date).calendar();
  } else if (date) {
    dateLabel = moment(date).format("h:mm A");
  }

  let preview;
/*  if (site.media && site.media.type === "video") {
    const previewInfo = selectSitePreview(site);
    if (previewInfo.previewURL) {
      const previewProps = {
        previewInfo,
      };
      preview = (<MediaPreview {...previewProps} />);
    }
  }
*/
  return (<li className={classNames("feed-item", {bookmark: site.bookmarkGuid})}>
    <a href={site.url} >
      <span className="star" hidden={!site.bookmarkGuid} />
      {icon}
      <div className="feed-details">
        <div className="feed-description">
          <h4 className="feed-title" >{title}</h4>
          <span className="feed-url" data-feed-url={prettyUrl(site.url)}/>
          {preview}
        </div>
        <div className="feed-stats">
          <div className="last-visit" data-last-visit={dateLabel}/>
        </div>
      </div>
    </a>
  </li>);
};

ActivityFeedItem.propTypes = {
  site: PropTypes.shape({
    url: PropTypes.string.isRequired,
    images: PropTypes.array,
    title: PropTypes.string,
    bookmarkTitle: PropTypes.string,
    media: PropTypes.object,
    dateDisplay: PropTypes.number,
    provider_display: PropTypes.string,
    parsedUrl: PropTypes.shape({
      hostname: PropTypes.string
    })
  }),
  showDate: PropTypes.bool
};

function groupSitesByDate(sites) {
  let groupedSites = new Map();
  for (let site of sites) {
    const date = site.dateDisplay;
    if (!Number.isInteger(date)) {
      continue;
    }

    let day = moment(date).startOf("day").format();
    if (!groupedSites.has(day)) {
      groupedSites.set(day, []);
    }
    groupedSites.get(day).push(site);
  }
  groupedSites.forEach((value, key) => {
    const sessions = groupSitesBySession(value);
    groupedSites.set(key, sessions);
  });
  return groupedSites;
}

function groupSitesBySession(sites) {
  const sessions = [[]];
  sites.forEach((site, i) => {
    const currentSession = sessions[sessions.length - 1];
    const nextSite = sites[i + 1];
    currentSession.push(site);
    if (nextSite && Math.abs(site.dateDisplay - nextSite.dateDisplay) > SESSION_DIFF) {
      sessions.push([]);
    }
  });
  return sessions;
}

const GroupedActivityFeed = ({sites}) => {
  const chosenSites = sites
    .slice(0, DEFAULT_LENGTH)
    .map(site => {
      return Object.assign({}, site, {dateDisplay: site["lastVisitDate"]});
    });
  const groupedSites = groupSitesByDate(chosenSites);
  let globalCount = -1;
  return (<div className="grouped-activity-feed">
    {Array.from(groupedSites.keys()).map((date, dateIndex) => {
      return (<div className="group" key={date}>
        {SHOW_DATE_HEADINGS &&
          <h3 className="section-title">{moment(date).startOf("day").calendar(null, CALENDAR_HEADINGS)}</h3>
        }
        {groupedSites.get(date).map((chosenSites, outerIndex) => {
          return (<ul key={date + "-" + outerIndex} className="activity-feed">
            {chosenSites.map((site, i) => {
              globalCount++;
              return (<ActivityFeedItem
                  key={site.guid || i}
                  showImage={getRandomFromTimestamp(0.2, site)}
                  index={globalCount}
                  source="ACTIVITY_FEED"
                  showDate={!SHOW_DATE_HEADINGS && outerIndex === 0 && i === 0}
                  site={site} />);
            })}
            </ul>);
          })}
        </div>);
      })}
    </div>);
};

/*
GroupedActivityFeed.propTypes = {
  sites: PropTypes.array.isRequired,
};
*/

export default GroupedActivityFeed;
