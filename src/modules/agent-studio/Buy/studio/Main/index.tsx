import DragMask from '@/modules/agent-studio/Buy/component4/DragMask';
import SidebarV2 from '@/modules/agent-studio/Buy/components3/SideBarV2';
import { TABS } from '@/modules/agent-studio/Buy/constants';
import ExplorePage from '@/modules/agent-studio/Buy/Explore';
import useDragStore from '@/modules/agent-studio/Buy/stores/useDragStore';
import StudioControls from '@/modules/agent-studio/Buy/studio/Controls';
import ErrorMessage from '@/modules/agent-studio/Buy/studio/ErrorMessage';
import useErrorMessageStore, {
  useErrorMessage,
} from '@/modules/agent-studio/Buy/studio/useErrorMessage';
import VideoEducation from '@/modules/agent-studio/Buy/studio/VideoEducation';
import WorkArea from '@/modules/agent-studio/Buy/studio/WorkArea';
import s from '@/modules/agent-studio/Buy/styles.module.scss';
import TemplatePage from '@/modules/agent-studio/Buy/Template';
import { useChainProvider } from '@/modules/agent-studio/detail_v4/provider/ChainProvider.hook';
import { IModelCategory } from '@/types/customize-model';
import React, { ReactElement } from 'react';
import useStudioHelper from '../../hooks/useStudioHelper';
import OverlayControl from '../OverlayControl/Index';
import useTabsStore, {
  useIsTabCode,
  useIsTabExplore,
  useIsTabTemplate,
} from '../useTabs';
import ChainInforView from './ChainInforView';

const StudioMain = (): ReactElement => {
  const { isUpdateFlow } = useChainProvider();
  const { cloneHandler } = useStudioHelper();
  const toggleErrorMessage = useErrorMessageStore(
    (state) => state.toggleErrorMessage,
  );

  const { setDraggedFields } = useDragStore();

  const isTabCode = useIsTabCode();
  const isTabExplore = useIsTabExplore();
  const isTabTemplate = useIsTabTemplate();
  const setTab = useTabsStore((state) => state.setTab);

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
