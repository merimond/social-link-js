import URL from './URL';

const NAME = "Crunchbase"

const parse_valid = (url, parts = null) => {
  parts = parts || URL.parse(url)
  if (!/crunchbase\.com$/.test(parts.host)) {
    return null
  };

  const path = parts.path.trim().toLowerCase();

  if (/acquisition\/(.+)/.test(path)) {
    const id = path.match(/acquisition\/(.+)/)[1];
    return { id, format: "acquisition" };
  }

  if (/organization\/(.+)/.test(path)) {
    const id = path.match(/organization\/(.+)/)[1];
    return { id, format: "organization" };
  }

  if (/funding_round\/(.+)/.test(path)) {
    const id = path.match(/funding_round\/(.+)/)[1];
    return { id, format: "funding-round" };
  }

  if (/person\/(.+)/.test(path)) {
    const id = path.match(/person\/(.+)/)[1];
    return { id, format: "person" };
  }

  return null
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
}

export default { NAME, parse, construct }

