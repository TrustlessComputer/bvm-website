import { Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface IFormValues {
  totalSupply: string;
  receivingAddress: string;
}

interface IProps {
  title: string;
  status: 'Drafting' | 'Ready' | 'Missing' | 'Running' | 'Down' | string;
}

const RowItem = (props: IProps) => {
  const { title, status } = props;

  const statusMapper = useMemo(() => {
    let statusStr = '';
    let statusColor = 'transparent';
    let bgColor = 'transparent';
    let textColor = '#E59700';

    switch (status) {
      case 'Drafting':
        // statusStr = 'Drafting modules';
        statusStr =
          'This module needs to be configured and completed later after the chain is deployed';
        statusColor = '#FFC700';
        bgColor = '#FFF6D8';
        textColor = '#E59700';
        break;
      case 'Ready':
        statusStr = 'Ready to launch';
        statusColor = '#4185EC';
        bgColor = '#EEF5FF';
        textColor = '#4185EC';
        break;
      case 'Missing':
        statusStr = 'Missing Fields';
        statusColor = '#FF4747';
        bgColor = '#FFEEEE';
        textColor = '#FF4747';
        break;
      case 'Running':
        statusStr = 'Running';
        statusColor = '#00AA6C';
        bgColor = '#EEFFF9';
        textColor = '#00AA6C';
        break;
      case 'Down':
        statusStr = 'Down';
        statusColor = '#D9D9D9';
        bgColor = '#AAAAAA';
        textColor = '#D9D9D9';
        break;
      default:
        break;
    }
    return {
      statusStr,
      statusColor,
      bgColor,
      textColor,
    };
  }, [status]);

  return (
    <Flex
      flexDir={'row'}
      alignItems={'center'}
      justify={'space-between'}
      bgColor={statusMapper.bgColor}
      borderRadius={'8px'}
      borderWidth={'1px'}
      borderColor={statusMapper.statusColor}
      p="12px"
    >
      <Flex flex={1}>
        <Text fontSize={'14px'} fontWeight={700} color={'#555'}>
          {title}
        </Text>
      </Flex>

      <Flex
        flex={2}
        flexDir={'row'}
        alignItems={'center'}
        justify={'flex-end'}
        gap={'8px'}
      >
        <Text
          maxW={'90%'}
          fontSize={'14px'}
          fontWeight={500}
          fontStyle={'italic'}
          textAlign={'end'}
          color={statusMapper.textColor}
          wordBreak={'break-word'}
        >
          {statusMapper.statusStr}
        </Text>
        <Flex
          w={'8px'}
          h={'8px'}
          borderRadius={'100%'}
          bgColor={statusMapper.statusColor}
        ></Flex>
      </Flex>
    </Flex>
  );
};

export default RowItem;
