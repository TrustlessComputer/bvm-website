import ActionsWorkArea from '@/modules/blockchains/Buy/studio/ActionsWorkArea';
import TopWorkArea from '@/modules/blockchains/Buy/studio/TopWorkArea';
import RightContent from '@/modules/blockchains/Buy/studio/WorkArea/RightContent';
import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import ButtonStartChat from '../ButtonStartChat';
import LoadingOverlay from './LoadingOverlay';

export default function WorkArea() {
  return (
    <div className={s.right}>
      <div className={s.top_right}>
        <TopWorkArea />
      </div>
      <div className={`${s.right_box}`}>
        <LoadingOverlay />
        <RightContent />
        <ActionsWorkArea />
        <ButtonStartChat />
      </div>
    </div>
  );
}
