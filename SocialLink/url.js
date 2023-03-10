
const result = { host: undefined, path: undefined, query: undefined, fragment: undefined };
const parse = uri => {

  if (uri === null || uri === undefined)
    return result;

  uri = String(uri).trim();

  if (typeof uri !== 'string')
    return result;

  if (!/^http/i.test(uri))
    uri = `http://${uri}`

  const {
    host,
    search,
    pathname,
    hash,
  } = new URL(uri);

  result.host = host;
  result.query = search;
  result.path = pathname;
  result.fragment = hash;

  return result;
}

export default { parse }