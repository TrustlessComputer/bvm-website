import { Flex, Tooltip, Text, Input } from '@chakra-ui/react';
import InforIcon from '../../../component_v5/icons/InforIcon';
import { useNFTStore } from './useNFTStore';
import AppInput from '../../../component_v5/AppInput';

type Props = {};

export const TokenIdView = (props: Props) => {
  const { setTokenIdStr, tokenIdStr, stepper } = useNFTStore();

  return (
    <Flex
      display={'flex'}
      h="max-content"
      w="max-content"
      bgColor={'#C44127'}
      p="5px"
      color={'white'}
      flexDir={'row'}
      align={'center'}
      gap={'5px'}
    >
      <Text fontSize={'16px'} fontWeight={500}>
        {'Token ID'}
      </Text>
      <Tooltip
        label="Token ID information ....."
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
        isDisabled={stepper === 2}
        value={tokenIdStr}
        placeholder="e.g YTKN"
        minW={'300px'}
        onChange={(e: any) => {
          let inputValue = e.target.value;
          setTokenIdStr(inputValue);
        }}
      ></AppInput>
    </Flex>
  );
};
