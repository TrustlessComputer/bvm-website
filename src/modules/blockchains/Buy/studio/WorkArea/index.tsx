import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import AddBoxButton from '@/modules/blockchains/Buy/component4/AddBoxButton';
import { formatCurrencyV2 } from '@utils/format';
import LaunchButton from '@/modules/blockchains/Buy/components3/LaunchButton';
import { ReactFlow } from '@xyflow/react';
import CustomNode from '@/modules/blockchains/Buy/component4/CustomNode';
import DroppableMask from '@/modules/blockchains/Buy/component4/DroppableMask';
import Capture from '@/modules/blockchains/Buy/Capture';
import Button from '@/modules/blockchains/dapp/components/Button';
import Image from 'next/image';
import React from 'react';

export default function WorkArea(){


  return <div>
    <div className={s.right}>
      <div className={s.top_right}>
        <AddBoxButton
          nodes={nodes}
          setNodes={setNodes}
          onNodesChange={onNodesChange}
        />

        <div className={s.right_box_footer}>
          {!needContactUs && (
            <div className={s.right_box_footer_left}>
              <h4 className={s.right_box_footer_left_content}>
                {formatCurrencyV2({
                  amount: priceBVM,
                  decimals: 0,
                })}{' '}
                BVM{'/'}month
              </h4>
              <h6 className={s.right_box_footer_left_title}>
                $
                {formatCurrencyV2({
                  amount: priceUSD,
                  decimals: 0,
                })}
                {'/'}month
              </h6>
            </div>
          )}

          <LaunchButton data={data} originalData={originalData} />
        </div>
      </div>

      <div className={`${s.right_box}`}>
        <div
          className={`${s.right_box_main} ${
            isCapture ? s.right_box_main_captured : ''
          }`}
          // className={`${s.right_box_main}`}
          id="viewport"
        >
          <ReactFlow
            nodes={nodes}
            nodeTypes={{ customBox: CustomNode }}
            onNodesChange={onNodesChange}

            // draggable={false}
            // defaultViewport={{
            //   x: 0,
            //   y: 0,
            //   zoom: 1,
            // }}
            key={nodes.length.toString()}
            fitView
            fitViewOptions={{ padding: 2 }}
            nodeOrigin={[0.5, 0]}
          />
          <DroppableMask />
        </div>

        {/*{!isCapture && (*/}
        {/*  <div className={s.cta_wrapper}>*/}
        {/*    <button*/}
        {/*      className={`${s.reset} ${s.gray}`}*/}
        {/*      onClick={() => setIsShowModal(true)}*/}
        {/*    >*/}
        {/*      <div>*/}
        {/*        RESET*/}
        {/*        <ImagePlaceholder*/}
        {/*          src={'/icons/undo.svg'}*/}
        {/*          alt={'undo'}*/}
        {/*          width={20}*/}
        {/*          height={20}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    </button>*/}
        {/*    <Capture />*/}
        {/*  </div>*/}
        {/*)}    */}
        {!isCapture && (
          <div className={s.resetButton}>
            {/*<Button element="button" type="button">*/}
            {/*  EXPORT{' '}*/}
            {/*  <Image*/}
            {/*    src="/icons/ic_image_2.svg"*/}
            {/*    alt="ic_image_2"*/}
            {/*    width={20}*/}
            {/*    height={20}*/}
            {/*  />*/}
            {/*</Button>*/}
            <Capture />
            <Button
              element="button"
              type="button"
              onClick={() => setIsShowModal(true)}
            >
              RESET{' '}
              <Image
                src="/icons/undo.svg"
                alt="undo"
                width={20}
                height={20}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  </div>
}
