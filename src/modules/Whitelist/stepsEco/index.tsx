import AuthenStorage from '@/utils/storage/authen.storage';
import { Flex, Tooltip } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import ItemStep, { IItemCommunity, StepTagType } from './Step';
import s from './styles.module.scss';
import VerifyBVMModal from './VerifyBVMModal';
import styles from '@/modules/Whitelist/leaderBoard/styles.module.scss';
import { CDN_URL_ICONS } from '@/config';
import DownloadAlphaModal from '@/modules/Whitelist/stepsEco/DownloadAlphaModal';
import DownloadBitcoinArcadeModal from '@/modules/Whitelist/stepsEco/DownloadBitcoinArcadeModal';

export const LearnMore = (href: string, text?: string) => {
  return `<a href='${href}' style="color: #FA4E0E" target="_blank">
      <div style="display: inline-flex; flex-direction: row; align-items: center; gap: 4px;">
        <p>${text ? text : 'Learn more'}</p>
        <img style="width: 16px; height: 16px;" src="https://storage.googleapis.com/tc-cdn-prod/nbc/icons/bvm-icons/arrow-right.svg" />
      </div>
    </a>`;
};

interface IProps {
  setTabIndex: (_: number) => void;
}

const StepsEco = ({ setTabIndex }: IProps) => {
  const token = AuthenStorage.getAuthenKey();
  const [showSyncBVM, setShowSyncBVM] = useState(false);
  const [showDownloadAlphaApp, setShowDownloadAlphhaApp] = useState(false);
  const [showDownloadBitcoinArcadeApp, setShowDownloadBitcoinArcadeApp] =
    useState(false);

  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    return [
      {
        project: 'Bitcoin L2 for GameFi',
        title: 'Bitcoin Arcade',
        desc: `<span style='font-style: italic'>The first ever fully on-chain gaming blockchain on Bitcoin.</span>${LearnMore(
          'https://bitcoinarcade.xyz/',
        )}<br/>
        Get rewarded with 1,000 PTS for every match you play on Bitcoin Arcade. Have fun, play, and earn more points.
        `,
        actionText: token ? 'Download app' : 'Craft a tweet about BVM first',
        image: 'bitcoin-arcade.svg',
        isActive: true,
        actionHandle: () => {
          if (!token) {
            return setTabIndex(0);
          }
          setShowDownloadBitcoinArcadeApp(true);
        },
        right: {
          title: '+3000 PTS',
          desc: 'per match',
        },
      },
      {
        project: 'Bitcoin L2 for DeFi',
        title: 'NakaChain Perpetual',
        desc: `<span style='font-style: italic'>The first decentralized perpetual BRC20 trading platform. </span>${LearnMore(
          'https://nakachain.xyz/',
        )}<br/>
        Play long/short brc20 on Naka Genesis to earn points.<br/>
        The higher the volume you make the more points you will get.
        `,
        actionText: 'Connect Naka Genesis',
        image: 'ic-naka.svg',
        actionHandle: () => {
          setShowSyncBVM(true);
        },
        isActive: !!token,
        right: {
          title: '+2000 PTS',
          desc: 'per 0.001 BTC',
        },
        tag: StepTagType.NEW,
      },
      {
        project: 'Bitcoin L2s',
        title: 'Launch your own Bitcoin L2',
        desc: `Developers? It’s easy to customize and launch your own Bitcoin L2 blockchain — with just a few clicks. ${LearnMore(
          'https://docs.bvm.network/bvm/quickstart/create-a-bitcoin-virtual-machine',
          'Read the whitepaper',
        )}`,
        actionText: token ? 'Launch now' : 'Craft a tweet about BVM first',
        image: 'ic-create-bvm.svg',
        actionHandle: () => {
          setTimeout(() => {
            if (!token) {
              return setTabIndex(0);
            }
            window.open('https://bvm.network/rollups/customize', '_blank');
          }, 200);
        },
        isActive: true,
        right: {
          title: '+10,000 PTS',
          desc: '',
        },
        // tag: StepTagType.NEW
      },
      {
        project: 'Bitcoin L2 for DeFi',
        title: 'NakaChain Swap',
        desc: `<span style='font-style: italic'>A low-cost and lightning-fast Bitcoin Layer 2 blockchain designed for DeFi apps.</span>${LearnMore(
          'https://nakachain.xyz/',
        )}<br/>
        Swap and add liquidity on Naka Genesis to earn points. The higher the volume you make the more points you will get.
        `,
        actionText: 'Connect Naka Genesis',
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
        project: 'Bitcoin L2 for SoFi',
        title: 'Alpha',
        desc: `<span style='font-style: italic'>The first social app on Bitcoin.</span>
          ${LearnMore('https://alpha.wtf/')}<br/>
          Join Running Bitcoin for a cause. For every kilometer you run, you help raise funds for charity and also earn 1,000 PTS.
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
