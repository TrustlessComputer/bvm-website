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
import { useSearchParams } from 'next/navigation';
import { FAKE_DATA_PACKAGE } from './TemplateModal/data';
import SidebarV2 from './components3/SideBarV2';
import TierV2 from './components3/TierV2';
import toast from 'react-hot-toast';

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
  const [originalData, setOriginalData] = React.useState<
    IModelCategory[] | null
  >(null);
  const { field, setField, priceBVM, priceUSD, setPriceBVM, setPriceUSD } =
    useOrderFormStoreV3();
  const { idDragging, setIdDragging } = useDragMask();
  const searchParams = useSearchParams();
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

    if (
      active.data.current.value !== field[activeKey].value &&
      (!over || (over && !overIsFinalDroppable))
    )
      return;

    if (
      active.data.current.value !== field[activeKey].value &&
      field[activeKey].dragged
    ) {
      toast.error('Please drag back to the left side to change the value', {
        icon: null,
        style: {
          borderColor: 'blue',
          color: 'blue',
        },
      });
      return;
    }

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

  const setValueOfPackage = (packageId: number | string | null) => {
    if (!packageId?.toString()) return;

    // set default value for package
    const templateData =
      FAKE_DATA_PACKAGE.find((item) => item.id === packageId?.toString())
        ?.data || [];

    templateData.forEach((field) => {
      setField(field.key, field.value?.key || null, field.value ? true : false);
    });
  };

  React.useEffect(() => {
    data?.forEach((item) => {
      const newDefaultValue = item.options.find(
        (option) =>
          (option.supportNetwork === field['network']?.value ||
            option.supportNetwork === 'both' ||
            !option.supportNetwork) &&
          option.selectable &&
          !item.disable,
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
        (currentOption.supportNetwork === field['network']?.value ||
          currentOption.supportNetwork === 'both' ||
          !currentOption.supportNetwork) &&
        currentOption.selectable &&
        !item.disable
      )
        return;

      setField(item.key, newDefaultValue.key, field[item.key].dragged);
    });
  }, [field['network']?.value]);

  React.useEffect(() => {
    const _package = searchParams.get('package');

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

      // re-order data
      const _res = res.sort((a, b) => a.order - b.order);

      // set default value
      _res.forEach((item) => {
        setField(item.key, item.options[0].key);
      });

      // @ts-ignore
      setData(convertData(_res));
      setOriginalData(_res);
      setValueOfPackage(Number(_package));
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
            // prettier-ignore
            !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
          // prettier-ignore
          (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
          (item.required && !field[item.key].dragged) ||
          item.disable ||
          !currentOption.selectable;

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
            // prettier-ignore
            !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
            // prettier-ignore
            (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
            (item.required && !field[item.key].dragged) ||
            item.disable ||
            !currentOption.selectable;

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
                  <div className={s.left_box_inner_sidebar}>
                    <SidebarV2 items={data} />
                  </div>

                  <div id={'wrapper-data'} className={s.left_box_inner_content}>
                    {data?.map((item, index) => {
                      const currentPrice =
                        item.options.find(
                          (option) => option.key === field[item.key].value,
                        )?.priceUSD || 0;
                      // const suffix = price ? `(+${price.toString()}$)` : '';

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
                            content: item.tooltip,
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
                            item.options.map((option, optIdx) => {
                              let _price = option.priceUSD;
                              let operator = '+';
                              let suffix =
                                _price > 0 ? `(+${_price.toString()}$)` : '';

                              if (field[item.key].dragged) {
                                _price = option.priceUSD - currentPrice;
                                operator = _price > 0 ? '+' : '-';
                                suffix = _price
                                  ? `(${operator}${Math.abs(
                                      _price,
                                    ).toString()}$)`
                                  : '';
                              }

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
                                    labelInLeft
                                    background={item.color}
                                    label={option.title}
                                    icon={option?.icon}
                                    zIndex={item.options.length - optIdx}
                                    disabled={isDisabled}
                                    suffix={suffix}
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
                                  label={item.title}
                                  background={item.color}
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
                                  labelInLeft
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
              <TierV2 />

              <div className={s.right_box}>
                <DroppableV2 id="final" className={s.finalResult}>
                  <LegoV3
                    background={'#FF3A3A'}
                    label="Name"
                    labelInLeft
                    zIndex={45}
                  >
                    <ComputerNameInput />
                  </LegoV3>

                  {data?.map((item, index) => {
                    if (!field[item.key].dragged) return null;

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
                            labelInRight={option.confuseWord}
                            zIndex={item.options.length - opIdx}
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
                                option,
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

                <div className={s.right_box_footer}>
                  <div className={s.right_box_footer_left}>
                    <h6 className={s.right_box_footer_left_title}>
                      Total price
                    </h6>
                    <h4 className={s.right_box_footer_left_content}>
                      ${priceUSD.toFixed(2)}
                      {'/'}Month {'(~'}
                      {priceBVM.toFixed(2)} BVM
                      {')'}
                    </h4>
                  </div>

                  <LaunchButton data={data} originalData={originalData} />
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
