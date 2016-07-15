import React from "react";
import HighlightsCollection from "containers/HighlightsCollection";
import TopSitesCollection from "containers/TopSitesCollection";
import HistoryCollection from "containers/HistoryCollection";
import Settings from "components/Settings/Settings";
import {connect} from "react-redux";

let Base = ({sites, credentials, hasContent}) => {
  return (<main className="new-tab">
    <div className="new-tab-wrapper">
      <section>
        <Settings />
      </section>
      <section hidden={!credentials}>
        <TopSitesCollection />
      </section>

      <section hidden={!credentials}>
        <HighlightsCollection />
      </section>

      <section hidden={!credentials}>
        <HistoryCollection />
      </section>

      <div className="loader" hidden={!credentials || (credentials && hasContent)}>
        <div className="spinner"/> Loading...
      </div>
    </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.credentials,
    hasContent: state.history.length || state.topSites.length || state.highlights.length
  };
};

Base = connect(mapStateToProps, null)(Base)

export default Base;
