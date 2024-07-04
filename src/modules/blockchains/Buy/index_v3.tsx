import BoxOption, {
  BoxOptionProps,
} from '@/modules/blockchains/Buy/components3/BoxOption';
import { DndContext, useSensor, useSensors } from '@dnd-kit/core';
import React from 'react';
import {
  ORDER_FIELD,
  useFormOrderStore,
} from '@/modules/blockchains/Buy/stores';
import Tier from '@/modules/blockchains/Buy/components3/Tier';

import Lego from './components3/Lego';
import Dropdown from './components3/Dropdown';
import Slider from './components3/Slider';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Droppable from './components3/Droppable';
import { DATA_PRICING } from '../data_pricing';
import { MouseSensor } from './utils';

import s from './styles.module.scss';

type Override = (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD];
type BoxOption = {
  label: string;
  descriptionDetail?: {
    title: string;
    content: () => React.ReactElement;
  };
  content: () => React.ReactElement;
};

const BuyPage = () => {
  const { field, setFormField } = useFormOrderStore((state) => state);

  const boxOptionMapping: Record<string, BoxOptionProps> = {
    [ORDER_FIELD.CHAIN_NAME]: {
      id: ORDER_FIELD.CHAIN_NAME,
      label: '1. Name',
      children: (
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
      id: ORDER_FIELD.NETWORK,
      label: '2. Network',
      children: (
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
      id: ORDER_FIELD.DATA_AVAILABILITY_CHAIN,
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
      children: (
        <Lego
          background={'violet'}
          label={DATA_PRICING.availability.sub_title}
          isFrist={false}
          zIndex={8}
          isActive={field[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].dragged}
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
      id: ORDER_FIELD.GAS_LIMIT,
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
      children: (
        <Lego
          background={'green'}
          label={DATA_PRICING.gas.sub_title}
          isFrist={false}
          isActive={field[ORDER_FIELD.GAS_LIMIT].dragged}
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
      id: ORDER_FIELD.BLOCK_TIME,
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
      children: (
        <Lego
          background={'pink'}
          label={DATA_PRICING.withdrawal.sub_title}
          isFrist={false}
          zIndex={6}
          isActive={field[ORDER_FIELD.BLOCK_TIME].dragged}
          isLast={true}
        >
          <Slider
            cb={setFormField}
            field={ORDER_FIELD.BLOCK_TIME}
            defaultValue={field[ORDER_FIELD.BLOCK_TIME].value}
            max={DATA_PRICING.withdrawal.max}
            suffix="hours"
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
                {Object.keys(boxOptionMapping).map((key, index) => {
                  if (key === ORDER_FIELD.CHAIN_NAME) return;

                  const { label, children, descriptionDetail } =
                    boxOptionMapping[key as Override];
                  const isDragged = field[key as Override].dragged;
                  return (
                    <BoxOption
                      key={key}
                      label={label}
                      id={key}
                      active={isDragged}
                      descriptionDetail={descriptionDetail}
                      isLast={
                        index === Object.keys(boxOptionMapping).length - 1
                      }
                    >
                      {children}
                    </BoxOption>
                  );
                })}
              </div>
            </div>
            <div className={s.right}>
              <Tier />
              <div className={s.right_box}>
                <Droppable>
                  {boxOptionMapping[ORDER_FIELD.CHAIN_NAME].children}

                  {Object.keys(boxOptionMapping).map((key) => {
                    if (key === ORDER_FIELD.CHAIN_NAME) return;
                    const { children } = boxOptionMapping[key as Override];
                    const isDragged = field[key as Override].dragged;

                    if (!isDragged) return null;

                    return children;
                  })}
                </Droppable>
                <div className={`${s.launch} ${s.active}`}>
                  <p>Launch</p>
                  <div className={`${s.icon}`}>
                    <ImagePlaceholder
                      src={'/launch.png'}
                      alt={'launch'}
                      width={48}
                      height={48}
                    />
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
