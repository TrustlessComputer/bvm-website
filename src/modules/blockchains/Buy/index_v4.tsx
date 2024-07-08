import React from 'react';
import BoxOptionV2 from '@/modules/blockchains/Buy/components3/BoxOptionV2';
import { DndContext, useSensor, useSensors } from '@dnd-kit/core';

import {
  ORDER_FIELD,
  useFormOrderStore,
} from '@/modules/blockchains/Buy/stores';
import Tier from '@/modules/blockchains/Buy/components3/Tier';

import LegoV2 from './components3/LegoV2';
import DroppableV2 from './components3/DroppableV2';
import ComputerNameInput from './components3/ComputerNameInput';
import LaunchButton from './components3/LaunchButton';
import Draggable from './components3/Draggable';
import Lego from './components3/Lego';
import Dropdown from './components3/Dropdown';
import { MouseSensor } from './utils';
import { OrderFormOption, OrderFormOptions } from './Buy.data';
import { DATA_PRICING } from '../data_pricing';
import BlockGasLimitLego from './components3/Legos/BlockGasLimitLego';
import WithdrawalTimeLego from './components3/Legos/WithdrawalTimeLego';
import RightNetworkLego from './components3/Legos/RightNetworkLego';

import s from './styles.module.scss';
import LegoParent from './components3/LegoParent';

type Override = (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD];

const BuyPage = () => {
  const { field, setFormField } = useFormOrderStore((state) => state);

  console.log('🚀 ~~ file: index_v4.tsx:32 ~~ BuyPage ~~ field ::', field);

  const boxOptionMapping: Record<
    Override,
    OrderFormOption[Override] & {
      id: Override;
      label: string;
      RightContent?: () => JSX.Element;
      content?: (isLeft?: boolean, children?: React.ReactNode) => JSX.Element;
    }
  > = {
    // [ORDER_FIELD.NETWORK]: {
    //   ...OrderFormOptions[ORDER_FIELD.NETWORK],
    //   id: ORDER_FIELD.NETWORK,
    //   label: OrderFormOptions[ORDER_FIELD.NETWORK].title,
    //   RightContent: () => <RightNetworkLego />,
    // },
    // // @ts-ignore
    // [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
    //   ...OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN],
    //   id: ORDER_FIELD.DATA_AVAILABILITY_CHAIN,
    //   label: OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].title,
    //   RightContent: () => (
    //     <Lego
    //       background={'violet'}
    //       label={DATA_PRICING.availability.sub_title}
    //       isFrist={false}
    //       zIndex={8}
    //       isActive={field[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].dragged}
    //       isLast={false}
    //     >
    //       <Dropdown
    //         cb={setFormField}
    //         defaultValue={field[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].value}
    //         field={ORDER_FIELD.DATA_AVAILABILITY_CHAIN}
    //         networkSelected={field[ORDER_FIELD.NETWORK].value}
    //         options={DATA_PRICING.availability.options}
    //         checkDisable={true}
    //       />
    //     </Lego>
    //   ),
    // },
    // [ORDER_FIELD.GAS_LIMIT]: {
    //   ...OrderFormOptions[ORDER_FIELD.GAS_LIMIT],
    //   id: ORDER_FIELD.GAS_LIMIT,
    //   label: OrderFormOptions[ORDER_FIELD.GAS_LIMIT].title,
    //   content: (isLeft = false) => <BlockGasLimitLego isLeft={isLeft} />,
    // },
    // [ORDER_FIELD.WITHDRAW_PERIOD]: {
    //   ...OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD],
    //   id: ORDER_FIELD.WITHDRAW_PERIOD,
    //   label: OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD].title,
    //   content: (isLeft = false) => <WithdrawalTimeLego isLeft={isLeft} />,
    // },
    nestedData: {
      options: [
        {
          label: 'Value 1',
          keyInField: 'nestedKey1',
          value: 1,
          disabled: false,
          id: 1,
        },
        {
          label: 'Value 2',
          keyInField: 'nestedKey2',
          value: 2,
          disabled: false,
          id: 2,
        },
      ],
      id: 'nestedData',
      label: 'Nested Data',
      content: (isLeft = false, children = null) => (
        <LegoV2
          background={'brown'}
          title="1. Name"
          label="Nested Data"
          zIndex={5}
          first={true}
          parentOfNested
        >
          {children}
        </LegoV2>
      ),
    },
    nestedData2: {
      options: [
        {
          label: '2 - Value 1',
          value: 1,
          keyInField: 'nestedKey1',
          disabled: false,
          id: 1,
        },
        {
          label: '2 - Value 2',
          value: 2,
          keyInField: 'nestedKey2',
          disabled: false,
          id: 2,
        },
      ],
      id: 'nestedData2',
      label: 'Nested Data 2',
      content: (isLeft = false, children = null) => (
        <LegoV2
          parentOfNested
          background={'brown'}
          title="1. Name"
          label="2 - Nested Data"
          zIndex={4}
          first={true}
        >
          {children}
        </LegoV2>
      ),
    },
    // [ORDER_FIELD.CHAIN_NAME]: {
    //   ...OrderFormOptions[ORDER_FIELD.CHAIN_NAME],
    //   id: ORDER_FIELD.CHAIN_NAME,
    //   label: '1. Name',
    //   content: (isLeft = false) => (
    //     <LegoV2
    //       background={'red'}
    //       title="1. Name"
    //       label="Name"
    //       zIndex={23}
    //       first={true}
    //     >
    //       <ComputerNameInput />
    //     </LegoV2>
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

    // Case when the parent of the nested lego is dragged to the final droppable
    if (activeIsParentOfNestedLego) {
      if (over && overIsFinalDroppable) {
        setFormField(
          activeNestedKey,
          field[activeNestedKey as Override].value,
          true,
        );
      } else {
        setFormField(
          activeNestedKey,
          field[activeNestedKey as Override].value,
          false,
        );
      }

      return;
    }

    // Case when the nested lego is dragged to the parent
    if (overIsParentOfNestedLego) {
      if (
        over &&
        overIsParentOfNestedLego &&
        overNestedKey === activeNestedKey
      ) {
        setFormField(activeNestedKey, {
          ...field[activeNestedKey as Override].value,
          [activeKeyInNestedKey]: active.data.current.value,
        });
      } else {
        setFormField(activeNestedKey, {
          ...field[activeNestedKey as Override].value,
          [activeKeyInNestedKey]: null,
        });
      }
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
                  if (key === ORDER_FIELD.CHAIN_NAME) return null;

                  let _content = null;
                  const parentKey = 'parent-' + key;
                  const fieldValue = field[key as Override].value;
                  const isDragged = field[key as Override].dragged;
                  const isNestedLego = typeof fieldValue === 'object';

                  const { label, content, description, options, background } =
                    boxOptionMapping[key as Override];

                  if (content) {
                    if (isNestedLego) {
                      const _children = options?.map((option) => {
                        if (!option.keyInField) return null;

                        if (
                          // @ts-ignore
                          field[key as Override].value[option.keyInField] !==
                          option.value
                        )
                          return null;

                        const id = key + '-' + option.value.toString();

                        return (
                          <Draggable id={id} key={id} value={option.value}>
                            <LegoV2
                              background={background || 'brown'}
                              label={option.label}
                              icon={option.icon}
                              zIndex={23}
                            />
                          </Draggable>
                        );
                      });

                      _content = (
                        <Draggable id={parentKey} key={parentKey}>
                          <DroppableV2 id={parentKey}>
                            {content(false, _children)}
                          </DroppableV2>
                        </Draggable>
                      );
                    } else {
                      _content = (
                        <Draggable value={fieldValue} id={key} key={key}>
                          {content(true)}
                        </Draggable>
                      );
                    }
                  }

                  return (
                    <BoxOptionV2
                      key={key}
                      label={label}
                      id={key}
                      active={isDragged}
                      description={description}
                      last={index === Object.keys(boxOptionMapping).length - 1}
                    >
                      {!isDragged && _content}

                      {options &&
                        options.map((option) => {
                          if (
                            isDragged &&
                            field[key as Override].value.toString() ===
                              option.value.toString()
                          )
                            return null;

                          // prettier-ignore
                          let id = key + '-' + option.value.toString();
                          if (isNestedLego) {
                            id =
                              'child-' +
                              id.split('-')[0] +
                              '-' +
                              option.keyInField +
                              '-' +
                              option.value.toString();
                          }

                          return (
                            <Draggable
                              id={id}
                              key={id}
                              value={option.value}
                              disabled={option.disabled}
                            >
                              <LegoV2
                                key={option.id}
                                background={background}
                                label={option.label}
                                icon={option.icon}
                                zIndex={
                                  (Object.keys(boxOptionMapping).length -
                                    index +
                                    1) *
                                  2
                                }
                                active={field[ORDER_FIELD.NETWORK].dragged}
                                className={option.disabled ? s.disabled : ''}
                              />
                            </Draggable>
                          );
                        })}
                    </BoxOptionV2>
                  );
                })}
                <LegoParent zIndex={11} background="green" label="Nestest " />
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
                    if (key === ORDER_FIELD.CHAIN_NAME) return null;

                    let _content = null;
                    const parentKey = 'parent-' + key + '-dropped';
                    const { content, options, RightContent, background } =
                      boxOptionMapping[key as Override];
                    const isDragged = field[key as Override].dragged;
                    const fieldValue = field[key as Override].value;
                    const isNestedLego = typeof fieldValue === 'object';

                    if (!isDragged) return null;

                    if (content) {
                      if (isNestedLego) {
                        const _children = options?.map((option) => {
                          if (!option.keyInField) return null;

                          if (
                            // @ts-ignore
                            field[key as Override].value[
                              option.keyInField
                            ].toString() !== option.value.toString()
                          )
                            return null;

                          const id =
                            key + '-' + option.value.toString() + '-dropped';

                          return (
                            <Draggable id={id} key={id} value={option.value}>
                              <LegoV2
                                background={background || 'brown'}
                                label={option.label}
                                icon={option.icon}
                                zIndex={23}
                              />
                            </Draggable>
                          );
                        });

                        _content = (
                          <Draggable id={parentKey} key={parentKey}>
                            <DroppableV2 id={parentKey}>
                              {content(false, _children)}
                            </DroppableV2>
                          </Draggable>
                        );
                      } else {
                        _content = (
                          <Draggable value={fieldValue} id={key} key={key}>
                            {content()}
                          </Draggable>
                        );
                      }
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
