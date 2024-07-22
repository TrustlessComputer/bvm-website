import React from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useSignalEffect } from '@preact/signals-react';

import Draggable from '../Draggable';
import Lego from '../Lego';
import Label from '../Label';
import { FieldKeyPrefix } from '../../contants';
import { idDraggingSignal } from '../../signals/useDragSignal';
import useDappsStore from '../../stores/useDappStore';

const DragMask = () => {
  const { dapps, currentIndexDapp } = useDappsStore();

  // Fake dapps[0] is selected
  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);

  const [idDragging, setIdDragging] = React.useState('');

  const mainColor = React.useMemo(
    () => thisDapp?.color || '#F76649',
    [thisDapp],
  );

  const blockFieldComponentMapping = React.useMemo(() => {
    const mapping: Record<string, React.ReactNode> = {};

    (thisDapp?.blockFields || []).forEach((item) => {
      mapping[`${FieldKeyPrefix.BLOCK}-${item.key}`] = (
        <Draggable
          id={`${FieldKeyPrefix.BLOCK}-${item.key}`}
          key={`${FieldKeyPrefix.BLOCK}-${item.key}`}
        >
          <Lego
            background={mainColor}
            first={false}
            last={false}
            titleInLeft={false}
            titleInRight={false}
          >
            <Label title={item.title} />
          </Lego>
        </Draggable>
      );
    });

    return mapping;
  }, [thisDapp]);

  const singleFieldComponentMapping = React.useMemo(() => {
    const mapping: Record<string, React.ReactNode> = {};

    (thisDapp?.singleFields || []).forEach((item) => {
      mapping[`${FieldKeyPrefix.SINGLE}-${item.key}`] = (
        <Draggable
          id={`${FieldKeyPrefix.SINGLE}-${item.key}`}
          key={`${FieldKeyPrefix.SINGLE}-${item.key}`}
        >
          <Lego
            background={mainColor}
            first={false}
            last={false}
            titleInLeft={false}
            titleInRight={false}
          >
            <Label title={item.title} />
          </Lego>
        </Draggable>
      );
    });

    return mapping;
  }, [thisDapp]);

  // base-<key>-<level>
  // block-<key>-<level>-<index>-<blockKey>
  // single-<key>-<level>-<index>
  // level: 0 -> n
  // index: 0 -> n
  // If level greater than 0, it's in the 'extends' field
  useSignalEffect(() => {
    idDraggingSignal.subscribe((value) => {
      setIdDragging(value);
    });
  });

  if (!thisDapp) return null;

  return (
    <DragOverlay>
      {idDragging === FieldKeyPrefix.BASE && (
        <Draggable id={FieldKeyPrefix.BASE}>
          <Lego
            background={mainColor}
            first={false}
            last={false}
            titleInLeft={false}
            titleInRight={false}
          >
            <Label title={thisDapp.baseBlock.title} />
          </Lego>
        </Draggable>
      )}

      {idDragging.startsWith(FieldKeyPrefix.BLOCK) &&
        blockFieldComponentMapping[idDragging]}

      {idDragging.startsWith(FieldKeyPrefix.SINGLE) &&
        singleFieldComponentMapping[idDragging]}
    </DragOverlay>
  );
};

export default DragMask;
