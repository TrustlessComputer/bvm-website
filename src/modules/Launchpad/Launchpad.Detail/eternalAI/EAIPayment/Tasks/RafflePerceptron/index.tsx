import shareStyles from '../styles.module.scss';
import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { isMobile } from 'react-device-detect';
import SvgInset from '@/components/SvgInset';
import PerceptronsHero from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/Tasks/RafflePerceptron/Hero';
import { formatCurrency } from '@/utils/format';
import cx from 'clsx';
import CPaymentEAIAPI from '@/modules/Launchpad/services/payment.eai';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { useAppSelector } from '@/stores/hooks';
import { summarySelector } from '@/modules/Launchpad/store/lpEAIPayment/selector';

const STORAGE_KEY = 'SHARE_EAI_PERCEPTRON_KEY';

const RafflePerceptron = () => {
  const paymentEAIApi = useRef(new CPaymentEAIAPI()).current;
  const [update, setUpdate] = React.useState(0);
  const wallet = useAuthenticatedWallet();
  const address = wallet?.address;
  const summary = useAppSelector(summarySelector);

  const lastCode = React.useMemo(() => {
    if (!address) return '';
    return localStorage.getItem(STORAGE_KEY + address);
  }, [update]);

  const onShare = async (e: any) => {
    e.preventDefault();
    let code = '';
    try {
      const rs = await paymentEAIApi.requestShareCode();
      code = `#${rs?.public_code}`;
    } catch (e) {
      console.log(e);
    }

    const content = `I’m excited to join ${formatCurrency(
      summary?.total_user,
      0,
      0,
      'BTC',
      true,
    )} others in backing the Eternal AI team in building a truly open AI infrastructure — built by the people, for the people.\n\nCheck them out: EternalAI.org\n\n#EternalAI ${code}`;

    const _url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      content,
    )}`;

    if (code && !!address) {
      localStorage.setItem(STORAGE_KEY + address, code);
    }

    setTimeout(() => {
      setUpdate((numb: number) => numb + 1);
    }, 5000);

    if (isMobile) {
      return window.location.assign(_url);
    }

    return window.open(_url, '_blank');
  };

  return (
    <div className={shareStyles.container}>
      <Flex flexDirection="column" gap="4px">
        <div className={shareStyles.container_tag}>
          <p>RAFFLE</p>
        </div>
        <p className={shareStyles.container_title}>
          <span className={shareStyles.container_title_bold}>
            Perceptron 124
          </span>{' '}
          <span className={shareStyles.container_title_blur}>
            (Inscription 1070792)
          </span>
        </p>
      </Flex>
      <p className={shareStyles.container_content}>
        We’re raffling a historical Ordinal Inscription to celebrate the launch
        of Eternal AI. In April 2023, we planted Perceptrons on Bitcoin. Now,
        they have evolved into Eternals, but they are forever known as the first
        on-chain AI on Bitcoin.
      </p>
      <Box />
      {!!lastCode && (
        <div
          className={cx(shareStyles.button, !!lastCode && shareStyles.hasCode)}
        >
          You have successfully shared on X with raffle code{' '}
          <b>{lastCode?.replace('#', '')}</b>
        </div>
      )}
      <Flex flexDirection="column" alignItems="center" width="100%" gap="20px">
        <Button className={cx(shareStyles.button)} onClick={onShare}>
          Tweet to enter the raffle
        </Button>
        <Flex flexDirection="row" gap="20px">
          <Flex align="center">
            <a
              className={shareStyles.container_link}
              href="https://generative.xyz/ai"
              target="_blank"
            >
              Learn more
            </a>
            <span>
              <SvgInset svgUrl={'/icons/arrow-right.svg'} size={18} />
            </span>
          </Flex>
          <Flex align="center">
            <a
              className={shareStyles.container_link}
              href="https://magiceden.io/ordinals/marketplace/perceptrons"
              target="_blank"
            >
              Trade on Magic Eden
            </a>
            <span>
              <SvgInset svgUrl={'/icons/arrow-right.svg'} size={18} />
            </span>
          </Flex>
        </Flex>
      </Flex>
      <PerceptronsHero />
    </div>
  );
};

export default RafflePerceptron;
