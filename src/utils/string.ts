import { DOMAIN_URL } from '@/config';

export const formatName = (name: string, length = 12): string => {
  if (!name) return '';

  //   if (ethers.utils.isAddress(name)) {
  //     return name.substring(2, 8);
  //   } else {
  return name?.length > length ? name.substring(0, length) + '...' : name;
  //   }
};
const compareString = (a: unknown, b: unknown) => {
  return a?.toString?.()?.toLowerCase?.() === b?.toString?.()?.toLowerCase?.();
};

const getDecimalsFromHumanAmount = (params: {
  amount: number;
  defaultDecimals?: number;
}) => {
  const { amount, defaultDecimals = 6 } = params;
  let decimals;
  if (amount > 10) {
    decimals = 2;
  } else if (amount > 1) {
    decimals = 4;
  } else if (amount > 1e-4) {
    decimals = 5;
  } else if (amount > 1e-5) {
    decimals = 6;
  } else {
    decimals = defaultDecimals;
  }
  return decimals;
};

const removeTrailingZeroes = (amountString: string) => {
  let formattedString = amountString;
  while (
    formattedString.length > 0 &&
    ((formattedString.includes('.') &&
      formattedString[formattedString.length - 1] === '0') ||
      formattedString[formattedString.length - 1] === '.')
  ) {
    formattedString = formattedString.slice(0, formattedString.length - 1);
  }

  return formattedString;
};

const isNumeric = (str: never | string) => {
  return /^\d+$/.test(str);
};

const humanFileSize = (bytes: number, si = false, dp = 1) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + ' ' + units[u];
};

const isEmpty = (value: any) => {
  return value === undefined || value === null || value === '';
};

const getUrlsFromText = (text: string) => {
  // Define a regular expression pattern to match URLs
  const urlPattern = /(?:https?:\/\/)?(?:www\.)?[\w.-]+\.\w+(?:\S+)?/gi;

  // Use the match() method to find all matches in the text
  const matches = text.match(urlPattern);

  // Return the array of URLs
  if (matches) {
    return matches.map((match) => {
      if (!match.includes(`${DOMAIN_URL}/@`)) return match.toString();
      return '';
    });
  } else {
    return [];
  }
};

export {
  compareString,
  getDecimalsFromHumanAmount,
  removeTrailingZeroes,
  isNumeric,
  humanFileSize,
  isEmpty,
  getUrlsFromText,
};
