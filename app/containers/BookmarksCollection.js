import {connect} from "react-redux";
import BookmarksPage from "components/BookmarksPage/BookmarksPage";

const mapStateToProps = (state) => {
  return {
    sites: state.bookmarks,
  };
};

const BookmarksCollection = connect(
  mapStateToProps, null
)(BookmarksPage);

export default BookmarksCollection;
