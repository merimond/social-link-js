import URL from './URL';

const NAME = 'Crunchbase';

const parseValid = (url, initParts = null) => {
  const parts = initParts || URL.parse(url);
  if (!/crunchbase\.com$/.test(parts.host)) {
    return null;
  }

  const path = parts.path.trim().toLowerCase();

  if (/acquisition\/(.+)/.test(path)) {
    const id = path.match(/acquisition\/(.+)/)[1];
    return { id, format: 'acquisition' };
  }

  if (/organization\/(.+)/.test(path)) {
    const id = path.match(/organization\/(.+)/)[1];
    return { id, format: 'organization' };
  }

  if (/funding_round\/(.+)/.test(path)) {
    const id = path.match(/funding_round\/(.+)/)[1];
    return { id, format: 'funding-round' };
  }

  if (/person\/(.+)/.test(path)) {
    const id = path.match(/person\/(.+)/)[1];
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
    case 'organization':
      return `https://crunchbase.com/organization/${id}`;
    case 'person':
      return `https://crunchbase.com/person/${id}`;
    case 'acquisition':
      return `https://crunchbase.com/acquisition/${id}`;
    case 'funding-round':
      return `https://crunchbase.com/funding_round/${id}`;
    default:
      return null;
  }
};

export default { NAME, parse, construct };
