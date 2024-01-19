import AuthenStorage from '@/utils/storage/authen.storage';
import { Flex } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import ItemStep, { IItemCommunity } from './Step';
import s from './styles.module.scss';
import VerifyBVMModal from './VerifyBVMModal';

const StepsEco = () => {
  const token = AuthenStorage.getAuthenKey();
  const [showSyncBVM, setShowSyncBVM] = useState(false);

  const handleShareTw = async () => {
    const shareUrl = 'https://nakachain.xyz';
    const content = ``;
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  };

  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    return [
      {
        title: 'Share the word about NakaChain',
        desc: 'Post on X as often as you like and tag @Naka_chain to climb the ranks.',
        actionText: 'Post',
        image: 'ic-naka.svg',
        actionHandle: handleShareTw,
        isActive: !!token,
        right: {
          title: !token ? '+1000 PTS' : '+1 PTS',
          desc: !token ? 'first post' : 'per view',
        },
      },
      {
        title: 'Swap and Add Liquidity on Naka Genesis',
        desc: 'The higher the volume you make the more airdrop points you will get.',
        actionText: 'Connect',
        image: 'ic-naka.svg',
        actionHandle: () => {
          setShowSyncBVM(true);
        },
        isActive: !!token,
        right: {
          title: !token ? '+1 PTS' : '+1 PTS',
          desc: !token ? 'first post' : 'per 0.000025 BTC',
        },
      },
      {
        title: 'Play Satoshi Gambit',
        desc: 'Experience the first 3D fully on-chain game on Bitcoin. Play, have fun, and earn more tokens.',
        actionText: 'Play',
        image: 'bitcoin-arcade.svg',
        actionHandle: () => {
          window.open('https://bitcoinarcade.xyz/');
        },
        isActive: !!token,
        right: {
          title: '',
          desc: '',
        },
      },
      {
        title: 'Crypto Bull Run',
        desc: 'Run to get fit in reality, engage online in a Web3 environment, and raise funds for charity all at once!',
        actionText: 'Run',
        image: 'alpha.svg',
        actionHandle: () => {
          window.open('https://app.alpha.wtf/');
        },
        isActive: !!token,
        right: {
          title: '',
          desc: '',
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
    </Flex>
  );
};

export default React.memo(StepsEco);
