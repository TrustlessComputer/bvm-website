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
import { IModelCategory, IModelOption } from '@/types/customize-model';
import { formatCurrencyV2 } from '@utils/format';
import { compareString } from '@utils/string';
import { useParams } from 'next/navigation';
import React from 'react';
import useDapps from '../../hooks/useDapps';
import { accountAbstractionAsADapp } from '../../mockup_3';
import { chainKeyToDappKey, isChainOptionDisabled } from '../../utils';

export default function StudioControls() {
  const { parsedCategories } = useModelCategoriesStore();
  const { field } = useOrderFormStoreV3();
  const { dapps, dappMapping } = useDapps();
  const dappState = useAppSelector(dappSelector);

  // console.log('dapps', dapps);
  // console.log('dappMapping', dappMapping);

  const params = useParams();
  const isUpdateChain = React.useMemo(() => !!params?.id, [params?.id]);

  // console.log('dappMapping :: ', dappMapping);

  const renderChainLego = (
    item: IModelCategory,
    option: IModelOption,
    currentPrice: any,
    optIdx: number,
  ) => {
    let _price = option.priceBVM;
    let operator = '+';
    let suffix =
      Math.abs(_price) > 0
        ? ` (${formatCurrencyV2({
            amount: _price,
            decimals: 0,
          })} BVM)`
        : '';

    _price = option.priceBVM - currentPrice;
    operator = _price > 0 ? '+' : '-';
    if (item.multiChoice) operator = '';
    suffix =
      Math.abs(_price) > 0
        ? ` (${operator}${formatCurrencyV2({
            amount: Math.abs(_price),
            decimals: 0,
          })} BVM)`
        : '';

    if (
      (option.key === field[item.key].value && field[item.key].dragged) ||
      item.type === 'dropdown'
    )
      return null;

    const isDisabled = isChainOptionDisabled(field, item, option);

    if (item.multiChoice && field[item.key].dragged) {
      const currentValues = field[item.key].value as any[];

      if (currentValues.includes(option.key)) {
        return null;
      }
    }

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
        >
          <Label icon={option.icon} title={option.title + suffix} />
        </LegoV3>
      </Draggable>
    );
  };

  return (
    <div id={'wrapper-data'} className={s.left_box_inner_content}>
      <DroppableV2 id="data">
        {(parsedCategories || []).map((item, index) => {
          if (!item.isChain && item.key !== 'bridge_apps') return null;

          if (item.hidden) return null;

          const currentPrice =
            item.options.find(
              (opt) =>
                opt.key === field[item.key].value && field[item.key].dragged,
            )?.priceBVM ?? 0;

          return (
            <BoxOptionV3
              key={item.key}
              disable={item.disable}
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

                let _price = option.priceBVM;
                let operator = '+';
                let suffix =
                  Math.abs(_price) > 0
                    ? ` (${formatCurrencyV2({
                        amount: _price,
                        decimals: 0,
                      })} BVM)`
                    : '';

                _price = option.priceBVM - currentPrice;
                operator = _price > 0 ? '+' : '-';
                if (item.multiChoice) operator = '';
                suffix =
                  Math.abs(_price) > 0
                    ? ` (${operator}${formatCurrencyV2({
                        amount: Math.abs(_price),
                        decimals: 0,
                      })} BVM)`
                    : '';

                if (
                  (option.key === field[item.key].value &&
                    field[item.key].dragged) ||
                  item.type === 'dropdown'
                )
                  return null;

                const isDisabled = isChainOptionDisabled(field, item, option);

                if (item.multiChoice && field[item.key].dragged) {
                  const currentValues = field[item.key].value as any[];

                  if (currentValues.includes(option.key)) {
                    return null;
                  }
                }

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
            // TODO
            // Special case, need to check manually
            if (item.key === 'wallet') {
              const dapp = accountAbstractionAsADapp;
              return (
                <div id={item.key}>
                  <BoxOption
                    info={{
                      ...item.options[0],
                      disabled: item.disable || !item.options[0].selectable,
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

            if (item.key === 'defi_apps') {
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
                    const dapp = isUpdateChain
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
}