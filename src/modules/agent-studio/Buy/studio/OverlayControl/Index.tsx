import Draggable from '@/modules/agent-studio/Buy/components3/Draggable';
import DroppableV2 from '@/modules/agent-studio/Buy/components3/DroppableV2';
import LegoParent from '@/modules/agent-studio/Buy/components3/LegoParent';
import LegoV3 from '@/modules/agent-studio/Buy/components3/LegoV3';
import useOrderFormStoreV3 from '@/modules/agent-studio/Buy/stores/index_v3';
import useDragMask from '@/modules/agent-studio/Buy/stores/useDragMask';
import useModelCategoriesStore from '@/modules/agent-studio/Buy/stores/useModelCategoriesStore';
import { DragOverlay } from '@dnd-kit/core';

export default function OverlayControl() {
  const { idDragging, rightDragging, dataDragging, isDraggingParent } =
    useDragMask();
  const { field } = useOrderFormStoreV3();

  const { parsedCategories: data } = useModelCategoriesStore();

  return (
    <DragOverlay>
      {idDragging &&
        data?.map((item, index) => {
          if (!idDragging.startsWith(item.key)) return null;

          if (item.multiChoice && isDraggingParent) {
            const childrenOptions = item.options.map((option, opIdx) => {
              const optionInValues = (
                field[item.key].value as string[]
              ).includes(option.key);

              if (!optionInValues) return null;

              return (
                <Draggable
                  useMask
                  key={item.key + '-' + option.key}
                  id={item.key + '-' + option.key}
                  value={{
                    isChain: true,
                    value: option.key,
                  }}
                >
                  <LegoV3
                    background={item.color}
                    label={option.title}
                    labelInLeft
                    zIndex={item.options.length - opIdx}
                    icon={option.icon}
                  ></LegoV3>
                </Draggable>
              );
            });

            return (
              <Draggable
                key={item.key + '-parent' + (rightDragging ? '-right' : '')}
                id={item.key + '-parent' + (rightDragging ? '-right' : '')}
                useMask
                value={{
                  isChain: true,
                }}
              >
                <DroppableV2 id={item.key}>
                  <LegoParent
                    parentOfNested
                    background={item.color}
                    label={item.title}
                    zIndex={data.length - index}
                  >
                    {childrenOptions}
                  </LegoParent>
                </DroppableV2>
              </Draggable>
            );
          }

          return (
            <Draggable
              key={idDragging}
              id={idDragging}
              useMask
              value={{
                ...dataDragging,
              }}
            >
              <LegoV3
                icon={dataDragging.icon}
                background={dataDragging.background}
                label={dataDragging.label}
                labelInLeft
                zIndex={999}
              />
            </Draggable>
          );
        })}
    </DragOverlay>
  );
}
