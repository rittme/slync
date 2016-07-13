export const updateBookmarks = (bookmarksMap) => {
  return {
    type: "BOOKMARKS_UPDATED",
    bookmarksMap
  };
};

export const updateCredentials = (credentials) => {
  return {
    type: "UPDATE_CREDENTIALS",
    credentials
  };
};
