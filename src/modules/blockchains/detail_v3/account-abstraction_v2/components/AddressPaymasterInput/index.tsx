import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';
import { Flex, Image, Input } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import s from './styles.module.scss';

const AddressPaymasterInput = () => {
  const { aaInstalledData } = useAAModule();

  const paymasterAddress = aaInstalledData?.aaPaymasterContract || '';

  return (
    <Flex flexDir={'row'} align={'center'} gap={'10px'}>
      <Flex flexDir={'column'} justify={'center'} gap={'4px'}>
        <Flex flexDir={'row'} align={'center'} gap={'4px'}>
          <Input
            className={s.input}
            mt={'0px'}
            type="text"
            fontSize={'14px'}
            value={paymasterAddress}
            borderColor={'transparent'}
            borderWidth={'none'}
            disabled={true}
            _focus={{
              borderColor: 'transparent',
            }}
            _disabled={{
              color: '#fff',
            }}
          />
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
    </Flex>
  );
};

export default AddressPaymasterInput;
