import URL from './URL';

const NAME = 'PEI';

const parseValid = (url, initParts = null) => {
  const parts = initParts || URL.parse(url);

  if (!/privateequityinternational\.com$/.test(parts.host)) {
    return null;
  }

  const path = parts.path.trim().toLowerCase();

  if (/^\/profile\?id=(\d+)/.test(path)) {
    const id = path.match(/^\/profile\?id=(\d+)/)[1];
    return { id, format: 'company' };
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
      return `https://www.privateequityinternational.com/database/#/profile?id=${id}`;
    default:
      return null;
  }
};

export default { NAME, parse, construct };
