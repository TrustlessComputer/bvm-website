import { v4 as uuidv4 } from 'uuid';
import { UUID } from '@/constants/storage-key';
import { APP_ENV } from '@/config';
import { formatCurrency } from '@/utils/format';
import BigNumber from 'bignumber.js';

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
