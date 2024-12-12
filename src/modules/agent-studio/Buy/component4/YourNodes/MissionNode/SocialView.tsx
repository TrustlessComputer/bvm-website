import { Flex, Select, Text, Tooltip } from '@chakra-ui/react';
import { useMemo } from 'react';
import DropdownIcon from '../../../component_v5/icons/DropdownIcon';
import InforIcon from '../../../component_v5/icons/InforIcon';
import useFormChain from '../../../hooks/useFormChain';
import { useMissionStore } from './useMissionStore';

type Props = {};

export const SocialView = (props: Props) => {
  const { socialList, setSocialSelected, socialSelected } = useMissionStore();

  const { getCurrentFieldFromChain } = useFormChain();

  const socialData = getCurrentFieldFromChain('social');

  const optionList = socialData?.options || [];

  const isMultiChoice = useMemo(() => {
    return optionList && optionList.length > 1;
  }, [optionList]);

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
        {'Social'}
      </Text>
      <Tooltip
        label="Social information ....."
        fontSize="12px"
        color={'#000'}
        bgColor={'#fff'}
      >
        <Flex>
          <InforIcon />
        </Flex>
      </Tooltip>

      <Select
        minW={'140px'}
        gap={'10px'}
        bg="#fff"
        borderRadius={'16px'}
        color="#000000"
        textColor={'#000'}
        h="26px"
        icon={isMultiChoice ? <DropdownIcon /> : undefined}
      >
        {optionList.map((option: any) => {
          return (
            <option color="#000" value={option.title}>
              {option.title}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
};
