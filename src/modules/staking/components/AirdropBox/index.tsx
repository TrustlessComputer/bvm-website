import { Box } from '@chakra-ui/react';
import styles from './styles.module.scss';
import React, { useRef, useState } from 'react';
import { formatCurrency } from '@/utils/format';
import AirdropCard, { IAirdropCard } from '@/modules/staking/components/AirdropBox/AirdropCard';
import TitleSection from '@/modules/staking/components/TitleSection';
import CLaunchpadAPI from '@/services/launchpad';

const AirdropBox = () => {
  const [_amountNAKAAirdrop, setAmountNAKAAirdrop] = useState(0);
  const launchpadApi = useRef(new CLaunchpadAPI()).current;

  // const stakeUser = useAppSelector(stakeUserSelector);

  const AIRBOXDATA: IAirdropCard[] = React.useMemo(() => {
    return [
      {
        src: '/images/stake/naka-stake.png',
        title: _amountNAKAAirdrop == 0 ? `You missed the NAKA airdrop. Don't miss out on the next one!` : `RECEIVED ${formatCurrency(
          _amountNAKAAirdrop,
          0,
          3,
          'TC',
          false,
          1000,
        )} $NAKA`,
        isDone: true,
        socials: {
          website: 'https://nakachain.xyz/',
          twitter: 'https://twitter.com/naka_chain',
          telegram: 'https://t.me/+YErNIaB1CGQ1YjY1',
          discord: '',
        },
        subTitle: 'NAKA',
        airdropStr: '10,500,000 NAKA',
        desc: <p>The first Bitcoin Layer 2 blockchain for DeFi on Mainnet.</p>,
      },
      {
        src: '/images/stake/eternal-stake.png',
        title: 'RECEIVED 100 $NAKA',
        release: {
          token: '$EAI',
          date: 'April 2024',
        },
        socials: {
          website: 'https://eternalai.org/',
          twitter: 'https://twitter.com/CryptoEternalAI',
          telegram: 'https://t.me/+d8yMI3IjmCU1ODhh',
          discord: '',
        },
        subTitle: 'Eternal AI',
        airdropStr: '50,000,000 EAI',
        desc: <p>Eternal AI is a Bitcoin L2 designed for AI, allowing anyone to train and deploy AI models on Bitcoin effortlessly.</p>,
      },
      {
        src: '/images/stake/stake-swamps.png',
        title: 'Coming soon! The airdrop will be proportionate to your SHARD holdings.',
        release: {
          token: '$GSWP',
          date: 'May 2024',
        },
        socials: {
          website: 'https://www.swamps.fi/',
          twitter: 'https://twitter.com/swamps_src20',
          telegram: '',
          discord: '',
        },
        subTitle: 'Swamps',
        airdropStr: '30,000,000 GSWP',
        desc: <p>• Swamps, the first Stamps-based Bitcoin Layer 2<br/>
        • Swamps aim to revolutionize the future for SRC-20 trading and much more<br/>
        </p>,
      },
      {
        src: '/images/stake/gif-comming.png',
        title: 'Coming soon! The airdrop will be proportionate to your SHARD holdings.',
        socials: {
          website: '',
          twitter: '',
          telegram: '',
          discord: '',
        },
        subTitle: 'Upcoming Projects',
        desc: <p>• Many more airdrops and exclusive access for <span style={{fontWeight: '500', color: 'white'}}>SHARD holders</span> from upcoming Bitcoin L2 projects and BVM's partners</p>
      },
    ];
  }, [_amountNAKAAirdrop]);

  const getLaunchpadInfo = async () => {
    try {
      const response: any = await Promise.all([
        launchpadApi.getLaunchpadIDOAirdrop(Number('1')),
      ]);

      setAmountNAKAAirdrop(response[0]);
    } catch (err) {
      //
    } finally {
      // TODO
    }
  };

  React.useEffect(() => {
    getLaunchpadInfo();
  }, []);

  return (
    <Box width="100%">
      <TitleSection>SHARD HOLDER BENEFITS</TitleSection>
      <p className={styles.boxTitle}>
        Airdrops.{' '}
        <b>The more SHARD you have, the more airdrops you’ll receive.</b>
      </p>
      <div className={styles.content}>
        {AIRBOXDATA.map(({ title, src, release, isDone, socials, subTitle, desc, airdropStr }) => {
          return (
            <AirdropCard
              isDone={isDone as any}
              title={title}
              src={src}
              release={release as any}
              key={title}
              socials={socials}
              subTitle={subTitle}
              desc={desc}
              airdropStr={airdropStr || ''}
            />
          );
        })}
      </div>
    </Box>
  );
};

export default AirdropBox;
