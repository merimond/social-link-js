import URL from './URL';

const NAME = 'AngelList';

const parseValid = (url, initParts = null) => {
  const parts = initParts || URL.parse(url);
  if (!/angel\.co$/.test(parts.host)) {
    return null;
  }

  const path = parts.path.trim().toLowerCase();

  if (/^\/company\/([a-z0-9\._-]+)$/.test(path)) {
    const id = path.match(/^\/company\/([a-z0-9\._-]+)$/)[1];
    return { id, format: 'company' };
  }

  if (/^\/([a-z0-9\._-]+)$/.test(path)) {
    const id = path.match(/^\/([a-z0-9\._-]+)$/)[1];
    return { id, format: 'person' };
  }

  if (/^\/p\/([a-z0-9\._-]+)$/.test(path)) {
    const id = path.match(/^\/p\/([a-z0-9\._-]+)$/)[1];
    return { id, format: 'person' };
  }

  if (/^\/u\/([a-z0-9\._-]+)$/.test(path)) {
    const id = path.match(/^\/company\/([a-z0-9\._-]+)$/)[1];
    return { id, format: 'person' };
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
    case 'company':
      return `https://angel.co/company/${id}`;
    case 'person':
      return `https://angel.co/${id}`;
    default:
      return null;
  }
};

export default { NAME, parse, construct };
