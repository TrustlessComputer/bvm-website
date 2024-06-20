import React from 'react';
import s from './styles.module.scss';
import { Button } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import Loader from '@/modules/builder-landing/Loader';

export default function Hero(): React.JSX.Element {
  return (
    <div className={s.wrapper}>
      <Loader />
      <div className={'containerV3'}>
        <div className={s.inner}>
          <Fade delay={0.1} delayEnter={0.1} from={{ y: 20 }} to={{ y: 0 }}>
            <div>
              <p className={s.label}>DaTA Availability</p>
              <p className={s.heading}>Bitcoin Celestia</p>
              <p className={s.decsription}>
                Secure and resizable compute capacity for virtually any workload
              </p>
            </div>
          </Fade>
          <Fade delay={0.3} delayEnter={0.3} from={{ y: 20 }} to={{ y: 0 }}>
            <Button
              bgColor={'#FA4E0E'}
              color={'#fff'}
              borderRadius={100}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              px={'24px'}
              py={'13px'}
              fontWeight={500}
              marginTop={'24px'}
              fontSize={'14px'}
              onClick={() => {
                window.open('');
              }}
              _hover={{
                bgColor: '#e64e0e',
              }}
            >
              Connect with a BVM team member
            </Button>
          </Fade>
        </div>
      </div>
    </div>
  );
}
