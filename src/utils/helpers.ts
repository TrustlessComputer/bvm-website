import { v4 as uuidv4 } from 'uuid';
import { UUID } from '@/constants/storage-key';
import { APP_ENV } from '@/config';

export const getUuid = (): string => {
  let uuidText = localStorage.get(UUID) as string;
  if (!uuidText) {
    uuidText = uuidv4();
    localStorage.set(UUID, uuidText);
  }
  return uuidText;
};

export const getLink = (referralCode?: string) => {
  const referral = getReferralSearchURL(referralCode);

  if (APP_ENV === 'production') {
    return `https://bvm.network${referral}`;
  }
  return `${window.location.origin}${referral}`;
};

const REFERRAL_TEXT = 'refer'

export const shareReferralURL = (code: string) => {
  if (APP_ENV === 'production') {
    return `https://bvm.network?${REFERRAL_TEXT}=${code}`;
  }
  return `${window.location.origin}?${REFERRAL_TEXT}=${code}`;
};

export const getReferralByURL = () => {
  const params = new URLSearchParams(window.location?.search || '');
  return params.get(REFERRAL_TEXT)
};

export const shareTwitterSignature = (params: {
  fee: string | number,
  txsCount: string | number,
  point: string | number,
}) => {
  const shareUrl = getLink('');
  let content = '';

  content = `Paid ${params.fee} BTC in sats fee over ${params.txsCount} transactions and snagged ${params.point} points from @bvmnetwork via bvm.network for their upcoming public sale!
`;

  window.open(
    `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
      content,
    )}`,
    '_blank',
  );
}


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
