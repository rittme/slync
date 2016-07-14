import React, {PropTypes} from "react";
import Highlight from "components/Highlight/Highlight";

const HighlightsSection = ({sites}) => {
  return (
    <section className="highlights">
      <h3 className="section-title">Highlights</h3>
      <ul className="highlights-list">
        {sites.map((site, i) => <Highlight
          index={i}
          key={site.guid || i}
          {...site} />)}
      </ul>
    </section>
  );
};

HighlightsSection.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object)
};

export default HighlightsSection;
