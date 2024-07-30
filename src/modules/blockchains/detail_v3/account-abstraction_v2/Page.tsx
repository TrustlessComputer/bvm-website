import ImagePlaceholder from '@/components/ImagePlaceholder';
import { useAppSelector } from '@/stores/hooks';
import {
  getAvailableListTemplateSelector,
  getOrderDetailSelected,
} from '@/stores/states/l2services/selector';
import { Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import gsap from 'gsap';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import BoxOptionV3 from '../../Buy/components3/BoxOptionV3';
import ComputerNameInput from '../../Buy/components3/ComputerNameInput';
import Draggable from '../../Buy/components3/Draggable';
import DroppableV2 from '../../Buy/components3/DroppableV2';
import Label from '../../Buy/components3/Label';
import LegoInput from '../../Buy/components3/LegoInput';
import LegoParent from '../../Buy/components3/LegoParent';
import LegoV3 from '../../Buy/components3/LegoV3';
import useOrderFormStoreV3, {
  useCaptureStore,
} from '../../Buy/stores/index_v3';
import useDragMask from '../../Buy/stores/useDragMask';
import { MouseSensor } from '../../Buy/utils';
import AppViewer from '../components/AppViewer';
import ToolBar from '../components/ToolBar_v2';
import { ACCOUNT_ABSTRACTION_MOCKUP_DATA } from './mockupData';
import s from './styles.module.scss';
// import LaunchButton from '../../Buy/components3/LaunchButton';
import LaunchButton from '../../Buy/components3/LaunchButton_v2';
import { ResetModal } from '../components/ResetModal';
import useCaptureHelper from '../hook/useCaptureHelper';
import AddressInput from './components/AddressInput';
import FeeRateInput from './components/FeeRateInput';
import { useAccountAbstractionStore } from './store/hook';
import enhance from './enhance';
import { useAADetailHelper } from './useAADetailHelper';
import WaitiingInstallView from './components/WaitiingInstallView';

const Page = (props: any) => {
  // const modelCategories = useAppSelector(getModelCategoriesSelector);
  const modelCategories = ACCOUNT_ABSTRACTION_MOCKUP_DATA;
  const availableListTemplate = useAppSelector(
    getAvailableListTemplateSelector,
  );

  const { exportAsImage, download } = useCaptureHelper();

  const { isCanEdit, isProcessing, isOnlyView } = useAADetailHelper();

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

  // const { setChainName } = useOrderFormStore();

  const { field, setField } = useOrderFormStoreV3();

  const { resetAAStore } = useAccountAbstractionStore();

  const {
    isOpen: isOpenResetModal,
    onOpen: onOpenResetModal,
    onClose: onCloseResetModal,
  } = useDisclosure({
    id: 'RESET_MODAL_ID',
  });

  const { idDragging, setIdDragging, rightDragging, setRightDragging } =
    useDragMask();

  const [fieldsDragged, setFieldsDragged] = React.useState<string[]>([]);
  const refTime = useRef<NodeJS.Timeout>();
  const [showShadow, setShowShadow] = useState<string>('');
  const { isCapture } = useCaptureStore();

  useEffect(() => {
    return () => {
      resetAAStore();
    };
  }, []);

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
    if (over && (overIsFinalDroppable || overIsParentOfActiveDroppable)) {
      const currentValues = (field[activeKey].value || []) as string[];
      const isCurrentEmpty = currentValues.length === 0;
      const newValue = [...currentValues, active.data.current.value];

      if (currentValues.includes(active.data.current.value)) return;

      setField(activeKey, newValue, true);
      isCurrentEmpty && setFieldsDragged((prev) => [...prev, activeKey]);
    } else {
      const currentValues = (field[activeKey].value || []) as string[];
      const newValue = currentValues.filter(
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
            disabled:
              !option.selectable || item.disable || isOnlyView || isProcessing,
          };
        }),
      };
    });

    return newData || [];
  };

  const fetchData = async () => {
    modelCategories.forEach((_field) => {
      setField(_field.key, null);
    });
    setData(convertData(modelCategories));
    setOriginalData(modelCategories);

    setTemplates(availableListTemplate);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

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

  const resetLeftView = () => {
    for (const key in field) {
      setField(key, null, false);
    }
  };

  const resetEdit = () => {
    setFieldsDragged([]);
    resetLeftView();
    resetAAStore();
  };

  return (
    <Flex
      flexDir={'column'}
      px={['16px', '18px', '20px']}
      className={s.superContainer}
    >
      <div className={s.container}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Spacer h={'30px'} />
          <ToolBar rightView={<LaunchButton />} />

          <Flex flexDir={'row'} mt={'20px'} gap={'10px'} w={'100%'}>
            <Flex className={s.showroomLegosContainer}>
              <DroppableV2 id="data">
                {data?.map((item, index) => {
                  return (
                    <BoxOptionV3
                      key={item.key}
                      disable={item.disable || isOnlyView || isProcessing}
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
                        const isDisabled =
                          !!(
                            option.supportNetwork &&
                            option.supportNetwork !== 'both' &&
                            option.supportNetwork !== field['network']?.value
                          ) || !option.selectable;

                        if (item.multiChoice && field[item.key].dragged) {
                          const currentValues = field[item.key].value as any[];

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
                              disabled={
                                isDisabled || isOnlyView || isProcessing
                              }
                            >
                              <Label icon={option.icon} title={option.title} />
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

            <Flex flex={1} className={s.middleViewContainer} id="imageCapture">
              {isProcessing ? (
                <WaitiingInstallView />
              ) : (
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

                          const isAddressField =
                            option.key === 'input_apps_address';

                          if (item.type === 'form') {
                            return (
                              <Draggable
                                key={item.key + '-' + option.key}
                                id={item.key + '-' + option.key}
                                useMask
                                isLabel={true}
                                value={option.key}
                                tooltip={option.tooltip}
                                disabled={isOnlyView}
                              >
                                <LegoV3
                                  background={item.color}
                                  zIndex={item.options.length - opIdx}
                                  disabled={isOnlyView || isProcessing}
                                >
                                  {isAddressField ? (
                                    <AddressInput option={option} />
                                  ) : (
                                    <FeeRateInput option={option} />
                                  )}
                                </LegoV3>
                              </Draggable>
                            );
                          }
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
                  })}
                </DroppableV2>
              )}
              {!isCapture && (
                <div className={s.cta_wrapper}>
                  <button
                    className={`${s.reset} ${s.gray}`}
                    onClick={() => {
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
                  if (isCanEdit) {
                    download();
                  }
                }}
                onShare={() => {
                  if (isCanEdit) {
                    exportAsImage();
                  }
                }}
              />
            </Flex>

            {/* Animation Lego when drag and drop */}
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
                            <LegoInput
                              background={item.color}
                              label={item.confuseTitle}
                              labelInRight={
                                !!item.confuseTitle || !!item.confuseIcon
                              }
                              icon={item.confuseIcon}
                              zIndex={item.options.length - opIdx}
                              labelInLeft
                            >
                              <Flex
                                flexDir={'row'}
                                align={'center'}
                                gap={'10px'}
                                width={'100%'}
                              >
                                <Text
                                  fontSize={['18px']}
                                  fontWeight={500}
                                  minW={'max-content'}
                                >
                                  {option.title}
                                </Text>
                                <ComputerNameInput />
                              </Flex>
                            </LegoInput>
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

export default enhance(Page);
