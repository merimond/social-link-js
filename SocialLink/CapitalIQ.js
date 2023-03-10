import URL from './URL';

const NAME = 'CapitalIQ';

const parseValid = (url, initParts = null) => {
  const parts = initParts || URL.parse(url);
  if (!/capitaliq\.com$/.test(parts.host)) {
    return null;
  }

  const path = parts.query;

  if (/companyId=(\d+)/.test(path)) {
    const id = path.match(/companyId=(\d+)/)[1];
    return { id, format: 'company' };
  }

  if (/personId=(\d+)/.test(path)) {
    const id = path.match(/personId=(\d+)/)[1];
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
      return `https://www.capitaliq.com/CIQDotNet/company.aspx?companyId=${id}`;
    case 'person':
      return `https://www.capitaliq.com/CIQDotNet/person.aspx?personId=${id}`;
    default:
      return null;
  }
};

export default { NAME, parse, construct };
