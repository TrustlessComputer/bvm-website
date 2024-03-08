import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import { Button } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

const CardItem = ({ ...props }) => {


  const BtnBorder = (pr: any): ReactElement => {
    return (<Button
      color={'#009973'}
      borderRadius={0}
      className={s.broder}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      px={'24px'}
      py={'10px'}
      width={'140px'}
      height={'48px'}
      fontWeight={500}
      fontSize={'16px'}
      onClick={() => {
        window.open(pr.link);
      }}
      _hover={{
        bgColor: '#009973',
        color: 'white',
      }}
    >
      {pr.btnTitle}
    </Button>);
  };

  const BtnRed = (pr: any): ReactElement => {
    return <Button
      bgColor={'#FA4E0E'}
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
      onClick={() => {
        window.open(pr.link);
      }}
      _hover={{
        bgColor: '#e64e0e',
      }}
    >
      {pr.btnTitle}
    </Button>;
  };

  const BtnGreen = (pr: any): ReactElement => {

    return <Button
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
      onClick={() => {
        window.open(pr.link);
      }}
      fontSize={'16px'}
      _hover={{
        bgColor: '#009973',
      }}
    >
      {pr.btnTitle}
    </Button>;
  };

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
          props.buttons.map((button: any) => {
            return (
              button.color === 'red' ? <BtnRed key={button.link} {...button} /> : button.color === 'green' ? <BtnGreen key={button.link} {...button} /> :
                <BtnBorder key={button.link} {...button} />
            );
          })
        }
      </div>
    </div>
  );
};

export default CardItem;
