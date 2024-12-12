import { Flex, Select, Text, Tooltip } from '@chakra-ui/react';
import AppInput from '../../../component_v5/AppInput';
import InforIcon from '../../../component_v5/icons/InforIcon';
import { useMissionStore } from './useMissionStore';
import DropdownIcon from '../../../component_v5/icons/DropdownIcon';

const MODEL_LIST = ['Model 1', 'Model 2', 'Model 3', 'Model 4', 'Model 5'];

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

      <Select
        minW={'290px'}
        gap={'10px'}
        bg="#fff"
        borderRadius={'16px'}
        color="#000000"
        textColor={'#000'}
        h="26px"
        icon={<DropdownIcon />}
      >
        {MODEL_LIST.map((model: any) => {
          return (
            <option color="#000" value={model}>
              {model}
            </option>
          );
        })}
      </Select>

      {/* <AppInput
        flex={1}
        value={model}
        placeholder="e.g..."
        minW={'300px'}
        onChange={(e: any) => {
          let inputValue = e.target.value;
          setModel(inputValue);
        }}
      ></AppInput> */}
    </Flex>
  );
};
