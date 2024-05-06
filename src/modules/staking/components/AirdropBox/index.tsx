import { Box } from '@chakra-ui/react';
import styles from './styles.module.scss';
import React, { useContext, useRef, useState } from 'react';
import { formatCurrency } from '@/utils/format';
import AirdropCard, {
  IAirdropCard,
} from '@/modules/staking/components/AirdropBox/AirdropCard';
import TitleSection from '@/modules/staking/components/TitleSection';
import CLaunchpadAPI from '@/services/launchpad';
import { NakaConnectContext } from '@/Providers/NakaConnectProvider';
import sleep from '@/utils/sleep';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/stores/hooks';
import { nakaAddressSelector } from '@/stores/states/user/selector';

const AirdropBox = () => {
  const { getConnector } = useContext(NakaConnectContext);
  const address = useAppSelector(nakaAddressSelector);

  const [_amountNAKAAirdrop, setAmountNAKAAirdrop] = useState(0);
  const [swampAirdrop, setSwampAirdrop] = useState<any>();
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const launchpadApi = useRef(new CLaunchpadAPI()).current;

  const getLaunchpadInfo = async () => {
    try {
      const response: any = await Promise.all([
        launchpadApi.getLaunchpadIDOAirdrop(Number('1')),
      ]);
      setAmountNAKAAirdrop(response[0]);
    } catch (err) {}
  };

  const getLaunchpadInfoSwamp = async () => {
    try {
      const [response]: any = await Promise.all([
        launchpadApi.getLaunchpadSwampAirdrop(),
      ]);
      setSwampAirdrop(response);
    } catch (err) {}
  };

  React.useEffect(() => {
    getLaunchpadInfo();
    getLaunchpadInfoSwamp();
  }, []);

  const onClickClaimSwamp = async () => {
    if (!address) return;
    try {
      setClaiming(true);
      const message = 'claim_GSWP_' + address;
      const connector = getConnector();
      const { signature } = await connector.requestSignMessage({
        target: 'popup',
        signMessage: message,
        fromAddress: address,
      });
      await launchpadApi.requestClaimSwampAirdrop({
        address: address as string,
        message: message,
        signature,
      });
      await sleep(2);
      setClaimed(true);
      toast.success('You has claimed successfully!');
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setClaiming(false);
    }
  };

  const AIRBOXDATA: IAirdropCard[] = React.useMemo(() => {
    return [
      {
        src: '/images/stake/naka-stake.png',
        title:
          _amountNAKAAirdrop == 0
            ? `You missed the NAKA airdrop. Don't miss out on the next one!`
            : `RECEIVED ${formatCurrency(
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
        title: '',
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
        desc: (
          <p>
            Eternal AI is a Bitcoin L2 designed for AI, allowing anyone to train
            and deploy AI models on Bitcoin effortlessly.
          </p>
        ),
      },
      {
        src: '/images/stake/stake-swamps.png',
        title: swampAirdrop
          ? Number(swampAirdrop.amount) <= 0
            ? `You missed the GSWP airdrop. Don't miss out on the next one!`
            : `RECEIVED ${formatCurrency(swampAirdrop.amount, 0, 3)} $GSWP`
          : '',
        claimAble: swampAirdrop && swampAirdrop.claimable,
        claimAmount: swampAirdrop
          ? `${formatCurrency(swampAirdrop.amount, 0, 3)} $GSWP`
          : '',
        isClaiming: claiming,
        isClaimed:
          swampAirdrop &&
          (swampAirdrop.is_claimed ||
            Number(swampAirdrop.amount) <= 0 ||
            claimed),
        onClickClaim: onClickClaimSwamp,
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
        desc: (
          <p>
            • Swamps, the first Stamps-based Bitcoin Layer 2<br />
            • Swamps aim to revolutionize the future for SRC-20 trading and much
            more
            <br />
          </p>
        ),
      },
      {
        src: '/images/stake/gif-comming.png',
        title:
          'Coming soon! The airdrop will be proportionate to your SHARD holdings.',
        socials: {
          website: '',
          twitter: '',
          telegram: '',
          discord: '',
        },
        subTitle: 'Upcoming Projects',
        desc: (
          <p>
            • Many more airdrops and exclusive access for 
            <span style={{ fontWeight: '500', color: 'white' }}>
              SHARD holders
            </span>{' '}
            from upcoming Bitcoin L2 projects and BVM's partners
          </p>
        ),
      },
    ];
  }, [_amountNAKAAirdrop, swampAirdrop, claimed, claiming]);

  return (
    <Box width="100%">
      <TitleSection>SHARD HOLDER BENEFITS</TitleSection>
      <p className={styles.boxTitle}>
        Airdrops.{' '}
        <b>The more SHARD you have, the more airdrops you’ll receive.</b>
      </p>
      <div className={styles.content}>
        {AIRBOXDATA.map(
          ({
            title,
            src,
            release,
            isDone,
            socials,
            subTitle,
            desc,
            airdropStr,
            claimAble,
            claimAmount,
            isClaimed,
            isClaiming,
            onClickClaim,
          }) => {
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
                claimAble={claimAble}
                claimAmount={claimAmount}
                isClaimed={isClaimed}
                isClaiming={isClaiming}
                onClickClaim={onClickClaim}
              />
            );
          },
        )}
      </div>
    </Box>
  );
};

export default AirdropBox;
