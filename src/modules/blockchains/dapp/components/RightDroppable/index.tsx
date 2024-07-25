import React from 'react';
import { useSignalEffect } from '@preact/signals-react';

import Droppable from '../Droppable';
import Draggable from '../Draggable';
import Lego from '../Lego';
import LegoParent from '../LegoParent';
import Input from '../Input';
import Dropdown from '../Dropdown';
import ExtendsInput from '../ExtendsInput';
import Button from '../Button';
import Label from '../Label';
import { FieldKeyPrefix } from '../../contants';
import { FieldOption } from '../../types';
import {
  adjustBrightness,
  cloneDeep,
  DragUtil,
  isTwoObjectEqual,
} from '../../utils';
import useDappsStore, { subScribeDropEnd } from '../../stores/useDappStore';
import {
  draggedIds2DSignal,
  draggedIdsSignal,
} from '../../signals/useDragSignal';
import {
  formDappDropdownSignal,
  formDappInputSignal,
  formDappToggleSignal,
} from '../../signals/useFormDappsSignal';

import styles from './styles.module.scss';

const RightDroppable = () => {
  const { dapps, currentIndexDapp } = useDappsStore();
  const refContainer = React.useRef<HTMLDivElement>(null);
  const refWrap = React.useRef<HTMLDivElement>(null);

  const [draggedIds2D, setDraggedIds2D] = React.useState<
    typeof draggedIds2DSignal.value
  >([]);

  const thisDapp = React.useMemo(() => {

    console.log('_____dsds', dapps[currentIndexDapp]);
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);

  const mainColor = React.useMemo(
    () => adjustBrightness(thisDapp?.color || '#F76649', -10),
    [thisDapp],
  );

  const handleReset = () => {
    formDappInputSignal.value = {};
    formDappDropdownSignal.value = {};
    formDappToggleSignal.value = {};
    draggedIds2DSignal.value = [];
  };

  const blockFieldMapping = React.useMemo(() => {
    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.blockFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const singleFieldMapping = React.useMemo(() => {
    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.singleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const moduleFieldMapping = React.useMemo(() => {
    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.moduleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const getInput = React.useCallback(
    (field: FieldModel, fieldOpt: FieldOption) => {
      if (field.type === 'input') {
        return (
          <Lego
            background={adjustBrightness(mainColor, -20)}
            first={false}
            last={false}
            titleInLeft={true}
            titleInRight={false}
            {...field}
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
    console.log(
      '🚀 -> file: index.tsx:155 -> useSignalEffect -> draggedIds2DSignal.value ::',
      draggedIds2DSignal.value,
    );

    if (draggedIds2DSignal.value.length === draggedIds2D.length) {
      for (let i = 0; i < draggedIds2DSignal.value.length; i++) {
        if (!isTwoObjectEqual(draggedIds2DSignal.value[i], draggedIds2D[i])) {
          setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
          break;
        }

        for (let j = 0; j < draggedIds2DSignal.value[i].length; j++) {
          if (
            !isTwoObjectEqual(
              draggedIds2DSignal.value[i][j],
              draggedIds2D[i][j],
            )
          ) {
            setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
            break;
          }
        }
      }
    } else {
      setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
    }
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
              let blockCount = 0;

              return (
                <Draggable
                  id={`right-${FieldKeyPrefix.BASE}-${baseIndex}`}
                  key={baseIndex}
                  value={{
                    title: thisDapp.baseBlock.title,
                    icon: thisDapp.baseBlock.icon,
                  }}
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
                          const thisBlock =
                            blockFieldMapping[
                              DragUtil.getOriginalKey(item.name)
                            ];

                          blockCount++;

                          return (
                            <Draggable
                              id={`${item.name}-${blockIndex}-${baseIndex}`}
                              key={`${item.name}-${blockIndex}-${baseIndex}`}
                              value={{
                                title: thisBlock.title + ' #' + blockCount,
                                icon: thisBlock.icon,
                              }}
                            >
                              <LegoParent
                                {...thisBlock}
                                title={thisBlock.title + ' #' + blockCount}
                                background={adjustBrightness(mainColor, -10)}
                                smallMarginHeaderTop
                              >
                                {thisBlock.fields.map((field) => {
                                  return getInput(field, {
                                    inBaseField: false,
                                    inBlockField: true,
                                    inSingleField: false,
                                    index: blockIndex,
                                    level: 0,
                                    blockKey: thisBlock.key,
                                    baseIndex,
                                  });
                                })}
                              </LegoParent>
                            </Draggable>
                          );
                        } else if (DragUtil.idDraggingIsASingle(item.name)) {
                          const field =
                            singleFieldMapping[
                              DragUtil.getOriginalKey(item.name)
                            ];
                          // const fieldIsModuleType = field.fields.every(
                          //   (f) => f.type === 'module',
                          // );
                          // const canPlaceMoreField = field.placableAmount === -1; // Multi

                          // if (!fieldIsModuleType) {
                          //   return (
                          //     <Draggable
                          //       id={`${item.name}-${blockIndex}-${baseIndex}`}
                          //       key={`${item.name}-${blockIndex}-${baseIndex}`}
                          //       value={{
                          //         title:
                          //           singleFieldMapping[
                          //             DragUtil.getOriginalKey(item.name)
                          //           ].title,
                          //         icon: singleFieldMapping[
                          //           DragUtil.getOriginalKey(item.name)
                          //         ].icon,
                          //       }}
                          //     >
                          //       {getInput(
                          //         singleFieldMapping[
                          //           DragUtil.getOriginalKey(item.name)
                          //         ].fields[0],
                          //         {
                          //           inBaseField: false,
                          //           inBlockField: false,
                          //           inSingleField: true,
                          //           index: blockIndex,
                          //           level: 0,
                          //           blockKey: '',
                          //           baseIndex,
                          //         },
                          //       )}
                          //     </Draggable>
                          //   );
                          // }

                          // if (canPlaceMoreField) {
                          //   return (
                          //     <Draggable
                          //       id={`${item.name}-${blockIndex}-${baseIndex}`}
                          //       key={`${item.name}-${blockIndex}-${baseIndex}`}
                          //       value={{
                          //         title: field.title,
                          //         icon: field.icon,
                          //       }}
                          //     >
                          //       <LegoParent
                          //         {...field}
                          //         smallMarginHeaderTop
                          //         background={adjustBrightness(mainColor, -20)}
                          //       >
                          //         {(item.value as unknown as []).map(
                          //           (value) => {
                          //             const thisModule = field.fields.find(
                          //               (f) => f.value === value,
                          //             );

                          //             if (!thisModule) return null;

                          //             return (
                          //               <Lego
                          //                 key={value}
                          //                 background={adjustBrightness(
                          //                   mainColor,
                          //                   -40,
                          //                 )}
                          //                 first={false}
                          //                 last={false}
                          //                 titleInLeft={true}
                          //                 titleInRight={false}
                          //               >
                          //                 <Label {...thisModule} />
                          //               </Lego>
                          //             );
                          //           },
                          //         )}
                          //       </LegoParent>
                          //     </Draggable>
                          //   );
                          // }

                          const thisModule = field.fields.find(
                            (f) => f.value === item.value,
                          );

                          if (!thisModule) return null;

                          return (
                            <Draggable
                              id={`${item.name}-${blockIndex}-${baseIndex}`}
                              key={`${item.name}-${blockIndex}-${baseIndex}`}
                              value={{
                                title: thisModule.title,
                                icon: thisModule.icon,
                              }}
                            >
                              <Lego
                                background={adjustBrightness(mainColor, -20)}
                                first={false}
                                last={false}
                                titleInLeft={true}
                                titleInRight={false}
                              >
                                <Label {...thisModule} />
                              </Lego>
                            </Draggable>
                          );
                        } else if (DragUtil.idDraggingIsAModule(item.name)) {
                          const thisModule =
                            moduleFieldMapping[
                              DragUtil.getOriginalKey(item.name)
                            ];
                          const isMultiple = thisModule.placableAmount === -1;

                          if (isMultiple) {
                            return (
                              <Draggable
                                id={`${item.name}-${blockIndex}-${baseIndex}`}
                                key={`${item.name}-${blockIndex}-${baseIndex}`}
                                value={{
                                  title: thisModule.title,
                                  icon: thisModule.icon,
                                }}
                              >
                                <LegoParent
                                  {...thisModule}
                                  background={adjustBrightness(mainColor, -20)}
                                  smallMarginHeaderTop
                                >
                                  {(item.value as string[]).map(
                                    (value, index) => {
                                      const thisField = thisModule.fields.find(
                                        (f) => f.value === value,
                                      );

                                      if (!thisField) return null;

                                      return (
                                        <Lego
                                          key={value}
                                          background={adjustBrightness(
                                            mainColor,
                                            -40,
                                          )}
                                          first={false}
                                          last={false}
                                          titleInLeft={true}
                                          titleInRight={false}
                                        >
                                          <Label {...thisField} />
                                        </Lego>
                                      );
                                    },
                                  )}
                                </LegoParent>
                              </Draggable>
                            );
                          } else {
                            const thisField = thisModule.fields.find(
                              (f) => f.value === item.value,
                            );

                            return (
                              <Draggable
                                id={`${item.name}-${blockIndex}-${baseIndex}`}
                                key={`${item.name}-${blockIndex}-${baseIndex}`}
                                value={{
                                  title: thisModule.title,
                                  icon: thisModule.icon,
                                }}
                              >
                                <Lego
                                  {...thisField}
                                  background={adjustBrightness(mainColor, -20)}
                                  first={false}
                                  last={false}
                                  titleInLeft={true}
                                  titleInRight={false}
                                />
                              </Draggable>
                            );
                          }
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
