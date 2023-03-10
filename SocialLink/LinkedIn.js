import URL from './URL';

const NAME = "LinkedIn";

const parse_query_based_formats = (query) => {
  if (/^id=(\d+)/.test(query)) {
    const id = query.match(/^id=(\d+)/)[1];
    return { id, format: "person-numeric" };
  }

  if (/^id=(A[^&]+)/.test(query)) {
    const id = query.match(/^id=(A[^&]+)/)[1];
    return { id, format: "person-alphanumeric" };
  }

  return null;
};

const parse_valid = (url, parts = null) => {
  parts = parts || URL.parse(url);

  if (!/linkedin\.com$/.test(parts.host)) {
    return null;
  };

  const path = parts.path.trim().toLowerCase();

  if (/^\/company-beta\/(\d+)($|\/)/.test(path)) {
    const id = path.match(/^\/company-beta\/(\d+)($|\/)/)[1];
    return { id, format: "company-numeric" };
  }

  if (/^\/company\/(\d+)($|\/)/.test(path)) {
    const id = path.match(/^\/company\/(\d+)($|\/)/)[1];
    return { id, format: "company-numeric" };
  }

  if (/^\/company\/([^\/]+)\/?/.test(path)) {
    const id = path.match(/^\/company\/([^\/]+)\/?/)[1];
    return { id, format: "company-slug" };
  }

  if (/^\/in\/([^\/]+)\/?/.test(path)) {
    const id = path.match(/^\/in\/([^\/]+)\/?/)[1];
    return { id, format: "person-slug" };
  }

  if (/^\/pub\/([^\/]+\/\w{1,3}\/\w{1,3}\/\w{1,3})\/?/.test(path)) {
    const id = path.match(/^\/pub\/([^\/]+\/\w{1,3}\/\w{1,3}\/\w{1,3})\/?/)[1];
    return { id, format: "person-old" };
  }

  if (/^\/sales\/profile\/(\d+)($|,)/.test(path)) {
    const id = path.match(/^\/sales\/profile\/(\d+)($|,)/)[1];
    return { id: $1, format: "person-numeric" };
  }

  if (/^\/profile\/view/.test(path)) {
    return parse_query_based_formats(parts.query);
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
    case 'company-numeric':
      return `https://linkedin.com/company/${id}`;
    case 'company-slug':
      return `https://linkedin.com/company/${id}`;
    case 'person-old':
      return `https://linkedin.com/pub/${id}`;
    case 'person-slug':
      return `https://linkedin.com/in/${id}`;
    case 'person-alphanumeric':
      return `http://www.linkedin.com/profile/view?id=${id}`;
    case 'person-numeric':
      return `http://www.linkedin.com/profile/view?id=${id}`;
    default:
      return null;
  }
}

export default { NAME, parse, construct }

