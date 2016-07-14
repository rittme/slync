import {connect} from "react-redux";
import HighlightsSection from "components/HighlightsSection/HighlightsSection";

const mapStateToProps = (state) => {
  return {
    sites: state.highlights,
  };
};

const HighlightsCollection = connect(
  mapStateToProps, null
)(HighlightsSection);

export default HighlightsCollection;
