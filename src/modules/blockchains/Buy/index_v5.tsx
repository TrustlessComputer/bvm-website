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
    | (IModelCategory & {
        options: {
          value: NetworkEnum;
          label: string;
          disabled: boolean;
        }[];
      })[]
    | null
  >(null);
  const [form, setForm] = React.useState<Record<string, any>>({});

  const orderFormStore = useOrderFormStore();

  const { idDragging, setIdDragging } = useDragMask();

  const fieldMapping: Record<
    string,
    { setValue: (value: any) => void; setDragged: (value: boolean) => void }
  > = React.useMemo(
    () => ({
      [ORDER_FIELD.NETWORK]: {
        value: orderFormStore.network,
        setValue: orderFormStore.setNetwork,
        isNetworkDragged: orderFormStore.isNetworkDragged,
        setDragged: orderFormStore.setNetworkDragged,
      },
      [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
        value: orderFormStore.dataAvaibilityChain,
        setValue: orderFormStore.setDataAvaibilityChain,
        isDataAvailabilityChainDragged:
          orderFormStore.isDataAvailabilityChainDragged,
        setDragged: orderFormStore.setDataAvailabilityChainDragged,
      },
      [ORDER_FIELD.GAS_LIMIT]: {
        value: orderFormStore.gasLimit,
        setValue: orderFormStore.setGasLimit,
        isGasLimitDragged: orderFormStore.isGasLimitDragged,
        setDragged: orderFormStore.setGasLimitDragged,
      },
      [ORDER_FIELD.WITHDRAW_PERIOD]: {
        value: orderFormStore.withdrawPeriod,
        setValue: orderFormStore.setWithdrawPeriod,
        isWithdrawPeriodDragged: orderFormStore.isWithdrawPeriodDragged,
        setDragged: orderFormStore.setWithdrawPeriodDragged,
      },
      [ORDER_FIELD.HARDWARE]: {
        value: orderFormStore.hardware,
        setValue: orderFormStore.setHardware,
        isHardwareDragged: orderFormStore.isHardwareDragged,
        setDragged: orderFormStore.setHardwareDragged,
      },
      [ORDER_FIELD.SETTLEMENT]: {
        value: orderFormStore.settlement,
        setValue: orderFormStore.setSettlement,
        isSettlementDragged: orderFormStore.isSettlementDragged,
        setDragged: orderFormStore.setSettlementDragged,
      },
      [ORDER_FIELD.COMPUTE]: {
        value: orderFormStore.compute,
        setValue: orderFormStore.setCompute,
        isComputeDragged: orderFormStore.isComputeDragged,
        setDragged: orderFormStore.setComputeDragged,
      },
      [ORDER_FIELD.STORAGE]: {
        value: orderFormStore.storage,
        setValue: orderFormStore.setStorage,
        isStorageDragged: orderFormStore.isStorageDragged,
        setDragged: orderFormStore.setStorageDragged,
      },
      [ORDER_FIELD.ZK_PROVER]: {
        value: orderFormStore.zkProver,
        setValue: orderFormStore.setZkProver,
        isZkProverDragged: orderFormStore.isZkProverDragged,
        setDragged: orderFormStore.setZkProverDragged,
      },
      [ORDER_FIELD.DEGEN_APPS]: {
        value: orderFormStore.degenApps,
        setValue: orderFormStore.setDegenApps,
        isDegenAppsDragged: orderFormStore.isDegenAppsDragged,
        setDragged: orderFormStore.setDegenAppsDragged,
      },
      [ORDER_FIELD.GAMING_APPS]: {
        value: orderFormStore.gamingApps,
        setValue: orderFormStore.setGamingApps,
        isGamingAppsDragged: orderFormStore.isGamingAppsDragged,
        setDragged: orderFormStore.setGamingAppsDragged,
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
        const data = handleFindData(form.network);

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
    const optionsDataAvailable = OrderFormOptions.dataAvaibilityChain.options;
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

      // @ts-ignore
      setData(convertData(res));
      setForm(form);
    });
  }, []);
  // dropdowns - slide - module
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
                                background={item.color}
                                title={item.title}
                                zIndex={data.length - index}
                              >
                                <DropdownV2
                                  cb={(value) => {
                                    setForm({
                                      ...form,
                                      [item.key]: value,
                                    });
                                  }}
                                  defaultValue={form[item.key]}
                                  // @ts-ignore
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

                    <DragOverlay>
                      {data?.map((item, index) => {
                        if (item.key !== idDragging) return null;

                        return item.options ? (
                          <Draggable useMask id={item.key}>
                            <LegoV3
                              background={
                                OrderFormOptions[ORDER_FIELD.NETWORK].background
                              }
                              title={item.title}
                              zIndex={data.length - index}
                            >
                              <DropdownV2
                                defaultValue={form[item.key]}
                                // @ts-ignore
                                options={item.options}
                                value={form.value}
                                onChange={handleValueChange}
                              />
                            </LegoV3>
                          </Draggable>
                        ) : null;
                      })}
                      {/* {idDragging && (
                        <div>
                          <WithdrawalTimeLego />
                        </div>
                      )} */}
                    </DragOverlay>
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

                  {data?.map((item, index) => {
                    //  if (fieldMapping[item.key].isDragged)

                    return (
                      <Draggable
                        id={item.key + '-dropped'}
                        value={form[item.key]}
                      >
                        <LegoV3
                          background={item.color}
                          title={item.title}
                          zIndex={data.length - index}
                        >
                          <DropdownV2
                            defaultValue={form[item.key]}
                            // @ts-ignore
                            options={item.options}
                            value={form.value}
                            cb={(value) => {
                              setForm({
                                ...form,
                                [item.key]: value,
                              });
                            }}
                            // onChange={handleValueChange}
                          />
                        </LegoV3>
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
