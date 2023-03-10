const result = {
  host: undefined,
  path: undefined,
  query: undefined,
  fragment: undefined,
};
const parse = initUrl => {
  if (initUrl === null || initUrl === undefined) {
    return result;
  }

  let url = String(initUrl).trim();

  if (typeof url !== 'string') {
    return result;
  }

  if (!/^http/i.test(url)) {
    url = `http://${url}`;
  }

  const { host, search, pathname, hash } = new URL(url);

  result.host = host;
  result.query = search;
  result.path = pathname;
  result.fragment = hash;

  return result;
};

export default { parse };
