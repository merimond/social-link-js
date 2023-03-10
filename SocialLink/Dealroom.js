import URL from './URL';

const NAME = "Dealroom";

const parse_valid = (url, parts = null) => {
  parts = parts || URL.parse(url)
  if (!/dealroom\.co$/.test(parts.host)) {
    return null
  };

  const path = parts.path.trim().toLowerCase();

  if (/^\/companies\/(\d+)$/.test(path)) {
    const id = path.match(/^\/companies\/(\d+)$/)[1];
    return { id, format: "company-numeric" };
  }

  if (/^\/companies\/(\d+)\/(.+)/.test(path)) {
    const id = path.match(/^\/companies\/(\d+)\/(.+)/)[1];
    return { id, format: "company-numeric" };
  }

  if (/^\/companies\/(.+)/.test(path)) {
    const id = path.match(/^\/companies\/(.+)/)[1];
    return { id, format: "company-slug" };
  }

  if (/^\/people\/(\d+)/.test(path)) {
    const id = path.match(/^\/people\/(\d+)/)[1];
    return { id, format: "person-numeric" };
  }

  if (/^\/people\/(.+)/.test(path)) {
    const id = path.match(/^\/people\/(.+)/)[1];
    return { id, format: "person-slug" };
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
    case 'company-numeric':
      return `https://app.dealroom.co/companies/${id}`;
    case 'company-slug':
      return `https://app.dealroom.co/companies/${id}`;
    case 'person-numeric':
      return `https://app.dealroom.co/people/${id}`;
    case 'person-slug':
      return `https://app.dealroom.co/people/${id}`;
    default:
      return null;
  }
}

export default { NAME, parse, construct }

