import React from 'react';
import s from './styles.module.scss'
import { Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Footer = (): React.JSX.Element => {
  const router = useRouter();

  return <div className={`${s.footer}`} style={{backgroundImage: 'url(/public-sale/bg_footer.png)'}}>
    <div className={'container'}>
      <div className={`${s.footerContent}`}>
        <Text fontSize={'40px'} fontWeight={400}>Ready to launch the next big Bitcoin L2?</Text>
        <Button
          bgColor={'#EF601B'}
          color={'#fff'}
          borderRadius={0}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          px={'41px'}
          py={'14px'}
          w={['172px']}
          h={'48px'}
          fontWeight={400}
          marginTop={'24px'}
          fontSize={'16px'}
          onClick={() => {
            router.push('/blockchains/customize');
          }}
          _hover={{
            opacity: 0.8,
          }}
        >
          Launch now
        </Button>
      </div>
    </div>
  </div>
}

export default Footer
