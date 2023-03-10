import URL from './URL';

const NAME = 'Sociopath';

const parseValid = (url, initParts = null) => {
  const parts = initParts || URL.parse(url);

  if (!/sociopath\.io$/.test(parts.host)) {
    return null;
  }

  const path = parts.path.trim().toLowerCase();

  if (/^\/companies\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/.test(path)) {
    const id = path.match(/^\/companies\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/)[1];
    return { id, format: 'company' };
  }

  if (/^\/people\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/.test(path)) {
    const id = path.match(/^\/people\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/)[1];
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
      return `https://sociopath.io/companies/${id}`;
    case 'person':
      return `https://sociopath.io/people/${id}`;
    default:
      return null;
  }
};

export default { NAME, parse, construct };
