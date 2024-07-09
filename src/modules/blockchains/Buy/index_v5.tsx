import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import React from 'react';

import Tier from '@/modules/blockchains/Buy/components3/Tier';
import {
  ORDER_FIELD,
  useFormOrderStore,
} from '@/modules/blockchains/Buy/stores';

import { OrderFormOption, OrderFormOptions } from './Buy.data';
import ComputerNameInput from './components3/ComputerNameInput';
import Draggable from './components3/Draggable';
import DroppableV2 from './components3/DroppableV2';
import LaunchButton from './components3/LaunchButton';
import { getChildId, getParentId, MouseSensor } from './utils';

import BoxOptionV3 from './components3/BoxOptionV3';
import LegoParent from './components3/LegoParent';
import s from './styles_v5.module.scss';
import SideBar from './components3/SideBar';
import LegoV3 from './components3/LegoV3';
import Lego from './components3/Lego';
import Dropdown from './components3/Dropdown';
import { DATA_PRICING } from '../data_pricing';
import BlockGasLimitLego from './components3/Legos/BlockGasLimitLego';
import WithdrawalTimeLego from './components3/Legos/WithdrawalTimeLego';
import RightNetworkLego from './components3/Legos/RightNetworkLego';
import ScrollMore from '../../../components/ScrollMore/index';

type Override = (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD];

const BuyPage = () => {
  const { field, setFormField } = useFormOrderStore((state) => state);

  const boxOptionMapping: Record<
    Override,
    OrderFormOption[Override] & {
      id: Override;
      label: string;
      RightContent?: () => JSX.Element;
      content?: (isLeft?: boolean, children?: React.ReactNode) => JSX.Element;
    }
  > = {
    [ORDER_FIELD.CHAIN_NAME]: {
      ...OrderFormOptions[ORDER_FIELD.CHAIN_NAME],
      id: ORDER_FIELD.CHAIN_NAME,
      label: '1. Name',
      content: (isLeft = false) => (
        <LegoV3
          background={'red'}
          title="1. Name"
          label="Name"
          zIndex={23}
          first={true}
        >
          <ComputerNameInput />
        </LegoV3>
      ),
    },
    [ORDER_FIELD.NETWORK]: {
      ...OrderFormOptions[ORDER_FIELD.NETWORK],
      id: ORDER_FIELD.NETWORK,
      label: OrderFormOptions[ORDER_FIELD.NETWORK].subTitle,
      RightContent: () => <RightNetworkLego />,
    },
    // [ORDER_FIELD.COMPUTED]: {
    //   ...OrderFormOptions[ORDER_FIELD.COMPUTED],
    //   id: ORDER_FIELD.COMPUTED,
    //   label: OrderFormOptions[ORDER_FIELD.COMPUTED].subTitle,
    //   RightContent: () => (
    //     <LegoV3
    //       background={OrderFormOptions[ORDER_FIELD.COMPUTED].background}
    //       label={OrderFormOptions[ORDER_FIELD.COMPUTED].subTitle}
    //       zIndex={7}
    //       active={field[ORDER_FIELD.COMPUTED].dragged}
    //     >
    //       <Dropdown
    //         cb={setFormField}
    //         defaultValue={field[ORDER_FIELD.COMPUTED].value}
    //         field={ORDER_FIELD.COMPUTED}
    //         networkSelected={field[ORDER_FIELD.NETWORK].value}
    //         options={OrderFormOptions[ORDER_FIELD.COMPUTED].options}
    //         checkDisable={true}
    //       />
    //     </LegoV3>
    //   ),
    // },
    // [ORDER_FIELD.STORAGE]: {
    //   ...OrderFormOptions[ORDER_FIELD.STORAGE],
    //   id: ORDER_FIELD.STORAGE,
    //   label: OrderFormOptions[ORDER_FIELD.STORAGE].subTitle,
    //   RightContent: () => (
    //     <LegoV3
    //       background={OrderFormOptions[ORDER_FIELD.STORAGE].background}
    //       label={OrderFormOptions[ORDER_FIELD.STORAGE].subTitle}
    //       zIndex={23}
    //       active={field[ORDER_FIELD.STORAGE].dragged}
    //     >
    //       <Dropdown
    //         cb={setFormField}
    //         defaultValue={field[ORDER_FIELD.STORAGE].value}
    //         field={ORDER_FIELD.STORAGE}
    //         networkSelected={field[ORDER_FIELD.STORAGE].value}
    //         options={OrderFormOptions[ORDER_FIELD.STORAGE].options}
    //         checkDisable={true}
    //       />
    //     </LegoV3>
    //   ),
    // },
    // [ORDER_FIELD.SETTLEMENT]: {
    //   ...OrderFormOptions[ORDER_FIELD.SETTLEMENT],
    //   id: ORDER_FIELD.SETTLEMENT,
    //   label: OrderFormOptions[ORDER_FIELD.SETTLEMENT].subTitle,
    //   RightContent: () => (
    //     <LegoV3
    //       background={OrderFormOptions[ORDER_FIELD.SETTLEMENT].background}
    //       label={OrderFormOptions[ORDER_FIELD.SETTLEMENT].subTitle}
    //       zIndex={23}
    //       active={field[ORDER_FIELD.SETTLEMENT].dragged}
    //     >
    //       <Dropdown
    //         cb={setFormField}
    //         defaultValue={field[ORDER_FIELD.SETTLEMENT].value}
    //         field={ORDER_FIELD.SETTLEMENT}
    //         networkSelected={field[ORDER_FIELD.SETTLEMENT].value}
    //         options={OrderFormOptions[ORDER_FIELD.SETTLEMENT].options}
    //         checkDisable={true}
    //       />
    //     </LegoV3>
    //   ),
    // },

    // [ORDER_FIELD.SYSTEMAPPS]: {
    //   ...OrderFormOptions[ORDER_FIELD.SYSTEMAPPS],
    //   id: ORDER_FIELD.SYSTEMAPPS,
    //   label: OrderFormOptions[ORDER_FIELD.SYSTEMAPPS].subTitle,
    //   content: (isLeft = false) => (
    //     <LegoV3
    //       background={OrderFormOptions[ORDER_FIELD.SYSTEMAPPS].background}
    //       label={OrderFormOptions[ORDER_FIELD.SYSTEMAPPS].subTitle}
    //       zIndex={23}
    //       active={field[ORDER_FIELD.SYSTEMAPPS].dragged}
    //     />
    //   ),

    // },
    // [ORDER_FIELD.BRIDGEAPPS]: {
    //   ...OrderFormOptions[ORDER_FIELD.BRIDGEAPPS],
    //   id: ORDER_FIELD.BRIDGEAPPS,
    //   label: OrderFormOptions[ORDER_FIELD.BRIDGEAPPS].title,
    //   content: (isLeft = false, children = null) => (
    //     <LegoV3
    //       background={'blue'}
    //       title={OrderFormOptions[ORDER_FIELD.BRIDGEAPPS].title}
    //       label={OrderFormOptions[ORDER_FIELD.BRIDGEAPPS].title}
    //       zIndex={5}
    //       first={true}
    //     >
    //       {children}
    //     </LegoV3>
    //   ),
    //   RightContent: () => (
    //     <LegoV3
    //       background={OrderFormOptions[ORDER_FIELD.BRIDGEAPPS].background}
    //       label={OrderFormOptions[ORDER_FIELD.BRIDGEAPPS].subTitle}
    //       zIndex={23}
    //       active={field[ORDER_FIELD.BRIDGEAPPS].dragged}
    //     >
    //       <Dropdown
    //         cb={setFormField}
    //         defaultValue={field[ORDER_FIELD.BRIDGEAPPS].value}
    //         field={ORDER_FIELD.BRIDGEAPPS}
    //         networkSelected={field[ORDER_FIELD.BRIDGEAPPS].value}
    //         options={OrderFormOptions[ORDER_FIELD.BRIDGEAPPS].options}
    //         checkDisable={true}
    //       />
    //     </LegoV3>
    //   ),
    // },
    // [ORDER_FIELD.WALLET]: {
    //   ...OrderFormOptions[ORDER_FIELD.WALLET],
    //   id: ORDER_FIELD.WALLET,
    //   label: OrderFormOptions[ORDER_FIELD.WALLET].title,
    //   // content: (isLeft = false, children = null) => (
    //   //   <LegoV3
    //   //     background={OrderFormOptions[ORDER_FIELD.WALLET].background}
    //   //     title={OrderFormOptions[ORDER_FIELD.WALLET].title}
    //   //     label={OrderFormOptions[ORDER_FIELD.WALLET].subTitle}
    //   //     zIndex={23}
    //   //   >
    //   //     {children}
    //   //   </LegoV3>
    //   // ),

    //   RightContent: () => (
    //     <LegoV3
    //       background={OrderFormOptions[ORDER_FIELD.WALLET].background}
    //       label={OrderFormOptions[ORDER_FIELD.WALLET].subTitle}
    //       zIndex={23}
    //       active={field[ORDER_FIELD.WALLET].dragged}
    //     >
    //       <Dropdown
    //         cb={setFormField}
    //         defaultValue={field[ORDER_FIELD.WALLET].value}
    //         field={ORDER_FIELD.WALLET}
    //         networkSelected={field[ORDER_FIELD.NETWORK].value}
    //         options={OrderFormOptions[ORDER_FIELD.WALLET].options}
    //         checkDisable={true}
    //       />
    //     </LegoV3>
    //   ),
    // },
    // [ORDER_FIELD.DEGENAPPS]: {
    //   ...OrderFormOptions[ORDER_FIELD.DEGENAPPS],
    //   id: ORDER_FIELD.DEGENAPPS,
    //   label: OrderFormOptions[ORDER_FIELD.DEGENAPPS].title,
    //   content: (isLeft = false, children = null) => (
    //     <LegoV3
    //       background={'blue'}
    //       title={OrderFormOptions[ORDER_FIELD.DEGENAPPS].title}
    //       label={OrderFormOptions[ORDER_FIELD.DEGENAPPS].title}
    //       zIndex={5}
    //       first={true}
    //     >
    //       {children}
    //     </LegoV3>
    //   ),
    //   RightContent: () => (
    //     <LegoV3
    //       background={OrderFormOptions[ORDER_FIELD.DEGENAPPS].background}
    //       label={OrderFormOptions[ORDER_FIELD.DEGENAPPS].subTitle}
    //       zIndex={23}
    //       active={field[ORDER_FIELD.DEGENAPPS].dragged}
    //     >
    //       <Dropdown
    //         cb={setFormField}
    //         defaultValue={field[ORDER_FIELD.DEGENAPPS].value}
    //         field={ORDER_FIELD.DEGENAPPS}
    //         networkSelected={field[ORDER_FIELD.NETWORK].value}
    //         options={OrderFormOptions[ORDER_FIELD.DEGENAPPS].options}
    //         checkDisable={true}
    //       />
    //     </LegoV3>
    //   ),
    // },
    [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
      ...OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN],
      id: ORDER_FIELD.DATA_AVAILABILITY_CHAIN,
      label: OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].title,
      RightContent: () => (
        <LegoV3
          background={'violet'}
          label={DATA_PRICING.availability.sub_title}
          zIndex={8}
          active={field[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].dragged}
        >
          <Dropdown
            cb={setFormField}
            defaultValue={field[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].value}
            field={ORDER_FIELD.DATA_AVAILABILITY_CHAIN}
            networkSelected={field[ORDER_FIELD.NETWORK].value}
            options={DATA_PRICING.availability.options}
            checkDisable={true}
          />
        </LegoV3>
      ),
    },

    [ORDER_FIELD.GAS_LIMIT]: {
      ...OrderFormOptions[ORDER_FIELD.GAS_LIMIT],
      id: ORDER_FIELD.GAS_LIMIT,
      label: OrderFormOptions[ORDER_FIELD.GAS_LIMIT].title,
      content: (isLeft = false) => <BlockGasLimitLego isLeft={isLeft} />,
    },
    [ORDER_FIELD.WITHDRAW_PERIOD]: {
      ...OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD],
      id: ORDER_FIELD.WITHDRAW_PERIOD,
      label: OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD].title,
      content: (isLeft = false) => <WithdrawalTimeLego isLeft={isLeft} />,
    },

    // [ORDER_FIELD.DEFI]: {
    //   ...OrderFormOptions[ORDER_FIELD.DEFI],
    //   id: 'defi',
    //   label: OrderFormOptions[ORDER_FIELD.DEFI].subTitle,
    //   backgroundParent: OrderFormOptions[ORDER_FIELD.DEFI].backgroundParent,

    //   content: (isLeft = false, children = null) => (
    //     <LegoV3
    //       background={'brown'}
    //       title="1. Name"
    //       label="Nested Data"
    //       zIndex={5}
    //       first={true}
    //       parentOfNested
    //     >
    //       {children}
    //     </LegoV3>
    //   ),
    // },
  };

  function handleDragEnd(event: any) {
    const { over, active } = event;

    const [activeKey = '', activeNestedKey = '', activeKeyInNestedKey = ''] =
      active.id.split('-');
    const [overKey = '', overNestedKey = ''] = over?.id.split('-');
    const overIsFinalDroppable = overKey === 'final';
    const overIsParentOfNestedLego = overKey === 'parent';
    const activeIsParentOfNestedLego = activeKey === 'parent';

    // Normal case
    if (typeof field[activeNestedKey as Override]?.value !== 'object') {
      if (over && overIsFinalDroppable) {
        setFormField(activeKey, active.data.current.value, true);
      } else {
        setFormField(activeKey, active.data.current.value, false);
      }

      return;
    }

    if (activeIsParentOfNestedLego && overIsParentOfNestedLego) return;

    if (activeIsParentOfNestedLego) {
      const newData: Record<string, any> = {};

      for (const key in field[activeNestedKey as Override].value as any) {
        newData[key] = null;
      }

      if (over && !overIsFinalDroppable) {
        setFormField(activeNestedKey, newData as any, false);
      }

      return;
    }

    const draggedToEmpty = !(
      over &&
      (overIsFinalDroppable || overIsParentOfNestedLego)
    );
    const newData = {
      ...(field[activeNestedKey as Override].value as any),
      [activeKeyInNestedKey]: draggedToEmpty ? null : active.data.current.value,
    };
    const someFieldsFilled = Object.values(newData).some(
      (field) => field !== null,
    );

    if (!activeIsParentOfNestedLego) {
      setFormField(activeNestedKey, newData, someFieldsFilled);
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
                <div className={s.left_box_inner}>
                  <SideBar />
                  <div className={s.left_box_inner_content}>
                    {Object.keys(boxOptionMapping).map((key, indexWrap) => {
                      if (key === ORDER_FIELD.CHAIN_NAME) return null;

                      let _content = null;
                      const parentKey = getParentId(key);
                      const fieldValue = field[key as Override].value;
                      const isDragged = field[key as Override].dragged;
                      const isNestedLego = typeof fieldValue === 'object';

                      const {
                        label,
                        content,
                        description,
                        options,
                        background,
                      } = boxOptionMapping[key as Override];

                      if (isNestedLego) {
                        //
                      } else if (content) {
                        _content = (
                          <Draggable
                            value={fieldValue}
                            id={key}
                            key={key}
                            index={indexWrap}
                          >
                            {content(true)}
                          </Draggable>
                        );
                      }
                      return (
                        <BoxOptionV3
                          key={key}
                          label={label}
                          id={key}
                          active={isDragged}
                          description={description}
                          first={indexWrap === 1}
                        >
                          {_content}

                          {options &&
                            options.map((option) => {
                              // if (!option.keyInField) return null;
                              // if (
                              //   isDragged &&
                              //   field[key as Override].value.toString() ===
                              //     option.value.toString()
                              // )
                              //   return null;

                              let id = key + '-' + option.value.toString();
                              // @ts-ignore
                              // prettier-ignore
                              if (isNestedLego && field[key as Override].value[option.keyInField]?.toString() === option.value.toString()) return null;
                              // prettier-ignore
                              if (!isNestedLego && isDragged && field[key as Override].value.toString() === option.value.toString()) return null;

                              if (isNestedLego) {
                                id = getChildId(
                                  key,
                                  option.keyInField || '',
                                  option.value,
                                );
                              }

                              return (
                                <Draggable
                                  id={id}
                                  key={id}
                                  value={option.value}
                                  disabled={option.isDisabled}
                                >
                                  <LegoV3
                                    key={option.id}
                                    background={background}
                                    label={option.label}
                                    icon={option.icon}
                                    zIndex={
                                      (Object.keys(boxOptionMapping).length -
                                        1) *
                                      2
                                    }
                                    className={
                                      option.isDisabled ? s.disabled : ''
                                    }
                                  />
                                </Draggable>
                              );
                            })}
                        </BoxOptionV3>
                      );
                    })}
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

                  {Object.keys(boxOptionMapping).map((key, indexWrap) => {
                    if (key === ORDER_FIELD.CHAIN_NAME) return null;

                    let _content = null;
                    const parentKey = getParentId(key, 'dropped');
                    const {
                      content,
                      options,
                      RightContent,
                      background,
                      backgroundParent,
                      label,
                    } = boxOptionMapping[key as Override];
                    const isDragged = field[key as Override].dragged;
                    const fieldValue = field[key as Override].value;
                    const isNestedLego = typeof fieldValue === 'object';

                    if (!isDragged) return null;

                    if (isNestedLego) {
                      const _children = options?.map((option, index) => {
                        if (!option.keyInField) return null;

                        if (
                          // @ts-ignore
                          field[key as Override].value[
                            option.keyInField
                          ]?.toString() !== option.value.toString()
                        )
                          return null;

                        const id = getChildId(
                          key,
                          option.keyInField,
                          option.value,
                          'dropped',
                        );

                        return (
                          <Draggable id={id} key={id} value={option.value}>
                            <LegoV3
                              background={background}
                              label={option.label}
                              icon={option.icon}
                              zIndex={-index + 10}
                            />
                          </Draggable>
                        );
                      });

                      _content = (
                        <Draggable id={parentKey} key={parentKey}>
                          <DroppableV2 id={parentKey}>
                            <LegoParent
                              background={backgroundParent || 'orange'} // TODO
                              label={label}
                              zIndex={
                                1
                                // -indexWrap +
                                // (options?.length as number) +
                                // 2 * 10
                              }
                            >
                              {_children}
                            </LegoParent>
                          </DroppableV2>
                        </Draggable>
                      );
                    } else if (content) {
                      _content = (
                        <Draggable
                          value={fieldValue}
                          id={key + '-dropped'}
                          key={key + '-dropped'}
                        >
                          {content()}
                        </Draggable>
                      );
                    }

                    if (options && !isNestedLego) {
                      return options.map((option) => {
                        if (
                          field[key as Override].value.toString() !==
                            option.value.toString() ||
                          !RightContent
                        )
                          return null;

                        const id =
                          key + '-' + option.value.toString() + '-dropped';

                        return (
                          <Draggable id={id} key={id} value={option.value}>
                            <RightContent />
                          </Draggable>
                        );
                      });
                    }

                    return _content;
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
