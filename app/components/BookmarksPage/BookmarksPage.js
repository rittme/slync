import React, {PropTypes} from "react";
import Bookmark from "components/Bookmark/Bookmark";

const BookmarksPage = ({sites}) => {
  return (
    <div className="bookmarks">
      <ul className="bookmark-list">
        {sites.map((site, i) => <Bookmark
          index={i}
          key={site.guid || i}
          {...site} />)}
      </ul>
    </div>
  );
};

BookmarksPage.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object)
};

export default BookmarksPage;
