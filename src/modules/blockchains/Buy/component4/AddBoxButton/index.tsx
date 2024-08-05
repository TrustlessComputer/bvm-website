import React from 'react';
import { Button } from '@chakra-ui/react';
import s from './styles.module.scss';
import Image from 'next/image';

export default function AddBoxButton({...props}): React.JSX.Element {


  function handleAddBox() {
    props.setNodes((prev) => [...prev, {
      id: 'dapps',
      type: 'customBox',
      data: {
        label: 'Blockchain',
        status: 'Missing',
        isChain: true,
      },
      position: { x: 100, y: 100 },
    }])
  }

  return (
    <Button
      // isLoading={isLoading}
      className={s.button}
      type={'submit'}
      onClick={() => handleAddBox()}
    >
      Add box
    </Button>
  )
}
