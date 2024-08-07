import Draggable from '@/modules/blockchains/Buy/components3/Draggable';
import LegoV3 from '@/modules/blockchains/Buy/components3/LegoV3';
import DroppableV2 from '@/modules/blockchains/Buy/components3/DroppableV2';
import LegoParent from '@/modules/blockchains/Buy/components3/LegoParent';
import { DragOverlay } from '@dnd-kit/core';
import React from 'react';

export default function OverlayControl(){


  return <div>
    <DragOverlay>
      {idDragging &&
        data?.map((item, index) => {
          if (!idDragging.startsWith(item.key)) return null;

          if (item.multiChoice && rightDragging) {
            const childrenOptions = item.options.map(
              (option, opIdx) => {
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
                      label={item.title}
                      labelInLeft
                      zIndex={item.options.length - opIdx}
                    ></LegoV3>
                  </Draggable>
                );
              },
            );

            return (
              <Draggable
                key={
                  item.key +
                  '-parent' +
                  (rightDragging ? '-right' : '')
                }
                id={
                  item.key +
                  '-parent' +
                  (rightDragging ? '-right' : '')
                }
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

          return item.options.map((option, opIdx) => {
            if (!idDragging.startsWith(item.key + '-' + option.key))
              return null;

            return (
              <Draggable
                key={
                  item.key +
                  '-' +
                  option.key +
                  (rightDragging ? '-right' : '')
                }
                id={
                  item.key +
                  '-' +
                  option.key +
                  (rightDragging ? '-right' : '')
                }
                useMask
                value={{
                  isChain: true,
                  value: option.key,
                }}
              >
                <LegoV3
                  icon={option.icon}
                  background={item.color}
                  label={option.title}
                  labelInLeft
                  zIndex={item.options.length - opIdx}
                />
              </Draggable>
            );
          });
        })}
    </DragOverlay>
  </div>
}
