import React from 'react';
import { Button } from '@chakra-ui/react';
import s from './styles.module.scss';
import Image from 'next/image';

export default function AddBoxButton(): React.JSX.Element {
  return (
    <Button
      // isLoading={isLoading}
      className={s.button}
      type={'submit'}
      onClick={() => {
      }}
    >
      Add box
    </Button>
  )
}
