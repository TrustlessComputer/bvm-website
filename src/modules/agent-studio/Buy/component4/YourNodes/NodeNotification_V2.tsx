import { Flex, Text } from '@chakra-ui/react';

type INodeNotification = {
  priorityText?: string;
  description?: string;

  resetButton?: React.ReactElement;
  submitButton?: React.ReactElement;
};

const NodeNotification = (props: INodeNotification) => {
  const { priorityText, description, resetButton, submitButton } = props;

  return (
    <Flex
      borderRadius={'8px'}
      p="8px"
      gap={'8px'}
      bgColor={'#EEF5FF'}
      flexDir={'column'}
    >
      <Flex align={'center'} gap={'10px'} maxW={'500px'}>
        <Text color={'#4185EC'} fontSize={'12px'} fontWeight={800} as="span">
          {priorityText || 'NEXT STEP'}
          <Text color={'#555555'} fontSize={'12px'} fontWeight={600} as="span">
            {' - '}
          </Text>
          <Text color={'#555555'} fontSize={'12px'} fontWeight={600} as="span">
            {description || 'Description here!.'}
          </Text>
        </Text>
      </Flex>
      <Flex flexDir={'row'} align={'center'} justify={'flex-end'} gap={'10px'}>
        {resetButton}
        {submitButton}
      </Flex>
    </Flex>
  );
};

export default NodeNotification;
