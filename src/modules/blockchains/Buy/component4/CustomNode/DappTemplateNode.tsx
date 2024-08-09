import s from './styles.module.scss';
import { HandleType, Node, NodeProps, Position } from '@xyflow/react';
import React, { ReactElement } from 'react';
import cn from 'classnames';
import { OrderItem } from '@/stores/states/l2services/types';
import { useCaptureStore } from '../../stores/index_v3';
import Label from '../../components3/Label';
import {
  BlockModel,
  DappModel,
  FieldModel,
  IModelOption,
} from '@/types/customize-model';
import { memo } from 'react';
import {
  draggedDappIndexesSignal,
  Field,
} from '@/modules/blockchains/Buy/signals/useDragSignal';
import { adjustBrightness, DragUtil } from '@/modules/blockchains/Buy/utils';
import { FieldKeyPrefix } from '@/modules/blockchains/Buy/contants';
import Droppable from '@/modules/blockchains/Buy/component4/Droppable';
import Lego from '@/modules/blockchains/Buy/component4/Lego';
import useDapps from '@/modules/blockchains/Buy/hooks/useDapps';
import Draggable from '@/modules/blockchains/Buy/component4/Draggable';
import LegoParent from '@/modules/blockchains/Buy/component4/LegoParent';
import AA from '@/modules/blockchains/Buy/dapp/AA';
import DappNotification from './DappNotification';
import { useTemplateFormStore } from '../../stores/useDappStore';

enum StatusBox {
  DRAFTING = 'Drafting',
  READY = 'Ready',
  MISSING = 'Missing',
  RUNNING = 'Running',
  DOWN = 'Down',
}

export type DataNode = Node<
  {
    label: string;
    positionDot: Position;
    handleType: HandleType;
    status: StatusBox;
    sourceHandles: [];
    targetHandles: [];
    isChain: boolean;
    chain: OrderItem | null;
    dapp: DappModel | null;
    ids: Field[];
    baseIndex: number;
    // categoryOption: IModelOption;
  },
  'label'
>;

function DappTemplateNode({ data, isConnectable }: NodeProps<DataNode>) {
  const { isCapture } = useCaptureStore();
  const { templateDapps } = useTemplateFormStore();
  const { getLabelWithLego } = useDapps();

  const DappRendering = (): ReactElement => {
    const thisDapp = data.dapp;

    if (!thisDapp) return <></>;

    switch (thisDapp.key) {
      case 'account_abstraction':
        const mainColor = adjustBrightness(thisDapp.color, -10);
        return (
          <Draggable
            id={`right-${FieldKeyPrefix.BASE}-${data.baseIndex}`}
            // key={data.baseIndex}
            value={{
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
              <AA dAppData={thisDapp} />
            </Droppable>
          </Draggable>
        );

      default:
        return renderDapps();
    }
  };

  function renderDapps() {
    const thisDapp = data.dapp;

    if (!thisDapp) return <React.Fragment></React.Fragment>;

    const mainColor = adjustBrightness(thisDapp.color, -10);
    let blockCount = 0;

    const { key: baseBlockKey, ...baseBlock } = thisDapp.baseBlock;
    const totalDraggedBase = 9999;
    const totalBaseFields = baseBlock.fields.length;
    const totalBaseModuleBlock = data.ids.filter((id) => {
      return DragUtil.idDraggingIsABaseModule(id.name);
    }).length;
    const totalDragged = 9999 - totalBaseModuleBlock;
    const totalAll = totalBaseFields + totalDragged + totalBaseModuleBlock;

    return (
      <Draggable
        id={`right-${FieldKeyPrefix.BASE}-${data.baseIndex}`}
        value={{
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
                  baseModuleFieldMapping[DragUtil.getOriginalKey(item.name)];
                const thisModule = (thisBaseModule?.fields || []).find(
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
                return getLabelWithLego(
                  data.dapp!,
                  field,
                  {
                    dappIndex: data.baseIndex,
                    inBaseField: true,
                    inBlockField: false,
                    inSingleField: false,
                    index: undefined,
                    level: 0,
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
                  blockFieldMapping[DragUtil.getOriginalKey(item.name)];
                const needSuffix = thisBlock.placableAmount === -1;

                blockCount++;

                return (
                  <Draggable
                    id={`${item.name}-${itemIndex}-${data.baseIndex}`}
                    key={`${item.name}-${itemIndex}-${data.baseIndex}`}
                    value={{
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
                            return getLabelWithLego(
                              data.dapp!,
                              field,
                              {
                                dappIndex: data.baseIndex,
                                inBaseField: false,
                                inBlockField: true,
                                inSingleField: false,
                                index: itemIndex,
                                level: 0,
                                blockKey: thisBlockKey,
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
                              {getLabelWithLego(
                                data.dapp!,
                                thisChildField,
                                {
                                  dappIndex: data.baseIndex,
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
                  singleFieldMapping[DragUtil.getOriginalKey(item.name)];

                if (!field) return null;

                const thisModule = field.fields[0];

                if (!thisModule) return null;

                return (
                  <Draggable
                    id={`${item.name}-${itemIndex}-${data.baseIndex}`}
                    key={`${item.name}-${itemIndex}-${data.baseIndex}`}
                    value={{
                      title: thisModule.title,
                      icon: thisModule.icon,
                      fieldKey: thisModule.key,
                    }}
                  >
                    {getLabelWithLego(
                      data.dapp!,
                      thisModule,
                      {
                        dappIndex: data.baseIndex,
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
                  moduleFieldMapping[DragUtil.getOriginalKey(item.name)];

                if (!thisModule) return null;

                const isMultiple = thisModule.placableAmount === -1;

                if (isMultiple) {
                  return (
                    <Draggable
                      id={`${item.name}-${itemIndex}-${data.baseIndex}`}
                      key={`${item.name}-${itemIndex}-${data.baseIndex}`}
                      value={{
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

  const blockFieldMapping = React.useMemo(() => {
    const thisDapp = data.dapp;

    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.blockFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [data.dapp]);

  const singleFieldMapping = React.useMemo(() => {
    const thisDapp = data.dapp;

    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.singleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [data.dapp]);

  const moduleFieldMapping = React.useMemo(() => {
    const thisDapp = data.dapp;

    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.moduleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [data.dapp]);

  const baseModuleFieldMapping = React.useMemo(() => {
    const thisDapp = data.dapp;

    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.baseModuleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [data.dapp]);

  function renderTitleStatus(status: StatusBox) {
    switch (status) {
      case StatusBox.DOWN:
        return 'Down temporarily';
      case StatusBox.DRAFTING:
        return 'Drafting modules';
      case StatusBox.READY:
        return 'Ready to launch';
      case StatusBox.MISSING:
        return 'Missing fields';
      default:
        return 'Running';
    }
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
              className={`${s.titleTag} ${cn(s[`titleTag_${data.status}`])} ${
                isCapture ? s.label_margin : ''
              }`}
            >
              {renderTitleStatus(data.status)}
            </p>
            <div
              className={`${s.tag_dot}  ${cn(s[`tag_${data.status}`])}`}
            ></div>
          </div>
        }
      </div>
      <div className={s.inner}>
        {/* {data.categoryOption.needInstall && <DappNotification />} */}

        {data.dapp && <DappRendering />}
      </div>
    </div>
  );
}

export default memo(DappTemplateNode);
