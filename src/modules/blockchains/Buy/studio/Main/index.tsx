import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import { TABS } from '@/modules/blockchains/Buy/constants';
import SidebarV2 from '@/modules/blockchains/Buy/components3/SideBarV2';
import StudioControls from '@/modules/blockchains/Buy/studio/Controls';
import OverlayControl from '@/modules/blockchains/Buy/studio/OverlayControl';
import DragMask from '@/modules/blockchains/Buy/component4/DragMask';
import WorkArea from '@/modules/blockchains/Buy/studio/WorkArea';
import ExplorePage from '@/modules/blockchains/Buy/Explore';
import React from 'react';
import VideoEducation from '@/modules/blockchains/Buy/studio/VideoEducation';
import ErrorMessage from '@/modules/blockchains/Buy/studio/ErrorMessage';

const StudioMain = () => {
  return
  <>
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.left}>
          <div className={s.top_left}>
            <div
              className={`${s.top_left_filter} ${isTabCode && s.active}`}
              onClick={() => setTabActive(TABS.CODE)}
            >
              <p>Studio</p>
            </div>
            <div
              className={`${s.top_left_filter} ${!isTabCode && s.active}`}
              onClick={() => setTabActive(TABS.EXPLORE)}
            >
              <p>Rollups</p>
            </div>
          </div>

          {isTabCode && (
            <div className={s.left_box}>
              <div className={s.left_box_inner}>
                <div className={s.left_box_inner_sidebar}>
                  <SidebarV2 items={data} />
                </div>
                <StudioControls />
              </div>
            </div>
          )}
        </div>
        {isTabCode && (
          <>
            <OverlayControl />
            <DragMask />
            <WorkArea />
          </>
        )}
      </div>
      {!isTabCode && <ExplorePage cloneItemCallback={cloneItemCallback} />}
    </div>
    {isTabCode && (<>
      <VideoEducation />
      <ErrorMessage />
    </>)}
  </>
    ;
};

export default React.memo(StudioMain);
