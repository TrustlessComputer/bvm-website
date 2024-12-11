import ActionsWorkArea from '@/modules/agent-studio/Buy/studio/ActionsWorkArea';
import TopWorkArea from '@/modules/agent-studio/Buy/studio/TopWorkArea';
import RightContent from '@/modules/agent-studio/Buy/studio/WorkArea/RightContent';
import s from '@/modules/agent-studio/Buy/styles_v6.module.scss';
import { useParams } from 'next/navigation';
import React from 'react';
import ButtonStartChat from '../ButtonStartChat';
import LoadingOverlay from './LoadingOverlay';

export default function WorkArea() {
  const params = useParams();
  const isUpdateFlow = React.useMemo(() => {
    return !!params.id;
  }, [params.id]);

  return (
    <div className={s.right}>
      <div className={s.top_right}>
        <TopWorkArea />
      </div>
      <div className={`${s.right_box}`}>
        <LoadingOverlay />
        <RightContent />
        <ActionsWorkArea />
        {!isUpdateFlow && <ButtonStartChat />}
      </div>
    </div>
  );
}
