import { DragOverlay } from '@dnd-kit/core';
import { useSignalEffect } from '@preact/signals-react';
import React from 'react';

import { blockDraggingSignal } from '../../signals/useDragSignal';
import useDappsStore from '../../stores/useDappStore';
import Draggable from '../Draggable';
import Label from '../Label';
import Lego from '../Lego';

const DragMask = () => {
  const dapps = useDappsStore((state) => state.dapps);
  const currentIndexDapp = useDappsStore((state) => state.currentIndexDapp);

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
