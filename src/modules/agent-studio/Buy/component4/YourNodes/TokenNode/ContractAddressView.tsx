import { Flex, Tooltip, Text, Input } from '@chakra-ui/react';
import InforIcon from '../../../component_v5/icons/InforIcon';
import { useTokenModuleStore } from './useTokenModuleStore';
import AppInput from '../../../component_v5/AppInput';

type Props = {};

export const ContractAddressView = (props: Props) => {
  const { setContractAddressStr, contractAddressStr, stepper } =
    useTokenModuleStore();

  return (
    <Flex
      display={'flex'}
      h="max-content"
      bgColor={'#C44127'}
      p="5px"
      color={'white'}
      flexDir={'row'}
      align={'center'}
      gap={'5px'}
    >
      <Text fontSize={'16px'} fontWeight={500}>
        {'Collection'}
      </Text>
      <Tooltip
        label="Collection information ....."
        fontSize="12px"
        color={'#000'}
        bgColor={'#fff'}
      >
        <Flex>
          <InforIcon />
        </Flex>
      </Tooltip>

      <AppInput
        flex={1}
        isDisabled={stepper === 3}
        value={contractAddressStr}
        placeholder="e.g YOUR TOKEN NO.1"
        minW={'300px'}
        onChange={(e: any) => {
          let inputValue = e.target.value;
          setContractAddressStr(inputValue);
        }}
      ></AppInput>
    </Flex>
  );
};
