import React from 'react';
import { useSignalEffect } from '@preact/signals-react';

import Droppable from '../Droppable';
import Draggable from '../Draggable';
import Lego from '../Lego';
import Label from '../Label';
import LegoParent from '../LegoParent';
import Input from '../Input';
import Dropdown from '../Dropdown';
import Toggle from '../Toggle';
import ExtendsInput from '../ExtendsInput';
import { FieldKeyPrefix } from '../../contants';
import { FieldOption } from '../../types';
import { adjustBrightness } from '../../utils';
import useDappsStore from '../../stores/useDappStore';
import { draggedIdsSignal } from '../../signals/useDragSignal';

import styles from './styles.module.scss';

const RightDroppable = () => {
  const { dapps } = useDappsStore();

  const [draggedIds, setDraggedIds] = React.useState<string[]>([]);

  // Fake dapps[0] is selected
  const thisDapp = React.useMemo(() => {
    return dapps[0];
  }, [dapps]);

  const mainColor = React.useMemo(
    () => adjustBrightness(thisDapp?.color || '#F76649', -10),
    [thisDapp],
  );

  const blockFieldMapping = React.useMemo(() => {
    const mapping: Record<string, DappModel['blockFields'][2]> = {};

    (thisDapp?.blockFields || []).forEach((item) => {
      mapping[`${FieldKeyPrefix.BLOCK}-${item.key}`] = item;
    });

    return mapping;
  }, [thisDapp]);

  const singleFieldMapping = React.useMemo(() => {
    const mapping: Record<string, DappModel['singleFields'][2]> = {};

    (thisDapp?.singleFields || []).forEach((item) => {
      mapping[`${FieldKeyPrefix.SINGLE}-${item.key}`] = item;
    });

    return mapping;
  }, [thisDapp]);

  const getInput = React.useCallback(
    (field: FieldModel, fieldOpt: FieldOption) => {
      if (field.type === 'input') {
        return (
          <Lego
            key={field.key}
            background={adjustBrightness(mainColor, -20)}
            first={false}
            last={false}
            title={field.title}
            titleInLeft={true}
            titleInRight={false}
          >
            <Input name={field.key} dappKey={thisDapp.key} {...fieldOpt} />
          </Lego>
        );
      } else if (field.type === 'dropdown') {
        return (
          <Lego
            key={field.key}
            background={adjustBrightness(mainColor, -20)}
            first={false}
            last={false}
            title={field.title}
            titleInLeft={true}
            titleInRight={false}
          >
            <Dropdown
              {...fieldOpt}
              keyDapp={thisDapp.key}
              name={field.key}
              options={field.options}
              background={adjustBrightness(mainColor, -40)}
            />
          </Lego>
        );
      } else if (field.type === 'extends') {
        return (
          <ExtendsInput
            {...field}
            {...fieldOpt}
            name={field.key}
            keyDapp={thisDapp.key}
            background={adjustBrightness(mainColor, -20)}
          />
        );
      }
    },
    [thisDapp],
  );

  const draggedIdsAsComponents = React.useMemo(() => {
    return draggedIds.map((id, index) => {
      const _index = --index;

      if (id.startsWith(FieldKeyPrefix.BLOCK)) {
        return (
          <Draggable id={id + '-' + _index} key={id + '-' + _index}>
            <LegoParent
              {...blockFieldMapping[id]}
              title={blockFieldMapping[id].title + ' #' + _index}
              background={adjustBrightness(mainColor, -10)}
              smallMarginHeaderTop
            >
              {blockFieldMapping[id].fields.map((field) => {
                return getInput(field, {
                  inBaseField: false,
                  inBlockField: true,
                  inSingleField: false,
                  index: _index,
                });
              })}
            </LegoParent>
          </Draggable>
        );
      } else if (id.startsWith(FieldKeyPrefix.SINGLE)) {
        return (
          <Draggable id={id + '-' + index} key={id + '-' + index}>
            {getInput(singleFieldMapping[id].fields[0], {
              inBaseField: false,
              inBlockField: false,
              inSingleField: true,
              index,
            })}
          </Draggable>
        );
      }

      return null;
    });
  }, [draggedIds]);

  useSignalEffect(() => {
    draggedIdsSignal.subscribe((value) => {
      setDraggedIds(value);
    });
  });

  if (!thisDapp) return null;

  return (
    <Droppable
      id="output"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {draggedIds.includes(FieldKeyPrefix.BASE) && (
        <LegoParent
          {...thisDapp.baseBlock}
          key={thisDapp.key}
          background={mainColor}
        >
          {thisDapp.baseBlock.fields.map((field) => {
            return getInput(field, {
              inBaseField: true,
              inBlockField: false,
              inSingleField: false,
              index: undefined,
            });
          })}

          {draggedIdsAsComponents
            .map((component) => component)
            .filter((component) => component !== null)
            .map((component) => {
              return component;
            })}
        </LegoParent>
      )}
    </Droppable>
  );
};

export default RightDroppable;
