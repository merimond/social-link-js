import URL from './URL';

const NAME = "CapitalIQ"

const parse_valid = (url, parts = null) => {
  parts = parts || URL.parse(url)
  if (!/capitaliq\.com$/.test(parts.host)) {
    return null
  };

  const path = parts.query;

  if (/companyId=(\d+)/.test(path)) {
    const id = path.match(/companyId=(\d+)/)[1];
    return { id, format: "company" };
  }

  if (/personId=(\d+)/.test(path)) {
    const id = path.match(/personId=(\d+)/)[1];
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
    case 'company':
      return `https://www.capitaliq.com/CIQDotNet/company.aspx?companyId=${id}`;
    case 'person':
      return `https://www.capitaliq.com/CIQDotNet/person.aspx?personId=${id}`;
    default:
      return null;
  }
}

export default { NAME, parse, construct }

