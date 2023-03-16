import URL from './URL';

const NAME = 'Facebook';

const parseQueryBasedFormats = query => {
  if (/^id=(\d+)/.test(query)) {
    const id = query.match(/^id=(\d+)/)[1];
    return { id, format: 'numeric' };
  }

  return null;
};

const parseValid = (url, initParts = null) => {
  /* https://www.facebook.com/help/105399436216001 */
  const parts = initParts || URL.parse(url);

  if (!/facebook\.com$/.test(parts.host)) {
    return null;
  }

  const path = parts.path.trim().toLowerCase();

  if (/profile\.php$/.test(path)) {
    return parseQueryBasedFormats(parts.query);
  }

  if (/\.php$/.test(path)) {
    return null;
  }

  if (/-(\d{8,})/.test(path)) {
    const id = path.match(/-(\d{8,})/)[1];
    return { id, format: 'numeric' };
  }

  if (/\/(\d{8,})/.test(path)) {
    const id = path.match(/\/(\d{8,})/)[1];
    return { id, format: 'numeric' };
  }

  if (/^\/pg\/([a-z0-9\._-]+)\/?/.test(path)) {
    const id = path.match(/^\/pg\/([a-z0-9\._-]+)\/?/)[1];
    return { id, format: 'slug' };
  }

  if (/^\/([a-z0-9\._-]+)\/?$/.test(path)) {
    const id = path.match(/^\/([a-z0-9\._-]+)\/?$/)[1];
    return { id, format: 'slug' };
  }

  return null;
};

const guessInvalid = url => {
  /* //TODO check this fn */
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

const construct = (id, format) => {
  switch (format) {
    case 'slug':
      return `https://facebook.com/${id}`;
    case 'numeric':
      return `https://facebook.com/${id}`;
    default:
      return null;
  }
};

export default { NAME, parse, construct };
