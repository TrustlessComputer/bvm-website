import s from './styles.module.scss';
import { Handle, HandleType, Node, NodeProps, Position } from '@xyflow/react';
import Lego from '@/modules/blockchains/dapp/components/Lego';
import Label from '@/modules/blockchains/dapp/components/Label';
import React from 'react';
import Image from 'next/image';
import LegoParent from '@/modules/blockchains/dapp/components/LegoParent';

export type DataNode = Node<
  {
    label: string;
    positionDot: Position;
    handleType: HandleType;
    isRunning: boolean;
    legoParent: {
      background?: string;
    },
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
        {
          data.isRunning ? (
            <div className={s.tag}>
              <p>Running</p>
              <div className={s.tag_dot}></div>
            </div>
          ) : (
            <div className={s.tagv2}>
              <p>Need config</p>
              <div className={s.tagv2_dot}></div>
            </div>
          )
        }
      </div>

      <div className={s.inner}>
        <div className={s.wrapperBox_top_left} onClick={handleOnClick}>
          <p>Edit</p>
          <div className={s.wrapperBox_top_left_icon}>
            <Image src={'/icons/ic_edit.svg'} alt={'ic_edit'} width={16} height={16} />
          </div>
        </div>
        <Handle
          type={data.handleType}
          position={data.positionDot}
          isConnectable={isConnectable}
          className={s.handleDot}
        />
        {/*<Handle*/}
        {/*  type="source"*/}
        {/*  position="right"*/}
        {/*  id="a"*/}
        {/*  style={{ top: 50 }}*/}
        {/*  className={s.handleDot}*/}
        {/*/>*/}

        {
          data.label === 'Blockchain' ? data.legoList.map((lego, index: number) => {
            return (


              <Lego
                last={false}
                titleInLeft={true}
                titleInRight={false}
                first={false}
                background={lego.background}
                zIndex={data.legoList.length - index}
              >
                <Label
                  icon={lego.icon}
                  title={lego.title}
                />
              </Lego>

            );
          }) : <LegoParent
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
                  <Label
                    icon={lego.icon}
                    title={lego.title}
                  />
                </Lego>

              );
            })}
          </LegoParent>
        }


      </div>

    </div>
  );
}
