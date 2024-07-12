'use client';

import s from './styles.module.scss';
import LegoV3 from '@/modules/blockchains/Buy/components3/LegoV3';
import ComputerNameInput from '@/modules/blockchains/Buy/components3/ComputerNameInput';
import Draggable from '@/modules/blockchains/Buy/components3/Draggable';
import DropdownV2 from '@/modules/blockchains/Buy/components3/DropdownV2';
import DroppableV2 from '@/modules/blockchains/Buy/components3/DroppableV2';
import React from 'react';
import { FAKE_DATA_VALUE } from '@/modules/customViewModule/data';

export default function CustomViewModule() {
  return (
    <div className={`${s.wrapper} container`}>
      <div className={s.inner}>
        <DroppableV2 id="final" className={s.finalResult}>
          <LegoV3
            background={'#FF3A3A'}
            title="1. Name"
            label="Name"
            zIndex={45}
          >
            <ComputerNameInput />
          </LegoV3>

          {FAKE_DATA_VALUE?.map((item, index) => {
            console.log('item', item);
            if (item.type === 'dropdown') {
              return (
                <LegoV3
                  background={item.color}
                  title={item.title}
                  zIndex={FAKE_DATA_VALUE.length - index}
                  label={item.title}
                >
                  <DropdownV2
                    // @ts-ignore
                    options={item.value}
                    title={item.title}
                    disabled={true}
                    isCustomView={true}
                  />
                </LegoV3>
              );
            }

            return item.value.map((option, opIdx) => {
              return (
                <LegoV3
                  background={item.color}
                  label={item.title}
                  zIndex={item.value.length - opIdx}
                >
                  <DropdownV2
                    disabled
                    defaultValue={option.title || ''}
                    options={[
                      // @ts-ignore
                      item.value[0],
                    ]}
                    value={option.title}
                    isCustomView={true}
                  />
                </LegoV3>
              );
            });
          })}
        </DroppableV2>
      </div>
    </div>
  );
}
