import s from './styles.module.scss';
import { Handle, HandleType, Node, NodeProps, Position } from '@xyflow/react';
import React, { ReactElement, useMemo } from 'react';
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
import AA from '@/modules/blockchains/Buy/dapp/AA';

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

function ChainNode({ data, isConnectable }: NodeProps<DataNode>) {
  const { parsedCategories } = useModelCategoriesStore();
  const { draggedFields } = useDragStore();
  const { field } = useOrderFormStoreV3();
  const { isCapture } = useCaptureStore();

  // TODO: Chain form

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
                    {/* <DroppableV2 id={item.key + '-right'}> */}
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
                    {/* </DroppableV2> */}
                  </ChainDraggable>
                );
              });
            })}
          </DroppableV2>
        )}
      </div>
    </div>
  );
}

export default memo(ChainNode);
