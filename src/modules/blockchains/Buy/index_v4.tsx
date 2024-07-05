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
import { LegoColor } from './components3/BoxOption';
import Lego from './components3/Lego';
import { DATA_PRICING } from '../data_pricing';
import Dropdown from './components3/Dropdown';

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
  background?: LegoColor;
  RightContent?: () => React.ReactNode;
  description?: {
    title: string;
    content: React.ReactNode;
  };
  options?: {
    id: string;
    label: React.ReactNode;
    icon?: string;
    value: any;
    disabled?: boolean;
  }[];
  content: ({ isLeft }: { isLeft?: boolean }) => React.ReactNode;
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
      content: () => (
        <LegoV2
          background={'red'}
          title="1. Name"
          label="Name"
          zIndex={23}
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
      RightContent: () => (
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
            networkSelected={field[ORDER_FIELD.NETWORK].value}
            options={DATA_PRICING.network.options}
          />
        </Lego>
      ),
    },
    // @ts-ignore
    [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
      ...OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN],
      id: ORDER_FIELD.DATA_AVAILABILITY_CHAIN,
      label: OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].title,
      RightContent: () => (
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
            networkSelected={field[ORDER_FIELD.NETWORK].value}
            options={DATA_PRICING.availability.options}
            checkDisable={true}
          />
        </Lego>
      ),
    },
    [ORDER_FIELD.GAS_LIMIT]: {
      ...OrderFormOptions[ORDER_FIELD.GAS_LIMIT],
      id: ORDER_FIELD.GAS_LIMIT,
      label: OrderFormOptions[ORDER_FIELD.GAS_LIMIT].title,
      content: ({ isLeft }) => (
        <LegoV2
          background={'green'}
          label={isLeft ? '' : OrderFormOptions[ORDER_FIELD.GAS_LIMIT].subTitle}
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
      content: ({ isLeft }) => {
        return (
          <LegoV2
            background={'pink'}
            label={
              isLeft
                ? ''
                : OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD].subTitle
            }
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
        );
      },
    },
  };

  function handleDragEnd(event: any) {
    const { over, active } = event;
    const [key, value] = active.id.split('-');
    const finalDroppable = over && over.id.includes('final');

    if (over && finalDroppable) {
      setFormField(key, active.data.current.value, true);
    } else {
      setFormField(key, active.data.current.value, false);
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
                  const value = field[key as Override].value;

                  const {
                    label,
                    content: Content,
                    description,
                    options,
                    background,
                  } = boxOptionMapping[key as Override];
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
                              disabled={option.disabled}
                            >
                              <LegoV2
                                key={option.id}
                                background={background}
                                label={option.label}
                                icon={option.icon}
                                zIndex={11 - index + 1}
                                active={field[ORDER_FIELD.NETWORK].dragged}
                                className={option.disabled ? s.disabled : ''}
                              />
                            </Draggable>
                          );
                        })
                      ) : (
                        <Draggable value={value} id={key} key={key}>
                          <Content isLeft />
                        </Draggable>
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
                  <LegoV2
                    background={'red'}
                    title="1. Name"
                    label="Name"
                    zIndex={23}
                    first={true}
                  >
                    <ComputerNameInput />
                  </LegoV2>

                  {Object.keys(boxOptionMapping).map((key, index) => {
                    if (key === ORDER_FIELD.CHAIN_NAME) return;
                    const {
                      content: Content,
                      options,
                      background,
                      RightContent,
                    } = boxOptionMapping[key as Override];
                    const isDragged = field[key as Override].dragged;
                    const value = field[key as Override].value;

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
                            {RightContent && <RightContent />}
                          </Draggable>
                        );
                      });
                    }
                    return (
                      <Draggable
                        id={`${key}-drop`}
                        key={`${index}-drop`}
                        value={value}
                      >
                        {<Content />}
                      </Draggable>
                    );
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
