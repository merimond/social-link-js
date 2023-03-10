import URL from './URL';

const NAME = 'Signal';

const parseValid = (url, initParts = null) => {
  const parts = initParts || URL.parse(url);

  if (!/signal\.nfx\.com$/.test(parts.host)) {
    return null;
  }

  const path = parts.path.trim().toLowerCase();

  if (/^\/firms\/([^\/]+)/.test(path)) {
    const id = path.match(/^\/firms\/([^\/]+)/)[1];
    return { id, format: 'company-slug' };
  }

  if (/^\/investors\/([^\/]+)/.test(path)) {
    const id = path.match(/^\/investors\/([^\/]+)/)[1];
    return { id, format: 'person-slug' };
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
    case 'company-slug':
      return `https://signal.nfx.com/firms/${id}`;
    case 'person-slug':
      return `https://signal.nfx.com/investors/${id}`;
    default:
      return null;
  }
};

export default { NAME, parse, construct };
