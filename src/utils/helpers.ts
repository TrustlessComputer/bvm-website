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


export const getReferralSearchURL = (referralCode?: string) => {
  let game_url = '';
  // if (p) {
  //   game_url = `game_name=${p.gameName}&game_id=${p.gameID}`;
  // }

  if (!game_url && !referralCode) {
    return '';
  } else if (game_url && referralCode) {
    return `?referral=${referralCode}&${game_url}`;
  } else if (game_url && !referralCode) {
    return `?${game_url}`;
  } else if (referralCode && !game_url) {
    return `?referral=${referralCode}`;
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
