import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import DroppableV2 from '@/modules/blockchains/Buy/components3/DroppableV2';
import BoxOptionV3 from '@/modules/blockchains/Buy/components3/BoxOptionV3';
import { formatCurrencyV2 } from '@utils/format';
import Draggable from '@/modules/blockchains/Buy/components3/Draggable';
import LegoV3 from '@/modules/blockchains/Buy/components3/LegoV3';
import Label from '@/modules/blockchains/Buy/components3/Label';
import Droppable from '@/modules/blockchains/dapp/components/Droppable';
import BoxOption from '@/modules/blockchains/Buy/component4/BoxOption';
import React from 'react';

export default function StudioControls() {

  return <div
    id={'wrapper-data'}
    className={s.left_box_inner_content}
  >
    <DroppableV2 id="data">
      {data?.map((item, index) => {
        if (item.hidden) return null;

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

              const isDisabled =
                !!(
                  option.supportLayer &&
                  option.supportLayer !== 'both' &&
                  option.supportLayer !==
                  field['layers']?.value
                ) ||
                !!(
                  option.supportNetwork &&
                  option.supportNetwork !== 'both' &&
                  option.supportNetwork !==
                  field['network']?.value
                ) ||
                !option.selectable;

              if (
                item.multiChoice &&
                field[item.key].dragged
              ) {
                const currentValues = field[item.key]
                  .value as any[];

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
                    <Label
                      icon={option.icon}
                      title={option.title + suffix}
                    />
                  </LegoV3>
                </Draggable>
              );
            })}
          </BoxOptionV3>
        );
      })}

      {/* <div className={s.hTrigger}></div> */}
    </DroppableV2>

    <Droppable id="input">
      {dapps.map((dapp, index) => {
        return (
          <BoxOption
            thisDapp={dapp}
            key={dapp.key}
            dappIndex={index}
          />
        );
      })}
    </Droppable>
  </div>
}
