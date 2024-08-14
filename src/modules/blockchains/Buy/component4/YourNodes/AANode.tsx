import React from 'react';

import AddressInput from '@/modules/blockchains/detail_v3/account-abstraction_v2/components/AddressInput';
import FeeRateInput from '@/modules/blockchains/detail_v3/account-abstraction_v2/components/FeeRateInput';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { DappNode as DappNodeProps } from '@/types/node';
import { NodeProps } from '@xyflow/react';
import { adjustBrightness } from '../../utils';
import Lego from '../Lego';
import LegoParent from '../LegoParent';
import Node from '../Node/Node';

const AANode = ({ data }: NodeProps<DappNodeProps>) => {
  const { dapp } = data;

  const { getAAStatus, isUpdateFlow } = useChainProvider();
  const aaStatusData = getAAStatus();

  return (
    <Node
      // overlay={{
      // }}
      heading={{
        title: data.title,
        status: {
          message: data.statusMessage ?? 'Drafting modules',
        },
      }}
      // notification={{
      // }}
      content={{
        children: (
          <LegoParent {...dapp} background={dapp.color} dapp={dapp}>
            <Lego
              first={false}
              last={false}
              titleInLeft
              titleInRight={false}
              zIndex={1}
              background={adjustBrightness(dapp.color, -10)}
              {...dapp.baseBlock.fields[0]}
            >
              <AddressInput option={dapp.baseBlock.fields[0]} />
            </Lego>
            <Lego
              first={false}
              last={false}
              titleInLeft
              titleInRight={false}
              background={adjustBrightness(dapp.color, -10)}
              {...dapp.baseBlock.fields[1]}
            >
              <FeeRateInput option={dapp.baseBlock.fields[1]} />
            </Lego>
          </LegoParent>
        ),
      }}
    />
  );
};

export default React.memo(AANode);
