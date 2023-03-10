import URL from './URL';

const NAME = 'DealTinder';

const parseValid = (url, initParts = null) => {
  const parts = initParts || URL.parse(url);
  if (!/dealtinder\.com$/.test(parts.host)) {
    return null;
  }

  const path = parts.path.trim().toLowerCase();

  if (/^\/companies\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/.test(path)) {
    const id = path.match(/^\/companies\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/)[1];
    return { id, format: 'company-uuid' };
  }

  if (/^\/companies\/([^\/]+)/.test(path)) {
    const id = path.match(/^\/companies\/([^\/]+)/)[1];
    return { id, format: 'company-slug' };
  }

  if (/^\/investors\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/.test(path)) {
    const id = path.match(/^\/investors\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/)[1];
    return { id, format: 'company-uuid' };
  }

  if (/^\/investors\/([^\/]+)/.test(path)) {
    const id = path.match(/^\/investors\/([^\/]+)/)[1];
    return { id, format: 'company-slug' };
  }

  if (/^\/people\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/.test(path)) {
    const id = path.match(/^\/people\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/)[1];
    return { id, format: 'person-uuid' };
  }

  if (/^\/people\/([^\/]+)/.test(path)) {
    const id = path.match(/^\/people\/([^\/]+)/)[1];
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
    case 'company-uuid':
      return `https://dealtinder.com/investors/${id}`;
    case 'company-slug':
      return `https://dealtinder.com/investors/${id}`;
    case 'person-uuid':
      return `https://dealtinder.com/people/${id}`;
    case 'person-slug':
      return `https://dealtinder.com/people/${id}}`;
    default:
      return null;
  }
};

export default { NAME, parse, construct };
