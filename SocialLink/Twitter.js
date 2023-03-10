import URL from './URL';

const NAME = 'Twitter';

const parseValid = (url, initParts = null) => {
  /* https://help.twitter.com/en/managing-your-account/twitter-username-rules */
  const parts = initParts || URL.parse(url);

  if (!/twitter\.com$/.test(parts.host)) {
    return null;
  }

  const path = parts.path.trim().toLowerCase();

  if (/^\/([a-z0-9_]+)\/?$/.test(path)) {
    const id = path.match(/^\/([a-z0-9_]+)\/?$/)[1];
    return { id, format: 'default' };
  }

  return null;
};

const guessInvalid = initUrl => {
  if (typeof initUrl !== 'string') {
    return null;
  }

  const url = initUrl.trim().toLowerCase();

  if (/@([a-z0-9_]+)/.test(url)) {
    const id = url.match(/@([a-z0-9_]+)/)[1];
    return { id, format: 'default' };
  }

  if (/twitter\.com\/(https?:\/\/twitter\.com\/.+)$/.test(url)) {
    const id = url.match(/twitter\.com\/(https?:\/\/twitter\.com\/.+)$/)[1];
    return parseValid(id);
  }

  return null;
};

const parse = (url, initParts = null) => {
  const parts = initParts || URL.parse(url);
  const result = parseValid(url, parts) || guessInvalid(url);

  if (result === null) {
    return null;
  }
  return { ...result, type: NAME };
};

const construct = (id, format = null) => {
  return `https://twitter.com/${id}`;
};

export default { NAME, parse, construct };
