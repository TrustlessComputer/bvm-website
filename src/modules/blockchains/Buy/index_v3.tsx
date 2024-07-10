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
import Droppable from './components3/Droppable';
import ComputerNameInput from './components3/ComputerNameInput';
import LaunchButton from './components3/LaunchButton';
import { MouseSensor } from './utils';
import { DATA_PRICING } from '../data_pricing';
import { useBuy } from '../providers/Buy.hook';

import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import SvgInset from '@/components/SvgInset';
import { DALayerEnum, NetworkEnum } from './Buy.constanst';

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
  label: string;
  description?: {
    title: string;
    content: () => React.ReactElement;
  };
  content: () => React.ReactElement;
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
          <ComputerNameInput />
        </Lego>
      ),
    },
    [ORDER_FIELD.NETWORK]: {
      id: ORDER_FIELD.NETWORK,
      label: DATA_PRICING.network.title,
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
            // cb={(field, value) => {
            //   if (value === NetworkEnum.Network_Mainnet) {
            //     // Force DA selected by Polygon (only available on Mainnet)
            //     setFormField(
            //       ORDER_FIELD.DATA_AVAILABILITY_CHAIN,
            //       DALayerEnum.DALayer_PLG,
            //     );
            //   }
            //   setFormField(field, value);
            // }}
            defaultValue={field[ORDER_FIELD.NETWORK].value}
            field={ORDER_FIELD.NETWORK}
            options={DATA_PRICING.network.options}
            networkSelected={field[ORDER_FIELD.NETWORK].value}
          />
        </Lego>
      ),
    },
    [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
      id: ORDER_FIELD.DATA_AVAILABILITY_CHAIN,
      label: DATA_PRICING.availability.title,
      description: {
        title: DATA_PRICING.availability.sub_title,
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
            // cb={setFormField}
            defaultValue={field[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].value}
            field={ORDER_FIELD.DATA_AVAILABILITY_CHAIN}
            options={DATA_PRICING.availability.options}
            networkSelected={field[ORDER_FIELD.NETWORK].value}
            checkDisable={true}
          />
        </Lego>
      ),
    },
    [ORDER_FIELD.GAS_LIMIT]: {
      id: ORDER_FIELD.GAS_LIMIT,
      label: DATA_PRICING.gas.title,
      description: {
        title: DATA_PRICING.gas.sub_title,
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
            max={maxGasLimit}
            initValue={defaultGasLimit}
            min={minGasLimit}
            step={stepGasLimit}
            InitNoti={() => (
              <div className={s.notiWraper}>
                <span
                  className={s.link}
                  onClick={() => router.push('/pricing')}
                >
                  Switch tier for more option
                </span>
                <SvgInset svgUrl="/icons/arrow-right-up.svg" size={20} />
              </div>
            )}
          />
        </Lego>
      ),
    },
    [ORDER_FIELD.WITHDRAW_PERIOD]: {
      id: ORDER_FIELD.WITHDRAW_PERIOD,
      label: DATA_PRICING.withdrawal.title,
      description: {
        title: DATA_PRICING.withdrawal.sub_title,
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
          isActive={field[ORDER_FIELD.WITHDRAW_PERIOD].dragged}
          isLast={true}
        >
          <Slider
            cb={setFormField}
            field={ORDER_FIELD.WITHDRAW_PERIOD}
            defaultValue={field[ORDER_FIELD.WITHDRAW_PERIOD].value}
            max={maxWithdrawalPeriod}
            suffix="hours"
            initValue={defaultWithdrawalPeriod}
            min={minWithdrawalPeriod}
            InitNoti={() => (
              <div className={s.notiWraper}>
                <span
                  className={s.link}
                  onClick={() => router.push('/pricing')}
                >
                  Switch tier for more option
                </span>
                <SvgInset svgUrl="/icons/arrow-right-up.svg" />
              </div>
            )}
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

                  const { label, children, description } =
                    boxOptionMapping[key as Override];
                  const isDragged = field[key as Override].dragged;
                  return (
                    <BoxOption
                      key={key}
                      label={label}
                      id={key}
                      active={isDragged}
                      description={description}
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
