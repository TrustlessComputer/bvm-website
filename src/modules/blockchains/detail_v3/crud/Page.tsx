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

  const activeHandler = async () => {
    try {
      l2ServicesAPI.activeOrder(orderId);
    } catch (error) {}
  };

  const activeAAModule = async () => {
    try {
      l2ServicesAPI.activeAA(orderId);
    } catch (error) {}
  };

  return (
    <Flex
      flex={1}
      mt={'50px'}
      flexDir={'column'}
      align={'center'}
      justify={'center'}
      gap={'20px'}
    >
      <Button onClick={removeHandler} w="50px" h={'50px'} color={'blue'}>
        Remove
      </Button>
      <Button onClick={activeHandler} w="50px" h={'50px'} color={'red'}>
        Active
      </Button>
      <Button onClick={activeAAModule} w="50px" h={'50px'} color={'green'}>
        Update AA
      </Button>
    </Flex>
  );
};

export default Page;
