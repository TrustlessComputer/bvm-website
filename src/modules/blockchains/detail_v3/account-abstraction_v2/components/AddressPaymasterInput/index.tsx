import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';
import { Flex, Image, Input, Text } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import s from './styles.module.scss';
import { formatAddressCenter } from '@/utils/string';

const AddressPaymasterInput = () => {
  const { aaInstalledData } = useAAModule();

  const paymasterAddress = aaInstalledData?.aaPaymasterContract || '';

  return (
    <Flex flexDir={'row'} align={'center'} gap={'2px'}>
      <Flex flexDir={'row'} align={'center'} gap={'2px'} overflow={'hidden'}>
        <Text as="span">-</Text>
        <Flex
          flexDir={'row'}
          align={'center'}
          gap={'4px'}
          overflow={'hidden'}
          maxW={'200px'}
        >
          <Text
            display={'inline-block'}
            mt={'2px'}
            fontSize={'15px'}
            fontWeight={600}
            textColor={'white'}
            textOverflow={'ellipsis'}
          >
            {formatAddressCenter(paymasterAddress || '', 8) || ''}
          </Text>
        </Flex>

        <Image
          src={'/icons/ic-copy.svg'}
          w={['16px', '18px', '20px']}
          h={'auto'}
          objectFit={'contain'}
          _hover={{
            cursor: 'pointer',
            opacity: 0.8,
          }}
          onClick={() => {
            if (paymasterAddress) {
              copy(paymasterAddress);
              toast.success('Copied successully!');
            }
          }}
        />
      </Flex>
    </Flex>
  );
};

export default AddressPaymasterInput;
