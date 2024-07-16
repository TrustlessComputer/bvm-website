'use client';

import Draggable from '@/modules/blockchains/Buy/components3/Draggable';
import DropdownV2 from '@/modules/blockchains/Buy/components3/DropdownV2';
import DroppableV2 from '@/modules/blockchains/Buy/components3/DroppableV2';
import LegoParent from '@/modules/blockchains/Buy/components3/LegoParent';
import LegoV3 from '@/modules/blockchains/Buy/components3/LegoV3';
import React from 'react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';

type Props = {
  orderItem: OrderItem;
  selectedOptions: IModelCategory[];
};

export default function CustomViewModule(props: Props) {
  const [data, _setDataRender] = React.useState(props.selectedOptions);

  return (
    <div className={`${s.wrapper} container`}>
      <div className={s.inner}>
        <DroppableV2 id="final" className={s.finalResult}>
          <LegoV3 background={'#FF3A3A'} label="Name" labelInLeft zIndex={45}>
            {`${props.orderItem?.chainName || ''}`}
          </LegoV3>

          {data?.map((item, index) => {
            if (item.multiChoice) {
              const childrenOptions = item.options.map(
                (option, opIdx: number) => {
                  return (
                    <Draggable
                      right
                      key={item.key + '-' + option.key}
                      id={item.key + '-' + option.key}
                      tooltip={item.tooltip}
                      value={option.key}
                    >
                      <LegoV3
                        background={item.color}
                        label={item.confuseTitle}
                        labelInRight={!!item.confuseTitle}
                        zIndex={item.options.length - opIdx}
                      >
                        <DropdownV2
                          disabled
                          options={[
                            // @ts-ignore
                            option,
                          ]}
                          // @ts-ignore
                          defaultValue={option.value as any}
                          value={option.value as any}
                        />
                      </LegoV3>
                    </Draggable>
                  );
                },
              );

              return (
                <Draggable key={item.key} id={item.key}>
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

            if (item.type === 'dropdown') {
              return (
                <Draggable
                  right
                  key={item.key}
                  id={item.key}
                  tooltip={item.tooltip}
                  value={item.options[0].value as any}
                >
                  <LegoV3
                    background={item.color}
                    zIndex={data.length - index}
                    label={item.confuseTitle}
                    labelInRight={!!item.confuseTitle}
                  >
                    {/*{item.options[0].title}*/}

                    <DropdownV2
                      // @ts-ignore
                      options={item.options}
                      title={item.title}
                      defaultValue={item.options[0].value as any}
                      value={item.options[0].value as any}
                    />
                  </LegoV3>
                </Draggable>
              );
            }

            return (
              <Draggable
                right
                key={item.key + '-' + item.options[0].key}
                id={item.key + '-' + item.options[0].key}
                tooltip={item.tooltip}
                value={item.options[0].key}
              >
                <LegoV3
                  background={item.color}
                  label={item.confuseTitle}
                  labelInRight={!!item.confuseTitle}
                  zIndex={item.options.length - index}
                >
                  <DropdownV2
                    disabled
                    defaultValue={item.options[0].value as any}
                    // @ts-ignore
                    options={item.options}
                    value={item.options[0].value as any}
                  />
                </LegoV3>
              </Draggable>
            );
          })}
        </DroppableV2>
      </div>
    </div>
  );
}
