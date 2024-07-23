import React, { useRef } from 'react';
import { useSignalEffect } from '@preact/signals-react';

import Droppable from '../Droppable';
import Draggable from '../Draggable';
import Lego from '../Lego';
import LegoParent from '../LegoParent';
import Input from '../Input';
import Dropdown from '../Dropdown';
import ExtendsInput from '../ExtendsInput';
import Button from '../Button';
import { FieldKeyPrefix } from '../../contants';
import { FieldOption } from '../../types';
import { adjustBrightness, DragUtil } from '../../utils';
import useDappsStore, { subScribeDropEnd } from '../../stores/useDappStore';
import {
  draggedIds2DSignal,
  draggedIdsSignal,
} from '../../signals/useDragSignal';

import styles from './styles.module.scss';

const RightDroppable = () => {
  const { dapps, currentIndexDapp } = useDappsStore();
  const refContainer = useRef<HTMLDivElement>(null);
  const refWrap = useRef<HTMLDivElement>(null);

  const [draggedIds2D, setDraggedIds2D] = React.useState<
    typeof draggedIds2DSignal.value
  >(draggedIds2DSignal.value);

  // Fake dapps[0] is selected
  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);

  const mainColor = React.useMemo(
    () => adjustBrightness(thisDapp?.color || '#F76649', -10),
    [thisDapp],
  );

  const handleReset = () => {
    draggedIds2DSignal.value = [];
  };

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
            <Input
              {...field}
              {...fieldOpt}
              name={field.key}
              dappKey={thisDapp.key}
            />
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
              {...field}
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
      } else if (field.type === 'group') {
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {field.options.map((option) => getInput(option, fieldOpt))}
            </div>
          </Lego>
        );
      }
    },
    [thisDapp],
  );

  useSignalEffect(() => {
    draggedIds2DSignal.subscribe((value) => {
      // check length of 2 dimension array to prevent re-render
      if (value.length === draggedIds2D.length) {
        for (let i = 0; i < value.length; i++) {
          if (draggedIds2D[i] && value[i].length !== draggedIds2D[i].length) {
            setDraggedIds2D(value);
            return;
          }
        }
      } else {
        setDraggedIds2D(value);
      }
    });
  });

  useSignalEffect(() => {
    const isHad = subScribeDropEnd.value;

    setTimeout(() => {
      if (!refWrap.current || !refContainer.current) return;
      if (
        isHad &&
        refWrap.current.scrollHeight > refContainer.current.scrollHeight
      ) {
        const ouputEl = refWrap.current?.querySelector<HTMLElement>('#output');
        if (ouputEl) ouputEl.style.alignItems = 'flex-start';
      }
    }, 150);
  });

  if (!thisDapp) return null;

  return (
    <div className={styles.wrapRight} ref={refContainer}>
      <div className={styles.wrapRight_inner} ref={refWrap}>
        <Droppable
          id="output"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              transform: 'translateX(35%)',
            }}
          >
            {draggedIds2D.map((ids, baseIndex) => {
              let blockCount = 1;

              return (
                <Draggable
                  id={`right-${FieldKeyPrefix.BASE}-${baseIndex}`}
                  key={baseIndex}
                >
                  <Droppable
                    id={`right-${FieldKeyPrefix.BASE}-${baseIndex}`}
                    style={{
                      width: 'max-content',
                      height: 'max-content',
                    }}
                  >
                    <LegoParent {...thisDapp.baseBlock} background={mainColor}>
                      {thisDapp.baseBlock.fields.map((field) => {
                        return getInput(field, {
                          inBaseField: true,
                          inBlockField: false,
                          inSingleField: false,
                          index: undefined,
                          level: 0,
                          blockKey: '',
                          baseIndex,
                        });
                      })}

                      {ids.map((item, blockIndex) => {
                        if (DragUtil.idDraggingIsABlock(item.name)) {
                          return (
                            <Draggable
                              id={`${item.name}-${blockIndex}-${baseIndex}`}
                              key={`${item.name}-${blockIndex}-${baseIndex}`}
                            >
                              <LegoParent
                                {...blockFieldMapping[
                                  DragUtil.getOriginalKey(item.name)
                                ]}
                                title={
                                  blockFieldMapping[
                                    DragUtil.getOriginalKey(item.name)
                                  ].title +
                                  ' #' +
                                  blockCount++
                                }
                                background={adjustBrightness(mainColor, -10)}
                                smallMarginHeaderTop
                              >
                                {blockFieldMapping[
                                  DragUtil.getOriginalKey(item.name)
                                ].fields.map((field) => {
                                  return getInput(field, {
                                    inBaseField: false,
                                    inBlockField: true,
                                    inSingleField: false,
                                    index: blockIndex,
                                    level: 0,
                                    blockKey:
                                      blockFieldMapping[
                                        DragUtil.getOriginalKey(item.name)
                                      ].key,
                                    baseIndex,
                                  });
                                })}
                              </LegoParent>
                            </Draggable>
                          );
                        } else if (DragUtil.idDraggingIsASingle(item.name)) {
                          return (
                            <Draggable
                              id={`${item.name}-${blockIndex}-${baseIndex}`}
                              key={`${item.name}-${blockIndex}-${baseIndex}`}
                            >
                              {getInput(
                                singleFieldMapping[
                                  DragUtil.getOriginalKey(item.name)
                                ].fields[0],
                                {
                                  inBaseField: false,
                                  inBlockField: false,
                                  inSingleField: true,
                                  index: blockIndex,
                                  level: 0,
                                  blockKey: '',
                                  baseIndex,
                                },
                              )}
                            </Draggable>
                          );
                        }

                        return null;
                      })}
                    </LegoParent>
                  </Droppable>
                </Draggable>
              );
            })}
          </div>
        </Droppable>
      </div>
      <Button
        element="button"
        type="button"
        onClick={() => handleReset()}
        className={styles.resetButton}
      >
        RESET
      </Button>
    </div>
  );
};

export default RightDroppable;
