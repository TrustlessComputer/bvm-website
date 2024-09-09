import { v4 as uuidv4 } from 'uuid';
import { UUID } from '@/constants/storage-key';
import { APP_ENV, NAKA_WEB } from '@/config';
import { formatCurrency } from '@/utils/format';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import last from 'lodash/last';
import { NETWORK_TO_EXPLORER } from '@/Providers/AuthenticatedProvider/chainConfig';
import { User } from '@/stores/states/user/types';
import { isMobile } from 'react-device-detect';
import { EAirdropStatus } from '@/services/api/dapp/airdrop/interface';

export const getUuid = (): string => {
  let uuidText = window.localStorage.getItem(UUID) as string;
  if (!uuidText) {
    uuidText = uuidv4();
    window.localStorage.setItem(UUID, uuidText);
  }
  return uuidText;
};

export const getLink = (referralCode?: string) => {
  const referral = getReferralSearchURL(referralCode);
  return `https://bvm.network${referral}`;
  // if (APP_ENV === 'production') {
  //   return `https://bvm.network${referral}`;
  // }
  // return `${window.location.origin}${referral}`;
};

const REFERRAL_TEXT = 'refer';
const REFERRAL_TEXT_MODULAR = 'source';
const REF_CODE_TEXT = 'r';

export const shareReferralURL = (code: string) => {
  if (APP_ENV === 'production') {
    return `https://bvm.network?${REFERRAL_TEXT}=${code}`;
  }
  return `${window.location.origin}?${REFERRAL_TEXT}=${code}`;
};

export const getReferralByURL = () => {
  const params = new URLSearchParams(window.location?.search || '');
  return params.get(REFERRAL_TEXT);
};

export const getReferralModularByURL = () => {
  const params = new URLSearchParams(window.location?.search || '');
  return params.get(REFERRAL_TEXT_MODULAR);
};

export const getRefCodeByURL = () => {
  const params = new URLSearchParams(window.location?.search || '');
  return params.get(REF_CODE_TEXT);
};

export const shareTwitterSignature = (params: {
  fee: string | number;
  txsCount: string | number;
  point: string | number;
}) => {
  const shareUrl = getLink('');
  let content = '';

  content = `Paid ${params.fee} BTC in sats fee over ${params.txsCount} transactions and snagged ${params.point} points from @BVMnetwork via bvm.network for their upcoming public sale!
`;

  setTimeout(() => {
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  }, 200);
};

export const shareBTCOG = (params: {
  fee: string | number;
  feeUSD: string | number;
  refCode: string;
}) => {
  const shareUrl = getLink(params.refCode);
  const amount = new BigNumber(params.fee).gte(0.0001)
    ? new BigNumber(params.fee).toFixed(4, BigNumber.ROUND_FLOOR)
    : new BigNumber(params.fee).toFixed();
  const content = `I ♥️ Bitcoin\n\nI’ve spent ${amount} BTC on transaction fees. Right now, that’s $${formatCurrency(
    new BigNumber(params.feeUSD || 1).toNumber() || 1,
    0,
    2,
  )}.\n\nAnd I can’t wait for $BVM to launch.\n\n@BVMnetwork is going to be the future of Bitcoin. I’m going to be doing so much more with my BTC.\n\n${shareUrl}`;

  setTimeout(() => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
      '_blank',
    );
  }, 200);
};

export const getReferralSearchURL = (referralCode?: string) => {
  let game_url = '';
  // if (p) {
  //   game_url = `game_name=${p.gameName}&game_id=${p.gameID}`;
  // }

  if (!game_url && !referralCode) {
    return '';
  } else if (game_url && referralCode) {
    return `?${REFERRAL_TEXT}=${referralCode}&${game_url}`;
  } else if (game_url && !referralCode) {
    return `?${game_url}`;
  } else if (referralCode && !game_url) {
    return `?${REFERRAL_TEXT}=${referralCode}`;
  } else {
    return '';
  }
};

export const getAvatarName = (name: string): string => {
  let words = '';
  if (name && name.split(' ').length > 0) {
    name.split(' ').length = 21;
    const arrName = name.split(' ');
    if (arrName[0]) {
      words = arrName[0].charAt(0);
      if (arrName[1]) {
        words += arrName[1].charAt(0);
      } else if (arrName[0].charAt(1)) {
        words += arrName[0].charAt(1);
      }
      words = words.toUpperCase();
    }
  }
  return words;
};

export const settingMomentFromNow = () => {
  dayjs.locale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s',
      s: '%ds',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1M',
      MM: '%dM',
      y: '1Y',
      yy: '%dY',
    },
  });
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

enum ETwitterImageProfileSize {
  normal = 'normal',
  medium = '200x200',
  high = '400x400',
}

export const getUrlAvatarTwitter = (
  url: string,
  size: 'normal' | 'medium' | 'high' = 'normal',
) => {
  if (url) {
    if (!url.includes('pbs.twimg.com') && !url.includes('abs.twimg.com')) {
      return url;
    }

    if (url?.includes('default_profile_normal.png')) {
      return undefined;
    }

    const urls = url?.split('/');

    let finalUrl = urls.splice(0, urls.length - 1).join('/');

    const lastPartUrl = last(urls)?.split('_');

    if (lastPartUrl?.[0] === 'default') {
      return url;
    }

    finalUrl += `/${lastPartUrl
      ?.splice(0, lastPartUrl.length - 1)
      ?.join('_')}_${ETwitterImageProfileSize[size]}.${last(
      last(lastPartUrl)?.split('.'),
    )}`;

    return finalUrl;
  }
  return undefined;
};

export const getExplorer = (
  hash?: any,
  network: 'eth' | 'tc' | 'rune' | 'eai' | 'naka' = 'naka',
  type: 'tx' | 'address' = 'tx',
) => {
  return `${NETWORK_TO_EXPLORER[network]}/${type}/${hash}`;
};

export const shareURLWithReferralCode = (params: {
  subDomain: string;
  user: User | undefined;
}) => {
  const domain = 'nakachain.xyz';
  const user = params?.user;

  let shareCode = '';

  if (user && user?.referral_code) {
    shareCode = `?${REFERRAL_TEXT}=${user.referral_code}`;
  }

  const _subDomain = params.subDomain.startsWith('/')
    ? params.subDomain
    : `/${params.subDomain}`;

  return `${domain}${_subDomain}${shareCode}`;
};

export type SearchURLTokenType = 'coin' | 'pass' | 'key';

export interface ISearchURLSwap {
  from_token?: string;
  from_token_type?: SearchURLTokenType;
  to_token?: string;
  to_token_type?: SearchURLTokenType;
}

export const getUrlToSwap = (params: ISearchURLSwap) => {
  const options = new URLSearchParams({
    from_token: params.from_token || '',
    to_token: params.to_token || '',
  });
  return `${NAKA_WEB}/swap?${options.toString()}`;
};

export const openExtraLink = (url: string) => {
  return isMobile ? window.location.assign(url) : window.open(url, '_blank');
};

// Function to encode a string to Base64
export function encodeBase64(input: string): string {
  return encodeURIComponent(btoa(input));
}

// Function to decode a Base64 string
export function decodeBase64(encoded: string): string {
  return atob(decodeURIComponent(encoded));
}

export function isLocalhost() {
  return window.location.href.includes('http://localhost');
}

function handleStatusEdgeByBox(status: any) {
  switch (status) {
    case 'draft':
    case 'setting_up':
    case EAirdropStatus.new:
    case '':
      //draft
      return {
        animate: true,
        icon: '',
      };
    // down
    case 'down':
    case 'run_out':
    case EAirdropStatus.ended:
    case 'stopped':
      return {
        animate: true,
        icon: 'true',
      };
    //run
    default:
      return {
        animate: false,
        icon: '',
      };
  }
}

export default function handleStatusEdges(statusDapp: any, status: aa | string, idNode: string) {
  if (idNode === 'account_abstraction' || idNode === 'bridge_apps' || idNode === 'gaming_apps') {
    console.log('status here', status);
    return handleStatusEdgeByBox(status);
  }

  return handleStatusEdgeByBox(statusDapp);
}

type aa = 'draft' | 'running' | 'down' | 'setting_up' | EAirdropStatus
