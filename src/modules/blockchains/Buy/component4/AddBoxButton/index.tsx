import React from 'react';
import { Button } from '@chakra-ui/react';
import s from './styles.module.scss';
import Image from 'next/image';
import {  useReactFlow, useStoreApi } from '@xyflow/react';

const OVERLAP_OFFSET = -200;
const NODE_WIDTH = 16;
const NODE_HEIGHT = 15;

export default function AddBoxButton({ ...props }): React.JSX.Element {
  const store = useStoreApi();
  const {
    height,
    width,
    transform: [transformX, transformY, zoomLevel]
  } = store.getState();

  function handleAddBox() {

    const zoomMultiplier = 1 / zoomLevel;
    const centerX = -transformX * zoomMultiplier + (width * zoomMultiplier) / 2;
    const centerY =
      -transformY * zoomMultiplier + (height * zoomMultiplier) / 2;
    const nodeWidthOffset = NODE_WIDTH / 2;
    const nodeHeightOffset = NODE_HEIGHT / 2;
    props.setNodes((prev) => [...prev, {
      id: `${Math.random()}`,
      type: 'customBox',
      dragHandle: '.drag-handle-area',
      data: {
        label: 'Blockchain',
        status: 'Missing',
        isChain: true,
      },
      position: { x: centerX - nodeWidthOffset, y: centerY - nodeHeightOffset },
    }]);

    // addNodes({
    //   id: `${Math.random()}`,
    //   type: 'customBox',
    //   dragHandle: '.drag-handle-area',
    //   data: {
    //     label: 'Blockchain',
    //     status: 'Missing',
    //     isChain: true,
    //   },
    //   position: { x: centerX - nodeWidthOffset + props.currentOverlapOffset, y: centerY - nodeHeightOffset + props.currentOverlapOffset },
    // })
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
  );
}
