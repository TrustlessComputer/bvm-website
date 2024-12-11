import { StatusBox } from '@/modules/blockchains/Buy/component4/CustomNode/DappTemplateNode';
import ComputerNameInput from '@/modules/blockchains/Buy/components3/ComputerNameInput';
import ChainDraggable from '@/modules/blockchains/Buy/components3/Draggable';
import DroppableV2 from '@/modules/blockchains/Buy/components3/DroppableV2';
import LegoV3 from '@/modules/blockchains/Buy/components3/LegoV3';
import { Field } from '@/modules/blockchains/Buy/signals/useDragSignal';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { OrderItem } from '@/stores/states/l2services/types';
import { DappModel, IModelCategory } from '@/types/customize-model';
import { Handle, HandleType, Node, NodeProps, Position } from '@xyflow/react';
import cn from 'classnames';
import React, { memo } from 'react';
import Label from '../../components3/Label';
import ChainLegoParent from '../../components3/LegoParent';
import useGettingDappLego from '../../hooks/useGettingDappLego';
import useOrderFormStoreV3, { useCaptureStore } from '../../stores/index_v3';
import useDragStore from '../../stores/useDragStore';
import useModelCategoriesStore from '../../stores/useModelCategoriesStore';
import useOverlappingChainLegoStore from '../../stores/useOverlappingChainLegoStore';
import s from './styles.module.scss';

export type DataNode = Node<
  {
    label: string;
    positionDot: Position;
    handleType: HandleType;
    status: StatusBox;
    statusMessage?: string;
    sourceHandles: string[];
    targetHandles: string[];
    isChain: boolean;
    chain: OrderItem | null;
    dapp: DappModel | null;
    ids: Field[];
    baseIndex: number;
  },
  'label'
>;

function ChainNode({ data, isConnectable }: NodeProps<DataNode>) {
  useGettingDappLego();

  const { parsedCategories } = useModelCategoriesStore();
  const { draggedFields } = useDragStore();
  const { overlappingId } = useOverlappingChainLegoStore();
  const { field } = useOrderFormStoreV3();
  const { isCapture } = useCaptureStore();

  const {
    order,
    chainData,
    getBlockChainStatus,
    isUpdateFlow,
    selectedCategoryMapping,
  } = useChainProvider();
  const { statusStr, statusColorStr, borderStatusStr } = getBlockChainStatus();

  return (
    <div className={`${s.wrapperBox}`} style={{ borderColor: statusColorStr }}>
      <div className={`${s.handles} ${s.target}`}>
        {data.targetHandles?.map((handle) => (
          <Handle
            key={handle}
            id={handle}
            type="target"
            position={Position.Left}
            className={s.handleDot}
          />
        ))}
      </div>
      <div
        className={`${s.wrapperBox_top} drag-handle-area`}
        style={{
          borderColor: statusColorStr,
          backgroundColor: borderStatusStr,
        }}
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
              style={{ color: statusColorStr }}
            >
              {data.statusMessage ?? statusStr}
            </p>
            <div
              className={`${s.tag_dot}`}
              style={{ backgroundColor: statusColorStr }}
            ></div>
          </div>
        }
      </div>

      <div className={s.inner}>
        <DroppableV2
          key={draggedFields.length}
          id="final"
          className={s.finalResult}
          style={{
            width: '100% !important',
            height: '100%',
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
            const selectedCategory = selectedCategoryMapping?.[key];

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
                        labelInRight={!!item.confuseTitle || !!item.confuseIcon}
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

              const isUpdatable =
                option.key !== 'account_abstraction' && // Must be hard coded
                selectedCategory?.updatable && //
                isUpdateFlow;

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
                      updatable={isUpdatable}
                      allowShuffle
                      background={item.color}
                      label={item.confuseTitle}
                      labelInRight={!!item.confuseTitle || !!item.confuseIcon}
                      zIndex={draggedFields.length - index}
                      icon={item.confuseIcon}
                      className={
                        overlappingId === field[item.key].value
                          ? s.activeBlur
                          : ''
                      }
                    >
                      <Label icon={option.icon} title={option.title} />
                    </LegoV3>
                  </DroppableV2>
                </ChainDraggable>
              );
            });
          })}
        </DroppableV2>
      </div>
      <div className={`${s.handles} ${s.sources}`}>
        {data.sourceHandles?.map((handle, index) => (
          <Handle
            key={handle}
            id={handle}
            type="source"
            position={Position.Right}
            className={s.handleDot}
            // style={{ top: 50 * (index+1)}}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(ChainNode);
