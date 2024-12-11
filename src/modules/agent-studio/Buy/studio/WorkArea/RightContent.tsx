import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import ReactFlowRenderer from '@/modules/blockchains/Buy/studio/ReactFlowRender';
import DroppableMask from '@/modules/blockchains/Buy/component4/DroppableMask';
import React, { ReactElement } from 'react';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import { mouseDroppedPositionSignal } from '@/modules/blockchains/Buy/signals/useMouseDroppedPosition';
import useContainerMouse from '@/modules/blockchains/Buy/hooks/useContainerMouse';

export default function RightContent(): ReactElement {
  const flowRef = React.useRef<HTMLDivElement>(null);
  const { isCapture } = useCaptureStore();
  const { addListeners, removeListeners } = useContainerMouse({
    ref: flowRef, handleOnTick,
  });

  function handleOnTick(contentRect: DOMRect,
                        mousePosition: { x: number; y: number },
                        previousMousePosition: { x: number; y: number }) {
    if (mousePosition.x === 0 && mousePosition.y === 0) {
      mouseDroppedPositionSignal.value = {
        x: 600,
        y: 30,
      };
    } else {
      mouseDroppedPositionSignal.value = mousePosition;
    }
  }

  React.useEffect(() => {
    addListeners();

    return () => {
      removeListeners;
    };
  }, []);


  return <div
    className={`${s.right_box_main} ${
      isCapture ? s.right_box_main_captured : ''
    }`}
    id="viewport"
    ref={flowRef}
  >
    <ReactFlowRenderer />
    <DroppableMask />
  </div>;
}
