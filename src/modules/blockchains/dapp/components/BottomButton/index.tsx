import Lego from '@/modules/blockchains/dapp/components/Lego';
import { adjustBrightness } from '@/modules/blockchains/dapp/utils';
import Button from '@/modules/blockchains/dapp/components/Button';
import React, { useState } from 'react';
import { DappType } from '../../types';
import TopupModal, { TopUpDappInfor } from '../TopupModal';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { compareString } from '@/utils/string';
import { formatCurrency } from '@/utils/format';

interface IProps {
  color: string;
  dapp: DappModel;
}

const BottomButton = (props: IProps) => {
  const { color, dapp } = props;
  const dappState = useAppSelector(dappSelector);
  const stakingPools = dappState.stakingPools;

  const [isShowTopup, setIsShowTopup] = useState(false);
  const [topupInfo, setTopupInfo] = useState<TopUpDappInfor[]>();

  const onActionClick = (params: { dapp: DappModel }) => {
    console.log(params.dapp?.action);
    switch (params.dapp.key) {
      case DappType.staking:
        const data = stakingPools.find((pool) =>
          compareString(pool.id, params.dapp.action?.actionMapperID),
        );
        if (data) {
          setTopupInfo([
            {
              title: `Pool ${data.principle_token?.symbol}/${data.reward_token?.symbol}`,
              tokenSymbol: data.reward_token?.symbol,
              tokenAddress: data.reward_token_address,
              paymentAddress: data.reward_pool_address,
              networkName: dappState.chain?.chainName || '',
            },
          ]);
          setIsShowTopup(true);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Lego
        background={adjustBrightness(color, -20)}
        first={false}
        last={false}
        titleInLeft={true}
        titleInRight={false}
      >
        <Button
          element="button"
          type="button"
          onClick={() => {
            onActionClick({ dapp });
          }}
        >
          {dapp.action?.title || ''}
        </Button>
      </Lego>
      <TopupModal
        show={isShowTopup}
        infors={topupInfo}
        onClose={() => {
          setIsShowTopup(false);
        }}
      />
    </>
  );
};

export default BottomButton;
