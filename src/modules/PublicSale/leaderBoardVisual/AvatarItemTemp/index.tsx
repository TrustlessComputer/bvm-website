import s from './styles.module.scss';
import React, { forwardRef, useRef } from 'react';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { PlaceImage } from '@/modules/PublicSale/leaderBoardVisual/AvatarItem';

interface IProps {
  data: ILeaderBoardPoint,
  isShowName?: boolean
  isYou?: boolean
  onCompleted?: ()=>void
}

const AvatarItemTemp = forwardRef((props: IProps, ref: any) => {
  const { data, isShowName, isYou, onCompleted, ...rest } = props;
  const refInertMoney = useRef<HTMLParagraphElement>(null);

  const renderContent = () => {
    return (
      <div className={s.avatarItem_inner}>
        <div
          className={s.avatarItem_avatar}
          // onClick={() => {
          //   window.open(`https://twitter.com/${data?.twitter_username}`);
          // }}
        >
          <PlaceImage />
        </div>
        <div className={s.meta}>
          <p className={s.price} ref={refInertMoney}>$0</p>

        </div>
      </div>
    )
  }

  return (
    <div
      className={`${s.avatarItem} ${isYou && s.isYou} ${data?.levelRender !== undefined && 'level-' + data?.levelRender} js-avatarItem`}
      ref={ref} {...rest}>
      <>{renderContent()}</>
    </div>
  );
});

export default AvatarItemTemp;
