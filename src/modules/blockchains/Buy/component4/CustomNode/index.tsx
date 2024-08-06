import s from './styles.module.scss';
import { Handle, HandleType, Node, NodeProps, Position } from '@xyflow/react';
import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { OrderItem } from '@/stores/states/l2services/types';
import LegoV3 from '@/modules/blockchains/Buy/components3/LegoV3';
import ComputerNameInput from '@/modules/blockchains/Buy/components3/ComputerNameInput';
import ChainDraggable from '@/modules/blockchains/Buy/components3/Draggable';
import DroppableV2 from '@/modules/blockchains/Buy/components3/DroppableV2';
import useDragStore from '../../stores/useDragStore';
import useModelCategoriesStore from '../../stores/useModelCategoriesStore';
import useOrderFormStoreV3, { useCaptureStore } from '../../stores/index_v3';
import Label from '../../components3/Label';
import ChainLegoParent from '../../components3/LegoParent';
import { DappModel, FieldModel } from '@/types/customize-model';
import { memo } from 'react';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  Field,
} from '@/modules/blockchains/Buy/signals/useDragSignal';
import { adjustBrightness, DragUtil } from '@/modules/blockchains/Buy/utils';
import { FieldKeyPrefix } from '@/modules/blockchains/Buy/contants';
import Droppable from '@/modules/blockchains/Buy/component4/Droppable';
import Lego from '@/modules/blockchains/Buy/component4/Lego';
import useDapps from '@/modules/blockchains/Buy/hooks/useDapps';
import Draggable from '@/modules/blockchains/Buy/component4/Draggable';
import LegoParent from '@/modules/blockchains/Buy/component4/LegoParent';
import styles from '@/modules/blockchains/Buy/components3/LegoV3/styles.module.scss';

export type DataNode = Node<
  {
    label: string;
    positionDot: Position;
    handleType: HandleType;
    status: 'Drafting' | 'Ready' | 'Missing' | 'Running ' | 'Down';
    sourceHandles: [];
    targetHandles: [];
    isChain: boolean;
    chain: OrderItem | null;
    dapp: DappModel | null;
    ids: Field[];
    baseIndex: number;
  },
  'label'
>;

function CustomNode({ data, isConnectable }: NodeProps<DataNode>) {
  const { draggedFields } = useDragStore();
  const { parsedCategories } = useModelCategoriesStore();
  const { field } = useOrderFormStoreV3();
  const { isCapture } = useCaptureStore();
  const {
    dapps,
    getInputWithLego,
    blockFieldMapping,
    baseModuleFieldMapping,
    getInputWithoutLego,
    moduleFieldMapping,
    singleFieldMapping,
  } = useDapps();

  function renderDapps() {
    const dappIndex = draggedDappIndexesSignal.value[data.baseIndex];
    const thisDapp = dapps[dappIndex];
    const mainColor = adjustBrightness(thisDapp.color, -10);
    let blockCount = 0;

    const { key: baseBlockKey, ...baseBlock } = thisDapp.baseBlock;
    const totalDraggedBase = 999;
    const totalBaseFields = baseBlock.fields.length;
    const totalBaseModuleBlock = data.ids.filter((id) => {
      return DragUtil.idDraggingIsABaseModule(id.name);
    }).length;
    const totalDragged = data.ids.length - totalBaseModuleBlock;
    const totalAll = totalBaseFields + totalDragged + totalBaseModuleBlock;

    return (
      <Draggable
        id={`right-${FieldKeyPrefix.BASE}-${data.baseIndex}`}
        // key={data.baseIndex}
        value={{
          dappIndex,
          title: thisDapp.baseBlock.title,
          icon: thisDapp.baseBlock.icon,
          fieldKey: thisDapp.baseBlock.key,
          background: thisDapp.color_border || mainColor,
        }}
      >
        <Droppable
          id={`right-${FieldKeyPrefix.BASE}-${data.baseIndex}`}
          style={{
            width: 'max-content',
            height: 'max-content',
          }}
        >
          <LegoParent
            {...baseBlock}
            background={thisDapp?.color_border || mainColor}
            label={thisDapp.label}
            zIndex={999 - data.baseIndex}
          >
            {data.ids
              .filter((id) => DragUtil.idDraggingIsABaseModule(id.name))
              .map((item, itemIndex) => {
                const thisBaseModule =
                  baseModuleFieldMapping[dappIndex][
                    DragUtil.getOriginalKey(item.name)
                  ];
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
                      thisBaseModule.background || mainColor,
                      -20,
                    )}
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
                  dapps[dappIndex],
                  field,
                  {
                    inBaseField: true,
                    inBlockField: false,
                    inSingleField: false,
                    index: undefined,
                    level: 0,
                    dappIndex,
                    blockKey: '',
                    baseIndex: data.baseIndex,
                  },
                  totalBaseFields + totalDragged - fieldIndex,
                );
              },
            )}

            {data.ids.map((item, itemIndex) => {
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
                    id={`${item.name}-${itemIndex}-${data.baseIndex}`}
                    key={`${item.name}-${itemIndex}-${data.baseIndex}`}
                    value={{
                      dappIndex,
                      title: thisBlock.title + ' #' + blockCount,
                      icon: thisBlock.icon,
                      fieldKey: thisBlockKey,
                      background: thisBlock.background || mainColor,
                    }}
                  >
                    <Droppable
                      id={`${item.name}-${itemIndex}-${data.baseIndex}`}
                    >
                      <LegoParent
                        {...thisBlock}
                        title={
                          thisBlock.title +
                          (needSuffix ? ' #' + blockCount : '')
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
                              dapps[dappIndex],
                              field,
                              {
                                inBaseField: false,
                                inBlockField: true,
                                inSingleField: false,
                                index: itemIndex,
                                level: 0,
                                blockKey: thisBlockKey,
                                dappIndex,
                                baseIndex: data.baseIndex,
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
                              id={`right-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${child.name}-${itemIndex}-${data.baseIndex}`}
                              key={`right-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${child.name}-${itemIndex}-${data.baseIndex}`}
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
                                dapps[dappIndex],
                                thisChildField,
                                {
                                  dappIndex,
                                  inBaseField: false,
                                  inBlockField: true,
                                  inSingleField: false,
                                  index: itemIndex,
                                  level: 0,
                                  blockKey: thisBlockKey,
                                  baseIndex: data.baseIndex,
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

                const thisModule = field.fields[0];

                if (!thisModule) return null;

                return (
                  <Draggable
                    id={`${item.name}-${itemIndex}-${data.baseIndex}`}
                    key={`${item.name}-${itemIndex}-${data.baseIndex}`}
                    value={{
                      dappIndex,
                      title: thisModule.title,
                      icon: thisModule.icon,
                      fieldKey: thisModule.key,
                    }}
                  >
                    {getInputWithLego(
                      dapps[dappIndex],
                      thisModule,
                      {
                        dappIndex,
                        inBaseField: false,
                        inBlockField: false,
                        inSingleField: true,
                        index: itemIndex,
                        level: 0,
                        blockKey: '',
                        baseIndex: data.baseIndex,
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
                const isMultiple = thisModule.placableAmount === -1;

                if (isMultiple) {
                  return (
                    <Draggable
                      id={`${item.name}-${itemIndex}-${data.baseIndex}`}
                      key={`${item.name}-${itemIndex}-${data.baseIndex}`}
                      value={{
                        dappIndex,
                        title: thisModule.title,
                        icon: thisModule.icon,
                        fieldKey: thisModule.key,
                      }}
                    >
                      <LegoParent
                        {...thisModule}
                        background={adjustBrightness(mainColor, -20)}
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
                              id={`${item.name}-${itemIndex}-${data.baseIndex}-${value}`}
                              key={`${item.name}-${itemIndex}-${data.baseIndex}-${value}`}
                              value={{
                                dappIndex,
                                title: thisValue.title,
                                icon: thisValue.icon,
                                value: thisValue.value,
                              }}
                            >
                              <Lego
                                key={value}
                                background={adjustBrightness(
                                  thisModule.background || mainColor,
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
                      id={`${item.name}-${itemIndex}-${data.baseIndex}`}
                      key={`${item.name}-${itemIndex}-${data.baseIndex}`}
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
                        background={adjustBrightness(
                          thisModule.background || mainColor,
                          -20,
                        )}
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
  }

  return (
    <div className={`${s.wrapperBox} ${cn(s[`borderColor_${data.status}`])}`}>
      <div
        className={`${s.wrapperBox_top} drag-handle-area ${cn(
          s[`borderColor_${data.status}`],
        )}`}
      >
        <p
          className={`${s.wrapperBox_top_heading} ${
            isCapture ? s.label_margin : ''
          }`}
        >
          {data.label}
        </p>
        {
          <div className={s.tag}>
            <p
              className={`${cn(s[`titleTag_${data.status}`])} ${
                isCapture ? s.label_margin : ''
              }`}
            >
              {data.status}
            </p>
            <div
              className={`${s.tag_dot}  ${cn(s[`tag_${data.status}`])}`}
            ></div>
          </div>
        }
      </div>
      <div className={s.inner}>
        {/*<div className={`${s.handles} ${s.target}`}>*/}
        {/*   <Handle*/}
        {/*    type={'target'}*/}
        {/*    position={data.positionDot}*/}
        {/*    isConnectable={isConnectable}*/}
        {/*    className={s.handleDot}*/}
        {/*  /> */}
        {/*   {data.targetHandles.map((handle) => (*/}
        {/*    <Handle*/}
        {/*      key={handle.id}*/}
        {/*      id={handle.id}*/}
        {/*      type="target"*/}
        {/*      position={Position.Left}*/}
        {/*      className={s.handleDot}*/}
        {/*    />*/}
        {/*  ))} */}
        {/*</div>*/}

        {data.isChain && (
          <DroppableV2
            key={draggedFields.length}
            id="final"
            className={s.finalResult}
            style={{
              width: '100% !important',
              height: '100%',
              // paddingLeft: '25%',
              // paddingRight: '25%',
              // paddingBottom: '7.5%',
              // paddingTop: '7.5%',
            }}
          >
            <LegoV3
              background={'#FF3A3A'}
              label="Rollup Name"
              labelInLeft
              zIndex={45}
            >
              <ComputerNameInput />
            </LegoV3>

            {draggedFields.map((key, index) => {
              const item = parsedCategories?.find((i) => i.key === key);

              if (!item || !parsedCategories) return null;

              if (item.multiChoice) {
                if (!Array.isArray(field[item.key].value)) return;

                const childrenOptions = (field[item.key].value as
                  | string[]
                  | number[])!.map((key: string | number, opIdx: number) => {
                  const option = item.options.find((opt) => opt.key === key);

                  if (!option) return null;

                  if (item.type === 'form') {
                    return (
                      <ChainDraggable
                        key={item.key + '-' + option.key}
                        id={item.key + '-' + option.key}
                        useMask
                        isLabel={true}
                        value={{
                          isChain: true,
                          value: option.key,
                        }}
                        tooltip={option.tooltip}
                      >
                        <LegoV3
                          background={item.color}
                          zIndex={item.options.length - opIdx}
                        >
                          <div className={s.wrapInput}>
                            <span
                              className={`${s.labelInput} ${
                                isCapture ? s.label_margin : ''
                              }`}
                            >
                              {option.title}
                            </span>
                            <input
                              className={`${s.inputLabel}`}
                              name={item.key + '-' + option.key}
                              type={option.type}
                            />
                          </div>
                        </LegoV3>
                      </ChainDraggable>
                    );
                  }

                  return (
                    <ChainDraggable
                      right
                      key={item.key + '-' + option.key}
                      id={item.key + '-' + option.key}
                      useMask
                      tooltip={item.tooltip}
                      value={{
                        isChain: true,
                        value: option.key,
                      }}
                    >
                      <LegoV3
                        background={item.color}
                        label={item.confuseTitle}
                        labelInRight={!!item.confuseTitle || !!item.confuseIcon}
                        icon={item.confuseIcon}
                        zIndex={item.options.length - opIdx}
                      >
                        <Label icon={option.icon} title={option.title} />
                      </LegoV3>
                    </ChainDraggable>
                  );
                });

                return (
                  <ChainDraggable
                    key={item.key + '-parent' + '-right'}
                    id={item.key + '-parent' + '-right'}
                    useMask
                    value={{
                      isChain: true,
                    }}
                  >
                    <DroppableV2 id={item.key}>
                      <ChainLegoParent
                        parentOfNested
                        background={item.color}
                        label={item.title}
                        zIndex={draggedFields.length - index - 1}
                      >
                        {childrenOptions}
                      </ChainLegoParent>
                    </DroppableV2>
                  </ChainDraggable>
                );
              }

              return item.options.map((option, opIdx) => {
                if (option.key !== field[item.key].value) return null;

                return (
                  <ChainDraggable
                    right
                    key={item.key + '-' + option.key + '-right'}
                    id={item.key + '-' + option.key + '-right'}
                    useMask
                    tooltip={item.tooltip}
                    value={{
                      isChain: true,
                      value: option.key,
                    }}
                  >
                    <DroppableV2 id={item.key + '-right'}>
                      <LegoV3
                        background={item.color}
                        label={item.confuseTitle}
                        labelInRight={!!item.confuseTitle || !!item.confuseIcon}
                        zIndex={draggedFields.length - index}
                        icon={item.confuseIcon}
                        // className={
                        //   showShadow === field[item.key].value
                        //     ? s.activeBlur
                        //     : ''
                        // }
                      >
                        <Label icon={option.icon} title={option.title} />
                      </LegoV3>
                    </DroppableV2>
                  </ChainDraggable>
                );
              });
            })}
          </DroppableV2>
        )}

        {data.dapp && renderDapps()}

        {/*<div className={`${s.handles} ${s.sources}`}>*/}
        {/*  {data.sourceHandles.map((handle, index) => (*/}
        {/*    <Handle*/}
        {/*      key={handle.id}*/}
        {/*      id={handle.id}*/}
        {/*      type="source"*/}
        {/*      position={Position.Right}*/}
        {/*      className={s.handleDot}*/}
        {/*      // style={{ top: 50 * (index+1)}}*/}
        {/*    />*/}
        {/*  ))} */}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default memo(CustomNode);
