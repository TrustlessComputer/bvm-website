import l2ServicesAPI from '@/services/api/l2services';
import { Button, Flex } from '@chakra-ui/react';
const Page = () => {
  const currentPath = window.location.pathname;

  const pathSplit = currentPath.split('/');
  const orderId = pathSplit[pathSplit.length - 2] || '';

  console.log('AAAA orderId ', orderId);
  const removeHandler = async () => {
    try {
      l2ServicesAPI.removeOrder(orderId);
    } catch (error) {}
  };

  return (
    <Flex flex={1} align={'center'} justify={'center'}>
      <Button onClick={removeHandler} w="50px" h={'50px'}>
        Remove
      </Button>
    </Flex>
  );
};

export default Page;
