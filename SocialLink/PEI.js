import URL from './URL';

const NAME = "PEI";

const parse_valid = (url, parts = null) => {
  parts = parts || URL.parse(url);

  if (!/privateequityinternational\.com$/.test(parts.host)) {
    return null;
  };

  const path = parts.path.trim().toLowerCase();

  if (/^\/profile\?id=(\d+)/.test(path)) {
    const id = path.match(/^\/profile\?id=(\d+)/)[1];
    return { id, format: "company" };
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
      return `https://www.privateequityinternational.com/database/#/profile?id=${id}`;
    default:
      return null;
  }
}

export default { NAME, parse, construct }

