import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import { TABS } from '@/modules/blockchains/Buy/constants';
import SidebarV2 from '@/modules/blockchains/Buy/components3/SideBarV2';
import StudioControls from '@/modules/blockchains/Buy/studio/Controls';
import DragMask from '@/modules/blockchains/Buy/component4/DragMask';
import WorkArea from '@/modules/blockchains/Buy/studio/WorkArea';
import ExplorePage from '@/modules/blockchains/Buy/Explore';
import React, { ReactElement } from 'react';
import VideoEducation from '@/modules/blockchains/Buy/studio/VideoEducation';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import useDragStore from '@/modules/blockchains/Buy/stores/useDragStore';
import useTemplate from '@/modules/blockchains/Buy/hooks/useTemplate';
import ErrorMessage from '@/modules/blockchains/Buy/studio/ErrorMessage';
import { IModelCategory } from '@types/customize-model';
import OverlayControl from '@/modules/blockchains/Buy/studio/OverlayControl';
import { useTabs } from '@/modules/blockchains/Buy/studio/useTabs';
import { useErrorMessage } from '@/modules/blockchains/Buy/studio/useErrorMessage';

const StudioMain = (): ReactElement => {

  const { setTemplateDataClone } = useTemplate();
  const { isShowErrorMessage, toggleErrorMessage } = useErrorMessage(state => state);
  const { tabActive, setTab } = useTabs(state => state);
  const isTabCode = React.useMemo(() => {
    return tabActive === TABS.CODE;
  }, [tabActive]);

  const {
    parsedCategories: data,
  } = useModelCategoriesStore();
  const { setDraggedFields } = useDragStore();

  const cloneItemCallback = (template: IModelCategory[]) => {
    setTab(TABS.CODE);
    setDraggedFields([]);
    toggleErrorMessage(false);
    setTemplateDataClone(template || []);
  };

  return <>
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
    {isTabCode && (<>
      <VideoEducation />
      <ErrorMessage />
    </>)}
  </>
    ;
};

export default React.memo(StudioMain);
