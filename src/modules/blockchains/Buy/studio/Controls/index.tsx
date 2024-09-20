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
import { DappModel } from '@/types/customize-model';

const ignoreFields = ['bridge_apps', 'gaming_apps', 'wallet_type'];
const shouldGenFields = ['defi_apps', 'degen_apps'];
const ignoreFieldMapper: Record<string, string[]> = {
  degen_apps: ['wallet_type'],
};

export default memo(function StudioControls() {
  const { parsedCategories } = useModelCategoriesStore();
  const { field } = useOrderFormStoreV3();
  const { dapps, dappMapping } = useDapps();
  const dappState = useAppSelector(dappSelector);

  const params = useParams();
  const isUpdateChainFlow = React.useMemo(() => !!params?.id, [params?.id]);
  const currentNetwork = React.useMemo(
    () => field['network']?.value as string,
    [field['network']?.value],
  );

  return (
    <div id={'wrapper-data'} className={s.left_box_inner_content}>
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
              disable={item.disable || (isUpdateChainFlow && !item.updatable)}
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
            // Special case, need to check manually
            if (item.key === 'wallet') {
              const dapp = accountAbstractionAsADapp;
              const dengenCategory = parsedCategories!.find(
                (cat) => cat.key === 'degen_apps',
              );
              const walletTypeOption = dengenCategory?.options.find(
                (opt) => opt.key === 'wallet_type',
              );
              const degenDapp = isUpdateChainFlow
                ? dapps?.find((item) =>
                    compareString(
                      item.key,
                      chainKeyToDappKey(walletTypeOption?.key || ''),
                    ),
                  )
                : dappMapping[chainKeyToDappKey(walletTypeOption?.key || '')];
              const dengenDappIndex = dapps.findIndex(
                (d) => d.key === chainKeyToDappKey(walletTypeOption?.key || ''),
              );

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
                  <BoxOption
                    info={{
                      ...item.options[0],
                      disabled:
                        item.disable ||
                        !item.options[0].selectable ||
                        isChainOptionDisabled(field, item, item.options[0]),
                      title: '',
                      description: {
                        title: item.title,
                        content: item.tooltip,
                      },
                    }}
                    thisDapp={dapp}
                    key={dapp.key}
                    dappIndex={0}
                    className={`${s.dappBoxOption} ${s.dappBoxOption_wallet}`}
                  >
                    {walletTypeOption && degenDapp && dengenCategory && (
                      <BoxOption
                        info={{
                          ...walletTypeOption,
                          title: '',
                          disabled:
                            dengenCategory.disable ||
                            !walletTypeOption.selectable,
                          description: {
                            title: walletTypeOption.title,
                            content: walletTypeOption.tooltip,
                          },
                        }}
                        thisDapp={degenDapp}
                        key={degenDapp.key}
                        dappIndex={dengenDappIndex}
                        className={`${s.dappBoxOption} ${s.dappBoxOption_wallet}`}
                      />
                    )}
                  </BoxOption>
                </BoxOptionV3>
              );
            }

            if (shouldGenFields.includes(item.key)) {
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

                    if (ignoreFieldMapper[item.key]?.includes(option.key))
                      return null;

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
