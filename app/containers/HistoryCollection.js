import {connect} from "react-redux";
import ActivityFeed from "components/ActivityFeed/ActivityFeed";

const mapStateToProps = (state) => {
  return {
    sites: state.history,
  };
};

const HistoryCollection = connect(
  mapStateToProps, null
)(ActivityFeed);

export default HistoryCollection;
