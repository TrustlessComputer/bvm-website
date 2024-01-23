import AuthenStorage from '@/utils/storage/authen.storage';
import { Flex, Tooltip } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import ItemStep, { IItemCommunity } from './Step';
import s from './styles.module.scss';
import VerifyBVMModal from './VerifyBVMModal';
import styles from '@/modules/Whitelist/leaderBoard/styles.module.scss';
import { CDN_URL_ICONS } from '@/config';
import DownloadAlphaModal from '@/modules/Whitelist/stepsEco/DownloadAlphaModal';
import DownloadBitcoinArcadeModal from '@/modules/Whitelist/stepsEco/DownloadBitcoinArcadeModal';

export const LearnMore = (href: string) => {
  return `<a href='${href}' style="color: #FA4E0E" target="_blank">
      <div style="display: flex; flex-direction: row; align-items: center; gap: 4px;">
        <p>Learn more</p>
        <img style="width: 16px; height: 16px;" src="https://storage.googleapis.com/tc-cdn-prod/nbc/icons/bvm-icons/arrow-right.svg" />
      </div>
    </a>`;
};

const StepsEco = () => {
  const token = AuthenStorage.getAuthenKey();
  const [showSyncBVM, setShowSyncBVM] = useState(false);
  const [showDownloadAlphaApp, setShowDownloadAlphhaApp] = useState(false);
  const [showDownloadBitcoinArcadeApp, setShowDownloadBitcoinArcadeApp] = useState(false);

  const handleShareTw = async () => {
    const content = `Exciting days for Bitcoin L2 with @BVMnetwork!\n\n@Naka_chain, powered by BVM, is exclusively built for BRC-20 DeFi with 2s block time, gas fees of less than $0.01, and supported by smart contracts.\n\nLet's make DeFi on Bitcoin accessible to everyone!\n\nnakachain.xyz`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
      '_blank',
    );
  };

  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    return [
      // {
      //   project: 'NakaChain',
      //   title: 'Share the word about NakaChain',
      //   desc: `Follow naka_chain, Post on X and tag @Naka_chain to climb the ranks.
      //   <a href='https://nakachain.xyz/' style='color: #FA4E0E' target='_blank'>Learn more</a>
      //   `,
      //   actionText: 'Post',
      //   image: 'ic-naka.svg',
      //   actionHandle: handleShareTw,
      //   isActive: !!token,
      //   right: {
      //     title: '+1000 PTS',
      //     desc: '',
      //   },
      // },
      {
        project: 'Alpha',
        title: 'Crypto Bull Run',
        desc: `Run to get fit in reality, engage online in a Web3 environment, and raise funds for charity all at once!
          ${LearnMore('https://alpha.wtf/')}
        `,
        actionText: 'Download app',
        image: 'alpha.svg',
        actionHandle: () => {
          setShowDownloadAlphhaApp(true);
        },
        isActive: !!token,
        right: {
          title: '+1,000 PTS',
          desc: 'per km (0.62 mile)',
          tooltip: (
            <Tooltip
              minW="220px"
              bg="white"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              borderRadius="4px"
              padding="8px"
              label={
                <Flex direction="column" color="black" opacity={0.7}>
                  <p>Max 5,000 pts per day</p>
                </Flex>
              }
            >
              <img
                className={styles.tooltipIcon}
                src={`${CDN_URL_ICONS}/info-circle.svg`}
              />
            </Tooltip>
          ),
        },
      },
      {
        project: 'NakaChain',
        title: 'Swap and Add Liquidity on Naka Genesis',
        desc: `The higher the volume you make the more airdrop points you will get. ${LearnMore(
          'https://nakachain.xyz/',
        )}`,
        actionText: 'Connect',
        image: 'ic-naka.svg',
        actionHandle: () => {
          setShowSyncBVM(true);
        },
        isActive: !!token,
        right: {
          title: '+1000 PTS',
          desc: 'per 0.001 BTC',
        },
      },
      {
        project: 'Bitcoin Arcade',
        title: "Experience fully on-chain games.",
        desc: `Get rewarded with 1,000 PTS for every match you play on Bitcoin Arcade. Have fun, play, and earn more points.${LearnMore(
          'https://bitcoinarcade.xyz/',
        )}`,
        actionText: 'Download app',
        image: 'bitcoin-arcade.svg',
        actionHandle: () => {
          setShowDownloadBitcoinArcadeApp(true);
        },
        isActive: !!token,
        right: {
          title: '+1000 PTS',
          desc: 'per match',
        },
      },
    ];
  }, [token]);

  return (
    <Flex
      className={s.container}
      direction={'column'}
      gap={{
        base: '20px',
        md: '40px',
      }}
    >
      {DATA_COMMUNITY.map((item, index) => {
        return (
          <ItemStep
            key={index}
            index={index}
            content={item}
            isLoading={false}
          />
        );
      })}
      {showSyncBVM && (
        <VerifyBVMModal
          isShow={showSyncBVM}
          onHide={() => {
            setShowSyncBVM(false);
          }}
        />
      )}
      {showDownloadAlphaApp && (
        <DownloadAlphaModal
          isShow={showDownloadAlphaApp}
          onHide={() => {
            setShowDownloadAlphhaApp(false);
          }}
        />
      )}
      {showDownloadBitcoinArcadeApp && (
        <DownloadBitcoinArcadeModal
          isShow={showDownloadBitcoinArcadeApp}
          onHide={() => {
            setShowDownloadBitcoinArcadeApp(false);
          }}
        />
      )}
    </Flex>
  );
};

export default React.memo(StepsEco);
