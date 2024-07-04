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
import Slider from './components3/Slider';
import ImagePlaceholder from '@components/ImagePlaceholder';

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
          label="Name"
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
          label={DATA_PRICING.network.sub_title}
          zIndex={9}
          isFrist={false}
          isLast={false}
          isActive={field[ORDER_FIELD.NETWORK].dragged}
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
      descriptionDetail: {
        title: 'Data Availability',
        content: (
          <p>
            The data of your blockchain is written to a Data Availability layer
            such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
          </p>
        ),
      },
      content: () => (
        <Lego
          background={'violet'}
          label={DATA_PRICING.availability.sub_title}
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
    [ORDER_FIELD.GAS_LIMIT]: {
      label: '4. Block gas limit',
      descriptionDetail: {
        title: 'Block Gas Limit',
        content: (
          <p>
            The block gas limit defines the maximum amount of gas that all
            transactions in a single block can consume.
          </p>
        ),
      },
      content: () => (
        <Lego
          background={'green'}
          label={DATA_PRICING.gas.sub_title}
          isFrist={false}
          // isActive
          zIndex={7}
          isLast={false}
        >
          <Slider
            cb={setFormField}
            field={ORDER_FIELD.GAS_LIMIT}
            defaultValue={field[ORDER_FIELD.GAS_LIMIT].value}
            max={DATA_PRICING.gas.max}
          />
        </Lego>
      ),
    },
    [ORDER_FIELD.BLOCK_TIME]: {
      label: '5. Withdrawal time',
      descriptionDetail: {
        title: 'Withdrawal Time',
        content: (
          <p>
            The withdrawal period is the time frame during which your users can
            withdraw their assets from your blockchain back to Supersonic. This
            duration primarily depends on the time required for the prover to
            submit a zk-proof to the verifier contracts deployed on Supersonic.
          </p>
        ),
      },
      content: () => (
        <Lego
          background={'pink'}
          label={DATA_PRICING.withdrawal.sub_title}
          isFrist={false}
          zIndex={6}
          // isActive
          isLast={true}
        >
          <Slider
            cb={setFormField}
            field={ORDER_FIELD.BLOCK_TIME}
            defaultValue={field[ORDER_FIELD.BLOCK_TIME].value}
            max={DATA_PRICING.withdrawal.max}
            subfix="hours"
          />
        </Lego>
      ),
    },
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
    <div className={s.container}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className={s.wrapper}>
          <div className={s.inner}>
            <div className={s.left}>
              <p className={s.heading}>Customize your Blockchain</p>
              <div className={s.left_box}>
                {Object.keys(boxOptionMapping).map((key) => {
                  if (key === ORDER_FIELD.CHAIN_NAME) return;

                  const { label, content, descriptionDetail } = boxOptionMapping[key as Override];
                  const isDragged = field[key as Override].dragged;

                  return (
                    <BoxOption
                      key={key}
                      label={label}
                      id={key}
                      active={isDragged}
                      descriptionDetail={descriptionDetail}
                    >
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
                  {boxOptionMapping[ORDER_FIELD.CHAIN_NAME].content()}

                  {Object.keys(boxOptionMapping).map((key) => {
                    if (key === ORDER_FIELD.CHAIN_NAME) return;
                    const { content } = boxOptionMapping[key as Override];
                    const isDragged = field[key as Override].dragged;

                    if (!isDragged) return null;

                    return content();
                  })}
                </Droppable>
                <div className={`${s.launch} ${s.active}`}>
                  <p>Launch</p>
                  <div className={`${s.icon}`}>
                    <ImagePlaceholder src={'/launch.png'} alt={'launch'} width={48} height={48}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DndContext>

    </div>
  );
};

export default BuyPage;
