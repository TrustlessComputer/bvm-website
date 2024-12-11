import { Flex, Text, Textarea, Tooltip } from '@chakra-ui/react';
import InforIcon from '../../../component_v5/icons/InforIcon';
import { useTokenModuleStore } from './useTokenModuleStore';

type Props = {};

export const PersonalityView = (props: Props) => {
  const { personalityStr, setPersonalityStr } = useTokenModuleStore();

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
          {'Personality'}
        </Text>

        <Tooltip
          label="Personality information ....."
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
        value={personalityStr}
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
          setPersonalityStr(inputValue);
        }}
      />
    </Flex>
  );
};
