import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import ReactFlowRenderer from '@/modules/blockchains/Buy/studio/ReactFlowRender';
import DroppableMask from '@/modules/blockchains/Buy/component4/DroppableMask';
import React, { ReactElement } from 'react';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';

export default function RightContent(): ReactElement {

  const { isCapture } = useCaptureStore();
  return <div
    className={`${s.right_box_main} ${
      isCapture ? s.right_box_main_captured : ''
    }`}
    id="viewport"
  >
    <ReactFlowRenderer />
    <DroppableMask />
  </div>
}
