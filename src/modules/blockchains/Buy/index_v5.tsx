import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { getModelCategories, getTemplates } from '@/services/customize-model';

import BoxOptionV3 from './components3/BoxOptionV3';
import ComputerNameInput from './components3/ComputerNameInput';
import Draggable from './components3/Draggable';
import DropdownV2 from './components3/DropdownV2';
import DroppableV2 from './components3/DroppableV2';
import LaunchButton from './components3/LaunchButton';
import LegoParent from './components3/LegoParent';
import LegoV3 from './components3/LegoV3';
import SidebarV2 from './components3/SideBarV2';
import TierV2 from './components3/TierV2';
import useOrderFormStoreV3 from './stores/index_v3';
import useDragMask from './stores/useDragMask';
import s from './styles_v5.module.scss';
import { MouseSensor } from './utils';
import { formatCurrencyV2 } from '@/utils/format';
import BaseModal from './components3/Modal';
import { Button } from '@chakra-ui/react';

const BuyPage = () => {
  const [data, setData] = React.useState<
    | (IModelCategory & {
        options: IModelCategory['options'] &
          {
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
  const [templates, setTemplates] = React.useState<Array<
    IModelCategory[]
  > | null>(null);
  const { field, setField, priceBVM, priceUSD, setPriceBVM, setPriceUSD } =
    useOrderFormStoreV3();
  const { idDragging, setIdDragging, rightDragging, setRightDragging } =
    useDragMask();
  const searchParams = useSearchParams();
  const refTime = useRef<NodeJS.Timeout>();
  const [showShadow, setShowShadow] = useState<string>('');
  const [isShowModal, setIsShowModal] = React.useState(false);

  const handleDragStart = (event: any) => {
    const { active } = event;
    const [activeKey = '', activeSuffix1 = '', activeSuffix2] =
      active.id.split('-');

    if (activeSuffix2 === 'right') {
      setRightDragging(true);
    }

    setIdDragging(active.id);
  };

  function handleDragEnd(event: any) {
    setIdDragging('');
    setRightDragging(false);

    const { over, active } = event;

    // Format ID of single option = <key>-<value>
    // Format ID of parent option = <key>-parent-<suffix>
    const [activeKey = '', activeSuffix1 = '', activeSuffix2] =
      active.id.split('-');
    const [overKey = '', overSuffix = ''] = (over?.id || '').split('-');
    const overIsParentOfActiveDroppable =
      overKey === activeKey && overSuffix === 'droppable';
    const overIsFinalDroppable = overKey === 'final';
    const overIsParentDroppable =
      !overIsFinalDroppable &&
      overSuffix === 'droppable' &&
      data?.find((item) => item.key === overKey)?.multiChoice;
    const activeIsParent =
      data?.find((item) => item.key === activeKey)?.multiChoice &&
      activeSuffix1 === 'parent';
    const isMultiChoice = data?.find(
      (item) => item.key === activeKey,
    )?.multiChoice;

    if (!isMultiChoice) {
      if (
        active.data.current.value !== field[activeKey].value &&
        (!over || (over && !overIsFinalDroppable))
      ) {
        return;
      }

      if (
        active.data.current.value !== field[activeKey].value &&
        field[activeKey].dragged
      ) {
        setShowShadow(field[activeKey].value as string);
        toast.error('Remove existing module first.', {
          icon: null,
          style: {
            borderColor: 'blue',
            color: 'blue',
          },
          duration: 3000,
        });
        setTimeout(() => {
          setShowShadow('');
        }, 500);
        return;
      }

      // Normal case
      if (over && overIsFinalDroppable) {
        setField(activeKey, active.data.current.value, true);
      } else {
        if (over && overIsParentDroppable) return;
        setField(activeKey, active.data.current.value, false);
      }

      return;
    }

    // Active is parent and drag to the left side
    if (
      activeIsParent &&
      (!over || (over && !overIsFinalDroppable && !overIsParentDroppable))
    ) {
      setField(activeKey, [], false);
      return;
    }

    // Multi choice case
    if (over && (overIsFinalDroppable || overIsParentOfActiveDroppable)) {
      const currentValues = (field[activeKey].value || []) as string[];
      const newValue = [...currentValues, active.data.current.value];

      if (currentValues.includes(active.data.current.value)) return;

      setField(activeKey, newValue, true);
    } else {
      const currentValues = field[activeKey].value as string[];
      const newValue = currentValues.filter(
        (value) => value !== active.data.current.value,
      );

      setField(activeKey, newValue, newValue.length > 0);
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const convertData = (data: IModelCategory[]) => {
    const newData = data?.map((item) => {
      return {
        ...item,
        options: item.options?.map((option) => {
          return {
            ...option,
            value: option.key,
            label: option.title,
            disabled: !option.selectable || item.disable,
          };
        }),
      };
    });

    return newData || [];
  };

  const setValueOfPackage = (packageId: number | string | null) => {
    if (!packageId?.toString()) return;

    // set default value for package
    const templateData = (templates?.[Number(packageId)] ||
      []) as IModelCategory[];
    const fieldsNotInTemplate = data?.filter(
      (item) => !templateData.find((temp) => temp.key === item.key),
    );

    templateData.forEach((field) => {
      if (field.multiChoice) {
        setField(
          field.key,
          field.options.map((option) => option.key),
          field.options[0] ? true : false,
        );
      } else {
        setField(
          field.key,
          field.options[0].key || null,
          field.options[0] ? true : false,
        );
      }
    });
    fieldsNotInTemplate?.forEach((field) => {
      setField(field.key, null, false);
    });
  };

  const fetchData = async () => {
    const modelCategories = (await getModelCategories()) || [];
    const _modelCategories = modelCategories.sort((a, b) => a.order - b.order);
    _modelCategories.forEach((item) => {
      setField(item.key, null);
    });
    setData(convertData(_modelCategories));
    setOriginalData(_modelCategories);

    const templates = (await getTemplates()) || [];
    setTemplates(templates);
  };

  const onLoadOldForm = () => {
    setIsShowModal(false);

    const oldForm = localStorage.getItem('bvm.customize-form') || `[]`;
    const form = JSON.parse(oldForm) as IModelCategory[];

    const fieldsNotInForm = data?.filter(
      (item) => !form.find((field) => field.key === item.key),
    );

    fieldsNotInForm?.forEach((item) => {
      setField(item.key, null, false);
    });

    form.forEach((item) => {
      if (item.multiChoice) {
        setField(
          item.key,
          item.options.map((opt) => opt.key),
          true,
        );
      } else {
        setField(item.key, item.options[0].key, true);
      }
    });
  };

  const onIgnoreOldForm = () => {
    setIsShowModal(false);
    localStorage.removeItem('bvm.customize-form');

    const packageId = searchParams.get('package') || '-1';

    setValueOfPackage(Number(packageId));
  };

  React.useEffect(() => {
    data?.forEach((item) => {
      if (item.multiChoice) {
        const currentValues = (field[item.key].value || []) as string[];
        const newValues = currentValues.filter((value) => {
          const option = item.options.find((opt) => opt.key === value);

          if (!option) return false;

          const isDisabled =
            !!(
              option.supportNetwork &&
              option.supportNetwork !== 'both' &&
              option.supportNetwork !== field['network']?.value
            ) || !option.selectable;

          return !isDisabled;
        });

        if (newValues.length === 0) {
          setField(item.key, null, false);
          return;
        }

        setField(item.key, newValues, field[item.key].dragged);
        return;
      }

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
    fetchData();
  }, []);

  React.useEffect(() => {
    const packageId = searchParams.get('package') || '-1';
    const oldForm = localStorage.getItem('bvm.customize-form') || `[]`;
    const form = JSON.parse(oldForm) as IModelCategory[];

    if (form.length > 0) {
      setIsShowModal(true);
    } else {
      setValueOfPackage(Number(packageId));
    }
  }, [templates]);

  React.useEffect(() => {
    const priceUSD = Object.keys(field).reduce((acc, key) => {
      if (Array.isArray(field[key].value)) {
        const currentOptions = (field[key].value as string[])!.map((value) => {
          const item = data?.find((i) => i.key === key);

          if (!item) return 0;

          const currentOption = item.options.find(
            (option) => option.key === value,
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

          return currentOption.priceUSD || 0;
        });

        return acc + currentOptions.reduce((a, b) => a + b, 0);
      }

      const item = data?.find((i) => i.key === key);

      if (!item) return acc;

      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );

      if (!currentOption) return acc;

      const isDisabled =
        // prettier-ignore
        !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
        // prettier-ignore
        (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
        (item.required && !field[item.key].dragged) ||
        item.disable ||
        !currentOption.selectable;

      if (isDisabled) return acc;

      return acc + (currentOption?.priceUSD || 0);
    }, 0);

    const priceBVM = Object.keys(field).reduce((acc, key) => {
      if (Array.isArray(field[key].value)) {
        const currentOptions = (field[key].value as string[])!.map((value) => {
          const item = data?.find((i) => i.key === key);

          if (!item) return 0;

          const currentOption = item.options.find(
            (option) => option.key === value,
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

          return currentOption.priceBVM || 0;
        });

        return acc + currentOptions.reduce((a, b) => a + b, 0);
      }

      const item = data?.find((i) => i.key === key);

      if (!item) return acc;

      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );

      if (!currentOption) return acc;

      const isDisabled =
        // prettier-ignore
        !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
        // prettier-ignore
        (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
        (item.required && !field[item.key].dragged) ||
        item.disable ||
        !currentOption.selectable;

      if (isDisabled) return acc;

      return acc + (currentOption?.priceBVM || 0);
    }, 0);

    setPriceBVM(priceBVM);
    setPriceUSD(priceUSD);

    if (!originalData) return;

    // save history of form
    const dynamicForm: any[] = [];
    for (const _field of originalData) {
      if (!field[_field.key].dragged) continue;

      if (_field.multiChoice) {
        dynamicForm.push({
          ..._field,
          options: _field.options.filter((opt) =>
            (field[_field.key].value as string[])!.includes(opt.key),
          ),
        });
        continue;
      }

      const value = _field.options.find(
        (opt) => opt.key === field[_field.key].value,
      );

      const { options: _, ...rest } = _field;

      dynamicForm.push({
        ...rest,
        options: [value],
      });
    }

    setTimeout(() => {
      if (dynamicForm.length === 0) return;
      localStorage.setItem('bvm.customize-form', JSON.stringify(dynamicForm));
    }, 100);
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
                              value={field[item.key].value as any}
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
                                  defaultValue={
                                    (field[item.key].value as any) || ''
                                  }
                                  // @ts-ignore
                                  options={item.options}
                                  title={item.title}
                                  value={field[item.key].value as any}
                                />
                              </LegoV3>
                            </Draggable>
                          ) : (
                            item.options.map((option, optIdx) => {
                              let _price = option.priceUSD;
                              let operator = '+';
                              let suffix =
                                _price > 0 ? `(+$${_price.toString()})` : '';

                              if (field[item.key].dragged) {
                                _price = option.priceUSD - currentPrice;
                                operator = _price > 0 ? '+' : '-';
                                suffix = _price
                                  ? `(${operator}$${Math.abs(
                                      _price,
                                    ).toString()})`
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

                              if (item.multiChoice && field[item.key].dragged) {
                                const currentValues = field[item.key]
                                  .value as any[];

                                if (currentValues.includes(option.key)) {
                                  return null;
                                }
                              }

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

                    <div className={s.hTrigger}></div>
                  </div>
                </div>
              </div>
            </div>

            <DragOverlay>
              {idDragging &&
                data?.map((item, index) => {
                  if (!idDragging.startsWith(item.key)) return null;

                  if (item.multiChoice && rightDragging) {
                    const childrenOptions = item.options.map(
                      (option, opIdx) => {
                        const optionInValues = (
                          field[item.key].value as string[]
                        ).includes(option.key);

                        if (!optionInValues) return null;

                        return (
                          <Draggable
                            useMask
                            key={item.key + '-' + option.key}
                            id={item.key + '-' + option.key}
                            value={option.key}
                          >
                            <LegoV3
                              background={item.color}
                              label={item.title}
                              labelInLeft
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
                                defaultValue={option.value || ''}
                                // @ts-ignore
                                options={[option]}
                                value={option.value}
                              />
                            </LegoV3>
                          </Draggable>
                        );
                      },
                    );

                    return (
                      <Draggable
                        key={
                          item.key + '-parent' + (rightDragging ? '-right' : '')
                        }
                        id={
                          item.key + '-parent' + (rightDragging ? '-right' : '')
                        }
                        useMask
                      >
                        <DroppableV2 id={item.key}>
                          <LegoParent
                            parentOfNested
                            background={item.color}
                            label={item.title}
                            zIndex={data.length - index}
                          >
                            {childrenOptions}
                          </LegoParent>
                        </DroppableV2>
                      </Draggable>
                    );
                  }

                  if (item.type === 'dropdown') {
                    return (
                      <Draggable
                        useMask
                        id={item.key}
                        value={field[item.key].value as any}
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
                            defaultValue={(field[item.key].value as any) || ''}
                            // @ts-ignore
                            options={item.options}
                            title={item.title}
                            value={field[item.key].value as any}
                          />
                        </LegoV3>{' '}
                      </Draggable>
                    );
                  }

                  return item.options.map((option, opIdx) => {
                    if (idDragging !== item.key + '-' + option.key) return null;

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

            {/* ------------- RIGHT ------------- */}
            <div className={s.right}>
              <TierV2
                originalData={originalData}
                templates={templates}
                setValueOfPackage={setValueOfPackage}
              />

              <div className={s.right_box}>
                <DroppableV2
                  id="final"
                  className={s.finalResult}
                  style={{
                    width: '100% !important',
                    height: '100%',
                    paddingLeft: '25%',
                    paddingRight: '25%',
                    paddingBottom: '7.5%',
                    paddingTop: '7.5%',
                  }}
                >
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

                    if (item.multiChoice && field[item.key].value) {
                      if (!Array.isArray(field[item.key].value)) return;

                      const childrenOptions = (field[item.key].value as
                        | string[]
                        | number[])!.map(
                        (key: string | number, opIdx: number) => {
                          const option = item.options.find(
                            (opt) => opt.key === key,
                          );

                          if (!option) return null;

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
                                label={item.confuseTitle}
                                labelInRight={!!item.confuseTitle}
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
                                  defaultValue={option.value || ''}
                                  options={[
                                    // @ts-ignore
                                    option,
                                  ]}
                                  // @ts-ignore
                                  value={option.value}
                                />
                              </LegoV3>
                            </Draggable>
                          );
                        },
                      );

                      return (
                        <Draggable
                          key={item.key + '-parent' + '-right'}
                          id={item.key + '-parent' + '-right'}
                          useMask
                        >
                          <DroppableV2 id={item.key}>
                            <LegoParent
                              parentOfNested
                              background={item.color}
                              label={item.title}
                              zIndex={data.length - index}
                            >
                              {childrenOptions}
                            </LegoParent>
                          </DroppableV2>
                        </Draggable>
                      );
                    }

                    if (item.type === 'dropdown') {
                      return (
                        <Draggable
                          right
                          useMask
                          key={item.key}
                          id={item.key}
                          tooltip={item.tooltip}
                          value={field[item.key].value as any}
                        >
                          <LegoV3
                            background={item.color}
                            zIndex={data.length - index}
                            label={item.confuseTitle}
                            labelInRight={!!item.confuseTitle}
                            className={
                              showShadow === field[item.key].value
                                ? s.activeBlur
                                : ''
                            }
                          >
                            <DropdownV2
                              cb={(value) => {
                                setField(
                                  item.key,
                                  value,
                                  field[item.key].dragged,
                                );
                              }}
                              defaultValue={
                                (field[item.key].value as any) || ''
                              }
                              // @ts-ignore
                              options={item.options}
                              title={item.title}
                              value={field[item.key].value as any}
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
                            label={item.confuseTitle}
                            labelInRight={!!item.confuseTitle}
                            zIndex={item.options.length - opIdx}
                            className={
                              showShadow === field[item.key].value
                                ? s.activeBlur
                                : ''
                            }
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
                              defaultValue={
                                (field[item.key].value as any) || ''
                              }
                              options={[
                                // @ts-ignore
                                option,
                              ]}
                              // @ts-ignore
                              value={field[item.key].value as any}
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
                      $
                      {formatCurrencyV2({
                        amount: priceUSD,
                        decimals: 2,
                      })}
                      {'/'}Month {'(~'}
                      {formatCurrencyV2({
                        amount: priceBVM,
                        decimals: 2,
                      })}{' '}
                      BVM
                      {')'}
                    </h4>
                  </div>

                  <LaunchButton data={data} originalData={originalData} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <BaseModal
          isShow={isShowModal}
          onHide={() => setIsShowModal(false)}
          title="You have a saved form. Do you want to load it?"
          size="extra"
          theme="light"
        >
          <div className={s.btns}>
            <Button
              className={`${s.btn} ${s.btn__outline}`}
              onClick={() => onLoadOldForm()}
            >
              Yes
            </Button>
            <Button
              className={`${s.btn} ${s.btn__primary}`}
              onClick={() => onIgnoreOldForm()}
            >
              No
            </Button>
          </div>
        </BaseModal>
      </DndContext>
    </div>
  );
};

export default BuyPage;
