import { Flex, Text, Textarea, Tooltip } from '@chakra-ui/react';
import InforIcon from '../../../component_v5/icons/InforIcon';
import { useMissionStore } from './useMissionStore';

type Props = {};

export const DescriptionView = (props: Props) => {
  const { description, setDescripiton } = useMissionStore();

  return (
    <Flex
      minW={'500px'}
      h="max-content"
      bgColor={'#C44127'}
      p="5px"
      color={'white'}
      flexDir={'column'}
      align={'flex-start'}
    >
      <Flex flexDir={'row'} align={'center'} gap="10px" p="4px">
        <Text fontSize={'18px'} fontWeight={500}>
          {'Description'}
        </Text>

        <Tooltip
          label="Description information ....."
          fontSize="12px"
          color={'#000'}
          bgColor={'#fff'}
        >
          <Flex>
            <InforIcon />
          </Flex>
        </Tooltip>
      </Flex>
      <Textarea
        value={description}
        minH="150px"
        p="8px 12px"
        borderRadius={'12px'}
        fontSize={'15px'}
        bgColor={'#fff'}
        color={'#000'}
        placeholder="e.g..."
        _placeholder={{
          color: 'grey',
        }}
        onChange={(e: any) => {
          let inputValue = e.target.value;
          setDescripiton(inputValue);
        }}
      />
    </Flex>
  );
};
