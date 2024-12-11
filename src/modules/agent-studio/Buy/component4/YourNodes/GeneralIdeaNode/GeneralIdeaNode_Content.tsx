import { Flex, Text, Textarea, Tooltip } from '@chakra-ui/react';
import InforIcon from '../../../component_v5/icons/InforIcon';
import { useGeneralIdeaStore } from './useGeneralIdeaStore';

type Props = {
  title?: string;
};

export const GeneralIdeaContent = (props: Props) => {
  const { setTextArea, textArea } = useGeneralIdeaStore();
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
          {props.title || 'General idea'}
        </Text>

        <Tooltip
          label="General idea information ....."
          fontSize="md"
          color={'#000'}
          bgColor={'#fff'}
        >
          <Flex>
            <InforIcon />
          </Flex>
        </Tooltip>
      </Flex>
      <Textarea
        value={textArea}
        minH="150px"
        p="8px 12px"
        borderRadius={'12px'}
        fontSize={'15px'}
        bgColor={'#fff'}
        color={'#000'}
        placeholder="e.g YOUR TOKEN NO.1"
        _placeholder={{
          color: 'grey',
        }}
        onChange={(e: any) => {
          let inputValue = e.target.value;
          setTextArea(inputValue);
        }}
      />
    </Flex>
  );
};
