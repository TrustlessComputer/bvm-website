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
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import TopWorkArea from '@/modules/blockchains/Buy/studio/TopWorkArea';
import ActionsWorkArea from '@/modules/blockchains/Buy/studio/ActionsWorkArea';
import ReactFlowRenderer from '@/modules/blockchains/Buy/studio/ReactFlowRender';
import RightContent from '@/modules/blockchains/Buy/studio/WorkArea/RightContent';

export default function WorkArea() {

  return <div className={s.right}>
    <div className={s.top_right}>
      <TopWorkArea />
    </div>
    <div className={`${s.right_box}`}>
      <RightContent />
      <ActionsWorkArea />
    </div>
  </div>;
}
