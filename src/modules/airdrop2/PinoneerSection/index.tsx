import React from 'react';
import s from './PinoneerSection.module.scss';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import { Button } from '@chakra-ui/react';
import { BUILD_ON_BITCOIN_URL } from '@/constants/route-path';
import { useRouter } from 'next/navigation';

const PinoneerSection = () => {
  const router = useRouter();

  return (
    <div
      className={`${s.wrapper}`}
      style={{ backgroundImage: 'url(/public-sale/bg_footer.png)' }}
    >
      <div className={'container'}>
        <div className={`${s.footerContent}`}>
          <h2 className={s.heading}>
            <Chars>Be a pioneer builder to shape the future of Bitcoin</Chars>
          </h2>
          <Fade className={s.btn}>
            <Button
              bgColor={'#EF601B'}
              color={'#fff'}
              borderRadius={0}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              px={{ base: '20px', md: '28px' }}
              h={{ base: '40px', md: '48px' }}
              fontWeight={400}
              marginTop={'24px'}
              fontSize={{ base: '14px', md: '16px' }}
              onClick={() => {
                // scrollTo();
                router.push(BUILD_ON_BITCOIN_URL);
              }}
              _hover={{
                opacity: 0.8,
              }}
            >
              Bitcoin L2 Builder Program
            </Button>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default PinoneerSection;
