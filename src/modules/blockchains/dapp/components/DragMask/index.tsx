import React from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useSignalEffect } from '@preact/signals-react';

import Draggable from '../Draggable';
import Lego from '../Lego';
import Label from '../Label';
import { FieldKeyPrefix } from '../../contants';
import { DragUtil, FormDappUtil } from '../../utils';
import {
  draggedIdsSignal,
  blockDraggingSignal,
} from '../../signals/useDragSignal';
import useDappsStore from '../../stores/useDappStore';

const DragMask = () => {
  const { dapps, currentIndexDapp } = useDappsStore();

  // Fake dapps[0] is selected
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

  const blockFieldMapping = React.useMemo(() => {
    const mapping: Record<
      string,
      {
        key: string;
        title: string;
        icon: string;
        fields: FieldModel[];
      }
    > = {};

    (thisDapp?.blockFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const singleFieldMapping = React.useMemo(() => {
    const mapping: Record<
      string,
      {
        key: string;
        title: string;
        icon: string;
        fields: FieldModel[];
      }
    > = {};

    (thisDapp?.singleFields || []).forEach((item) => {
      mapping[item.key] = item;
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
    blockDraggingSignal.subscribe((value) => {
      setBlockDragging(value);
    });
  });

  if (!thisDapp) return null;

  return (
    <DragOverlay>
      {DragUtil.idDraggingIsABase(blockDragging.id) && (
        <Draggable id={FieldKeyPrefix.BASE}>
          <Lego
            background={mainColor}
            first={false}
            last={false}
            titleInLeft={false}
            titleInRight={false}
          >
            <Label {...blockDragging} />
          </Lego>
        </Draggable>
      )}

      {DragUtil.idDraggingIsABlock(blockDragging.id) &&
        blockFieldMapping[DragUtil.getOriginalKey(blockDragging.id)] && (
          <Draggable id={blockDragging.id}>
            <Lego
              background={mainColor}
              first={false}
              last={false}
              titleInLeft={false}
              titleInRight={false}
            >
              <Label {...blockDragging} />
            </Lego>
          </Draggable>
        )}

      {DragUtil.idDraggingIsASingle(blockDragging.id) &&
        singleFieldMapping[DragUtil.getOriginalKey(blockDragging.id)] && (
          <Draggable id={blockDragging.id}>
            <Lego
              background={mainColor}
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
