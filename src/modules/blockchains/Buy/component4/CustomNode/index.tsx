import s from './styles.module.scss';
import { Handle, HandleType, Node, NodeProps, Position } from '@xyflow/react';
import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { OrderItem } from '@/stores/states/l2services/types';
import LegoV3 from '@/modules/blockchains/Buy/components3/LegoV3';
import ComputerNameInput from '@/modules/blockchains/Buy/components3/ComputerNameInput';
import Draggable from '@/modules/blockchains/Buy/components3/Draggable';
import DroppableV2 from '@/modules/blockchains/Buy/components3/DroppableV2';
import useDragStore from '../../stores/useDragStore';
import useModelCategoriesStore from '../../stores/useModelCategoriesStore';
import useOrderFormStoreV3 from '../../stores/index_v3';
import Label from '../../components3/Label';
import LegoParent from '../../components3/LegoParent';
import { DappModel } from '@/types/customize-model';

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
    legoParent: {
      background?: string;
    };
    legoList: {
      background?: string;
      icon?: string;
      title: string;
    }[];
  },
  'label'
>;

export default function CustomNode({
  data,
  isConnectable,
}: NodeProps<DataNode>) {
  const { draggedFields } = useDragStore();

  console.log('🚀 -> file: index.tsx:47 -> draggedFields ::', draggedFields);

  const { parsedCategories } = useModelCategoriesStore();
  const { field } = useOrderFormStoreV3();

  return (
    <div className={`${s.wrapperBox} ${cn(s[`borderColor_${data.status}`])}`}>
      <div
        className={`${s.wrapperBox_top}  ${cn(
          s[`borderColor_${data.status}`],
        )}`}
      >
        <p className={`${s.wrapperBox_top_heading}`}>{data.label}</p>
        {
          <div className={s.tag}>
            <p className={cn(s[`titleTag_${data.status}`])}>{data.status}</p>
            <div
              className={`${s.tag_dot}  ${cn(s[`tag_${data.status}`])}`}
            ></div>
          </div>
        }
      </div>
      <div className={s.inner}>
        {/*<div className={s.wrapperBox_top_left} onClick={handleOnClick}>*/}
        {/*  <p>Edit</p>*/}
        {/*  <div className={s.wrapperBox_top_left_icon}>*/}
        {/*    <Image src={'/icons/ic_edit.svg'} alt={'ic_edit'} width={16} height={16} />*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className={`${s.handles} ${s.target}`}>
          {/* <Handle*/}
          {/*  type={'target'}*/}
          {/*  position={data.positionDot}*/}
          {/*  isConnectable={isConnectable}*/}
          {/*  className={s.handleDot}*/}
          {/*/> */}
          {/* {data.targetHandles.map((handle) => (
            <Handle
              key={handle.id}
              id={handle.id}
              type="target"
              position={Position.Left}
              className={s.handleDot}
            />
          ))} */}
        </div>

        {data.isChain && (
          <DroppableV2
            key={draggedFields.length}
            id="final"
            className={s.finalResult}
            style={{
              width: '100% !important',
              height: '100%',
              paddingLeft: '25%',
              paddingRight: '25%',
              paddingBottom: '7.5%',
              paddingTop: '7.5%',
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
                      <Draggable
                        key={item.key + '-' + option.key}
                        id={item.key + '-' + option.key}
                        useMask
                        isLabel={true}
                        value={option.key}
                        tooltip={option.tooltip}
                      >
                        <LegoV3
                          background={item.color}
                          zIndex={item.options.length - opIdx}
                        >
                          <div className={s.wrapInput}>
                            <span className={s.labelInput}>{option.title}</span>
                            <input
                              className={`${s.inputLabel}`}
                              name={item.key + '-' + option.key}
                              type={option.type}
                            />
                          </div>
                        </LegoV3>
                      </Draggable>
                    );
                  }

                  return (
                    <Draggable
                      right
                      key={item.key + '-' + option.key}
                      id={item.key + '-' + option.key}
                      useMask
                      tooltip={item.tooltip}
                      value={option.key}
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
                    </Draggable>
                  );
                });

                return (
                  <Draggable
                    key={item.key + '-parent' + '-right'}
                    id={item.key + '-parent' + '-right'}
                    useMask
                  >
                    <DroppableV2 id={item.key}>
                      <LegoParent
                        parentOfNested
                        background={item.color}
                        label={item.title}
                        zIndex={draggedFields.length - index - 1}
                      >
                        {childrenOptions}
                      </LegoParent>
                    </DroppableV2>
                  </Draggable>
                );
              }

              return item.options.map((option, opIdx) => {
                if (option.key !== field[item.key].value) return null;

                return (
                  <Draggable
                    right
                    key={item.key + '-' + option.key + '-right'}
                    id={item.key + '-' + option.key + '-right'}
                    useMask
                    tooltip={item.tooltip}
                    value={option.key}
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
                  </Draggable>
                );
              });
            })}
          </DroppableV2>
        )}

        {/*{data.label === 'Blockchain' ? (*/}
        {/*  data.legoList.map((lego, index: number) => {*/}
        {/*    return (*/}
        {/*      <Lego*/}
        {/*        last={false}*/}
        {/*        titleInLeft={true}*/}
        {/*        titleInRight={false}*/}
        {/*        first={false}*/}
        {/*        background={lego.background}*/}
        {/*        zIndex={data.legoList.length - index}*/}
        {/*      >*/}
        {/*        <Label icon={lego.icon} title={lego.title} />*/}
        {/*      </Lego>*/}
        {/*    );*/}
        {/*  })*/}
        {/*) : (*/}
        {/*  <LegoParent*/}
        {/*    background={data.legoParent.background}*/}
        {/*    title={data.label}*/}
        {/*    disabled={true}*/}
        {/*    zIndex={data.legoList.length}*/}
        {/*  >*/}
        {/*    {data.legoList.map((lego, index: number) => {*/}
        {/*      return (*/}
        {/*        <Lego*/}
        {/*          last={false}*/}
        {/*          titleInLeft={true}*/}
        {/*          titleInRight={false}*/}
        {/*          first={false}*/}
        {/*          background={lego.background}*/}
        {/*          zIndex={data.legoList.length - index}*/}
        {/*        >*/}
        {/*          <Label icon={lego.icon} title={lego.title} />*/}
        {/*        </Lego>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*  </LegoParent>*/}
        {/*)}*/}

        <div className={`${s.handles} ${s.sources}`}>
          {/* {data.sourceHandles.map((handle, index) => (
            <Handle
              key={handle.id}
              id={handle.id}
              type="source"
              position={Position.Right}
              className={s.handleDot}
              // style={{ top: 50 * (index+1)}}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}
