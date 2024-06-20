import { Box } from '@chakra-ui/react';
import styles from './styles.module.scss';
import React, { useContext, useRef, useState } from 'react';
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
import { commonSelector } from '@/stores/states/common/selector';
import { useDispatch } from 'react-redux';
import { requestReload } from '@/stores/states/common/reducer';

const AirdropBox = () => {
  const { getConnector } = useContext(NakaConnectContext);
  const address = useAppSelector(nakaAddressSelector);
  const { needReload } = useAppSelector(commonSelector);
  const dispatch = useDispatch();

  const [swampAirdrops, setSwampAirdrops] = useState<any[]>();
  const [claimingId, setClaimingId] = useState(-1);

  const [nakaAirdrops, setNakaAirdrops] = useState<any[]>();

  const launchpadApi = useRef(new CLaunchpadAPI()).current;

  const getLaunchpadInfoSwamp = async () => {
    if (!address) return;
    try {
      const [response]: any = await Promise.all([
        launchpadApi.getLaunchpadSwampAirdrop(address),
      ]);
      setSwampAirdrops(response);
    } catch (err) {}
  };

  const getInfoNakaAirdrop = async () => {
    if (!address) return;
    try {
      const [response]: any = await Promise.all([
        launchpadApi.getLaunchpadNakaAirdrop(address),
      ]);
      setNakaAirdrops(response);
    } catch (err) {}
  };

  React.useEffect(() => {
    getLaunchpadInfoSwamp();
    getInfoNakaAirdrop();
  }, [address, needReload]);

  const onClickClaimSwamp = async (id: number) => {
    if (!address) return;
    try {
      setClaimingId(id);
      const message = 'claim_GSWP_' + address;
      const connector = getConnector();
      const { signature } = await connector.requestSignMessage({
        target: 'popup',
        signMessage: message,
        fromAddress: address,
      });
      await launchpadApi.requestClaimSwampAirdrop(id, {
        address: address as string,
        message: message,
        signature,
      });
      await sleep(2);
      dispatch(requestReload());
      toast.success('You has claimed successfully!');
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setClaimingId(-1);
    }
  };

  const onClickClaimNaka = async (id: number) => {
    if (!address) return;
    try {
      setClaimingId(id);
      const message = 'claim_NAKA_' + address;
      const connector = getConnector();
      const { signature } = await connector.requestSignMessage({
        target: 'popup',
        signMessage: message,
        fromAddress: address,
      });
      await launchpadApi.requestClaimNakaAirdrop(id, {
        address: address as string,
        message: message,
        signature,
      });
      await sleep(2);
      dispatch(requestReload());
      toast.success('You has claimed successfully!');
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setClaimingId(-1);
    }
  };

  const AIRBOXDATA: IAirdropCard[] = React.useMemo(() => {
    return [
      {
        src: '/images/stake/naka-stake.png',
        title: `You missed the NAKA airdrop. Don't miss out on the next one!`,
        symbol: 'NAKA',
        claimingId: claimingId,
        airdrops: nakaAirdrops,
        totalClaimed:
          nakaAirdrops && nakaAirdrops.length > 0
            ? nakaAirdrops
                .filter((air) => air.status === 'done')
                .reduce((n, { amount }) => n + Number(amount), 0)
            : undefined,
        onClickClaim: onClickClaimNaka,
        release: undefined,
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
          date: 'November 2024',
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
        title: `You missed the GSWP airdrop. Don't miss out on the next one!`,
        symbol: 'GSWP',
        claimingId: claimingId,
        airdrops: swampAirdrops,
        totalClaimed:
          swampAirdrops && swampAirdrops.length > 0
            ? swampAirdrops
                .filter((air) => air.status === 'done')
                .reduce((n, { amount }) => n + Number(amount), 0)
            : undefined,
        onClickClaim: onClickClaimSwamp,
        release: undefined,
        socials: {
          website: 'https://www.swamps.fi/',
          twitter: 'https://twitter.com/swamps_src20',
          telegram: '',
          discord: '',
        },
        isDone: true,
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
  }, [swampAirdrops, nakaAirdrops, claimingId]);

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
            airdrops,
            claimingId,
            totalClaimed,
            onClickClaim,
            symbol,
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
                claimingId={claimingId}
                airdrops={airdrops}
                symbol={symbol}
                onClickClaim={onClickClaim}
                totalClaimed={totalClaimed}
              />
            );
          },
        )}
      </div>
    </Box>
  );
};

export default AirdropBox;
