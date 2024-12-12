import { Flex, Text, Tooltip } from '@chakra-ui/react';
import AppInput from '../../../component_v5/AppInput';
import InforIcon from '../../../component_v5/icons/InforIcon';
import { useMissionStore } from './useMissionStore';

type Props = {};

export const ModelView = (props: Props) => {
  const { model, setModel, stepper } = useMissionStore();

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
        {'Model'}
      </Text>
      <Tooltip
        label="Model name ....."
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
        value={model}
        placeholder="e.g..."
        minW={'300px'}
        onChange={(e: any) => {
          let inputValue = e.target.value;
          setModel(inputValue);
        }}
      ></AppInput>
    </Flex>
  );
};
