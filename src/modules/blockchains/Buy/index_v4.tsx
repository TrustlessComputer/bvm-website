import BoxOptionV2, {
  BoxOptionV2Props,
} from '@/modules/blockchains/Buy/components3/BoxOptionV2';
import { DndContext, useSensor, useSensors } from '@dnd-kit/core';
import React from 'react';

import {
  ORDER_FIELD,
  useFormOrderStore,
} from '@/modules/blockchains/Buy/stores';
import Tier from '@/modules/blockchains/Buy/components3/Tier';

import LegoV2 from './components3/LegoV2';
import Slider from './components3/Slider';
import DroppableV2 from './components3/DroppableV2';
import ComputerNameInput from './components3/ComputerNameInput';
import LaunchButton from './components3/LaunchButton';
import { MouseSensor } from './utils';
import { useBuy } from '../providers/Buy.hook';

import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import SvgInset from '@/components/SvgInset';
import { OrderFormOptions } from './Buy.data';
import Draggable from './components3/Draggable';

type PricingPackageValues = {
  maxGasLimit: number;
  minGasLimit: number;
  defaultGasLimit?: number;
  stepGasLimit: number;
  defaultWithdrawalPeriod?: number;
  minWithdrawalPeriod: number;
  maxWithdrawalPeriod: number;
};

type Override = (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD];
type BoxOption = {
  active?: boolean;
  label: string;
  id: string;
  last?: boolean;
  description?: {
    title: string;
    content: React.ReactNode;
  };
  options?: {
    id: string;
    label: React.ReactNode;
    value: any;
  }[];
  content?: React.ReactNode;
};

const BuyPage = () => {
  const router = useRouter();
  const { field, setFormField } = useFormOrderStore((state) => state);
  const { pricingPackageValues } = useBuy();

  const {
    maxGasLimit,
    minGasLimit,
    defaultGasLimit,
    stepGasLimit,
    defaultWithdrawalPeriod,
    minWithdrawalPeriod,
    maxWithdrawalPeriod,
  } = pricingPackageValues as PricingPackageValues;

  React.useEffect(() => {
    setFormField(ORDER_FIELD.GAS_LIMIT, defaultGasLimit || maxGasLimit);
    setFormField(
      ORDER_FIELD.WITHDRAW_PERIOD,
      defaultWithdrawalPeriod || maxWithdrawalPeriod,
    );
  }, [pricingPackageValues]);

  const cannotModifiedNoti = React.useMemo(
    () => (
      <div className={s.notiWraper}>
        <span className={s.link} onClick={() => router.push('/pricing')}>
          Switch tier for more option
        </span>
        <SvgInset svgUrl="/icons/arrow-right-up.svg" />
      </div>
    ),
    [],
  );

  const boxOptionMapping: Record<string, BoxOption> = {
    [ORDER_FIELD.CHAIN_NAME]: {
      id: ORDER_FIELD.CHAIN_NAME,
      label: '1. Name',
      content: (
        <LegoV2
          background={'red'}
          title="1. Name"
          label="Name"
          zIndex={10}
          first={true}
        >
          <ComputerNameInput />
        </LegoV2>
      ),
    },
    // @ts-ignore
    [ORDER_FIELD.NETWORK]: {
      ...OrderFormOptions[ORDER_FIELD.NETWORK],
      id: ORDER_FIELD.NETWORK,
      label: OrderFormOptions[ORDER_FIELD.NETWORK].title,
    },
    // @ts-ignore
    [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
      ...OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN],
      id: ORDER_FIELD.DATA_AVAILABILITY_CHAIN,
      label: OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].title,
    },
    [ORDER_FIELD.GAS_LIMIT]: {
      ...OrderFormOptions[ORDER_FIELD.GAS_LIMIT],
      id: ORDER_FIELD.GAS_LIMIT,
      label: OrderFormOptions[ORDER_FIELD.GAS_LIMIT].title,
      content: (
        <LegoV2
          background={'green'}
          label={OrderFormOptions[ORDER_FIELD.GAS_LIMIT].subTitle}
          active={field[ORDER_FIELD.GAS_LIMIT].dragged}
          zIndex={7}
        >
          <Slider
            cb={setFormField}
            field={ORDER_FIELD.GAS_LIMIT}
            defaultValue={field[ORDER_FIELD.GAS_LIMIT].value}
            max={maxGasLimit}
            initValue={defaultGasLimit}
            min={minGasLimit}
            step={stepGasLimit}
            initNoti={cannotModifiedNoti}
          />
        </LegoV2>
      ),
    },
    [ORDER_FIELD.WITHDRAW_PERIOD]: {
      ...OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD],
      id: ORDER_FIELD.WITHDRAW_PERIOD,
      label: OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD].title,
      content: (
        <LegoV2
          background={'pink'}
          label={OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD].subTitle}
          zIndex={6}
          active={field[ORDER_FIELD.WITHDRAW_PERIOD].dragged}
          last
        >
          <Slider
            cb={setFormField}
            field={ORDER_FIELD.WITHDRAW_PERIOD}
            defaultValue={field[ORDER_FIELD.WITHDRAW_PERIOD].value}
            max={maxWithdrawalPeriod}
            suffix="hours"
            initValue={defaultWithdrawalPeriod}
            min={minWithdrawalPeriod}
            initNoti={cannotModifiedNoti}
          />
        </LegoV2>
      ),
    },
  };

  function handleDragEnd(event: any) {
    const { over, active } = event;
    const [key, value] = active.id.split('-');
    const finalDroppable = over && over.id.includes('final');

    if (over && finalDroppable) {
      setFormField(key, value, true);
    } else {
      setFormField(key, value, false);
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

                  const { label, content, description, options } =
                    boxOptionMapping[key as Override];
                  const isDragged = field[key as Override].dragged;

                  return (
                    <BoxOptionV2
                      key={key}
                      label={label}
                      id={key}
                      active={isDragged}
                      description={description}
                      last={index === Object.keys(boxOptionMapping).length - 1}
                    >
                      {options ? (
                        options.map((option) => {
                          if (
                            isDragged &&
                            field[key as Override].value.toString() ===
                              option.value.toString()
                          )
                            return null;

                          return (
                            <Draggable
                              id={key + '-' + option.value.toString()}
                              value={option.value}
                            >
                              <LegoV2
                                key={option.id}
                                background="brown"
                                label={option.label}
                                zIndex={9}
                                active={field[ORDER_FIELD.NETWORK].dragged}
                              />
                            </Draggable>
                          );
                        })
                      ) : (
                        <Draggable id={key}>{content}</Draggable>
                      )}
                    </BoxOptionV2>
                  );
                })}
              </div>
            </div>

            <div className={s.right}>
              <Tier />
              <div className={s.right_box}>
                <DroppableV2 id="final" className={s.finalResult}>
                  {boxOptionMapping[ORDER_FIELD.CHAIN_NAME].content}

                  {Object.keys(boxOptionMapping).map((key) => {
                    if (key === ORDER_FIELD.CHAIN_NAME) return;
                    const { content, options } =
                      boxOptionMapping[key as Override];
                    const isDragged = field[key as Override].dragged;

                    if (!isDragged) return null;

                    if (options) {
                      return options.map((option) => {
                        if (
                          field[key as Override].value.toString() !==
                          option.value.toString()
                        )
                          return null;

                        return (
                          <Draggable
                            id={key + '-' + option.value.toString()}
                            value={option.value}
                          >
                            <LegoV2
                              key={option.id}
                              background="brown"
                              label={option.label}
                              zIndex={9}
                              active={field[ORDER_FIELD.NETWORK].dragged}
                            />
                          </Draggable>
                        );
                      });
                    }

                    return <Draggable id={key}>{content}</Draggable>;
                  })}
                </DroppableV2>
                <LaunchButton />
              </div>
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default BuyPage;
