import last from 'lodash/last';
import { getPublicSaleSummary } from '@/services/public-sale';
import dayjs from 'dayjs';
import { PUBLIC_SALE_END } from '@/modules/Whitelist';
import { labelAmountOrNumberAdds } from '@/utils/string';
import { formatCurrency } from '@/utils/format';
import { getLink } from '@/utils/helpers';

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

export const getTimeEnd = () => {
  let endHours = dayjs.utc(PUBLIC_SALE_END, 'YYYY-MM-DD HH:mm:ss').diff(dayjs.utc(), 'hours')
  let endMins = dayjs.utc(PUBLIC_SALE_END, 'YYYY-MM-DD HH:mm:ss').diff(dayjs.utc(), 'minutes') || 1;

  if (!endHours || endHours <= 0) {
    endHours = 0
  }

  if (!endMins || endMins <= 0) {
    endMins = 1
  }

  return {
    endHours,
    endMins
  }
}

export const shareRaffal = async (code: string | undefined) => {
  // const shareUrl = !code
  //   ? 'bvm.network/public-sale'
  //   : `bvm.network/public-sale?refer=${code}`;
  const shareUrl = 'bvm.network/public-sale';
  const saleSummary = await getPublicSaleSummary();

  const { endHours, endMins } = getTimeEnd()

  const content = `The $BVM public sale is ending in ${endHours ? `${endHours} hour${labelAmountOrNumberAdds(endHours)}` : ''}${!endHours ? `${endMins} min${labelAmountOrNumberAdds(endMins)}` : ''}! So far:\n\n🚀$${formatCurrency(saleSummary.total_usdt_value_not_boost, 0, 2)} raised\n💪${formatCurrency(saleSummary.total_user, 0, 0)} backers\n👉${shareUrl}\n\n@BVMnetwork is the first modular blockchain metaprotocol that will power thousands of Bitcoin L2s. No doubt BVM will be leading the Bitcoin L2 meta.\n\n`

  setTimeout(() => {
    return window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  }, 300);
}

export const shareLuckyPackage = async ({ code, amount }: { code: string | undefined, amount: string | number }) => {
  // const shareUrl = !code
  //   ? 'bvm.network/public-sale'
  //   : `bvm.network/public-sale?refer=${code}`;
  const shareUrl = 'bvm.network/public-sale';

  const saleSummary = await getPublicSaleSummary();

  const { endHours, endMins } = getTimeEnd()

  const content = `Just got a Red Packet of ${amount} $BVM from BVM public sale 🧧\n\nThe $BVM public sale is ending in ${endHours ? `${endHours} hour${labelAmountOrNumberAdds(endHours)}` : ''}${!endHours ? `${endMins} min${labelAmountOrNumberAdds(endMins)}` : ''}! So far:\n\n🚀$${formatCurrency(saleSummary.total_usdt_value_not_boost, 0, 2)} raised\n💪${formatCurrency(saleSummary.total_user, 0, 0)} backers\n👉${shareUrl}\n\n@BVMnetwork is the 1st modular blockchain metaprotocol that will power thousands of Bitcoin L2s\n\n`

  setTimeout(() => {
    return window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  }, 300);
}


export const shareContributorLuckyPackage = async ({ code }: { code: string | undefined }) => {
  // const shareUrl = !code
  //   ? 'bvm.network/public-sale'
  //   : `bvm.network/public-sale?refer=${code}`;
  const shareUrl = 'bvm.network/public-sale';
  const saleSummary = await getPublicSaleSummary();

  const { endHours, endMins } = getTimeEnd()

  const content = `I just aped in the @BVMnetwork public sale - the first modular blockchain metaprotocol that will power thousands of Bitcoin L2s!\n\nThe $BVM public sale is ending in ${endHours ? `${endHours} hour${labelAmountOrNumberAdds(endHours)}` : ''}${!endHours ? `${endMins} min${labelAmountOrNumberAdds(endMins)}` : ''}! So far:\n\n🚀$${formatCurrency(saleSummary.total_usdt_value_not_boost, 0, 2)} raised\n💪${formatCurrency(saleSummary.total_user, 0, 0)} backers\n👉${shareUrl}\n\nThe future of Bitcoin is here!\n\n`

  setTimeout(() => {
    return window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  }, 300);
}
