import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import React, { useEffect, useRef } from 'react';

import Tier from '@/modules/blockchains/Buy/components3/Tier';

import ComputerNameInput from './components3/ComputerNameInput';
import Draggable from './components3/Draggable';
import DroppableV2 from './components3/DroppableV2';
import LaunchButton from './components3/LaunchButton';
import { MouseSensor } from './utils';
import BoxOptionV3 from './components3/BoxOptionV3';
import SideBar from './components3/SideBar';
import LegoV3 from './components3/LegoV3';
import useDragMask from './stores/useDragMask';
import { getModelCategories } from '@/services/customize-model';
import DropdownV2 from './components3/DropdownV2';
import useOrderFormStoreV3 from './stores/index_v3';

import s from './styles_v5.module.scss';

import gsap from 'gsap';

const BuyPage = () => {
  const [data, setData] = React.useState<
    | (IModelCategory & {
        options: {
          value: any;
          label: string;
          disabled: boolean;
        }[];
      })[]
    | null
  >(null);
  const { field, setField, setPriceBVM, setPriceUSD } = useOrderFormStoreV3();
  const { idDragging, setIdDragging } = useDragMask();
  const refTime = useRef<NodeJS.Timeout>();

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
      setField(activeKey, active.data.current.value, true);
    } else {
      setField(activeKey, active.data.current.value, false);
    }

    return;
  }

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  React.useEffect(() => {
    data?.forEach((item) => {
      const newDefaultValue = item.options.find(
        (option) =>
          option.supportNetwork === field['network']?.value ||
          option.supportNetwork === 'both' ||
          !option.supportNetwork,
      );
      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );

      if (!newDefaultValue) {
        setField(item.key, null, false);
        return;
      }

      if (!currentOption || !newDefaultValue) return;
      if (
        currentOption.supportNetwork === field['network']?.value ||
        currentOption.supportNetwork === 'both' ||
        !currentOption.supportNetwork
      )
        return;

      setField(item.key, newDefaultValue.key, field[item.key].dragged);
    });
  }, [field['network']?.value]);

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
              disabled: !option.selectable || item.disable,
              selectable: option.selectable && !item.disable,
            };
          }),
        };
      });

      return newData;
    };

    getModelCategories().then((res) => {
      if (!res) return;

      // set default value
      res.map((item) => {
        setField(item.key, item.options[0].key);
      });

      // @ts-ignore
      setData(convertData(res));
    });
  }, []);

  React.useEffect(() => {
    const priceUSD =
      data
        ?.map((item) => {
          const currentOption = item.options.find(
            (option) => option.key === field[item.key].value,
          );

          if (!currentOption) return 0;

          const isDisabled =
            !!(
              currentOption.supportNetwork &&
              currentOption.supportNetwork !== 'both' &&
              currentOption.supportNetwork !== field['network']?.value
            ) ||
            (!currentOption.selectable && !field[item.key].dragged);

          if (isDisabled) return 0;

          return currentOption?.priceUSD || 0;
        })
        .reduce((acc, cur) => acc + cur, 0) || 0;

    const priceBVM =
      data
        ?.map((item) => {
          const currentOption = item.options.find(
            (option) => option.key === field[item.key].value,
          );

          if (!currentOption) return 0;

          const isDisabled =
            !!(
              currentOption.supportNetwork &&
              currentOption.supportNetwork !== 'both' &&
              currentOption.supportNetwork !== field['network']?.value
            ) ||
            (!currentOption.selectable && !field[item.key].dragged);

          if (isDisabled) return 0;

          return currentOption?.priceBVM || 0;
        })
        .reduce((acc, cur) => acc + cur, 0) || 0;

    setPriceBVM(priceBVM);
    setPriceUSD(priceUSD);
  }, [field]);

  useEffect(() => {
    const wrapper = document.getElementById('wrapper-data');
    const loop = () => {
      if (wrapper) wrapper.scrollLeft = 0;
    };

    if (idDragging) {
      gsap.ticker.add(loop);
    } else if (refTime.current) {
      if (wrapper) wrapper.scrollLeft = 0;
      gsap.ticker.remove(loop);
    }

    wrapper?.addEventListener('mouseenter', loop);
    return () => {
      if (wrapper) wrapper.scrollLeft = 0;
      gsap.ticker.remove(loop);
      wrapper?.removeEventListener('mouseenter', loop);
    };
  }, [idDragging]);

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
                          key={item.key}
                          disable={item.disable}
                          label={item.title}
                          id={item.key}
                          isRequired={item.required}
                          active={field[item.key].dragged}
                          description={{
                            title: item.title,
                            content: item.tooltip
                          }}
                        >
                          {!field[item.key].dragged &&
                          item.type === 'dropdown' ? (
                            <Draggable
                              useMask
                              id={item.key}
                              key={
                                item.key + field[item.key].dragged.toString()
                              }
                              disabled={field[item.key].dragged}
                              value={field[item.key].value}
                              tooltip={item.tooltip}
                              isLabel={true}
                            >
                              <LegoV3
                                background={item.color}
                                title={item.title}
                                zIndex={data.length - index}
                              >
                                <DropdownV2
                                  cb={(value) => {
                                    setField(
                                      item.key,
                                      value,
                                      field[item.key].dragged,
                                    );
                                  }}
                                  defaultValue={field[item.key].value || ''}
                                  // @ts-ignore
                                  options={item.options}
                                  title={item.title}
                                  value={field[item.key].value}
                                />
                              </LegoV3>
                            </Draggable>
                          ) : (
                            item.options.map((option, opIdx) => {
                              if (
                                (option.key === field[item.key].value &&
                                  field[item.key].dragged) ||
                                item.type === 'dropdown'
                              )
                                return null;

                              const isDisabled =
                                !!(
                                  option.supportNetwork &&
                                  option.supportNetwork !== 'both' &&
                                  option.supportNetwork !==
                                    field['network']?.value
                                ) || !option.selectable;

                              return (
                                <Draggable
                                  key={item.key + '-' + option.key}
                                  id={item.key + '-' + option.key}
                                  useMask
                                  disabled={isDisabled}
                                  isLabel={true}
                                  value={option.key}
                                  tooltip={option.tooltip}
                                >
                                  <LegoV3
                                    background={item.color}
                                    label={option.title}
                                    icon={option?.icon}
                                    zIndex={item.options.length - opIdx}
                                    disabled={isDisabled}
                                  />
                                </Draggable>
                              );
                            })
                          )}
                        </BoxOptionV3>
                      );
                    })}

                    <DragOverlay
                      style={{
                        transition: 'none',
                      }}
                    >
                      {idDragging &&
                        data?.map((item, index) => {
                          if (!idDragging.startsWith(item.key)) return null;

                          if (item.type === 'dropdown') {
                            return (
                              <Draggable
                                useMask
                                id={item.key}
                                value={field[item.key].value}
                                key={item.key}
                              >
                                <LegoV3
                                  background={item.color}
                                  title={item.title}
                                  zIndex={data.length - index}
                                >
                                  <DropdownV2
                                    cb={(value) => {
                                      setField(
                                        item.key,
                                        value,
                                        field[item.key].dragged,
                                      );
                                    }}
                                    defaultValue={field[item.key].value || ''}
                                    // @ts-ignore
                                    options={item.options}
                                    title={item.title}
                                    value={field[item.key].value}
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
                                key={item.key + '-' + option.key}
                                id={item.key + '-' + option.key}
                                useMask
                                value={option.key}
                              >
                                <LegoV3
                                  icon={option.icon}
                                  background={item.color}
                                  label={option.title}
                                  zIndex={item.options.length - opIdx}
                                />
                              </Draggable>
                            );
                          });
                        })}
                    </DragOverlay>
                    <div className={s.hTrigger}></div>
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
                    if (!field[item.key].dragged) return null;
                    const price =
                      item.options.find(
                        (option) => option.key === field[item.key].value,
                      )?.priceUSD || 0;
                    const suffix = price ? `(+${price.toString()}$)` : '';

                    if (item.type === 'dropdown') {
                      return (
                        <Draggable
                          right
                          useMask
                          key={item.key}
                          id={item.key}
                          tooltip={item.tooltip}
                          value={field[item.key].value}
                        >
                          <LegoV3
                            background={item.color}
                            title={item.title}
                            zIndex={data.length - index}
                            label={item.title}
                            suffix={suffix}
                          >
                            <DropdownV2
                              cb={(value) => {
                                setField(
                                  item.key,
                                  value,
                                  field[item.key].dragged,
                                );
                              }}
                              defaultValue={field[item.key].value || ''}
                              // @ts-ignore
                              options={item.options}
                              title={item.title}
                              value={field[item.key].value}
                            />
                          </LegoV3>
                        </Draggable>
                      );
                    }

                    return item.options.map((option, opIdx) => {
                      if (option.key !== field[item.key].value) return null;

                      return (
                        <Draggable
                          right
                          key={item.key + '-' + option.key}
                          id={item.key + '-' + option.key}
                          useMask
                          tooltip={item.tooltip}
                          value={option.key}
                        >
                          <LegoV3
                            background={item.color}
                            label={item.title}
                            zIndex={item.options.length - opIdx}
                            suffix={suffix}
                          >
                            <DropdownV2
                              disabled
                              cb={(value) => {
                                setField(
                                  item.key,
                                  value,
                                  field[item.key].dragged,
                                );
                              }}
                              defaultValue={field[item.key].value || ''}
                              options={[
                                // @ts-ignore
                                item.options.find((o) => o.key === option.key),
                              ]}
                              // @ts-ignore
                              value={field[item.key].value}
                            />
                          </LegoV3>
                        </Draggable>
                      );
                    });
                  })}
                </DroppableV2>

                <LaunchButton data={data} />
              </div>
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default BuyPage;
