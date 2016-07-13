let authKey = null
let username = null

export const bookmarksUpdated = (sites) => {
  return {
    type: 'BOOKMARKS_UPDATED',
    sites
  }
}

export const credentialsUpdate = (credentials) => {
  return {
    type: 'CREDENTIALS_UPDATE',
    credentials
  }
}
