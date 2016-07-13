const urlParse = require("url-parse");
const {prettyUrl, getBlackOrWhite, toRGBString, getRandomColor} = require("lib/utils");

const BACKGROUND_FADE = 0.5;
const DEFAULT_FAVICON_BG_COLOR = [150, 150, 150];

module.exports = function selectSiteIcon(site) {
  const favicon = site.favicon_url || site.favicon;
  const parsedUrl = site.parsedUrl || urlParse(site.url || "") ;
  const label = prettyUrl(parsedUrl.hostname);
  const backgroundRGB = getBackgroundRGB(site);
  const backgroundColor = site.background_color || toRGBString(...backgroundRGB, favicon ? BACKGROUND_FADE : 1);
  const fontColor = getBlackOrWhite(...backgroundRGB);
  const firstLetter = prettyUrl(parsedUrl.hostname)[0];
  return {
    url: site.url,
    favicon,
    firstLetter,
    backgroundColor,
    fontColor,
    label
  };
};

function getBackgroundRGB(site) {
  if (site.favicon_colors && site.favicon_colors[0] && site.favicon_colors[0].color) {
    return site.favicon_colors[0].color;
  }

  const favicon = site.favicon_url || site.favicon;
  const parsedUrl = site.parsedUrl || urlParse(site.url || "") ;
  const label = prettyUrl(parsedUrl.hostname);
  return favicon ? DEFAULT_FAVICON_BG_COLOR : getRandomColor(label);
}
