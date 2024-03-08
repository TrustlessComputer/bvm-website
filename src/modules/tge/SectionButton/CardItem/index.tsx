import s from './styles.module.scss'
import Fade from '@/interactive/Fade';
import { Button } from '@chakra-ui/react';
import React from 'react';

const CardItem = ({...props}) => {
  return (
    <div className={`${s.cardWrapper}`}>
        <h4 className={`${s.cardTitle}`}>
          {props.title}
        </h4>
      <p className={`${s.description}`}>
        {props.description}
      </p>
      <div className={`${s.wrapperBtn}`}>
        {
          props.buttons.map((button, index) => {
            return (
              <Button
                key={index}
                bgColor={'#00ae84'}
                color={'#fff'}
                borderRadius={0}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                px={'24px'}
                py={'10px'}
                width={'140px'}
                height={'48px'}
                fontWeight={500}
                fontSize={'16px'}
                // _hover={{
                //   bgColor: '#e5601b',
                // }}
              >
                {button.btnTitle}
              </Button>
            )
          })
        }
      </div>
    </div>
  )
}

export default CardItem;
