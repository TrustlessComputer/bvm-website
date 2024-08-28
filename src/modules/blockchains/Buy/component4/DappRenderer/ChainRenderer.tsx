import React from 'react';

import ComputerNameInput from '@/modules/blockchains/Buy/components3/ComputerNameInput';
import ChainDraggable from '@/modules/blockchains/Buy/components3/Draggable';
import DroppableV2 from '@/modules/blockchains/Buy/components3/DroppableV2';
import LegoV3 from '@/modules/blockchains/Buy/components3/LegoV3';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { IModelCategory } from '@/types/customize-model';
import Label from '../../components3/Label';
import ChainLegoParent from '../../components3/LegoParent';
import useOrderFormStoreV3 from '../../stores/index_v3';
import useDragStore from '../../stores/useDragStore';
import useModelCategoriesStore from '../../stores/useModelCategoriesStore';
import useOverlappingChainLegoStore from '../../stores/useOverlappingChainLegoStore';

import OptionInputValue from '@/modules/blockchains/Buy/component4/DappRenderer/OptionInputValue';
import NetworkDropdown from '../../components3/NetworkDropdown';
import styles from './styles.module.scss';

type Props = {};

const hiddenFields = ['bridge_apps', 'network'];

const ChainRenderer = () => {
  const { parsedCategories, categories } = useModelCategoriesStore();
  const { draggedFields } = useDragStore();
  const { overlappingId } = useOverlappingChainLegoStore();
  const { field } = useOrderFormStoreV3();

  const { order, getBlockChainStatus, isUpdateFlow } = useChainProvider();

  const selectedCategoryMapping = React.useMemo(() => {
    if (!order?.selectedOptions) return undefined;

    const mapping: Record<string, IModelCategory> = {};

    order.selectedOptions.forEach((category) => {
      mapping[category.key] = category;
    });

    return mapping;
  }, [order?.selectedOptions]);

  return (
    <DroppableV2
      key={draggedFields.length}
      id="final"
      style={{
        width: '100% !important',
        height: '100%',
      }}
    >
      <LegoV3
        background={'#FF3A3A'}
        label="Bitcoin Chain Name"
        labelInLeft
        zIndex={45}
      >
        <ComputerNameInput />
      </LegoV3>
      <LegoV3 background={'#FF7A41'} label="Network" labelInLeft zIndex={44}>
        {/* <ComputerNameInput /> */}
        <NetworkDropdown />
      </LegoV3>

      {draggedFields.map((key, index) => {
        // if (key === 'bridge_apps') return null;
        if (hiddenFields.includes(key)) return null;

        const item = parsedCategories?.find((i) => i.key === key);
        const selectedCategory = selectedCategoryMapping?.[key];

        if (!item || !parsedCategories) return null;

        if (item.multiChoice) {
          if (!Array.isArray(field[item.key].value)) return;

          const childrenOptions = (field[item.key].value as
            | string[]
            | number[])!.map((key: string | number, opIdx: number) => {
            const option = item.options.find((opt) => opt.key === key);

            if (!option) return null;

            return (
              <ChainDraggable
                right
                key={item.key + '-' + option.key}
                id={item.key + '-' + option.key}
                useMask
                tooltip={item.tooltip}
                value={{
                  isChain: true,
                  value: option.key,
                  rightDragging: true,
                  background: item.color,
                  label: option.title,
                  icon: option.icon,
                }}
              >
                <DroppableV2 id={item.key + '-right'}>
                  <LegoV3
                    background={item.color}
                    label={item.confuseTitle}
                    labelInRight={!!item.confuseTitle || !!item.confuseIcon}
                    icon={item.confuseIcon}
                    zIndex={item.options.length - opIdx}
                  >
                    <Label icon={option.icon} title={option.title} />
                  </LegoV3>
                </DroppableV2>
              </ChainDraggable>
            );
          });

          return (
            <ChainDraggable
              key={item.key + '-parent' + '-right'}
              id={item.key + '-parent' + '-right'}
              useMask
              value={{
                isChain: true,
                rightDragging: true,
                background: item.color,
                label: item.title,
                icon: '',
                parent: true,
              }}
            >
              <DroppableV2 id={item.key}>
                <ChainLegoParent
                  parentOfNested
                  background={item.color}
                  label={item.title}
                  zIndex={draggedFields.length - index - 1}
                >
                  {childrenOptions}
                </ChainLegoParent>
              </DroppableV2>
            </ChainDraggable>
          );
        }

        return item.options.map((option, opIdx) => {
          if (option.key !== field[item.key].value) return null;

          const isUpdatable =
            option.key !== 'account_abstraction' && // Must be hard coded
            selectedCategory?.updatable && //
            isUpdateFlow;

          return (
            <ChainDraggable
              right
              key={item.key + '-' + option.key + '-right'}
              id={item.key + '-' + option.key + '-right'}
              useMask
              tooltip={item.tooltip}
              value={{
                isChain: true,
                value: option.key,
                rightDragging: true,
                background: item.color,
                label: option.title,
                icon: option.icon,
              }}
            >
              <DroppableV2 id={item.key + '-right'}>
                <LegoV3
                  updatable={isUpdatable}
                  allowShuffle
                  background={item.color}
                  label={item.confuseTitle}
                  labelInRight={!!item.confuseTitle || !!item.confuseIcon}
                  zIndex={draggedFields.length - index}
                  icon={item.confuseIcon}
                  className={
                    overlappingId === field[item.key].value
                      ? styles.activeBlur
                      : ''
                  }
                >
                  {option.addOnInputs ? (
                    <OptionInputValue option={option} />
                  ) : (
                    <Label icon={option.icon} title={option.title} />
                  )}
                </LegoV3>
              </DroppableV2>
            </ChainDraggable>
          );
        });
      })}
    </DroppableV2>
  );
};

export default ChainRenderer;
