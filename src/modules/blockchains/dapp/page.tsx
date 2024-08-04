import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import cn from 'classnames';
import Image from 'next/image';
import React from 'react';

import DragMask from './components/DragMask';
import LaunchButton from './components/LaunchButton';
import LeftDroppable from './components/LeftDroppable';
import RightDroppable from './components/RightDroppable';
import Sidebar from './components/Sidebar';
import { FieldKeyPrefix } from './contants';
import { dappMockupData } from './mockup_3';
import {
  draggedIds2DSignal,
  idBlockErrorSignal,
  templateIds2DSignal,
} from './signals/useDragSignal';
import {
  formDappSignal,
  formTemplateDappSignal,
} from './signals/useFormDappsSignal';
import useDappsStore, {
  subScribeDropEnd,
  useTemplateFormStore,
} from './stores/useDappStore';
import {
  cloneDeep,
  DragUtil,
  FormDappUtil,
  hasValue,
  MouseSensor,
  preDataAirdropTask,
  removeItemAtIndex,
} from './utils';

import { showValidateError } from '@/components/toast';
import { parseIssuedToken } from '@/modules/blockchains/dapp/parseUtils/issue-token';
import { parseDappModel } from '@/modules/blockchains/utils';
import { IToken } from '@/services/api/dapp/token_generation/interface';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { compareString } from '@/utils/string';
import { useThisDapp } from './hooks/useThisDapp';
import { parseStakingPools } from './parseUtils/staking';
import styles from './styles.module.scss';
import { DappType } from './types';
import { IAirdrop } from '@/services/api/dapp/airdrop/interface';
import { parseAirdrop } from './parseUtils/airdrop';
import { Button, Flex } from '@chakra-ui/react';
import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import { TABS } from '@/modules/blockchains/Buy/constants';
import { useRouter } from 'next/navigation';
import { isProduction } from '@/config';
import { BlockModel, DappModel, FieldModel } from '@/types/customize-model';

const RollupsDappPage = () => {
  const { setDapps } = useDappsStore();

  const { templateDapps, templateForm, setTemplateForm, setTemplateDapps } =
    useTemplateFormStore();
  const dappState = useAppSelector(dappSelector);
  const configs = dappState?.configs;

  const router = useRouter();

  const tokens = dappState.tokens;
  const airdropTasks = dappState.airdropTasks;
  const airdrops = dappState.airdrops;
  const stakingPools = dappState.stakingPools;

  const {
    thisDapp,
    baseModuleFieldMapping,
    blockFieldMapping,
    moduleFieldMapping,
    singleFieldMapping,
  } = useThisDapp();

  const parseTokensData = (tokens: IToken[]) => {
    const result: DappModel[] = [];
    for (const token of tokens) {
      const t = parseIssuedToken(token);
      result.push(t);
    }

    return result;
  };

  const parseAirdropsData = (_airdrops: IAirdrop[], _tokens: IToken[]) => {
    const result: DappModel[] = [];
    for (const airdrop of _airdrops) {
      const _token = tokens.find((v) =>
        compareString(v.contract_address, airdrop.token_address),
      );

      const t = parseAirdrop(airdrop, _token as IToken);
      result.push(t);
    }

    return result;
  };

  const getAllOptionKeysOfItem = (item: FieldModel) => {
    const result: string[] = [];

    const loop = (options: FieldModel[]) => {
      for (const option of options) {
        if (option.type !== '') result.push(option.key);

        if (option.options.length > 0) {
          loop(option.options);
        }
      }
    };

    loop(item.options);

    return result;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    subScribeDropEnd.value += 1;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    subScribeDropEnd.value += 1;

    // console.log(
    //   '🚀 -> file: page.tsx:46 -> handleDragEnd -> over, active ::',
    //   over,
    //   active,
    // );

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    let draggedIds2D = cloneDeep(draggedIds2DSignal.value);
    const noBaseBlockInOutput = draggedIds2D.length === 0;
    const canPlaceMoreBase =
      Number(thisDapp.baseBlock.placableAmount) > draggedIds2D.length ||
      thisDapp.baseBlock.placableAmount === -1;
    // const canPlaceMoreBase = draggedIds2D.length === 0;

    const overIsInput = over.id === 'input';
    const overIsOutput = over.id === 'output';
    const overIsABase = DragUtil.idDraggingIsABase(overId);
    const overBaseIndex = Number(DragUtil.getBaseIndex(overId));
    const overIsABlock = DragUtil.idDraggingIsABlock(overId);
    const overIndex = Number(DragUtil.getChildIndex(overId));
    const overOriginalKey = DragUtil.getOriginalKey(overId);

    const activeFromRightSide = DragUtil.isRightSide(activeId);
    const activeFromLeftSide = DragUtil.isLeftSide(activeId);
    const activeIsAChildOfABlock =
      DragUtil.idDraggingIsAChildOfABlock(activeId);
    const activeIsRightSide = DragUtil.isRightSide(activeId);
    const activeIsABase = DragUtil.idDraggingIsABase(activeId);
    const activeIsAModule = DragUtil.idDraggingIsAModule(activeId);
    const activeBaseIndex = Number(DragUtil.getBaseIndex(activeId));
    const activeIsABlock = DragUtil.idDraggingIsABlock(activeId);
    const activeIsASingle = DragUtil.idDraggingIsASingle(activeId);
    const activeIsABaseModule = DragUtil.idDraggingIsABaseModule(activeId);
    const activeIndex = Number(DragUtil.getChildIndex(activeId));
    const activeOriginalKey = DragUtil.getOriginalKey(activeId);
    const activeFieldKey = active.data.current?.fieldKey;

    // Case 0.1: Drag to the block parent
    if (activeFromLeftSide && activeIsAChildOfABlock && overIsABlock) {
      if (activeOriginalKey !== overOriginalKey) {
        showValidateError('Please drag to the same block!');
        return;
      }

      // const composedFieldKey = `right-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${activeFieldKey}-${overIndex}-${overBaseIndex}`;
      const composedFieldKey = activeFieldKey;

      if (
        draggedIds2D[overBaseIndex][overIndex].children.some(
          (item) => item.name === composedFieldKey,
        )
      ) {
        showValidateError('This field already exists in the block!');
        return;
      }

      draggedIds2D[overBaseIndex][overIndex] = {
        ...draggedIds2D[overBaseIndex][overIndex],
        children: [
          ...draggedIds2D[overBaseIndex][overIndex].children,
          {
            name: composedFieldKey,
            value: active.data.current?.value,
            parentNames: [],
            children: [],
          },
        ],
      };

      draggedIds2DSignal.value = [...draggedIds2D];
    }

    // Case 0.2: The child is dragged out of the block
    if (activeIsRightSide && overIsInput && activeIsAChildOfABlock) {
      const formDapp = cloneDeep(formDappSignal.value);
      const composedFieldKey = `right-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${activeFieldKey}-${activeIndex}-${activeBaseIndex}`;
      const formKey = `${activeBaseIndex}-${FieldKeyPrefix.BLOCK}-${activeFieldKey}`;
      const blockKey = active.data.current?.blockKey;
      const thisBlock = blockFieldMapping[blockKey];
      const thisChild = thisBlock.childrenFields?.find(
        (item) => item.key === activeFieldKey,
      );

      if (!thisChild) return;

      const thisChildIsExtendsInput = thisChild.type === 'extends';

      if (thisChildIsExtendsInput) {
        const allOptionKeys = getAllOptionKeysOfItem(thisChild);

        allOptionKeys.forEach((key) => {
          const optionFormKey = `${activeBaseIndex}-${FieldKeyPrefix.BLOCK}-${key}`;

          for (const key in formDapp) {
            if (
              key.startsWith(optionFormKey) &&
              FormDappUtil.getIndex(key) === activeIndex
            ) {
              delete formDapp[key];
            }
          }
        });
      }

      for (const key in formDapp) {
        if (
          key.startsWith(formKey) &&
          FormDappUtil.getIndex(key) === activeIndex
        ) {
          delete formDapp[key];
        }
      }

      draggedIds2D[activeBaseIndex][activeIndex] = {
        ...draggedIds2D[activeBaseIndex][activeIndex],
        children: draggedIds2D[activeBaseIndex][activeIndex].children.filter(
          (item) => item.name !== composedFieldKey,
        ),
      };

      draggedIds2DSignal.value = [...draggedIds2D];
      formDappSignal.value = { ...formDapp };

      return;
    }

    // Case 1: Drag to the right
    if (overIsOutput || overIsABase) {
      // Case 1.1: Output does not have base block yet
      if (noBaseBlockInOutput && !(activeIsABase || activeIsABaseModule)) {
        showValidateError(
          `Please drag ${thisDapp.baseBlock.title} to the output first!`,
        );
        return;
      }

      // Case 1.2: Output already has base block and has reached the limit
      if (
        !noBaseBlockInOutput &&
        (activeIsABase || activeIsABaseModule) &&
        !canPlaceMoreBase
      ) {
        showValidateError(
          `You can only place ${thisDapp.baseBlock.placableAmount} base!`,
        );
        idBlockErrorSignal.value = activeOriginalKey;
        return;
      }

      // Case 1.3: The lego just dragged already in the output
      if (activeFromRightSide) {
        return;
      }

      // Case 1.4: The lego just dragged is a base block
      if (activeIsABase) {
        draggedIds2DSignal.value = [...draggedIds2D, []];
        return;
      }

      // Case 1.5: The lego just dragged is a base module
      if (activeIsABaseModule) {
        const totalPlaced = draggedIds2D.length;
        // prettier-ignore
        const canPlaceMoreBaseModule = baseModuleFieldMapping[activeOriginalKey].placableAmount === -1 ||
                                      totalPlaced < baseModuleFieldMapping[activeOriginalKey].placableAmount;
        const composedFieldKey =
          'right-' + FieldKeyPrefix.BASE_MODULE + '-' + activeOriginalKey;

        if (!canPlaceMoreBaseModule) {
          showValidateError(
            `You can only place one ${baseModuleFieldMapping[activeOriginalKey].title}!`,
          );
          idBlockErrorSignal.value = activeOriginalKey;

          return;
        }

        draggedIds2D = [
          ...draggedIds2D,
          [
            {
              name: composedFieldKey,
              value: active.data.current?.value,
              parentNames: [],
              children: [],
            },
          ],
        ];

        const formKey = `${draggedIds2D.length - 1}-${
          FieldKeyPrefix.BASE_MODULE
        }-${activeOriginalKey}-0-0`;

        formDappSignal.value = {
          ...formDappSignal.value,
          [formKey]: active.data.current?.value,
        };

        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

      // Case 1.6: The lego just dragged is a block/single
      if ((activeIsABlock || activeIsASingle) && overIsABase) {
        const totalPlaced = activeIsABlock
          ? draggedIds2D[overBaseIndex].filter((item) =>
              item.name.startsWith(
                `right-${FieldKeyPrefix.BLOCK}-${activeOriginalKey}`,
              ),
            ).length
          : draggedIds2D[overBaseIndex].filter((item) =>
              item.name.startsWith(
                `right-${FieldKeyPrefix.SINGLE}-${activeOriginalKey}`,
              ),
            ).length;
        const canPlaceMore =
          (activeIsABlock
            ? blockFieldMapping[activeOriginalKey].placableAmount === -1
            : singleFieldMapping[activeOriginalKey].placableAmount === -1) ||
          totalPlaced <
            (activeIsABlock
              ? blockFieldMapping[activeOriginalKey].placableAmount
              : singleFieldMapping[activeOriginalKey].placableAmount);
        const prefix =
          'right-' +
          (activeIsABlock ? FieldKeyPrefix.BLOCK : FieldKeyPrefix.SINGLE);
        const composedFieldKey = prefix + '-' + activeOriginalKey;

        if (!canPlaceMore) {
          const title = activeIsABlock
            ? blockFieldMapping[activeOriginalKey].title
            : singleFieldMapping[activeOriginalKey].title;

          showValidateError(`You can only place one ${title}!`);
          idBlockErrorSignal.value = activeOriginalKey;

          return;
        }

        draggedIds2D[overBaseIndex] = [
          ...draggedIds2D[overBaseIndex],
          {
            name: composedFieldKey,
            value: active.data.current?.value,
            parentNames: [],
            children: [],
          },
        ];

        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

      // Case 1.7: The lego just dragged is a module
      if (activeIsAModule && overIsABase) {
        const totalPlaced = draggedIds2D[overBaseIndex].filter((item) =>
          item.name.startsWith(
            `right-${FieldKeyPrefix.MODULE}-${activeOriginalKey}`,
          ),
        ).length;
        const canPlaceMore =
          totalPlaced < moduleFieldMapping[activeOriginalKey].placableAmount ||
          moduleFieldMapping[activeOriginalKey].placableAmount === -1;
        const composedFieldKey =
          'right-' + FieldKeyPrefix.MODULE + '-' + activeOriginalKey;
        const thisField = moduleFieldMapping[activeOriginalKey];
        const isMultiple = thisField?.placableAmount === -1;

        if (!canPlaceMore) {
          showValidateError(
            `You can only place one ${moduleFieldMapping[activeOriginalKey].title}!`,
          );
          idBlockErrorSignal.value = activeOriginalKey;

          return;
        }

        if (isMultiple) {
          const draggedFieldIndex = draggedIds2D[overBaseIndex].findIndex(
            (item) => item.name === composedFieldKey,
          );
          const draggedField = draggedIds2D[overBaseIndex].find(
            (item) => item.name === composedFieldKey,
          );

          if (!draggedField) {
            const formKey = `${overBaseIndex}-${FieldKeyPrefix.MODULE}-${activeOriginalKey}-0-${draggedIds2D[overBaseIndex].length}`;
            const value = [active.data.current?.value];

            formDappSignal.value = {
              ...formDappSignal.value,
              [formKey]: value,
            };

            draggedIds2D[overBaseIndex] = [
              ...draggedIds2D[overBaseIndex],
              {
                name: composedFieldKey,
                value,
                parentNames: [],
                children: [],
              },
            ];
          } else {
            const formKey = `${overBaseIndex}-${FieldKeyPrefix.MODULE}-${activeOriginalKey}-0-${draggedFieldIndex}`;
            const alreadyExist = (draggedField.value as string[]).find(
              (value) => value === active.data.current?.value,
            );

            if (alreadyExist) {
              showValidateError('You can only place one module!');
              idBlockErrorSignal.value = activeOriginalKey;

              return;
            }

            const value = [
              ...(draggedField.value as string[]),
              active.data.current?.value,
            ];

            formDappSignal.value = {
              ...formDappSignal.value,
              [formKey]: value,
            };

            draggedField.value = value;
          }
        } else {
          const formKey = `${overBaseIndex}-${FieldKeyPrefix.MODULE}-${activeOriginalKey}-0-${draggedIds2D[overBaseIndex].length}`;

          for (const key in formDappSignal.value) {
            if (
              key.startsWith(
                `${overBaseIndex}-${FieldKeyPrefix.MODULE}-${activeOriginalKey}-0-`,
              )
            ) {
              showValidateError('You can only place one module!');
              idBlockErrorSignal.value = activeOriginalKey;

              return;
            }
          }

          formDappSignal.value = {
            ...formDappSignal.value,
            [formKey]: active.data.current?.value,
          };

          draggedIds2D[overBaseIndex] = [
            ...draggedIds2D[overBaseIndex],
            {
              name: composedFieldKey,
              value: active.data.current?.value,
              parentNames: [],
              children: [],
            },
          ];
        }

        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

      return;
    }

    // Case 2: Drag to the left
    if (overIsInput) {
      if (activeFromLeftSide) {
        return;
      }

      // Case 2.1: Dragged lego is a base block
      if (activeIsABase) {
        const formDapp = formDappSignal.value;

        Object.keys(formDapp).forEach((key) => {
          if (FormDappUtil.getBaseIndex(key) === activeBaseIndex) {
            delete formDapp[key];
          } else if (FormDappUtil.getBaseIndex(key) > activeBaseIndex) {
            const remainingKey = key.split('-').slice(1).join('-');
            const currentBaseIndex = FormDappUtil.getBaseIndex(key);
            const newKey = `${currentBaseIndex - 1}-${remainingKey}`;
            formDapp[newKey] = formDapp[key];
            delete formDapp[key];
          }
        });

        draggedIds2DSignal.value = removeItemAtIndex(
          draggedIds2D,
          activeBaseIndex,
        );
        formDappSignal.value = { ...formDapp };

        return;
      }

      // Case 2.2: Dragged lego is a block
      if (activeIsABlock) {
        const formDapp = formDappSignal.value;

        Object.keys(formDapp).forEach((key) => {
          if (
            FormDappUtil.isInBlock(key) &&
            FormDappUtil.getIndex(key) === activeIndex
          ) {
            delete formDapp[key];
          } else if (FormDappUtil.getIndex(key) > activeIndex) {
            const currentIndex = FormDappUtil.getIndex(key);
            const newKey = key.replace(
              `-${currentIndex}`,
              `-${currentIndex - 1}`,
            );

            formDapp[newKey] = formDapp[key];
            delete formDapp[key];
          }
        });

        formDappSignal.value = { ...formDapp };
        draggedIds2D[activeBaseIndex] = removeItemAtIndex(
          draggedIds2D[activeBaseIndex],
          Number(DragUtil.getChildIndex(activeId)),
        );
        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

      // Case 2.3: Dragged lego is a single
      if (activeIsASingle) {
        const formDapp = formDappSignal.value;

        Object.keys(formDapp).forEach((key) => {
          if (
            FormDappUtil.isInSingle(key) &&
            FormDappUtil.getIndex(key) === activeIndex
          ) {
            delete formDapp[key];
          } else if (FormDappUtil.getIndex(key) > activeIndex) {
            const currentIndex = FormDappUtil.getIndex(key);
            const newKey = key.replace(
              `-${currentIndex}`,
              `-${currentIndex - 1}`,
            );

            formDapp[newKey] = formDapp[key];
            delete formDapp[key];
          }
        });

        formDappSignal.value = { ...formDapp };
        draggedIds2D[activeBaseIndex] = removeItemAtIndex(
          draggedIds2D[activeBaseIndex],
          Number(DragUtil.getChildIndex(activeId)),
        );
        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

      if (activeIsAModule) {
        const composedFieldKey = `right-${FieldKeyPrefix.MODULE}-${activeOriginalKey}`;
        const formDapp = formDappSignal.value;
        const isMultiple =
          moduleFieldMapping[activeOriginalKey]?.placableAmount === -1;
        const item = draggedIds2D[activeBaseIndex].find(
          (item) => item.name === composedFieldKey,
        );
        const legoDraggingIsParent = !hasValue(active.data.current?.value);

        if (!item) return;

        if (legoDraggingIsParent) {
          Object.keys(formDapp).forEach((key) => {
            if (
              FormDappUtil.isInModule(key) &&
              FormDappUtil.getIndex(key) === activeIndex
            ) {
              delete formDapp[key];
            } else if (FormDappUtil.getIndex(key) > activeIndex) {
              const currentIndex = FormDappUtil.getIndex(key);
              const newKey = key.replace(
                `-${currentIndex}`,
                `-${currentIndex - 1}`,
              );

              formDapp[newKey] = formDapp[key];
              delete formDapp[key];
            }
          });

          draggedIds2D[activeBaseIndex] = removeItemAtIndex(
            draggedIds2D[activeBaseIndex],
            Number(DragUtil.getChildIndex(activeId)),
          );
        } else if (!isMultiple) {
          Object.keys(formDapp).forEach((key) => {
            if (
              FormDappUtil.isInModule(key) &&
              FormDappUtil.getIndex(key) === activeIndex
            ) {
              delete formDapp[key];
            } else if (FormDappUtil.getIndex(key) > activeIndex) {
              const currentIndex = FormDappUtil.getIndex(key);
              const newKey = key.replace(
                `-${currentIndex}`,
                `-${currentIndex - 1}`,
              );

              formDapp[newKey] = formDapp[key];
              delete formDapp[key];
            }
          });

          draggedIds2D[activeBaseIndex] = removeItemAtIndex(
            draggedIds2D[activeBaseIndex],
            Number(DragUtil.getChildIndex(activeId)),
          );
        } else {
          const newValue = (item.value as string[]).filter(
            (value) => value !== active.data.current?.value,
          );

          if (newValue.length === 0) {
            Object.keys(formDapp).forEach((key) => {
              if (
                FormDappUtil.isInModule(key) &&
                FormDappUtil.getIndex(key) === activeIndex
              ) {
                delete formDapp[key];
              } else if (FormDappUtil.getIndex(key) > activeIndex) {
                const currentIndex = FormDappUtil.getIndex(key);
                const newKey = key.replace(
                  `-${currentIndex}`,
                  `-${currentIndex - 1}`,
                );

                formDapp[newKey] = formDapp[key];
                delete formDapp[key];
              }
            });

            draggedIds2D[activeBaseIndex] = removeItemAtIndex(
              draggedIds2D[activeBaseIndex],
              Number(DragUtil.getChildIndex(activeId)),
            );
          } else {
            item.value = newValue;
            formDapp[
              `${activeBaseIndex}-${FieldKeyPrefix.MODULE}-${activeOriginalKey}-0-${activeIndex}`
            ] = newValue;
          }
        }

        formDappSignal.value = { ...formDapp };
        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

      return;
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const fetchData = async () => {
    // const dapps = configs;

    const dapps = isProduction ? configs : dappMockupData;

    const sortedDapps = [...dapps].sort((a, b) => a?.order - b?.order);

    const _sortedDapps = preDataAirdropTask(sortedDapps, tokens, airdropTasks);

    setDapps(_sortedDapps);
  };

  React.useEffect(() => {
    if (!templateForm) return;

    let formDapp: Record<string, any> = {};

    const totalBase = new Set(
      Object.keys(templateForm.fieldValue).map((fieldKey) =>
        FormDappUtil.getBaseIndex(fieldKey),
      ),
    ).size;
    const draggedIds2D: typeof templateIds2DSignal.value = Array(
      totalBase,
    ).fill([]);

    Object.keys(templateForm.fieldValue).forEach((fieldKey) => {
      const value = templateForm.fieldValue[fieldKey];
      const baseIndex = FormDappUtil.getBaseIndex(fieldKey);
      const thisDapp = templateDapps[baseIndex];
      const blockFieldMapping = {} as Record<string, BlockModel>;
      const key = FormDappUtil.getOriginalKey(fieldKey);
      const index = FormDappUtil.getIndex(fieldKey);
      const blockKey = FormDappUtil.getBlockKey(fieldKey);
      const isInBase = FormDappUtil.isInBase(fieldKey);
      const isInBlock = FormDappUtil.isInBlock(fieldKey);

      (thisDapp?.blockFields || []).forEach((item) => {
        blockFieldMapping[item.key] = item;
      });

      if (!draggedIds2D[baseIndex][index] && !isInBase) {
        const _key = isInBlock ? blockKey : key;
        const prefix = 'right-' + FormDappUtil.getBlockType(fieldKey);
        const children = !isInBlock
          ? []
          : (blockFieldMapping[blockKey].childrenFields || []).map((item) => ({
              name: item.key,
              value: '',
              parentNames: [],
              children: [],
            }));

        draggedIds2D[baseIndex] = [
          ...draggedIds2D[baseIndex],
          {
            name: prefix + '-' + _key,
            value: '',
            parentNames: [],
            children,
          },
        ];
      }

      formDapp = {
        ...formDapp,
        [fieldKey]: value,
      };
    });

    console.log(
      '🚀 -> file: page.tsx:785 -> React.useEffect -> formDapp ::',
      formDapp,
    );

    templateIds2DSignal.value = [...draggedIds2D];
    formTemplateDappSignal.value = { ...formDapp };
  }, [templateDapps, templateForm]);

  React.useEffect(() => {
    getDataTemplateForm();
  }, [thisDapp, tokens, stakingPools, airdrops]);

  React.useEffect(() => {
    fetchData();
  }, [dappState, tokens, airdropTasks]);

  const getDataTemplateForm = async () => {
    if (!thisDapp) return;

    switch (thisDapp?.key) {
      case DappType.staking: {
        const data = parseStakingPools(stakingPools);
        const model = parseDappModel({
          key: DappType.staking,
          model: data,
        });
        setTemplateDapps(data);
        setTemplateForm(model);
        break;
      }

      case DappType.token_generation: {
        const data = parseTokensData(tokens);
        const model = parseDappModel({
          key: DappType.token_generation,
          model: data,
        });
        setTemplateDapps(data);
        setTemplateForm(model);

        for (const item of data) {
          if (item.baseBlock.fields[1].value === 'TEST125')
            console.log(
              '🚀 -> file: page.tsx:807 -> getDataTemplateForm -> item ::',
              item,
            );
        }

        // console.log(
        //   '🚀 -> file: page.tsx:807 -> getDataTemplateForm -> model ::',
        //   model,
        // );
        break;
      }

      case DappType.airdrop: {
        const _data = parseAirdropsData(airdrops, tokens);

        const model = parseDappModel({
          key: DappType.airdrop,
          model: _data,
        });

        setTemplateDapps(_data);
        setTemplateForm(model);
        break;
      }
      default:
        break;
    }
  };

  return (
    <Flex className={styles.container} w={'100%'} px={['16px', '18px', '20px']}>
      <div className={styles.content}>
        {/*<div className={styles.logo}>*/}
        {/*  <Image*/}
        {/*    src={'/bvmstudio_logo.png'}*/}
        {/*    alt={'bvmstudio_logo'}*/}
        {/*    width={549}*/}
        {/*    height={88}*/}
        {/*  />*/}
        {/*</div>*/}
        <p className={styles.content_text}>
          Drag and drop modules to start new blockchains, new dapps, and new
          economies.
        </p>
      </div>

      <div className={styles.container__header}>
        <Flex alignItems="center" gap="12px">
          <div
            className={`${styles.top_left_filter} ${styles.active}`}
            // onClick={() => {
            //   router.push('/studio')
            // }}
          >
            <p>Dapp Studio</p>
          </div>
          <div
            className={`${styles.top_left_filter}`}
            onClick={() => {
              router.push('/studio');
            }}
          >
            <p>Chain Studio</p>
          </div>
        </Flex>
        <div>
          <LaunchButton />
        </div>
      </div>

      <div className={styles.container__content}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className={styles.container__content__sidebar}>
            <Sidebar />
          </div>
          <div
            className={styles.container__content__droppable}
            id="left-droppable"
          >
            <LeftDroppable />
          </div>

          <DragMask />

          <div
            className={cn(
              styles.container__content__droppable,
              styles.container__content__droppable__right,
            )}
          >
            <RightDroppable />
          </div>
        </DndContext>
      </div>
    </Flex>
  );
};

export default RollupsDappPage;
