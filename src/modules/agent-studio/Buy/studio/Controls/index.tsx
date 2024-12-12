import BoxOption from '@/modules/agent-studio/Buy/component4/BoxOption';
import BoxOptionV3 from '@/modules/agent-studio/Buy/components3/BoxOptionV3';
import Draggable from '@/modules/agent-studio/Buy/components3/Draggable';
import DroppableV2 from '@/modules/agent-studio/Buy/components3/DroppableV2';
import Label from '@/modules/agent-studio/Buy/components3/Label';
import LegoV3 from '@/modules/agent-studio/Buy/components3/LegoV3';
import useOrderFormStoreV3 from '@/modules/agent-studio/Buy/stores/index_v3';
import useModelCategoriesStore from '@/modules/agent-studio/Buy/stores/useModelCategoriesStore';
import s from '@/modules/agent-studio/Buy/styles.module.scss';
import Droppable from '@/modules/agent-studio/dapp/components/Droppable';
import { formatCurrencyV2 } from '@utils/format';
import { compareString } from '@utils/string';
import React, { memo } from 'react';
import useDapps from '../../hooks/useDapps';
import {
  createAgentGeneralIdeaAsBrainstorm,
  createAgentNftEtherAsBrainstorm,
  createAgentNftOrdinalBTCAsBrainstorm,
  createAgentTokensPumpAsBrainstorm,
} from '../../mockup_3';
import { chainKeyToDappKey, isChainOptionDisabled } from '../../utils';
import useStudioInfo from '../ActionsWorkArea/useStudioInfo';

const ignoreFields: string[] = [];
const shouldGenFields: string[] = ['mission'];
const ignoreFieldMapper: Record<string, string[]> = {};

export default memo(function StudioControls() {
  const parsedCategories = useModelCategoriesStore(
    (state) => state.parsedCategories,
  );
  const field = useOrderFormStoreV3((state) => state.field);

  const { dapps, dappMapping } = useDapps();

  const { isUpdateFlow } = useStudioInfo();

  const currentNetwork = React.useMemo(
    () => field['network']?.value as string,
    [field['network']?.value],
  );

  return (
    <div id={'wrapper-data'} className={s.left_box_inner_content}>
      <Droppable id="input">
        {(parsedCategories || [])
          .filter((item) => !item.isChain)
          .map((item) => {
            // Special case, need to check manually
            if (item.key === 'create_agent') {
              const generalIdeaDapp = createAgentGeneralIdeaAsBrainstorm;
              const nftEtherDapp = createAgentNftEtherAsBrainstorm;
              const nftOrdinalBTC = createAgentNftOrdinalBTCAsBrainstorm;
              const tokensPump = createAgentTokensPumpAsBrainstorm;

              return (
                <>
                  <BoxOptionV3
                    key={item.key}
                    disable={item.disable}
                    label={item.title}
                    id={item.key}
                    isRequired={item.required}
                    description={{
                      title: item.title,
                      content: item.tooltip,
                    }}
                  >
                    <BoxOption
                      info={{
                        ...item.options[0],
                        disabled: false,
                        // item.disable ||
                        // !item.options[0].selectable ||
                        // isChainOptionDisabled(field, item, item.options[0]),
                        title: '',
                        description: {
                          title: item.options[0].title,
                          content: item.options[0].tooltip,
                        },
                      }}
                      thisDapp={generalIdeaDapp}
                      key={generalIdeaDapp.key}
                      dappIndex={0}
                      className={`${s.dappBoxOption} ${s.dappBoxOption_wallet}`}
                    />

                    <BoxOption
                      info={{
                        ...item.options[1],
                        disabled: false,
                        // item.disable ||
                        // !item.options[0].selectable ||
                        // isChainOptionDisabled(field, item, item.options[0]),
                        title: '',
                        description: {
                          title: item.options[1].title,
                          content: item.options[1].tooltip,
                        },
                      }}
                      thisDapp={nftEtherDapp}
                      key={nftEtherDapp.key}
                      dappIndex={0}
                      className={`${s.dappBoxOption} ${s.dappBoxOption_wallet}`}
                    />

                    <BoxOption
                      info={{
                        ...item.options[3],
                        disabled: false,
                        // item.disable ||
                        // !item.options[0].selectable ||
                        // isChainOptionDisabled(field, item, item.options[0]),
                        title: '',
                        description: {
                          title: item.options[3].title,
                          content: item.options[3].tooltip,
                        },
                      }}
                      thisDapp={tokensPump}
                      key={tokensPump.key}
                      dappIndex={0}
                      className={`${s.dappBoxOption} ${s.dappBoxOption_wallet}`}
                    />

                    <BoxOption
                      info={{
                        ...item.options[2],
                        disabled: false,
                        // item.disable ||
                        // !item.options[0].selectable ||
                        // isChainOptionDisabled(field, item, item.options[0]),
                        title: '',
                        description: {
                          title: item.options[2].title,
                          content: item.options[2].tooltip,
                        },
                      }}
                      thisDapp={nftOrdinalBTC}
                      key={nftOrdinalBTC.key}
                      dappIndex={0}
                      className={`${s.dappBoxOption} ${s.dappBoxOption_wallet}`}
                    />
                  </BoxOptionV3>
                </>
              );
            }

            return null;
          })}
      </Droppable>

      <DroppableV2 id="data">
        {(parsedCategories || []).map((item, index) => {
          if (!item.isChain && !ignoreFields.includes(item.key)) return null;

          if (item.hidden) return null;

          const currentOption = item.options.find(
            (opt) =>
              opt.key === field[item.key].value && field[item.key].dragged,
          );
          let currentPrice = currentOption?.priceBVM ?? 0;

          if (currentNetwork === 'testnet') {
            currentPrice = currentOption?.priceBVMTestnet ?? currentPrice;
          }

          return (
            <BoxOptionV3
              key={item.key}
              disable={item.disable || (isUpdateFlow && !item.updatable)}
              label={item.title}
              id={item.key}
              isRequired={item.required}
              active={field[item.key].dragged}
              needCheckIcon={item.required}
              description={{
                title: item.title,
                content: item.tooltip,
              }}
            >
              {item.options.map((option, optIdx) => {
                let _price = option.priceBVM;
                let thisPrice = option.priceBVM;

                if (currentNetwork === 'testnet') {
                  _price = option.priceBVMTestnet ?? _price;
                  thisPrice = option.priceBVMTestnet ?? thisPrice;
                }

                let operator = '+';
                let suffix =
                  Math.abs(_price) > 0
                    ? ` (${formatCurrencyV2({
                        amount: _price,
                        decimals: 0,
                      })} BVM)`
                    : '';

                _price = thisPrice - currentPrice;
                operator = _price > 0 ? '+' : '-';

                if (item.multiChoice) operator = '';

                suffix =
                  Math.abs(_price / 30) > 1
                    ? ` (${operator}${formatCurrencyV2({
                        amount: Math.abs(_price / 30),
                        decimals: 0,
                      })} BVM)`
                    : '';

                let isThisOptionDragged =
                  field[item.key].dragged &&
                  field[item.key].value === option.key;

                const isDisabled = isChainOptionDisabled(field, item, option);

                if (item.multiChoice && field[item.key].dragged) {
                  isThisOptionDragged = (
                    (field[item.key]?.value as any) || []
                  ).includes(option.key);
                }

                if (option?.hidden) return null;

                return (
                  <Draggable
                    key={item.key + '-' + option.key + '-left'}
                    id={item.key + '-' + option.key + '-left'}
                    useMask
                    disabled={isDisabled}
                    isLabel={true}
                    value={{
                      isChain: true,
                      value: option.key,
                      left: true,
                      background: item.color,
                      label: option.title,
                      icon: option.icon,
                    }}
                    tooltip={option.tooltip}
                  >
                    <LegoV3
                      background={item.color}
                      zIndex={item.options.length - optIdx}
                      disabled={isDisabled}
                      checked={isThisOptionDragged}
                    >
                      <Label icon={option.icon} title={option.title + suffix} />
                    </LegoV3>
                  </Draggable>
                );
              })}
            </BoxOptionV3>
          );
        })}
      </DroppableV2>

      <Droppable id="input">
        {(parsedCategories || [])
          .filter((item) => !item.isChain)
          .map((item) => {
            if (shouldGenFields.includes(item.key)) {
              console.log('[StudioControls] item', item.key);

              return (
                <BoxOptionV3
                  key={item.key}
                  disable={item.disable}
                  label={item.title}
                  id={item.key}
                  isRequired={item.required}
                  description={{
                    title: item.title,
                    content: item.tooltip,
                  }}
                >
                  {item.options.map((option, index) => {
                    const dapp = isUpdateFlow
                      ? dapps?.find((item) =>
                          compareString(
                            item.key,
                            chainKeyToDappKey(option.key),
                          ),
                        )
                      : dappMapping[chainKeyToDappKey(option.key)];

                    if (ignoreFieldMapper[item.key]?.includes(option.key))
                      return null;

                    console.log(
                      '[StudioControls] dappIndex',
                      dapps,
                      option.key,
                    );

                    const dappIndex = dapps.findIndex(
                      (d) => d.key === chainKeyToDappKey(option.key),
                    );
                    if (!dapp) return null;

                    console.log('[StudioControls] dapp', {
                      dappMapping,
                      dapp,
                      dappKey: chainKeyToDappKey(option.key),
                      itemKey: item.key,
                    });

                    return (
                      <React.Fragment key={dapp.key}>
                        <BoxOption
                          info={{
                            ...option,
                            disabled: false,
                            title: '',
                            description: {
                              title: option.title,
                              content: option.tooltip,
                            },
                          }}
                          thisDapp={dapp}
                          key={dapp.key}
                          dappIndex={dappIndex}
                          className={`${s.dappBoxOption} ${s.dappBoxOption_wallet}`}
                        />
                      </React.Fragment>
                    );
                  })}
                </BoxOptionV3>
              );
            }

            return null;
          })}
      </Droppable>

      <div className={s.hTrigger}></div>
    </div>
  );
});
