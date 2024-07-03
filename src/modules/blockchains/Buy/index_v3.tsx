import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import BoxOption from '@/modules/blockchains/Buy/components3/BoxOption';
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
import { ORDER_FIELD, useFormOrderStore } from '@/modules/blockchains/Buy/stores';

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
  static activators = [{ eventName: 'onMouseDown', handler }] as typeof LibMouseSensor['activators'];
}

export class TouchSensor extends LibTouchSensor {
  static activators = [{ eventName: 'onTouchStart', handler }] as typeof LibTouchSensor['activators'];
}

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
  const { form, setFormField } = useFormOrderStore((state) => state);

  const chainNameRef = React.useRef<HTMLInputElement | null>(null);
  const networkRef = React.useRef<HTMLInputElement | null>(null);
  const dataAvaibilityChainRef = React.useRef<HTMLInputElement | null>(null);
  const gasLimitRef = React.useRef<HTMLInputElement | null>(null);
  const blockTimeRef = React.useRef<HTMLInputElement | null>(null);

  const boxOptionMapping = {
    [ORDER_FIELD.CHAIN_NAME]: {
      ref: chainNameRef,
      label: '1. Name',
      content: () => (
        <div>
          <input
            type="text"
            placeholder="Enter chain name"
            ref={chainNameRef}
          />
        </div>
      ),
    },
    [ORDER_FIELD.NETWORK]: {
      ref: networkRef,
      label: '2. Network',
      content: () => (
        <input type="text" id="network" placeholder="Enter network" ref={networkRef} className={s.input}/>
      ),
    },
    [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
      ref: dataAvaibilityChainRef,
      label: '3. Data Availability',
      content: () => (
        <div>
          <input
            type="text"
            placeholder="Enter data availability chain"
            ref={dataAvaibilityChainRef}
          />
        </div>
      ),
    },
    [ORDER_FIELD.GAS_LIMIT]: {
      ref: gasLimitRef,
      label: '4. Block gas limit',
      content: () => (
        <div>
          <input
            type="text"
            placeholder="Enter block gas limit"
            ref={gasLimitRef}
          />
        </div>
      ),
    },
    [ORDER_FIELD.BLOCK_TIME]: {
      ref: blockTimeRef,
      label: '5. Withdrawal time',
      content: () => (
        <div>
          <input
            type="text"
            placeholder="Enter withdrawal time"
            ref={blockTimeRef}
          />
        </div>
      ),
    },
  };

  function handleDragEnd(event: any) {
    console.log('[BuyPage] event :: ', event);

    if (event.over && event.over.id === 'droppable') {
      const valueInput = boxOptionMapping[event.active.id].ref.current?.value;

      console.log("value", valueInput);

      // setFormORDER_FIELD(event.active.id, valueInput || null); // TODO: REMOVE THE BELOW LINE AND UNCOMMENT THIS LINE
      setFormField(event.active.id, 'OK');
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    // useSensor(TouchSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates
    // })
  );

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.left}>
            <p className={s.heading}>Customize your Blockchain</p>
            <div className={s.left_box}>
              {Object.keys(boxOptionMapping).map((key) => {
                if (key === ORDER_FIELD.CHAIN_NAME) return

                const { label, content } = boxOptionMapping[key];
                const isDragged = form[key];

                if (isDragged) return null;

                return (
                  <BoxOption key={key} label={label} id={key}>
                    {content()}
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
                <BoxOption label={boxOptionMapping[ORDER_FIELD.CHAIN_NAME].label} id={ORDER_FIELD.CHAIN_NAME+'_dropped'} >
                  {boxOptionMapping[ORDER_FIELD.CHAIN_NAME].content()}
                </BoxOption>

                {Object.keys(boxOptionMapping).map((key) => {
                    if (key === ORDER_FIELD.CHAIN_NAME) return

                  const { label, content } = boxOptionMapping[key];
                  const isDragged = form[key];

                  if (!isDragged) return null;
                  console.log('[BuyPage] key, value :: ', key, form[key]);

                  return (
                    <BoxOption key={key} label={label} id={key+'_dropped'} >
                      {content()}
                    </BoxOption>
                  );
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
