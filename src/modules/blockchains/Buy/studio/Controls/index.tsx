import BoxOption from '@/modules/blockchains/Buy/component4/BoxOption';
import BoxOptionV3 from '@/modules/blockchains/Buy/components3/BoxOptionV3';
import Draggable from '@/modules/blockchains/Buy/components3/Draggable';
import DroppableV2 from '@/modules/blockchains/Buy/components3/DroppableV2';
import Label from '@/modules/blockchains/Buy/components3/Label';
import LegoV3 from '@/modules/blockchains/Buy/components3/LegoV3';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import Droppable from '@/modules/blockchains/dapp/components/Droppable';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { formatCurrencyV2 } from '@utils/format';
import { compareString } from '@utils/string';
import { useParams } from 'next/navigation';
import React, { memo } from 'react';
import useDapps from '../../hooks/useDapps';
import { accountAbstractionAsADapp } from '../../mockup_3';
import { chainKeyToDappKey, isChainOptionDisabled } from '../../utils';

export default memo(function StudioControls() {
  const { parsedCategories } = useModelCategoriesStore();
  const { field } = useOrderFormStoreV3();
  const { dapps, dappMapping } = useDapps();
  const dappState = useAppSelector(dappSelector);

  // console.log('dapps', dapps);
  // console.log('dappMapping', dappMapping);

  const params = useParams();
  const isUpdateChainFlow = React.useMemo(() => !!params?.id, [params?.id]);
  const currentNetwork = React.useMemo(
    () => field['network']?.value as string,
    [field['network']?.value],
  );

  // console.log('dappMapping :: ', dappMapping);

  // const renderChainLego = (
  //   item: IModelCategory,
  //   option: IModelOption,
  //   currentPrice: any,
  //   optIdx: number,
  // ) => {
  //   let _price = option.priceBVM;
  //   let operator = '+';
  //   let suffix =
  //     Math.abs(_price) > 0
  //       ? ` (${formatCurrencyV2({
  //           amount: _price,
  //           decimals: 0,
  //         })} BVM)`
  //       : '';

  //   _price = option.priceBVM - currentPrice;
  //   operator = _price > 0 ? '+' : '-';
  //   if (item.multiChoice) operator = '';
  //   suffix =
  //     Math.abs(_price) > 0
  //       ? ` (${operator}${formatCurrencyV2({
  //           amount: Math.abs(_price),
  //           decimals: 0,
  //         })} BVM)`
  //       : '';

  //   if (
  //     (option.key === field[item.key].value && field[item.key].dragged) ||
  //     item.type === 'dropdown'
  //   )
  //     return null;

  //   const isDisabled = isChainOptionDisabled(field, item, option);

  //   if (item.multiChoice && field[item.key].dragged) {
  //     const currentValues = field[item.key].value as any[];

  //     if (currentValues.includes(option.key)) {
  //       return null;
  //     }
  //   }

  //   return (
  //     <Draggable
  //       key={item.key + '-' + option.key}
  //       id={item.key + '-' + option.key}
  //       useMask
  //       disabled={isDisabled}
  //       isLabel={true}
  //       value={{
  //         isChain: true,
  //         value: option.key,
  //       }}
  //       tooltip={option.tooltip}
  //     >
  //       <LegoV3
  //         background={item.color}
  //         zIndex={item.options.length - optIdx}
  //         disabled={isDisabled}
  //       >
  //         <Label icon={option.icon} title={option.title + suffix} />
  //       </LegoV3>
  //     </Draggable>
  //   );
  // };

  return (
    <div id={'wrapper-data'} className={s.left_box_inner_content}>
      <DroppableV2 id="data">
        {(parsedCategories || []).map((item, index) => {
          if (!item.isChain && item.key !== 'bridge_apps') return null;
          // console.log('[StudioControls] map', item.key, {
          //   item: item,
          //   field: field,
          //   disabled: isUpdateChainFlow && !item.updatable,
          // });
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
              disable={item.disable || (isUpdateChainFlow && !item.updatable)}
              label={item.title}
              id={item.key}
              isRequired={item.required}
              active={field[item.key].dragged}
              description={{
                title: item.title,
                content: item.tooltip,
              }}
            >
              {item.options.map((option, optIdx) => {
                // let _price = formatCurrencyV2({
                //   amount: option.priceBVM || 0,
                //   decimals: 0,
                // }).replace('.00', '');
                // let suffix =
                //   Math.abs(option.priceBVM) > 0
                //     ? ` (${_price} BVM)`
                //     : '';

                // if (option.hidden) return null;

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
                  Math.abs(_price) > 0
                    ? ` (${operator}${formatCurrencyV2({
                        amount: Math.abs(_price),
                        decimals: 0,
                      })} BVM)`
                    : '';

                const isThisOptionDragged =
                  field[item.key].dragged &&
                  field[item.key].value === option.key;

                // if (
                //   (option.key === field[item.key].value &&
                //     field[item.key].dragged) ||
                //   item.type === 'dropdown'
                // )
                //   return null;

                const isDisabled = isChainOptionDisabled(field, item, option);

                if (item.multiChoice && field[item.key].dragged) {
                  const currentValues = field[item.key].value as any[];

                  if (currentValues.includes(option.key)) {
                    return null;
                  }
                }

                if (option?.hidden) return null;

                return (
                  <Draggable
                    key={item.key + '-' + option.key}
                    id={item.key + '-' + option.key}
                    useMask
                    disabled={isDisabled}
                    isLabel={true}
                    value={{
                      isChain: true,
                      value: option.key,
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
            // Special case, need to check manually
            if (item.key === 'wallet') {
              const dapp = accountAbstractionAsADapp;
              return (
                <div id={item.key}>
                  <BoxOption
                    info={{
                      ...item.options[0],
                      disabled:
                        item.disable ||
                        !item.options[0].selectable ||
                        isChainOptionDisabled(field, item, item.options[0]),
                      title: item.title,
                      description: {
                        title: item.title,
                        content: item.tooltip,
                      },
                    }}
                    thisDapp={dapp}
                    key={dapp.key}
                    dappIndex={0}
                  />
                </div>
              );
            }

            if (['defi_apps', 'degen_apps'].includes(item.key)) {
              const currentPrice =
                item.options.find(
                  (opt) =>
                    opt.key === field[item.key].value &&
                    field[item.key].dragged,
                )?.priceBVM ?? 0;

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
                  needCheckIcon={false}
                >
                  {item.options.map((option, index) => {
                    const dapp = isUpdateChainFlow
                      ? dapps?.find((item) =>
                          compareString(
                            item.key,
                            chainKeyToDappKey(option.key),
                          ),
                        )
                      : dappMapping[chainKeyToDappKey(option.key)];

                    // console.log('dapp', dapp);

                    const dappIndex = dapps.findIndex(
                      (d) => d.key === chainKeyToDappKey(option.key),
                    );

                    if (!dapp) return null;

                    return (
                      <React.Fragment key={dapp.key}>
                        <BoxOption
                          info={{
                            ...option,
                            disabled: item.disable || !option.selectable,
                            description: {
                              title: option.title,
                              content: option.tooltip,
                            },
                          }}
                          thisDapp={dapp}
                          key={dapp.key}
                          dappIndex={dappIndex}
                          className={s.dappBoxOption}
                        >
                          {/* {option.needInstall &&
                            renderChainLego(item, option, currentPrice, index)} */}
                        </BoxOption>
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
