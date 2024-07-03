import BoxOption from '@/modules/blockchains/Buy/components3/BoxOption';
import s from './styles.module.scss';
import {
  DndContext,
  MouseSensor as LibMouseSensor,
  TouchSensor as LibTouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { MouseEvent, TouchEvent } from 'react';
import React from 'react';
import {
  ORDER_FIELD,
  useFormOrderStore,
} from '@/modules/blockchains/Buy/stores';
import { useRouter } from 'next/navigation';
import Lego from './components3/Lego';
import { DATA_PRICING } from '../data_pricing';
import Dropdown from './components3/Dropdown';

const handler = ({ nativeEvent: event }: MouseEvent | TouchEvent) => {
  let cur = event.target as HTMLElement;

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement as HTMLElement;
  }

  return true;
};

export class MouseSensor extends LibMouseSensor {
  static activators = [
    { eventName: 'onMouseDown', handler },
  ] as (typeof LibMouseSensor)['activators'];
}

export class TouchSensor extends LibTouchSensor {
  static activators = [
    { eventName: 'onTouchStart', handler },
  ] as (typeof LibTouchSensor)['activators'];
}

type Override = (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD];

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className={s.innerRight}>
      {props.children}
    </div>
  );
}

const BuyPage = () => {
  const router = useRouter();
  const { field, setFormField } = useFormOrderStore((state) => state);

  console.log('[BuyPage] field ::', field);

  const boxOptionMapping = {
    [ORDER_FIELD.CHAIN_NAME]: {
      label: '1. Name',

      content: () => (
        <Lego
          background={'red'}
          title="1. Name"
          label="1. Name"
          zIndex={10}
          isFrist={true}
          // isActive
          isLast={false}
        >
          <input
            type="text"
            placeholder="Enter chain name"
            className={s.input}
            value={field[ORDER_FIELD.CHAIN_NAME].value}
            onChange={(e) => {
              setFormField(ORDER_FIELD.CHAIN_NAME, e.target.value as any);
            }}
          />
        </Lego>
      ),
    },
    [ORDER_FIELD.NETWORK]: {
      label: '2. Network',
      content: () => (
        <Lego
          background={'brown'}
          label={DATA_PRICING.network.title}
          zIndex={9}
          isFrist={false}
          isLast={false}
          cb={setFormField}
          field={ORDER_FIELD.NETWORK}
        >
          <Dropdown
            cb={setFormField}
            defaultValue={field[ORDER_FIELD.NETWORK].value}
            field={ORDER_FIELD.NETWORK}
            options={DATA_PRICING.network.options}
          />
        </Lego>
      ),
    },
    [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
      label: '3. Data Availability',
      content: (key) => (
        <Lego
          key={key}
          background={'violet'}
          label={DATA_PRICING.availability.title}
          isFrist={false}
          zIndex={8}
          // isActive
          isLast={false}
        >
          <Dropdown
            cb={setFormField}
            defaultValue={field[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].value}
            field={ORDER_FIELD.DATA_AVAILABILITY_CHAIN}
            options={DATA_PRICING.availability.options}
          />
        </Lego>
      ),
    },
    // [ORDER_FIELD.GAS_LIMIT]: {
    //   ref: gasLimitRef,
    //   label: '4. Block gas limit',
    //   content: (key) => (
    // <input
    //   type="text"
    //   placeholder="Enter block gas limit"
    //   ref={gasLimitRef}
    //   className={s.input}
    //   value={field[ORDER_FIELD.GAS_LIMIT].value}
    //   onChange={(e) => {
    //     setFormField(ORDER_FIELD.GAS_LIMIT, e.target.value as any);
    //   }}
    // />
    // <Lego
    //   key={key}
    //   background={'green'}
    //   label={DATA_PRICING.gas.title}
    //   isFrist={false}
    //   type="slide"
    //   cb={setFormField}
    //   field={ORDER_FIELD.GAS_LIMIT}
    //   // isActive
    //   options={DATA_PRICING.gas.options}
    //   zIndex={7}
    //   isLast={false}
    // />
    //   ),
    // },
    // [ORDER_FIELD.BLOCK_TIME]: {
    //   ref: blockTimeRef,
    //   label: '5. Withdrawal time',
    //   content: () => (
    // <input
    //   type="text"
    //   placeholder="Enter withdrawal time"
    //   ref={blockTimeRef}
    //   className={s.input}
    //   value={field[ORDER_FIELD.BLOCK_TIME].value}
    //   onChange={(e) => {
    //     setFormField(ORDER_FIELD.BLOCK_TIME, e.target.value as any);
    //   }}
    // />
    // <Lego
    //   background={'pink'}
    //   label={DATA_PRICING.withdrawal.title}
    //   isFrist={false}
    //   zIndex={6}
    //   type="slide"
    //   cb={setFormField}
    //   field={ORDER_FIELD.BLOCK_TIME}
    //   // isActive
    //   options={DATA_PRICING.withdrawal.options}
    //   isLast={true}
    // />
    // ),
    // },
  };

  function handleDragEnd(event: any) {
    if (event.over && event.over.id === 'droppable') {
      const valueInput = field[event.active.id as Override].value;
      setFormField(event.active.id, valueInput as any, true);
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.left}>
            <p className={s.heading}>Customize your Blockchain</p>
            <div className={s.left_box}>
              {Object.keys(boxOptionMapping).map((key) => {
                if (key === ORDER_FIELD.CHAIN_NAME) return;

                const { label, content } = boxOptionMapping[key as Override];
                const isDragged = field[key as Override].dragged;

                return (
                  <BoxOption
                    key={key}
                    label={label}
                    id={key}
                    active={isDragged}

                  >
                    {content(label)}
                  </BoxOption>
                );
              })}
            </div>
          </div>
          <div className={s.right}>
            <div className={s.right_top}>
              <p className={s.heading}>Your tier</p>
              <div className={s.right_top_box}>
                <p>
                  <span>Hacker</span> $99 per rollup/month
                </p>
                <div
                  className={s.right_top_box_btn}
                  onClick={() => {
                    router.push('/pricing');
                  }}
                >
                  <p>Switch</p>
                </div>
              </div>
            </div>
            <div className={s.right_box}>
              <Droppable>
                {boxOptionMapping[ORDER_FIELD.CHAIN_NAME].content(1)}

                {Object.keys(boxOptionMapping).map((key) => {
                  if (key === ORDER_FIELD.CHAIN_NAME) return;
                  const { content } = boxOptionMapping[key as Override];
                  const isDragged = field[key as Override].dragged;

                  if (!isDragged) return null;

                  return content();
                })}
              </Droppable>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default BuyPage;
