import AddressInput from '../../detail_v3/account-abstraction_v2/components/AddressInput';
import FeeRateInput from '../../detail_v3/account-abstraction_v2/components/FeeRateInput';
import { ACCOUNT_ABSTRACTION_MOCKUP_DATA } from '../../detail_v3/account-abstraction_v2/mockupData';
import LegoV3 from '../components3/LegoV3';
import Draggable from '../components3/Draggable';
import { Flex } from '@chakra-ui/react';
import { DappModel } from '@/types/customize-model';

export default function AA({ dAppData }: { dAppData: DappModel }) {
  return (
    <LegoV3 background={dAppData.color} zIndex={9999} disabled={false}>
      <Flex flexDir={'column'}>
        <AddressInput option={dAppData.baseBlock.fields[0]} />
        <FeeRateInput option={dAppData.baseBlock.fields[1]} />
      </Flex>
    </LegoV3>
  );
}
