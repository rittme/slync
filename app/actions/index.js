export const updateHighlights = (highlightsMap) => {
  return {
    type: "HIGHLIGHTS_UPDATED",
    highlightsMap
  };
};

export const updateTopSites = (topSitesMap) => {
  return {
    type: "TOP_SITES_UPDATED",
    topSitesMap
  };
};

export const updateHistory = (historyMap) => {
  return {
    type: "HISTORY_UPDATED",
    historyMap
  };
};

export const updateCredentials = (credentials) => {
  return {
    type: "UPDATE_CREDENTIALS",
    credentials
  };
};
