import React from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useSignalEffect } from '@preact/signals-react';

import Draggable from '../Draggable';
import Lego from '../Lego';
import Label from '../Label';
import { blockDraggingSignal } from '../../signals/useDragSignal';
import useDappsStore from '../../stores/useDappStore';

const DragMask = () => {
  const { dapps, currentIndexDapp } = useDappsStore();

  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);

  const [blockDragging, setBlockDragging] = React.useState<
    typeof blockDraggingSignal.value
  >(blockDraggingSignal.value);

  const mainColor = React.useMemo(
    () => thisDapp?.color || '#F76649',
    [thisDapp],
  );

  useSignalEffect(() => {
    blockDraggingSignal.subscribe((value) => {
      setBlockDragging(value);
    });
  });

  if (!thisDapp) return null;

  return (
    <DragOverlay>
      {blockDragging.id && (
        <Draggable id={blockDragging.id}>
          <Lego
            background={blockDragging.background || mainColor}
            first={false}
            last={false}
            titleInLeft={false}
            titleInRight={false}
          >
            <Label {...blockDragging} />
          </Lego>
        </Draggable>
      )}
    </DragOverlay>
  );
};

export default DragMask;
