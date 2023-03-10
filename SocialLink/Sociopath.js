import URL from './URL';

const NAME = "Sociopath";

const parse_valid = (url, parts = null) => {
  parts = parts || URL.parse(url);

  if (!/sociopath\.io$/.test(parts.host)) {
    return null;
  };

  const path = parts.path.trim().toLowerCase();

  if (/^\/companies\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/.test(path)) {
    const id = path.match(/^\/companies\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/)[1];
    return { id, format: "company" };
  }

  if (/^\/people\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/.test(path)) {
    const id = path.match(/^\/people\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/)[1];
    return { id, format: "person" };
  }

  return null;
}

const guess_invalid = (url) => {
  /* //TODO check this fn */
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

const construct = (id, format) => {
  switch (format) {
    case 'company':
      return `https://sociopath.io/companies/${id}`;
    case 'person':
      return `https://sociopath.io/people/${id}`;
    default:
      return null;
  }
}

export default { NAME, parse, construct }

