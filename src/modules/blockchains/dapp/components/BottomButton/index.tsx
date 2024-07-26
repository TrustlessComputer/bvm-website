import Lego from '@/modules/blockchains/dapp/components/Lego';
import { adjustBrightness } from '@/modules/blockchains/dapp/utils';
import Button from '@/modules/blockchains/dapp/components/Button';
import React from 'react';

interface IProps {
  color: string
  dapp: DappModel
}

const BottomButton = (props: IProps) => {
  const { color, dapp } = props;

  const onActionClick = (params: { dapp: DappModel }) => {
    console.log(params.dapp?.action);
    alert("CLICK ME")
  }

  return (
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
          onActionClick({ dapp })
        }}
      >
        {dapp.action?.title || ''}
      </Button>
    </Lego>
  )
}

export default BottomButton;
