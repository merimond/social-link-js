import URL from './URL';

const NAME = "Facebook";

const parse_query_based_formats = (query) => {
  if (/^id=(\d+)/.test(query)) {
    const id = query.match(/^id=(\d+)/)[1];
    return { id, format: "numeric" };
  }

  return null;
}

const parse_valid = (url, parts = null) => {
  /* https://www.facebook.com/help/105399436216001 */
  parts = parts || URL.parse(url)

  if (!/facebook\.com$/.test(parts.host)) {
    return null
  };

  const path = parts.path.trim().toLowerCase();

  if (/profile\.php$/.test(path)) {
    return parse_query_based_formats(parts.query);
  }

  if (/\.php$/.test(path)) {
    return null
  }

  if (/-(\d{8,})/.test(path)) {
    const id = path.match(/-(\d{8,})/)[1];
    return { id, format: "numeric" };
  }

  if (/\/(\d{8,})/.test(path)) {
    const id = path.match(/\/(\d{8,})/)[1];
    return { id, format: "numeric" };
  }

  if (/^\/pg\/([a-z0-9\._-]+)\/?/.test(path)) {
    const id = path.match(/^\/pg\/([a-z0-9\._-]+)\/?/)[1];
    return { id, format: "slug" };
  }

  if (/^\/([a-z0-9\._-]+)\/?$/.test(path)) {
    const id = path.match(/^\/([a-z0-9\._-]+)\/?$/)[1];
    return { id, format: "slug" };
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
    case 'slug':
      return `https://facebook.com/${id}`;
    case 'numeric"':
      return `https://facebook.com/${id}`;
    default:
      return null;
  }
}

export default { NAME, parse, construct }

