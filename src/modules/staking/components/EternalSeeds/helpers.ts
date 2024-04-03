
export const getCollectEternalSeedAttr = (id: number) => {
  let result: any = undefined;
  if (id >= 650 && id <= 1000) {
    result = {
      label: 'Mythic',
      style: {
        background: 'linear-gradient(90deg, #FFB347 0%, #FFCC33 100%)',
      },
      icon: '/images/brains/mythic.png',
      icon_thumb: '/images/brains/mythic_thumb.png',
      id,
    };
  } else if (id >= 1001 && id <= 1500) {
    result = {
      label: 'Legendary',
      style: {
        background: 'linear-gradient(90deg, #AAFFA9 0%, #11FFBD 100%)',
      },
      icon: '/images/brains/legendary.png',
      icon_thumb: '/images/brains/legendary_thumb.png',
      id,
    };
  } else if (id >= 1501 && id <= 2000) {
    result = {
      label: 'Rare',
      style: {
        background: 'linear-gradient(90deg, #E0EAFC 0%, #CFDEF3 100%)',
      },
      icon: '/images/brains/rare.png',
      icon_thumb: '/images/brains/rare_thumb.png',
      id,
    };
  }
  return result;
};
