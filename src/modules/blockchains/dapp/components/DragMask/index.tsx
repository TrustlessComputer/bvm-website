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
  idDraggingSignal,
} from '../../signals/useDragSignal';
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
    idDraggingSignal.subscribe((value) => {
      setIdDragging(value);
    });
  });

  if (!thisDapp) return null;

  return (
    <DragOverlay>
      {DragUtil.idDraggingIsABase(idDragging) && (
        <Draggable id={FieldKeyPrefix.BASE}>
          <Lego
            background={mainColor}
            first={false}
            last={false}
            titleInLeft={false}
            titleInRight={false}
          >
            <Label {...thisDapp.baseBlock} />
          </Lego>
        </Draggable>
      )}

      {DragUtil.idDraggingIsABlock(idDragging) &&
        blockFieldMapping[DragUtil.getOriginalKey(idDragging)] && (
          <Draggable id={idDragging}>
            <Lego
              background={mainColor}
              first={false}
              last={false}
              titleInLeft={false}
              titleInRight={false}
            >
              <Label
                {...blockFieldMapping[DragUtil.getOriginalKey(idDragging)]}
              />
            </Lego>
          </Draggable>
        )}

      {DragUtil.idDraggingIsASingle(idDragging) &&
        singleFieldMapping[DragUtil.getOriginalKey(idDragging)] && (
          <Draggable id={idDragging}>
            <Lego
              background={mainColor}
              first={false}
              last={false}
              titleInLeft={false}
              titleInRight={false}
            >
              <Label
                {...singleFieldMapping[DragUtil.getOriginalKey(idDragging)]}
              />
            </Lego>
          </Draggable>
        )}
    </DragOverlay>
  );
};

export default DragMask;
