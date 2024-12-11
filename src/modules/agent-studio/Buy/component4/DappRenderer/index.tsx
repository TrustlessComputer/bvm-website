import { DappModel, FieldModel } from '@/types/customize-model';
import { useSignalEffect } from '@preact/signals-react';
import React from 'react';
import { FieldKeyPrefix } from '../../contants';
import useDapps from '../../hooks/useDapps';
import { draggedDappIndexesSignal, Field } from '../../signals/useDragSignal';
import { adjustBrightness, DragUtil } from '../../utils';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import Label from '../Label';
import Lego from '../Lego';
import LegoParent from '../LegoParent';

type Props = {
  baseIndex: number;
  dapp: DappModel;
  ids: Field[];
};

const DappRenderer = ({ baseIndex, dapp: thisDapp, ids }: Props) => {
  const {
    dapps,
    getInputWithLego,
    blockFieldMapping,
    baseModuleFieldMapping,
    moduleFieldMapping,
    singleFieldMapping,
  } = useDapps();

  const dappIndex = React.useMemo(
    () => dapps.findIndex((dapp) => dapp.key === thisDapp.key),
    [dapps, thisDapp.key],
  );
  const mainColor = React.useMemo(
    () => adjustBrightness(thisDapp.color, -10),
    [thisDapp.color],
  );

  let blockCount = 0;
  const { key: baseBlockKey, ...baseBlock } = thisDapp.baseBlock;
  const totalBaseFields = baseBlock.fields.length;
  const totalBaseModuleBlock = ids.filter((id) => {
    return DragUtil.idDraggingIsABaseModule(id.name);
  }).length;
  const totalDragged = 9999 - totalBaseModuleBlock;
  const totalAll = totalBaseFields + totalDragged + totalBaseModuleBlock;

  if (typeof dappIndex === 'undefined') {
    return null;
  }

  return (
    <Draggable
      id={`right-${FieldKeyPrefix.BASE}-${baseIndex}`}
      value={{
        dappIndex,
        title: thisDapp.baseBlock.title,
        icon: thisDapp.baseBlock.icon,
        fieldKey: thisDapp.baseBlock.key,
        background: thisDapp.color_border || mainColor,
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
          background={thisDapp?.color_border || mainColor}
          label={thisDapp.label}
          zIndex={999 - baseIndex}
        >
          {ids
            .filter((id) => DragUtil.idDraggingIsABaseModule(id.name))
            .map((item, itemIndex) => {
              const thisBaseModule =
                baseModuleFieldMapping[dappIndex][
                  DragUtil.getOriginalKey(item.name)
                ];
              const thisModule = (thisBaseModule?.fields || []).find(
                (f: FieldModel) => f.value === item.value,
              );

              if (!thisModule) return null;

              return (
                <Lego
                  {...thisBaseModule}
                  preview={false}
                  key={item.name}
                  background={
                    thisBaseModule.background ||
                    adjustBrightness(mainColor, -20)
                  }
                  first={false}
                  last={false}
                  titleInLeft={false}
                  titleInRight={true}
                  zIndex={totalAll - itemIndex}
                >
                  <Label {...thisModule} />
                </Lego>
              );
            })}

          {thisDapp.baseBlock.fields.map(
            (field: FieldModel, fieldIndex: number) => {
              return getInputWithLego(
                thisDapp,
                {
                  ...field,

                  background:
                    field.background || adjustBrightness(mainColor, -20),
                },
                {
                  inBaseField: true,
                  inBlockField: false,
                  inSingleField: false,
                  index: undefined,
                  level: 0,
                  dappIndex,
                  blockKey: '',
                  baseIndex: baseIndex,
                },
                totalBaseFields + totalDragged - fieldIndex,
              );
            },
          )}

          {ids.map((item, itemIndex) => {
            const zIndex = totalDragged - itemIndex - 1;

            if (DragUtil.idDraggingIsABlock(item.name)) {
              const { key: thisBlockKey, ...thisBlock } =
                blockFieldMapping[dappIndex][
                  DragUtil.getOriginalKey(item.name)
                ];
              const needSuffix = thisBlock.placableAmount === -1;

              blockCount++;

              return (
                <Draggable
                  id={`${item.name}-${itemIndex}-${baseIndex}`}
                  key={`${item.name}-${itemIndex}-${baseIndex}`}
                  value={{
                    dappIndex,
                    title: thisBlock.title + ' #' + blockCount,
                    icon: thisBlock.icon,
                    fieldKey: thisBlockKey,
                    background: thisBlock.background || mainColor,
                  }}
                >
                  <Droppable id={`${item.name}-${itemIndex}-${baseIndex}`}>
                    <LegoParent
                      {...thisBlock}
                      title={
                        thisBlock.title + (needSuffix ? ' #' + blockCount : '')
                      }
                      background={adjustBrightness(
                        thisBlock.background || mainColor,
                        -10,
                      )}
                      smallMarginHeaderTop
                      zIndex={zIndex}
                    >
                      {thisBlock.fields.map(
                        (field: FieldModel, fieldIndex: number) => {
                          return getInputWithLego(
                            thisDapp,
                            {
                              ...field,
                              background:
                                field.background ||
                                adjustBrightness(mainColor, -20),
                            },
                            {
                              inBaseField: false,
                              inBlockField: true,
                              inSingleField: false,
                              index: itemIndex,
                              level: 0,
                              blockKey: thisBlockKey,
                              dappIndex,
                              baseIndex: baseIndex,
                            },
                            thisBlock.fields.length +
                              item.children.length -
                              fieldIndex,
                          );
                        },
                      )}

                      {item.children.map((child, childIndex) => {
                        const thisChildField = thisBlock.childrenFields?.find(
                          (f: FieldModel) => f.key === child.name,
                        );

                        if (!thisChildField) return null;

                        return (
                          <Draggable
                            id={`right-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${child.name}-${itemIndex}-${baseIndex}`}
                            key={`right-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${child.name}-${itemIndex}-${baseIndex}`}
                            value={{
                              dappIndex,
                              title: thisChildField.title,
                              icon: thisChildField.icon,
                              fieldKey: thisChildField.key,
                              background:
                                thisChildField.background || mainColor,
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
                              thisDapp,
                              {
                                ...thisChildField,
                                background:
                                  thisChildField.background ||
                                  adjustBrightness(mainColor, -40),
                              },
                              {
                                dappIndex,
                                inBaseField: false,
                                inBlockField: true,
                                inSingleField: false,
                                index: itemIndex,
                                level: 0,
                                blockKey: thisBlockKey,
                                baseIndex: baseIndex,
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
                singleFieldMapping[dappIndex][
                  DragUtil.getOriginalKey(item.name)
                ];

              if (!field) return null;

              const thisModule = field.fields[0];

              if (!thisModule) return null;

              return (
                <Draggable
                  id={`${item.name}-${itemIndex}-${baseIndex}`}
                  key={`${item.name}-${itemIndex}-${baseIndex}`}
                  value={{
                    dappIndex,
                    title: thisModule.title,
                    icon: thisModule.icon,
                    fieldKey: thisModule.key,
                  }}
                >
                  {getInputWithLego(
                    thisDapp,
                    {
                      ...thisModule,
                      background:
                        thisModule.background ||
                        adjustBrightness(mainColor, -20),
                    },
                    {
                      dappIndex,
                      inBaseField: false,
                      inBlockField: false,
                      inSingleField: true,
                      index: itemIndex,
                      level: 0,
                      blockKey: '',
                      baseIndex: baseIndex,
                    },
                    zIndex,
                  )}
                </Draggable>
              );
            } else if (DragUtil.idDraggingIsAModule(item.name)) {
              const thisModule =
                moduleFieldMapping[dappIndex][
                  DragUtil.getOriginalKey(item.name)
                ];

              if (!thisModule) return null;

              const isMultiple = thisModule.placableAmount === -1;

              if (isMultiple) {
                return (
                  <Draggable
                    id={`${item.name}-${itemIndex}-${baseIndex}`}
                    key={`${item.name}-${itemIndex}-${baseIndex}`}
                    value={{
                      dappIndex,
                      title: thisModule.title,
                      icon: thisModule.icon,
                      fieldKey: thisModule.key,
                    }}
                  >
                    <LegoParent
                      {...thisModule}
                      background={
                        thisModule.background ||
                        adjustBrightness(mainColor, -20)
                      }
                      smallMarginHeaderTop
                      zIndex={zIndex}
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
                              dappIndex,
                              title: thisValue.title,
                              icon: thisValue.icon,
                              value: thisValue.value,
                            }}
                          >
                            <Lego
                              key={value}
                              background={
                                thisValue.background ||
                                (!!thisModule.background
                                  ? adjustBrightness(thisModule.background, -20)
                                  : undefined) ||
                                adjustBrightness(mainColor, -40)
                              }
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
                      dappIndex,
                      title: thisModule.title,
                      icon: thisModule.icon,
                      fieldKey: thisModule.key,
                    }}
                  >
                    <Lego
                      {...thisModule}
                      preview={false}
                      background={
                        thisModule.background ||
                        adjustBrightness(mainColor, -20)
                      }
                      first={false}
                      last={false}
                      titleInLeft={false}
                      titleInRight={true}
                      zIndex={zIndex}
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
};

export default React.memo(DappRenderer);
