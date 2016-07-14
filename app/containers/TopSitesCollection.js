import {connect} from "react-redux";
import TopSites from "components/TopSites/TopSites";

const mapStateToProps = (state) => {
  return {
    sites: state.topSites,
  };
};

const TopSitesCollection = connect(
  mapStateToProps, null
)(TopSites);

export default TopSitesCollection;
