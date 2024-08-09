import s from './styles.module.scss';
import { HandleType, Node, NodeProps, Position } from '@xyflow/react';
import React from 'react';
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
import { DappModel } from '@/types/customize-model';
import { memo } from 'react';
import { Field } from '@/modules/blockchains/Buy/signals/useDragSignal';
import useFormDappToFormChain from '../../hooks/useFormDappToFormChain';
import { cloneDeep, dappKeyToChainKey } from '../../utils';

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
  const { parsedCategories, categories } = useModelCategoriesStore();
  const { draggedFields, setDraggedFields } = useDragStore();

  const { field, setField } = useOrderFormStoreV3();
  const { isCapture } = useCaptureStore();
  const { dappCount } = useFormDappToFormChain();

  const setDappLegoToChain = () => {
    const newDraggedFields = cloneDeep(draggedFields);

    for (const key in dappCount) {
      const _key = dappKeyToChainKey(key);

      for (const _field of categories || []) {
        for (const option of _field.options) {
          if (option.key === _key) {
            if (!newDraggedFields.includes(_field.key)) {
              newDraggedFields.push(_field.key);

              if (_field.multiChoice) {
                setField(
                  _field.key,
                  [...((field[_field.key].value || []) as any[]), option.key],
                  true,
                );
              } else {
                setField(_field.key, option.key, true);
              }
            } else {
              if (
                _field.multiChoice &&
                !(field[_field.key].value || ([] as any)).includes(option.key)
              ) {
                setField(
                  _field.key,
                  [...((field[_field.key].value || []) as any[]), option.key],
                  true,
                );
              }
            }
          }
        }
      }
    }

    setDraggedFields(newDraggedFields);
  };

  React.useEffect(() => {
    setDappLegoToChain();
  }, [dappCount]);

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
                      <DroppableV2 id={item.key + '-right'}>
                        <LegoV3
                          background={item.color}
                          label={item.confuseTitle}
                          labelInRight={
                            !!item.confuseTitle || !!item.confuseIcon
                          }
                          icon={item.confuseIcon}
                          zIndex={item.options.length - opIdx}
                        >
                          <Label icon={option.icon} title={option.title} />
                        </LegoV3>
                      </DroppableV2>
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
      </div>
    </div>
  );
}

export default memo(ChainNode);
