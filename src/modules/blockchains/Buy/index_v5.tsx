import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import React from 'react';

import Tier from '@/modules/blockchains/Buy/components3/Tier';
import {
  ORDER_FIELD,
  useOrderFormStore,
} from '@/modules/blockchains/Buy/stores/index_v2';

import { OrderFormOptions } from './Buy.data';
import ComputerNameInput from './components3/ComputerNameInput';
import Draggable from './components3/Draggable';
import DroppableV2 from './components3/DroppableV2';
import LaunchButton from './components3/LaunchButton';
import { MouseSensor } from './utils';
import BoxOptionV3 from './components3/BoxOptionV3';
import SideBar from './components3/SideBar';
import LegoV3 from './components3/LegoV3';
import BlockGasLimitLego from './components3/Legos/BlockGasLimitLego';
import WithdrawalTimeLego from './components3/Legos/WithdrawalTimeLego';
import RightNetworkLegoV2 from './components3/Legos/RightNetworkLegoV2';
import RightDataAvailabilityLego from './components3/Legos/RightDataAvailabilityLego';

import s from './styles_v5.module.scss';
import LeftNetworkLego from './components3/Legos/LeftNetworkLego';
import LeftDataAvailabilityLego from './components3/Legos/LeftDataAvailabilityLego';
import { NetworkEnum } from './Buy.constanst';
import useDragMask from './stores/useDragMask';
import { getModelCategories } from '@/services/customize-model';
import DropdownV2 from './components3/DropdownV2';

type Override = (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD];

const BuyPage = () => {
  const [data, setData] = React.useState<
    | {
        key: string;
        title: string;
        options: {
          key: string;
          title: string;
          value: string;
          disabled: boolean;
        }[];
      }[]
    | null
  >(null);
  const [form, setForm] = React.useState<Record<string, any>>({});

  const {
    gasLimit,
    withdrawPeriod,
    network,
    dataAvaibilityChain,
    isWithdrawPeriodDragged,
    isGasLimitDragged,
    isDataAvailabilityChainDragged,
    isNetworkDragged,
    setDataAvaibilityChain,
    setGasLimit,
    setDataAvailabilityChainDragged,
    setGasLimitDragged,
    setNetwork,
    setNetworkDragged,
    setWithdrawPeriod,
    setWithdrawPeriodDragged,
  } = useOrderFormStore();

  const { setIdDragging } = useDragMask();

  const fieldMapping: Record<
    string,
    { setValue: (value: any) => void; setDragged: (value: boolean) => void }
  > = React.useMemo(
    () => ({
      [ORDER_FIELD.NETWORK]: {
        setValue: setNetwork,
        setDragged: setNetworkDragged,
      },
      [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
        setValue: setDataAvaibilityChain,
        setDragged: setDataAvailabilityChainDragged,
      },
      [ORDER_FIELD.GAS_LIMIT]: {
        setValue: setGasLimit,
        setDragged: setGasLimitDragged,
      },
      [ORDER_FIELD.WITHDRAW_PERIOD]: {
        setValue: setWithdrawPeriod,
        setDragged: setWithdrawPeriodDragged,
      },
    }),
    [],
  );

  const maskMapping = {};

  const handleDragStart = (event: any) => {
    const { active } = event;
    const [activeKey = ''] = active.id.split('-');

    setIdDragging(activeKey);
  };

  function handleDragEnd(event: any) {
    setIdDragging('');

    const { over, active } = event;

    // Format ID of single field = <key>-<value>

    const [activeKey = ''] = active.id.split('-');
    const [overKey = ''] = (over?.id || '').split('-');
    const overIsFinalDroppable = overKey === 'final';

    // Normal case
    if (over && overIsFinalDroppable) {
      fieldMapping[activeKey as Override].setValue(active.data.current.value);
      fieldMapping[activeKey as Override].setDragged(true);

      if (activeKey === ORDER_FIELD.NETWORK) {
        const data = handleFindData(network);

        if (data && data.length > 0) {
          fieldMapping[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].setValue(
            data[0].value,
          );
        }
      }
    } else {
      fieldMapping[activeKey as Override].setValue(active.data.current.value);
      fieldMapping[activeKey as Override].setDragged(false);
    }

    return;
  }

  const handleValueChange = (key: string, value: any) => {};

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleFindData = (networkSelected: NetworkEnum) => {
    const optionsDataAvailable =
      OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].options;
    const values = optionsDataAvailable?.filter((item) => {
      return item.avalaibleNetworks?.includes(networkSelected);
    });
    return values;
  };

  React.useEffect(() => {
    const convertData = (data: IModelCategory[]) => {
      const newData = data.map((item) => {
        return {
          ...item,
          options: item.options?.map((option) => {
            return {
              ...option,
              value: option.key,
              label: option.title,
              disabled: option.selectable,
            };
          }),
        };
      });

      console.log(
        '🚀 -> file: index_v5.tsx:169 -> newData -> newData ::',
        newData,
      );

      return newData;
    };

    getModelCategories().then((res) => {
      console.log(
        '🚀 -> file: index_v5.tsx:138 -> getModelCategories -> res ::',
        res,
      );
      if (!res) return;

      const form: Record<string, any> = {};

      // set default value
      res.map((item) => {
        form[item.key] = item.options[0].key;
      });

      setData(convertData(res));
      setForm(form);
    });
  }, []);

  return (
    <div className={s.container}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={s.wrapper}>
          <div className={s.inner}>
            <div className={s.left}>
              <p className={s.heading}>Customize your Blockchain</p>
              <div className={s.left_box}>
                <div className={s.left_box_inner}>
                  <SideBar items={data} />
                  <div className={s.left_box_inner_content}>
                    {data?.map((item, index) => {
                      return (
                        <BoxOptionV3
                          {...OrderFormOptions[ORDER_FIELD.NETWORK]}
                          label={item.title}
                          id={item.key}
                        >
                          {item.options ? (
                            <Draggable useMask id={item.key}>
                              <LegoV3
                                background={
                                  OrderFormOptions[ORDER_FIELD.NETWORK]
                                    .background
                                }
                                title={item.title}
                                zIndex={data.length - index}
                              >
                                <DropdownV2
                                  defaultValue={form[item.key]}
                                  options={item.options}
                                  value={form.value}
                                  onChange={handleValueChange}
                                />
                              </LegoV3>
                            </Draggable>
                          ) : null}
                        </BoxOptionV3>
                      );
                    })}

                    {/* <BoxOptionV3
                      {...OrderFormOptions[ORDER_FIELD.NETWORK]}
                      label={OrderFormOptions[ORDER_FIELD.NETWORK].title}
                      id={ORDER_FIELD.NETWORK}
                      first={true}
                      active={isNetworkDragged}
                    >
                      <LeftNetworkLego />
                    </BoxOptionV3>

                    <BoxOptionV3
                      {...OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN]}
                      label={
                        OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN]
                          .title
                      }
                      active={isDataAvailabilityChainDragged}
                      id={ORDER_FIELD.DATA_AVAILABILITY_CHAIN}
                    >
                      <LeftDataAvailabilityLego />
                    </BoxOptionV3>

                    <BoxOptionV3
                      {...OrderFormOptions[ORDER_FIELD.GAS_LIMIT]}
                      label={OrderFormOptions[ORDER_FIELD.GAS_LIMIT].title}
                      id={ORDER_FIELD.GAS_LIMIT}
                      active={isGasLimitDragged}
                    >
                      <Draggable
                        useMask
                        id={ORDER_FIELD.GAS_LIMIT}
                        value={gasLimit}
                        disabled={isGasLimitDragged}
                      >
                        <BlockGasLimitLego isLeft />
                      </Draggable>
                    </BoxOptionV3>

                    <BoxOptionV3
                      {...OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD]}
                      label={
                        OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD].title
                      }
                      id={ORDER_FIELD.WITHDRAW_PERIOD}
                      active={isWithdrawPeriodDragged}
                    >
                      <Draggable
                        useMask
                        id={ORDER_FIELD.WITHDRAW_PERIOD}
                        value={withdrawPeriod}
                        disabled={isWithdrawPeriodDragged}
                      >
                        <WithdrawalTimeLego isLeft />
                      </Draggable>
                    </BoxOptionV3> */}

                    {/* <DragOverlay>
                      {idDragging && (
                        <div>
                          <WithdrawalTimeLego />
                        </div>
                      )}
                    </DragOverlay> */}
                  </div>
                </div>
              </div>
            </div>

            {/* ------------- RIGHT ------------- */}
            <div className={s.right}>
              <Tier />

              <div className={s.right_box}>
                <DroppableV2 id="final" className={s.finalResult}>
                  <LegoV3
                    background={'red'}
                    title="1. Name"
                    label="Name"
                    zIndex={45}
                  >
                    <ComputerNameInput />
                  </LegoV3>

                  {isNetworkDragged && (
                    <Draggable
                      id={ORDER_FIELD.NETWORK + '-dropped'}
                      value={network}
                    >
                      <RightNetworkLegoV2 />
                    </Draggable>
                  )}

                  {isDataAvailabilityChainDragged && (
                    <Draggable
                      id={ORDER_FIELD.DATA_AVAILABILITY_CHAIN + '-dropped'}
                      value={dataAvaibilityChain}
                    >
                      <RightDataAvailabilityLego />
                    </Draggable>
                  )}

                  {isGasLimitDragged && (
                    <Draggable
                      id={ORDER_FIELD.GAS_LIMIT + '-dropped'}
                      value={gasLimit}
                    >
                      <BlockGasLimitLego />
                    </Draggable>
                  )}

                  {isWithdrawPeriodDragged && (
                    <Draggable
                      id={ORDER_FIELD.WITHDRAW_PERIOD + '-dropped'}
                      value={withdrawPeriod}
                    >
                      <WithdrawalTimeLego />
                    </Draggable>
                  )}
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
