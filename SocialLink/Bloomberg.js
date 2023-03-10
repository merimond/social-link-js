import URL from './URL';

const NAME = 'Bloomberg';

const parseValid = (url, initParts = null) => {
  const parts = initParts || URL.parse(url);
  if (!/bloomberg\.com$/.test(parts.host)) {
    return null;
  }

  const path = parts.path.trim().toLowerCase();

  if (/^\/profile\/company\/([a-z0-9]{2,8}:[a-z]{2})$/i.test(path)) {
    const id = path.match(/^\/profile\/company\/([a-z0-9]{2,8}:[a-z]{2})$/i)[1];
    return { id, format: 'company-ticker' };
  }

  if (/^\/profile\/company\/([a-z0-9]{2,8}:[a-z]{2})-/i.test(path)) {
    const id = path.match(/^\/profile\/company\/([a-z0-9]{2,8}:[a-z]{2})-/i)[1];
    return { id, format: 'company-ticker' };
  }

  if (/^\/profile\/company\/([a-z0-9]{2,8}\/[a-z]:[a-z]{2})$/i.test(path)) {
    const id = path.match(
      /^\/profile\/company\/([a-z0-9]{2,8}\/[a-z]:[a-z]{2})$/i
    )[1];
    return { id, format: 'company-ticker' };
  }

  if (/^\/profile\/company\/([a-z0-9]{2,8}\/[a-z]:[a-z]{2})-/i.test(path)) {
    const id = path.match(
      /^\/profile\/company\/([a-z0-9]{2,8}\/[a-z]:[a-z]{2})-/i
    )[1];
    return { id, format: 'company-ticker' };
  }

  if (/^\/profile\/company\/([a-z0-9]{2,8}-[a-z]:[a-z]{2})$/i.test(path)) {
    const id = path.match(
      /^\/profile\/company\/([a-z0-9]{2,8}-[a-z]:[a-z]{2})$/i
    )[1];
    return { id, format: 'company-ticker' };
  }

  if (/^\/profile\/company\/([a-z0-9]{2,8}-[a-z]:[a-z]{2})-/i.test(path)) {
    const id = path.match(
      /^\/profile\/company\/([a-z0-9]{2,8}-[a-z]:[a-z]{2})-/i
    )[1];
    return { id, format: 'company-ticker' };
  }

  if (/^\/profiles\/people\/([\d]+)$/i.test(path)) {
    const id = path.match(/^\/profiles\/people\/([\d]+)$/i)[1];
    return { id, format: 'person-numeric' };
  }

  if (/^\/profiles\/people\/([\d]+)-/i.test(path)) {
    const id = path.match(/^\/profiles\/people\/([\d]+)-/i)[1];
    return { id, format: 'person-numeric' };
  }

  if (/^\/profile\/person\/([\d]+)$/i.test(path)) {
    const id = path.match(/^\/profile\/person\/([\d]+)$/i)[1];
    return { id, format: 'person-numeric' };
  }

  if (/^\/profile\/person\/([\d]+)-/i.test(path)) {
    const id = path.match(/^\/profile\/person\/([\d]+)-/i)[1];
    return { id, format: 'person-numeric' };
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
    case 'company-ticker':
      return `https://bloomberg.com/profile/company/${id}`;
    case 'person-numeric':
      return `https://bloomberg.com/profile/person/${id}`;
    default:
      return null;
  }
};

export default { NAME, parse, construct };
