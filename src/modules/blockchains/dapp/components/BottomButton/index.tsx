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
import { DappModel } from '@/types/customize-model';
import { Text } from '@chakra-ui/react';
import WhitePaperModal from '@/modules/blockchains/dapp/components/WhitePaperModal';

interface IProps {
  color: string;
  dapp: DappModel;
}

const BottomButton = (props: IProps) => {
  const { color, dapp } = props;
  const dappState = useAppSelector(dappSelector);
  const stakingPools = dappState.stakingPools;

  const [isShowTopup, setIsShowTopup] = useState(false);
  const [isShowPreview, setIsShowPreview] = useState(false);
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
              title: (
                <Text>
                  Please send{' '}
                  <Text
                    as="span"
                    fontWeight={700}
                    color={'#000'}
                    textAlign={'center'}
                  >
                    {data.reward_token?.symbol}{' '}
                  </Text>
                  to the following wallet address below.
                </Text>
              ),
              tokenSymbol: data.reward_token?.symbol,
              tokenAddress: data.reward_token_address,
              paymentAddress: data.reward_pool_address,
              networkName: dappState.chain?.chainName || '',
            },
          ]);
          setIsShowTopup(true);
        }
        break;
      case DappType.airdrop:
        console.log('params.dapp', params.dapp);
        const actionInfo = params.dapp.action as any;
        setTopupInfo([
          {
            title: (
              <Text>
                Please send{' '}
                <Text
                  as="span"
                  fontWeight={700}
                  color={'#000'}
                  textAlign={'center'}
                >
                  {`${formatCurrency(actionInfo?.paymentAmount, 0, 2)} ${
                    actionInfo?.tokenInfo?.symbol
                  } `}
                </Text>
                to the following wallet address below.
              </Text>
            ),
            tokenSymbol: ``,
            tokenAddress: ``,
            paymentAddress: (params.dapp.action as any)?.paymentAddress,
            networkName: dappState.chain?.chainName || '',
          },
        ]);
        setIsShowTopup(true);
        break;
      case DappType.white_paper:
        setIsShowPreview(true);
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
      <WhitePaperModal
        show={isShowPreview}
        onClose={() => {
          setIsShowPreview(false);
        }}
      />
    </>
  );
};

export default BottomButton;
