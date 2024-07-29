import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import gsap from 'gsap';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { formatCurrencyV2 } from '@/utils/format';
import { Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import ExplorePage from '../Buy/Explore';
import BoxOptionV3 from '../Buy/components3/BoxOptionV3';
// import ComputerNameInput from '../Buy/components3/ComputerNameInput';
import ComputerNameInput from '../Buy/components3/ComputerNameInput_v2';
import Draggable from '../Buy/components3/Draggable';
import DroppableV2 from '../Buy/components3/DroppableV2';
import ErrorModal from '../Buy/components3/ErrorModal';
import Label from '../Buy/components3/Label';
import LegoParent from '../Buy/components3/LegoParent';
import LegoV3 from '../Buy/components3/LegoV3';
import SidebarV2 from '../Buy/components3/SideBarV2';
import { TABS } from '../Buy/constants';
import useOrderFormStoreV3, { useCaptureStore } from '../Buy/stores/index_v3';
import useDragMask from '../Buy/stores/useDragMask';
import { MouseSensor } from '../Buy/utils';
import AppViewer from './components/AppViewer';
import Header from './components/Header';
// import ToolBar from './components/ToolBar';
import ToolBar from './components/ToolBar_v2';
import s from './styles.module.scss';
import { ChainDetailComponentProps } from './types';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Capture from '../Buy/Capture';
import { useAppSelector } from '@/stores/hooks';
import {
  getAvailableListTemplateSelector,
  getL2ServicesStateSelector,
  getModelCategoriesSelector,
  getOrderDetailSelected,
} from '@/stores/states/l2services/selector';
import { useOrderFormStore } from '../Buy/stores/index_v2';
import CostView from './components/CostView';
import LaunchButton from '../Buy/components3/LaunchButton';
import enhance from './enhance';
import ButtonV1 from './components/Button';
import { ResetModal } from './components/ResetModal';
import useCaptureHelper from './hook/useCaptureHelper';

const MainPage = (props: ChainDetailComponentProps) => {
  const { chainDetailData } = props;
  const modelCategories = useAppSelector(getModelCategoriesSelector);
  const availableListTemplate = useAppSelector(
    getAvailableListTemplateSelector,
  );

  const { exportAsImage, download } = useCaptureHelper();

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

  const { chainName } = useOrderFormStore();

  // console.log('chainName ', chainName);

  const {
    field,
    setField,
    priceBVM,
    priceUSD,
    setPriceBVM,
    setPriceUSD,
    setNeedContactUs,
  } = useOrderFormStoreV3();

  const {
    isOpen: isOpenResetModal,
    onOpen: onOpenResetModal,
    onClose: onCloseResetModal,
  } = useDisclosure({
    id: 'RESET_MODAL_ID',
  });

  const [tabActive, setTabActive] = React.useState<TABS>(TABS.CODE);

  const { orderDetail } = useAppSelector(getOrderDetailSelected);

  const { idDragging, setIdDragging, rightDragging, setRightDragging } =
    useDragMask();

  const [fieldsDragged, setFieldsDragged] = React.useState<string[]>([]);
  const searchParams = useSearchParams();
  const refTime = useRef<NodeJS.Timeout>();
  const [showShadow, setShowShadow] = useState<string>('');
  const { isCapture } = useCaptureStore();

  const isTabCode = React.useMemo(() => {
    return tabActive === TABS.CODE;
  }, [tabActive]);

  const resetByTemplate = (template: IModelCategory[]) => {
    setTabActive(TABS.CODE);
    setFieldsDragged([]);
    onCloseResetModal();
    setTempalteDataClone(template || []);
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const [activeSuffix2] = active.id.split('-');

    if (activeSuffix2 === 'right') {
      setRightDragging(true);
    }

    setIdDragging(active.id);
  };

  function handleDragEnd(event: any) {
    setIdDragging('');
    setRightDragging(false);

    // router.push('/rollups/customizev2');

    const { over, active } = event;

    // Format ID of single option = <key>-<value>
    // Format ID of parent option = <key>-parent-<suffix>
    const [activeKey = '', activeSuffix1 = '', activeSuffix2] =
      active.id.split('-');
    const [overKey = '', overSuffix1 = '', overSuffix2 = ''] = (
      over?.id || ''
    ).split('-');
    const overIsParentOfActiveDroppable =
      overKey === activeKey && overSuffix1 === 'droppable';
    const overIsFinalDroppable = overKey === 'final';
    const overIsParentDroppable =
      !overIsFinalDroppable &&
      overSuffix1 === 'droppable' &&
      data?.find((item) => item.key === overKey)?.multiChoice;
    const activeIsParent =
      data?.find((item) => item.key === activeKey)?.multiChoice &&
      activeSuffix1 === 'parent';
    const isMultiChoice = data?.find(
      (item) => item.key === activeKey,
    )?.multiChoice;

    if (rightDragging && !overIsFinalDroppable && overSuffix1 === 'right') {
      // swap activeKey, overKey in fieldsDragged
      const _fieldsDragged = JSON.parse(JSON.stringify(fieldsDragged));
      const activeIndex = fieldsDragged.indexOf(activeKey);
      const overIndex = fieldsDragged.indexOf(overKey);

      if (activeIndex === -1 || overIndex === -1) return;

      const temp = _fieldsDragged[activeIndex];
      _fieldsDragged[activeIndex] = _fieldsDragged[overIndex];
      _fieldsDragged[overIndex] = temp;

      setFieldsDragged(_fieldsDragged);

      return;
    }

    if (!isMultiChoice) {
      if (
        active.data.current.value !== field[activeKey].value &&
        field[activeKey].dragged
      ) {
        setShowShadow(field[activeKey].value as string);

        const currentField = data?.find((item) => item.key === activeKey);
        const currentOption = currentField?.options.find(
          (option) => option.key === field[activeKey].value,
        );
        const msg = `You have already chosen ${currentOption?.title} as your ${currentField?.title}. Please remove it before selecting again.`;

        toast.error(msg, {
          icon: null,
          style: {
            borderColor: 'blue',
            color: 'blue',
          },
          duration: 3000,
          position: 'bottom-center',
        });
        setTimeout(() => {
          setShowShadow('');
        }, 500);
        return;
      }

      const isHidden = data?.find((item) => item.key === activeKey)?.hidden;
      if (isHidden) return;

      // Normal case
      if (
        over &&
        (overIsFinalDroppable ||
          (!overIsFinalDroppable && overSuffix1 === 'right'))
      ) {
        setField(activeKey, active.data.current.value, true);

        if (field[activeKey].dragged) return;
        setFieldsDragged((prev) => [...prev, activeKey]);
      } else {
        if (over && overIsParentDroppable) return;

        setField(activeKey, active.data.current.value, false);
        setFieldsDragged(fieldsDragged.filter((field) => field !== activeKey));
      }

      return;
    }

    // Active is parent and drag to the left side
    if (
      activeIsParent &&
      (!over || (over && !overIsFinalDroppable && !overIsParentDroppable))
    ) {
      setField(activeKey, [], false);
      setFieldsDragged(fieldsDragged.filter((field) => field !== activeKey));
      return;
    }

    // Multi choice case
    if (
      (over && (overIsFinalDroppable || overIsParentOfActiveDroppable)) ||
      (!overIsFinalDroppable && overSuffix1 === 'right')
    ) {
      const currentValues = (field[activeKey].value || []) as string[];
      const isCurrentEmpty = currentValues.length === 0;
      const newValue = [...currentValues, active.data.current.value];

      if (currentValues.includes(active.data.current.value)) return;

      setField(activeKey, newValue, true);
      isCurrentEmpty && setFieldsDragged((prev) => [...prev, activeKey]);
    } else {
      const currentValues = (field[activeKey].value || []) as string[];
      const newValue = currentValues?.filter(
        (value) => value !== active.data.current.value,
      );
      const isEmpty = newValue.length === 0;

      setField(activeKey, newValue, !isEmpty);
      isEmpty &&
        setFieldsDragged(fieldsDragged.filter((field) => field !== activeKey));
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
            disabled: !option.selectable || item.disable || !item.updatable,
          };
        }),
      };
    });

    return newData || [];
  };

  const setValueOfPackage = (packageId: number | string | null) => {
    if (!packageId?.toString()) return;
    setFieldsDragged([]);

    // set default value for package
    const templateData = (templates?.[Number(packageId)] ||
      []) as IModelCategory[];
    const fieldsNotInTemplate = data?.filter(
      (item) => !templateData.find((temp) => temp.key === item.key),
    );

    templateData.forEach((_field) => {
      if (_field.multiChoice) {
        setField(
          _field.key,
          _field.options.map((option) => option.key),
          _field.options[0] ? true : false,
        );
      } else {
        setField(
          _field.key,
          _field.options[0].key || null,
          _field.options[0] ? true : false,
        );
      }

      setFieldsDragged((prev) => [...prev, _field.key]);
    });
    fieldsNotInTemplate?.forEach((field) => {
      setField(field.key, null, false);
    });
  };

  const setTempalteDataClone = (data: IModelCategory[]) => {
    // set default value for package
    const templateData = data;
    const fieldsNotInTemplate = data?.filter(
      (item) => !templateData.find((temp) => temp.key === item.key),
    );

    templateData.forEach((_field) => {
      if (_field.multiChoice) {
        setField(
          _field.key,
          _field.options.map((option) => option.key),
          _field.options[0] ? true : false,
        );
      } else {
        setField(
          _field.key,
          _field.options[0].key || null,
          _field.options[0] ? true : false,
        );
      }

      setFieldsDragged((prev) => [...prev, _field.key]);
    });
    fieldsNotInTemplate?.forEach((field) => {
      setField(field.key, null, false);
    });
  };

  const initData = async () => {
    modelCategories.forEach((_field) => {
      setField(_field.key, null);
    });
    setData(convertData(modelCategories));
    setOriginalData(modelCategories);
    setTemplates(availableListTemplate);
  };

  const isAnyOptionNeedContactUs = () => {
    if (!originalData) return false;
    for (const _field of originalData) {
      if (!field[_field.key].dragged) continue;

      if (_field.multiChoice) {
        for (const value of field[_field.key].value as string[]) {
          const option = _field.options.find((opt) => opt.key === value);

          if (option?.needContactUs) {
            return true;
          }
        }
      }

      const option = _field.options.find(
        (opt) => opt.key === field[_field.key].value,
      );

      if (option?.needContactUs) {
        return true;
      }
    }

    return false;
  };

  React.useEffect(() => {
    data?.forEach((item) => {
      if (item.multiChoice) {
        const currentValues = (field[item.key].value || []) as string[];

        let newValues: any[] = [];

        if (Array.isArray(currentValues))
          newValues = currentValues?.filter((value) => {
            const option = item.options.find((opt) => opt.key === value);

            if (!option) return false;

            const isDisabled =
              !!(
                option.supportNetwork &&
                option.supportNetwork !== 'both' &&
                option.supportNetwork !== field['network']?.value
              ) ||
              !option.selectable ||
              !option.updatable;

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
    initData();
  }, []);

  React.useEffect(() => {
    resetByTemplate(chainDetailData?.selectedOptions || []);
  }, [templates, chainDetailData]);

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
    setNeedContactUs(isAnyOptionNeedContactUs());

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

    console.log('dynamicForm ', dynamicForm);
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

  const resetEdit = () => {
    resetByTemplate(chainDetailData?.selectedOptions || []);
  };

  return (
    <Flex
      flexDir={'column'}
      px={['16px', '18px', '20px']}
      className={s.superContainer}
    >
      <div className={`${s.container}`}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Spacer h={'30px'} />
          <ToolBar
            leftView={
              <>
                <ButtonV1
                  title="Code"
                  isSelected={tabActive === TABS.CODE}
                  onClick={() => {
                    setTabActive(TABS.CODE);
                  }}
                />
                <ButtonV1
                  title="Explore"
                  isSelected={tabActive === TABS.EXPLORE}
                  onClick={() => {
                    setTabActive(TABS.EXPLORE);
                  }}
                />
              </>
            }
            rightView={
              <>
                <CostView
                  priceBVM={formatCurrencyV2({
                    amount: priceBVM || 0,
                    decimals: 0,
                  })}
                  priceBVM2USD={formatCurrencyV2({
                    amount: priceUSD || 0,
                    decimals: 0,
                  })}
                />
                <LaunchButton data={data} originalData={originalData} />
              </>
            }
          />

          {isTabCode && (
            <Flex flexDir={'row'} mt={'20px'} gap={'10px'} w={'100%'}>
              {/* First-LeftView */}
              <Flex className={s.thumbLegosContainer}>
                <SidebarV2 items={data} />
              </Flex>

              {/* Seconds-LeftView */}
              <Flex className={s.showroomLegosContainer}>
                <Flex className={s.container}>
                  <DroppableV2 id="data">
                    {data?.map((item, index) => {
                      if (item.hidden) return null;
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
                          {item.options.map((option, optIdx) => {
                            let _price = formatCurrencyV2({
                              amount: option.priceBVM || 0,
                              decimals: 0,
                            }).replace('.00', '');
                            let suffix =
                              Math.abs(option.priceBVM) > 0
                                ? ` (${_price} BVM)`
                                : '';

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
                                  background={item.color}
                                  zIndex={item.options.length - optIdx}
                                  disabled={isDisabled}
                                >
                                  <Label
                                    icon={option.icon}
                                    title={option.title + suffix}
                                  />
                                </LegoV3>
                              </Draggable>
                            );
                          })}
                        </BoxOptionV3>
                      );
                    })}

                    <div className={s.hTrigger}></div>
                  </DroppableV2>
                </Flex>
              </Flex>

              {/* MiddleView */}
              <Flex
                flex={1}
                className={s.middleViewContainer}
                id="imageCapture"
              >
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
                    label="Chain Name"
                    labelInLeft
                    zIndex={45}
                  >
                    <ComputerNameInput
                      chainNameDefault={chainDetailData?.chainName}
                      isMainnet={!!chainDetailData?.isMainnet}
                    />
                  </LegoV3>

                  {fieldsDragged.map((key, index) => {
                    const item = data?.find((i) => i.key === key);

                    if (!item || !data) return null;

                    if (item.multiChoice) {
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
                                labelInRight={
                                  !!item.confuseTitle || !!item.confuseIcon
                                }
                                icon={item.confuseIcon}
                                zIndex={item.options.length - opIdx}
                              >
                                <Label
                                  icon={option.icon}
                                  title={option.title}
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
                              zIndex={fieldsDragged.length - index - 1}
                            >
                              {childrenOptions}
                            </LegoParent>
                          </DroppableV2>
                        </Draggable>
                      );
                    }

                    return item.options.map((option, opIdx) => {
                      if (option.key !== field[item.key].value) return null;

                      if (item.updatable && option.disabled) {
                        return (
                          <LegoV3
                            background={item.color}
                            label={item.confuseTitle}
                            labelInRight={
                              !!item.confuseTitle || !!item.confuseIcon
                            }
                            zIndex={fieldsDragged.length - index}
                            icon={item.confuseIcon}
                            className={
                              showShadow === field[item.key].value
                                ? s.activeBlur
                                : s.disabled
                            }
                          >
                            <Label icon={option.icon} title={option.title} />
                          </LegoV3>
                        );
                      }
                      return (
                        <Draggable
                          right
                          key={item.key + '-' + option.key + '-right'}
                          id={item.key + '-' + option.key + '-right'}
                          useMask
                          tooltip={item.tooltip}
                          value={option.key}
                        >
                          <DroppableV2 id={item.key + '-right'}>
                            <LegoV3
                              background={item.color}
                              label={item.confuseTitle}
                              labelInRight={
                                !!item.confuseTitle || !!item.confuseIcon
                              }
                              zIndex={fieldsDragged.length - index}
                              icon={item.confuseIcon}
                              className={
                                showShadow === field[item.key].value
                                  ? s.activeBlur
                                  : ''
                              }
                            >
                              <Label icon={option.icon} title={option.title} />
                            </LegoV3>
                          </DroppableV2>
                        </Draggable>
                      );
                    });
                  })}
                </DroppableV2>
                {isTabCode && !isCapture && (
                  <div className={s.cta_wrapper}>
                    <button
                      className={`${s.reset} ${s.gray}`}
                      onClick={() => {
                        // setIsShowModal(true)
                        onOpenResetModal();
                      }}
                    >
                      <div>
                        <ImagePlaceholder
                          src={'/icons/undo.svg'}
                          alt={'undo'}
                          width={20}
                          height={20}
                        />
                      </div>
                    </button>
                  </div>
                )}
              </Flex>

              {/* RightView */}
              <Flex
                className={s.rightViewContainer}
                minW={'200px'}
                w={'max-content'}
              >
                <AppViewer
                  itemOnClick={(item) => {
                    console.log('TO DO --- ', item);
                  }}
                  onExport={() => {
                    download();
                  }}
                  onShare={() => {
                    exportAsImage();
                  }}
                />
              </Flex>

              {/* Animaiton for drag & drop legos */}
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
                              ></LegoV3>
                            </Draggable>
                          );
                        },
                      );

                      return (
                        <Draggable
                          key={
                            item.key +
                            '-parent' +
                            (rightDragging ? '-right' : '')
                          }
                          id={
                            item.key +
                            '-parent' +
                            (rightDragging ? '-right' : '')
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

                    return item.options.map((option, opIdx) => {
                      if (!idDragging.startsWith(item.key + '-' + option.key))
                        return null;

                      return (
                        <Draggable
                          key={
                            item.key +
                            '-' +
                            option.key +
                            (rightDragging ? '-right' : '')
                          }
                          id={
                            item.key +
                            '-' +
                            option.key +
                            (rightDragging ? '-right' : '')
                          }
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
            </Flex>
          )}

          {!isTabCode && <ExplorePage cloneItemCallback={resetByTemplate} />}
        </DndContext>
        {isOpenResetModal && (
          <ResetModal
            onClose={onCloseResetModal}
            isOpen={isOpenResetModal}
            onResetClick={() => {
              onCloseResetModal();
              resetEdit();
            }}
          />
        )}
      </div>
    </Flex>
  );
};

export default enhance(MainPage);
