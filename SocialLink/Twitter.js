import URL from './URL';

const NAME = "Twitter";

const parse_valid = (url, parts = null) => {
  /* https://help.twitter.com/en/managing-your-account/twitter-username-rules */
  parts = parts || URL.parse(url);

  if (!/twitter\.com$/.test(parts.host)) {
    return null;
  };

  const path = parts.path.trim().toLowerCase();

  if (/^\/([a-z0-9_]+)\/?$/.test(path)) {
    const id = path.match(/^\/([a-z0-9_]+)\/?$/)[1];
    return { id, format: "default" };
  }

  return null;
}

const guess_invalid = (url) => {

  if (typeof url !== 'string') {
    return null;
  }

  url.trim().toLowerCase();

  if (/@([a-z0-9_]+)/.test(path)) {
    const id = path.match(/@([a-z0-9_]+)/)[1];
    return { id, format: "default" };
  }

  if (/twitter\.com\/(https?:\/\/twitter\.com\/.+)$/.test(path)) {
    const id = path.match(/twitter\.com\/(https?:\/\/twitter\.com\/.+)$/)[1];
    return parse_valid(id);
  }

  return null;
}

const parse = (url, parts = null) => {
  parts = parts || URL.parse(url)
  let result = parse_valid(url, parts) || guess_invalid(url);

  if (result === null) {
    return null
  } else {
    return result = { ...result, type: NAME };
  }
}

const construct = (id, format = null) => {
  return `https://twitter.com/${id}`
}

export default { NAME, parse, construct }

