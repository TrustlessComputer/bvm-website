import s from './styles.module.scss'
import { Handle, NodeProps, Position, Node, HandleType } from '@xyflow/react';
import LegoV3 from '@/modules/blockchains/Buy/components3/LegoV3';
import Label from '@/modules/blockchains/Buy/components3/Label';
import React from 'react';
import Image from 'next/image';

export type DataNode = Node<
  {
    label: string;
    handleType: HandleType;
    positionDot: Position;
    legoList: {
      background?: string;
      icon?: string;
      title: string;
    }[];
  },
  'label'
>;

export default function CustomNode({ data, isConnectable }: NodeProps<DataNode>) {

  const handleOnClick = (e: React.MouseEvent<HTMLElement> ) => {
    e.stopPropagation();
    alert('Edit');
  }

  return (
    <div className={s.wrapperBox}>
      <div className={s.wrapperBox_top}>
        <p className={s.wrapperBox_top_heading}>
          {data.label}
        </p>
        <div className={s.wrapperBox_top_left} onClick={handleOnClick}>
          <p>Edit</p>
          <div className={s.wrapperBox_top_left_icon}>
            <Image src={'/icons/ic_edit.svg'} alt={'ic_edit'} width={16} height={16}/>
          </div>
        </div>
      </div>

      <div className={s.inner}>
      <Handle
          type={data.handleType}
          position={data.positionDot}
          isConnectable={isConnectable}
          className={s.handleDot}
        />
        {data.legoList.map((lego, index: number) => {
          return (
            <LegoV3
              background={lego.background}
              zIndex={data.legoList.length - index}
              disabled={true}
            >
              <Label
                icon={lego.icon}
                title={lego.title}
              />
            </LegoV3>
          )
        })}
      </div>

    </div>
  )
}
