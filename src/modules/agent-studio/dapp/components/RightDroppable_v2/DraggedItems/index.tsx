import React from 'react';
import { useSignalEffect } from '@preact/signals-react';

import Droppable from '../../Droppable';
import Label from '../../Label';
import Lego from '../../Lego';
import LegoParent from '../../LegoParent';
import Draggable from '../../Draggable';
import { FieldKeyPrefix } from '../../../contants';
import {
  DragUtil,
  adjustBrightness,
  cloneDeep,
  isTwoObjectEqual,
} from '../../../utils';
import {
  draggedIds2DSignal,
  templateIds2DSignal,
} from '../../../signals/useDragSignal';

import { FieldModel } from '@/types/customize-model';
import { useThisDapp } from '../../../hooks/useThisDapp';

const DraggedItems = () => {
  const [draggedIds2D, setDraggedIds2D] = React.useState<
    typeof draggedIds2DSignal.value
  >([]);
  const [templateIdsLength, setTemplateIdsLength] = React.useState<number>(0);

  const {
    thisDapp,
    baseModuleFieldMapping,
    blockFieldMapping,
    moduleFieldMapping,
    singleFieldMapping,
    getInputWithLego,
  } = useThisDapp();

  useSignalEffect(() => {
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

    if (templateIds2DSignal.value.length !== templateIdsLength) {
      setTemplateIdsLength(templateIds2DSignal.value.length);
    }
  });

  return draggedIds2D.map((ids, baseIndex) => {
    let blockCount = 0;

    const { key: baseBlockKey, ...baseBlock } = thisDapp.baseBlock;

    return (
      <Draggable
        id={`right-${FieldKeyPrefix.BASE}-${baseIndex}`}
        key={baseIndex}
        value={{
          title: thisDapp.baseBlock.title,
          icon: thisDapp.baseBlock.icon,
          fieldKey: thisDapp.baseBlock.key,
          background: thisDapp.color_border || thisDapp.color,
        }}
      >
        <Droppable
          id={`right-${FieldKeyPrefix.BASE}-${baseIndex}`}
          style={{
            width: 'max-content',
            height: 'max-content',
          }}
        >
          <LegoParent
            {...baseBlock}
            background={thisDapp?.color_border || thisDapp.color}
            label={thisDapp.label}
            zIndex={draggedIds2D.length + templateIdsLength - baseIndex}
          >
            {ids
              .filter((id) => DragUtil.idDraggingIsABaseModule(id.name))
              .map((item, itemIndex) => {
                const thisBaseModule =
                  baseModuleFieldMapping[DragUtil.getOriginalKey(item.name)];
                const thisModule = thisBaseModule.fields.find(
                  (f: FieldModel) => f.value === item.value,
                );

                if (!thisModule) return null;

                return (
                  <Lego
                    {...thisBaseModule}
                    preview={false}
                    key={item.name}
                    background={adjustBrightness(
                      thisBaseModule.background || thisDapp.color,
                      -20,
                    )}
                    first={false}
                    last={false}
                    titleInLeft={false}
                    titleInRight={true}
                    zIndex={ids.length * 2 - itemIndex}
                  >
                    <Label {...thisModule} />
                  </Lego>
                );
              })}

            {thisDapp.baseBlock.fields.map(
              (field: FieldModel, fieldIndex: number) => {
                return getInputWithLego(
                  field,
                  {
                    inBaseField: true,
                    inBlockField: false,
                    inSingleField: false,
                    index: undefined,
                    level: 0,
                    blockKey: '',
                    baseIndex,
                  },
                  thisDapp.baseBlock.fields.length +
                    ids.length * 2 -
                    fieldIndex,
                );
              },
            )}

            {ids.map((item, itemIndex) => {
              if (DragUtil.idDraggingIsABlock(item.name)) {
                const { key: thisBlockKey, ...thisBlock } =
                  blockFieldMapping[DragUtil.getOriginalKey(item.name)];
                const needSuffix = thisBlock.placableAmount === -1;

                blockCount++;

                return (
                  <Draggable
                    id={`${item.name}-${itemIndex}-${baseIndex}`}
                    key={`${item.name}-${itemIndex}-${baseIndex}`}
                    value={{
                      title: thisBlock.title + ' #' + blockCount,
                      icon: thisBlock.icon,
                      fieldKey: thisBlockKey,
                      background: thisBlock.background || thisDapp.color,
                    }}
                  >
                    <Droppable id={`${item.name}-${itemIndex}-${baseIndex}`}>
                      <LegoParent
                        {...thisBlock}
                        title={
                          thisBlock.title +
                          (needSuffix ? ' #' + blockCount : '')
                        }
                        background={adjustBrightness(
                          thisBlock.background || thisDapp.color,
                          -10,
                        )}
                        smallMarginHeaderTop
                        zIndex={ids.length - itemIndex}
                      >
                        {thisBlock.fields.map(
                          (field: FieldModel, fieldIndex: number) => {
                            return getInputWithLego(
                              field,
                              {
                                inBaseField: false,
                                inBlockField: true,
                                inSingleField: false,
                                index: itemIndex,
                                level: 0,
                                blockKey: thisBlockKey,
                                baseIndex,
                              },
                              thisBlock.fields.length +
                                item.children.length +
                                1 -
                                fieldIndex,
                            );
                          },
                        )}

                        {item.children.map((child, childIndex) => {
                          const thisChildField = thisBlock.childrenFields?.find(
                            (f: FieldModel) =>
                              f.key === DragUtil.getOriginalKey(child.name),
                          );

                          if (!thisChildField) return null;

                          return (
                            <Draggable
                              id={`${child.name}`}
                              key={`${child.name}`}
                              value={{
                                title: thisChildField.title,
                                icon: thisChildField.icon,
                                fieldKey: thisChildField.key,
                                background:
                                  thisChildField.background || thisDapp.color,
                                blockKey: thisBlockKey,
                              }}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0px',
                                zIndex: item.children.length - childIndex,
                              }}
                            >
                              {getInputWithLego(
                                thisChildField,
                                {
                                  inBaseField: false,
                                  inBlockField: true,
                                  inSingleField: false,
                                  index: itemIndex,
                                  level: 0,
                                  blockKey: thisBlockKey,
                                  baseIndex,
                                },
                                item.children.length - childIndex,
                              )}
                            </Draggable>
                          );
                        })}
                      </LegoParent>
                    </Droppable>
                  </Draggable>
                );
              } else if (DragUtil.idDraggingIsASingle(item.name)) {
                const field =
                  singleFieldMapping[DragUtil.getOriginalKey(item.name)];

                const thisModule = field.fields[0];

                if (!thisModule) return null;

                return (
                  <Draggable
                    id={`${item.name}-${itemIndex}-${baseIndex}`}
                    key={`${item.name}-${itemIndex}-${baseIndex}`}
                    value={{
                      title: thisModule.title,
                      icon: thisModule.icon,
                      fieldKey: thisModule.key,
                    }}
                  >
                    {getInputWithLego(
                      thisModule,
                      {
                        inBaseField: false,
                        inBlockField: false,
                        inSingleField: true,
                        index: itemIndex,
                        level: 0,
                        blockKey: '',
                        baseIndex,
                      },
                      ids.length - itemIndex,
                    )}
                  </Draggable>
                );
              } else if (DragUtil.idDraggingIsAModule(item.name)) {
                const thisModule =
                  moduleFieldMapping[DragUtil.getOriginalKey(item.name)];
                const isMultiple = thisModule.placableAmount === -1;

                if (isMultiple) {
                  return (
                    <Draggable
                      id={`${item.name}-${itemIndex}-${baseIndex}`}
                      key={`${item.name}-${itemIndex}-${baseIndex}`}
                      value={{
                        title: thisModule.title,
                        icon: thisModule.icon,
                        fieldKey: thisModule.key,
                      }}
                    >
                      <LegoParent
                        {...thisModule}
                        background={adjustBrightness(thisDapp.color, -20)}
                        smallMarginHeaderTop
                        zIndex={ids.length - itemIndex}
                      >
                        {(item.value as string[]).map((value, index) => {
                          const thisValue = thisModule.fields.find(
                            (f: FieldModel) => f.value === value,
                          );

                          if (!thisValue) return null;

                          return (
                            <Draggable
                              id={`${item.name}-${itemIndex}-${baseIndex}-${value}`}
                              key={`${item.name}-${itemIndex}-${baseIndex}-${value}`}
                              value={{
                                title: thisValue.title,
                                icon: thisValue.icon,
                                value: thisValue.value,
                              }}
                            >
                              <Lego
                                key={value}
                                background={adjustBrightness(
                                  thisModule.background || thisDapp.color,
                                  -40,
                                )}
                                first={false}
                                last={false}
                                titleInLeft={true}
                                titleInRight={false}
                              >
                                <Label {...thisValue} />
                              </Lego>
                            </Draggable>
                          );
                        })}
                      </LegoParent>
                    </Draggable>
                  );
                } else {
                  const thisField = thisModule.fields.find(
                    (f: FieldModel) => f.value === item.value,
                  );

                  if (!thisField) return null;

                  return (
                    <Draggable
                      id={`${item.name}-${itemIndex}-${baseIndex}`}
                      key={`${item.name}-${itemIndex}-${baseIndex}`}
                      value={{
                        title: thisModule.title,
                        icon: thisModule.icon,
                        fieldKey: thisModule.key,
                      }}
                    >
                      <Lego
                        {...thisModule}
                        preview={false}
                        background={adjustBrightness(
                          thisModule.background || thisDapp.color,
                          -20,
                        )}
                        first={false}
                        last={false}
                        titleInLeft={false}
                        titleInRight={true}
                        zIndex={ids.length - itemIndex}
                      >
                        <Label {...thisField} />
                      </Lego>
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
  });
};

export default DraggedItems;
