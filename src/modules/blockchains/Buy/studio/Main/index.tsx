import DragMask from '@/modules/blockchains/Buy/component4/DragMask';
import SidebarV2 from '@/modules/blockchains/Buy/components3/SideBarV2';
import { TABS } from '@/modules/blockchains/Buy/constants';
import ExplorePage from '@/modules/blockchains/Buy/Explore';
import useDragStore from '@/modules/blockchains/Buy/stores/useDragStore';
import StudioControls from '@/modules/blockchains/Buy/studio/Controls';
import ErrorMessage from '@/modules/blockchains/Buy/studio/ErrorMessage';
import { useErrorMessage } from '@/modules/blockchains/Buy/studio/useErrorMessage';
import { useTabs } from '@/modules/blockchains/Buy/studio/useTabs';
import VideoEducation from '@/modules/blockchains/Buy/studio/VideoEducation';
import WorkArea from '@/modules/blockchains/Buy/studio/WorkArea';
import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import { IModelCategory } from '@/types/customize-model';
import React, { ReactElement } from 'react';
import OverlayControl from '../OverlayControl/Index';

const StudioMain = (): ReactElement => {
  // const { order } = useChainProvider();

  const { toggleErrorMessage } = useErrorMessage((state) => state);
  const { tabActive, setTab } = useTabs((state) => state);
  const isTabCode = React.useMemo(() => {
    return tabActive === TABS.CODE;
  }, [tabActive]);

  const { setDraggedFields } = useDragStore();
  // const { setTemplate } = useTemplate();

  const cloneItemCallback = (template: IModelCategory[]) => {
    setTab(TABS.CODE);
    setDraggedFields([]);
    toggleErrorMessage(false);
  };

  // useEffect(() => {
  //   if (order) {
  //     setTab(TABS.CODE);
  //     setDraggedFields([]);
  //     toggleErrorMessage(false);

  //     console.log('DEBUG --- template::: ', order.selectedOptions);
  //     setTemplate(order.selectedOptions || []);
  //   }
  // }, [order]);

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.left}>
            <div className={s.top_left}>
              <div
                className={`${s.top_left_filter} ${isTabCode && s.active}`}
                onClick={() => setTab(TABS.CODE)}
              >
                <p>Studio</p>
              </div>
              <div
                className={`${s.top_left_filter} ${!isTabCode && s.active}`}
                onClick={() => setTab(TABS.EXPLORE)}
              >
                <p>Rollups</p>
              </div>
            </div>

            {isTabCode && (
              <div className={s.left_box}>
                <div className={s.left_box_inner}>
                  <div className={s.left_box_inner_sidebar}>
                    <SidebarV2 />
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
      {isTabCode && (
        <>
          <VideoEducation />
          <ErrorMessage />
        </>
      )}
    </>
  );
};

export default React.memo(StudioMain);