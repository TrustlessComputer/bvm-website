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
  const orderFormStore = useOrderFormStore();

  const { idDragging, setIdDragging } = useDragMask();

  const fieldMapping: Record<
    string,
    {
      setValue: (value: any) => void;
      setDragged: (value: boolean) => void;
      isDragged: boolean;
      value: any;
    }
  > = React.useMemo(
    () => ({
      [ORDER_FIELD.NETWORK]: {
        value: orderFormStore.network,
        setValue: orderFormStore.setNetwork,
        isDragged: orderFormStore.isNetworkDragged,
        setDragged: orderFormStore.setNetworkDragged,
      },
      [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
        value: orderFormStore.dataAvaibilityChain,
        setValue: orderFormStore.setDataAvaibilityChain,
        isDragged: orderFormStore.isDataAvailabilityChainDragged,
        setDragged: orderFormStore.setDataAvailabilityChainDragged,
      },
      [ORDER_FIELD.GAS_LIMIT]: {
        value: orderFormStore.gasLimit,
        setValue: orderFormStore.setGasLimit,
        isDragged: orderFormStore.isGasLimitDragged,
        setDragged: orderFormStore.setGasLimitDragged,
      },
      [ORDER_FIELD.WITHDRAW_PERIOD]: {
        value: orderFormStore.withdrawPeriod,
        setValue: orderFormStore.setWithdrawPeriod,
        isDragged: orderFormStore.isWithdrawPeriodDragged,
        setDragged: orderFormStore.setWithdrawPeriodDragged,
      },
      [ORDER_FIELD.HARDWARE]: {
        value: orderFormStore.hardware,
        setValue: orderFormStore.setHardware,
        isDragged: orderFormStore.isHardwareDragged,
        setDragged: orderFormStore.setHardwareDragged,
      },
      [ORDER_FIELD.SETTLEMENT]: {
        value: orderFormStore.settlement,
        setValue: orderFormStore.setSettlement,
        isDragged: orderFormStore.isSettlementDragged,
        setDragged: orderFormStore.setSettlementDragged,
      },
      [ORDER_FIELD.COMPUTE]: {
        value: orderFormStore.compute,
        setValue: orderFormStore.setCompute,
        isDragged: orderFormStore.isComputeDragged,
        setDragged: orderFormStore.setComputeDragged,
      },
      [ORDER_FIELD.STORAGE]: {
        value: orderFormStore.storage,
        setValue: orderFormStore.setStorage,
        isDragged: orderFormStore.isStorageDragged,
        setDragged: orderFormStore.setStorageDragged,
      },
      [ORDER_FIELD.ZK_PROVER]: {
        value: orderFormStore.zkProver,
        setValue: orderFormStore.setZkProver,
        isDragged: orderFormStore.isZkProverDragged,
        setDragged: orderFormStore.setZkProverDragged,
      },
      [ORDER_FIELD.DEGEN_APPS]: {
        value: orderFormStore.degenApps,
        setValue: orderFormStore.setDegenApps,
        isDragged: orderFormStore.isDegenAppsDragged,
        setDragged: orderFormStore.setDegenAppsDragged,
      },
      [ORDER_FIELD.GAMING_APPS]: {
        value: orderFormStore.gamingApps,
        setValue: orderFormStore.setGamingApps,
        isDragged: orderFormStore.isGamingAppsDragged,
        setDragged: orderFormStore.setGamingAppsDragged,
      },
      [ORDER_FIELD.WALLET]: {
        value: orderFormStore.wallet,
        setValue: orderFormStore.setWallet,
        isDragged: orderFormStore.isWalletDragged,
        setDragged: orderFormStore.setWalletDragged,
      },
      [ORDER_FIELD.BRIDGE_APPS]: {
        value: orderFormStore.bridgeApps,
        setValue: orderFormStore.setBridgeApps,
        isDragged: orderFormStore.isBridgeAppsDragged,
        setDragged: orderFormStore.setBridgeAppsDragged,
      },
    }),
    [orderFormStore],
  );

  const maskMapping = {};

  const handleDragStart = (event: any) => {
    const { active } = event;

    setIdDragging(active.id);
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
      console.log(activeKey, active.data.current.value);
      fieldMapping[activeKey as Override].setValue(active.data.current.value);
      fieldMapping[activeKey as Override].setDragged(true);

      if (activeKey === ORDER_FIELD.NETWORK) {
        const data = handleFindData(orderFormStore.network);

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

      return newData;
    };

    getModelCategories().then((res) => {
      if (!res) return;

      const form: Record<string, any> = {};

      // set default value
      res.map((item) => {
        fieldMapping[item.key].setValue(item.options[0].key);
      });

      // @ts-ignore
      setData(convertData(res));
    });
  }, []);
  // dropdowns - slide - module

  console.log('____data', data);
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

                  <div id={'wrapper-data'} className={s.left_box_inner_content}>
                    {data?.map((item, index) => {
                      return (
                        <BoxOptionV3
                          disable={item.disable}
                          {...OrderFormOptions[ORDER_FIELD.NETWORK]}
                          label={item.title}
                          id={item.key}
                          isRequired={item.required}
                        >
                          {item.type === 'dropdown' ? (
                            <Draggable
                              useMask
                              id={item.key}
                              value={fieldMapping[item.key].value}
                            >
                              <LegoV3
                                background={item.color}
                                title={item.title}
                                zIndex={data.length - index}
                              >
                                <DropdownV2
                                  cb={(value) => {
                                    fieldMapping[item.key].setValue(value);
                                  }}
                                  defaultValue={fieldMapping[item.key].value}
                                  // @ts-ignore
                                  options={item.options}
                                  title={item.title}
                                  value={fieldMapping.value}
                                />
                              </LegoV3>{' '}
                            </Draggable>
                          ) : (
                            item.options.map((option, opIdx) => {
                              return (
                                <Draggable
                                  id={item.key + '-' + option.key}
                                  useMask
                                  value={option.key}
                                >
                                  <LegoV3
                                    background={item.color}
                                    label={option.title}
                                    zIndex={item.options.length - opIdx}
                                  />
                                </Draggable>
                              );
                            })
                          )}
                        </BoxOptionV3>
                      );
                    })}

                    <DragOverlay>
                      {idDragging &&
                        data?.map((item, index) => {
                          console.log('🚀 -> idDragging', idDragging);

                          if (!idDragging.startsWith(item.key)) return null;

                          if (item.type === 'dropdown') {
                            return (
                              <Draggable
                                useMask
                                id={item.key}
                                value={fieldMapping[item.key].value}
                              >
                                <LegoV3
                                  background={item.color}
                                  title={item.title}
                                  zIndex={data.length - index}
                                >
                                  <DropdownV2
                                    cb={(value) => {
                                      fieldMapping[item.key].setValue(value);
                                    }}
                                    defaultValue={fieldMapping[item.key].value}
                                    // @ts-ignore
                                    options={item.options}
                                    title={item.title}
                                    value={fieldMapping[item.key].value}
                                  />
                                </LegoV3>{' '}
                              </Draggable>
                            );
                          }

                          return item.options.map((option, opIdx) => {
                            if (idDragging !== item.key + '-' + option.key)
                              return null;

                            return (
                              <Draggable
                                id={item.key + '-' + option.key}
                                useMask
                                value={option.key}
                              >
                                <LegoV3
                                  background={item.color}
                                  label={option.title}
                                  zIndex={item.options.length - opIdx}
                                />
                              </Draggable>
                            );
                          });
                        })}
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
                    background={'#FF3A3A'}
                    title="1. Name"
                    label="Name"
                    zIndex={45}
                  >
                    <ComputerNameInput />
                  </LegoV3>

                  {data?.map((item, index) => {
                    if (!fieldMapping[item.key].isDragged) return null;

                    return (
                      <Draggable
                        id={item.key + '-dropped'}
                        value={fieldMapping[item.key].value}
                        useMask
                      >
                        <LegoV3
                          label={item.title}
                          background={item.color}
                          title={item.title}
                          zIndex={data.length - index}
                        >
                          <DropdownV2
                            defaultValue={fieldMapping[item.key].value}
                            // @ts-ignore
                            options={item.options}
                            value={fieldMapping[item.key].value}
                            cb={(value) => {
                              fieldMapping[item.key].setValue(value);
                            }}
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
