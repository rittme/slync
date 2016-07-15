import React from "react";
import HighlightsCollection from "containers/HighlightsCollection";
import TopSitesCollection from "containers/TopSitesCollection";
import HistoryCollection from "containers/HistoryCollection";
import Settings from "components/Settings/Settings";
import {connect} from "react-redux";
import classNames from "classnames";

let Base = ({sites, credentials}) => {
  return (<main className="new-tab">
    <div className="new-tab-wrapper">
      <section>
        <Settings />
      </section>
      <section className={classNames({hidden: !credentials})}>
        <TopSitesCollection />
      </section>

      <section className={classNames({hidden: !credentials})}>
        <HighlightsCollection />
      </section>

      <section className={classNames({hidden: !credentials})}>
        <HistoryCollection />
      </section>
    </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.credentials,
  };
};

Base = connect(mapStateToProps, null)(Base)

export default Base;
