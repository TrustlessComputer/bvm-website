import SvgInset from '@/components/SvgInset';
import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import { Button } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

const CardItem = ({ ...props }) => {
  const BtnBorder = (pr: any): ReactElement => {
    return (
      <Button
        color={'#007659'}
        borderRadius={0}
        className={s.broder}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={'8px'}
        px={'24px'}
        py={'10px'}
        width={'150px'}
        height={'48px'}
        fontWeight={500}
        fontSize={'16px'}
        opacity={pr.disable ? 0.5 : 1}
        pointerEvents={pr.disable ? 'none' : 'initial'}
        onClick={() => {
          window.open(pr.link);
        }}
        _hover={{
          bgColor: '#008665',
          color: 'white',
        }}
      >
        <SvgInset svgUrl={pr.icon} />
        {pr.btnTitle}
      </Button>
    );
  };

  const BtnRed = (pr: any): ReactElement => {
    return (
      <Button
        bgColor={'#FA4E0E'}
        color={'#fff'}
        borderRadius={0}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        px={'24px'}
        py={'10px'}
        width={'150px'}
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
        <SvgInset svgUrl={pr.icon} />
        {pr.btnTitle}
      </Button>
    );
  };

  const BtnGreen = (pr: any): ReactElement => {
    return (
      <Button
        bgColor={'#007659'}
        color={'#fff'}
        borderRadius={0}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        px={'24px'}
        py={'10px'}
        width={'150px'}
        height={'48px'}
        fontWeight={500}
        onClick={() => {
          window.open(pr.link);
        }}
        fontSize={'16px'}
        _hover={{
          bgColor: '#008263',
        }}
      >
        <SvgInset svgUrl={pr.icon} />
        {pr.btnTitle}
      </Button>
    );
  };

  return (
    <div className={`${s.cardWrapper} ${props.isRed ? s.isRed : ''}`}>
      <Fade delayEnter={0.5 + props.idx / 10}>
        <div className={s.cardWrapper_inner}>
          <h4 className={`${s.cardTitle}`}>{props.title}</h4>
          <div className={`${s.description}`}>{props.description}</div>
          <div className={`${s.wrapperBtn}`}>
            {props.buttons.map((button: any) => {
              return button.color === 'red' ? (
                <BtnRed key={button.link} {...button} />
              ) : button.color === 'green' ? (
                <BtnGreen key={button.link} {...button} />
              ) : (
                <BtnBorder key={button.link} {...button} />
              );
            })}
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default CardItem;
