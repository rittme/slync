import React, {PropTypes} from "react";
import SiteIcon from "components/SiteIcon/SiteIcon";

const DEFAULT_LENGTH = 6;

const TopSites = ({sites}) => {
  const chosenSites = sites.slice(0, DEFAULT_LENGTH);
  const blankSites = [];
  for (let i = 0; i < (DEFAULT_LENGTH - chosenSites.length); i++) {
    blankSites.push(<div className="tile tile-placeholder" key={`blank-${i}`} />);
  }
  return (<section className="top-sites">
    <h3 className="section-title">Top Sites</h3>
    <div className="tiles-wrapper">
      {chosenSites.map((site, i) => {
        return (<div className="tile-outer" key={site.guid || site.cacheKey || i}>
          <a className="tile" href={site.url}>
            <SiteIcon className="tile-img-container" site={site} faviconSize={32} showTitle />
            <div className="inner-border" />
          </a>
      </div>);
      })}
      {blankSites}
    </div>
  </section>);
};

TopSites.propTypes = {
  sites: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string,
      provider_name: PropTypes.string,
      parsedUrl: PropTypes.object
    })
  ).isRequired
};

export default TopSites;
