import AddressInput from '../../detail_v3/account-abstraction_v2/components/AddressInput';
import FeeRateInput from '../../detail_v3/account-abstraction_v2/components/FeeRateInput';
import { DappModel } from '@/types/customize-model';
import LegoParent from '../component4/LegoParent';
import Lego from '../component4/Lego';
import { adjustBrightness } from '../utils';

export default function AA({ dAppData }: { dAppData: DappModel }) {
  return (
    <LegoParent {...dAppData} background={dAppData.color} dapp={dAppData}>
      <Lego
        first={false}
        last={false}
        titleInLeft
        titleInRight={false}
        zIndex={1}
        background={adjustBrightness(dAppData.color, -10)}
        {...dAppData.baseBlock.fields[0]}
      >
        <AddressInput option={dAppData.baseBlock.fields[0]} />
      </Lego>
      <Lego
        first={false}
        last={false}
        titleInLeft
        titleInRight={false}
        background={adjustBrightness(dAppData.color, -10)}
        {...dAppData.baseBlock.fields[1]}
      >
        <FeeRateInput option={dAppData.baseBlock.fields[1]} />
      </Lego>
    </LegoParent>
  );
}
