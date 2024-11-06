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
import TemplatePage from '@/modules/blockchains/Buy/Template';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { IModelCategory } from '@/types/customize-model';
import React, { ReactElement } from 'react';
import OverlayControl from '../OverlayControl/Index';
import useStudioHelper from '../../hooks/useStudioHelper';
import ChainInforView from './ChainInforView';

const StudioMain = (): ReactElement => {
  const { isUpdateFlow } = useChainProvider();
  const { cloneHandler } = useStudioHelper();
  const { toggleErrorMessage } = useErrorMessage((state) => state);
  const { tabActive, setTab } = useTabs((state) => state);
  const isTabCode = React.useMemo(() => {
    return tabActive === TABS.CODE;
  }, [tabActive]);

  const isTabExplore = React.useMemo(() => {
    return tabActive === TABS.EXPLORE;
  }, [tabActive]);

  const isTabTemplate = React.useMemo(() => {
    return tabActive === TABS.TEMPLATE;
  }, [tabActive]);

  const { setDraggedFields } = useDragStore();

  const cloneItemCallback = (template: IModelCategory[]) => {
    setTab(TABS.CODE);
    setDraggedFields([]);
    toggleErrorMessage(false);

    cloneHandler(template);
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.left}>
            <div className={s.top_left}>
              {isUpdateFlow ? (
                <ChainInforView />
              ) : (
                <>
                  <div
                    className={`${s.top_left_filter} ${isTabCode && s.active}`}
                    onClick={() => setTab(TABS.CODE)}
                  >
                    <p>Studio</p>
                  </div>
                  <div
                    className={`${s.top_left_filter} ${
                      isTabExplore && s.active
                    }`}
                    onClick={() => setTab(TABS.EXPLORE)}
                  >
                    <p>Bitcoin L2s</p>
                  </div>
                </>
              )}
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
        {isTabExplore && <ExplorePage cloneItemCallback={cloneItemCallback} />}
        {isTabTemplate && <TemplatePage />}
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
