import React from "react";
import HighlightsCollection from "containers/HighlightsCollection";
import TopSitesCollection from "containers/TopSitesCollection";
import HistoryCollection from "containers/HistoryCollection";
import Settings from "components/Settings/Settings";

const Base = ({sites}) => {
  return (<main className="new-tab">
    <div className="new-tab-wrapper">
      <section>
        <Settings />
      </section>
      <section>
        <TopSitesCollection />
      </section>

      <section>
        <HighlightsCollection />
      </section>

      <section>
        <HistoryCollection />
      </section>
    </div>
    </main>
  );
};

export default Base;
