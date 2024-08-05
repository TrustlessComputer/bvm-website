import s from './styles.module.scss';
import { Handle, HandleType, Node, NodeProps, Position } from '@xyflow/react';
import Lego from '@/modules/blockchains/dapp/components/Lego';
import Label from '@/modules/blockchains/dapp/components/Label';
import React from 'react';
import Image from 'next/image';
import LegoParent from '@/modules/blockchains/dapp/components/LegoParent';
import cn from 'classnames';
export type DataNode = Node<
  {
    label: string;
    positionDot: Position;
    handleType: HandleType;
    status: 'Drafting' | 'Ready' | 'Missing' | 'Running ' | 'Down';
    sourceHandles: [];
    targetHandles: [];
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

        {data.label === 'Blockchain' ? (
          data.legoList.map((lego, index: number) => {
            return (
              <Lego
                last={false}
                titleInLeft={true}
                titleInRight={false}
                first={false}
                background={lego.background}
                zIndex={data.legoList.length - index}
              >
                <Label icon={lego.icon} title={lego.title} />
              </Lego>
            );
          })
        ) : (
          <LegoParent
            background={data.legoParent.background}
            title={data.label}
            disabled={true}
            zIndex={data.legoList.length}
          >
            {data.legoList.map((lego, index: number) => {
              return (
                <Lego
                  last={false}
                  titleInLeft={true}
                  titleInRight={false}
                  first={false}
                  background={lego.background}
                  zIndex={data.legoList.length - index}
                >
                  <Label icon={lego.icon} title={lego.title} />
                </Lego>
              );
            })}
          </LegoParent>
        )}

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
