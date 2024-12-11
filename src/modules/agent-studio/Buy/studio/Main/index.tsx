import DragMask from '@/modules/agent-studio/Buy/component4/DragMask';
import SidebarV2 from '@/modules/agent-studio/Buy/components3/SideBarV2';
import { TABS } from '@/modules/agent-studio/Buy/constants';
import ExplorePage from '@/modules/agent-studio/Buy/Explore';
import useDragStore from '@/modules/agent-studio/Buy/stores/useDragStore';
import StudioControls from '@/modules/agent-studio/Buy/studio/Controls';
import ErrorMessage from '@/modules/agent-studio/Buy/studio/ErrorMessage';
import { useErrorMessage } from '@/modules/agent-studio/Buy/studio/useErrorMessage';
import { useTabs } from '@/modules/agent-studio/Buy/studio/useTabs';
import VideoEducation from '@/modules/agent-studio/Buy/studio/VideoEducation';
import WorkArea from '@/modules/agent-studio/Buy/studio/WorkArea';
import s from '@/modules/agent-studio/Buy/styles_v6.module.scss';
import TemplatePage from '@/modules/agent-studio/Buy/Template';
import { useChainProvider } from '@/modules/agent-studio/detail_v4/provider/ChainProvider.hook';
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
                  {/* <div
                    className={`${s.top_left_filter} ${
                      isTabExplore && s.active
                    }`}
                    onClick={() => setTab(TABS.EXPLORE)}
                  >
                    <p>Bitcoin L2s</p>
                  </div> */}
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
