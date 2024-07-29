import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Image from 'next/image';
import cn from 'classnames';

import {
  cloneDeep,
  DragUtil,
  FormDappUtil,
  hasValue,
  MouseSensor,
  removeItemAtIndex,
} from './utils';
import { dappMockupData } from './mockup_3';
import { FieldKeyPrefix } from './contants';
import LeftDroppable from './components/LeftDroppable';
import RightDroppable from './components/RightDroppable';
import DragMask from './components/DragMask';
import LaunchButton from './components/LaunchButton';
import Sidebar from './components/Sidebar';
import useDappsStore, {
  subScribeDropEnd,
  useTemplateFormStore,
} from './stores/useDappStore';
import {
  draggedIds2DSignal,
  idBlockErrorSignal,
  templateIds2DSignal,
} from './signals/useDragSignal';
import {
  formDappSignal,
  formTemplateDappSignal,
} from './signals/useFormDappsSignal';

import styles from './styles.module.scss';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { IToken } from '@/services/api/dapp/token_generation/interface';
import { parseIssuedToken } from '@/modules/blockchains/dapp/parseUtils/issue-token';
import { parseDappModel } from '@/modules/blockchains/utils';
import { useThisDapp } from './hooks/useThisDapp';
import { parseStakingPools } from './parseUtils/staking';
import { DappType } from './types';
import { showValidateError } from '@/components/toast';
import { compareString } from '@/utils/string';

const RollupsDappPage = () => {
  const { setDapps } = useDappsStore();

  const { templateForm, setTemplateForm, setTemplateDapps } =
    useTemplateFormStore();
  const dappState = useAppSelector(dappSelector);
  const configs = dappState?.configs;

  const tokens = dappState.tokens;
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

    const activeFromRightSide = DragUtil.isRightSide(activeId);
    const activeFromLeftSide = DragUtil.isLeftSide(activeId);
    const activeIsAChild = DragUtil.idDraggingIsAField(activeId);
    const activeIsABase = DragUtil.idDraggingIsABase(activeId);
    const activeIsAModule = DragUtil.idDraggingIsAModule(activeId);
    const activeBaseIndex = Number(DragUtil.getBaseIndex(activeId));
    const activeIsABlock = DragUtil.idDraggingIsABlock(activeId);
    const activeIsASingle = DragUtil.idDraggingIsASingle(activeId);
    const activeIsABaseModule = DragUtil.idDraggingIsABaseModule(activeId);
    const activeIndex = Number(DragUtil.getChildIndex(activeId));
    const activeOriginalKey = DragUtil.getOriginalKey(activeId);

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

      if (activeIsABaseModule) {
        const totalPlaced = draggedIds2D.length;
        const canPlaceMoreBaseModule =
          baseModuleFieldMapping[activeOriginalKey].placableAmount === -1 ||
          totalPlaced <
            baseModuleFieldMapping[activeOriginalKey].placableAmount;
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

      // Case 1.5: The lego just dragged is a block/single
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
          showValidateError(
            `You can only place one ${blockFieldMapping[activeOriginalKey].title}!`,
          );
          idBlockErrorSignal.value = activeOriginalKey;

          return;
        }

        draggedIds2D[overBaseIndex] = [
          ...draggedIds2D[overBaseIndex],
          {
            name: composedFieldKey,
            value: active.data.current?.value,
            parentNames: [],
          },
        ];

        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

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
        draggedIds2DSignal.value = [...draggedIds2D];

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
    console.log('fetchData tokens', tokens);

    const dapps = dappMockupData;

    const sortedDapps = dapps.sort((a, b) => a.order - b.order);

    if (tokens.length > 0) {
      const _airdropIndex = sortedDapps.findIndex((v) =>
        compareString(v.key, DappType.airdrop),
      );

      if (_airdropIndex > -1) {
        const fieldRewardToken = sortedDapps[
          _airdropIndex
        ].baseBlock.fields.findIndex((v) =>
          compareString(v.key, 'reward_token'),
        );
        if (fieldRewardToken > -1) {
          // @ts-ignore
          sortedDapps[_airdropIndex].baseBlock.fields[
            fieldRewardToken
          ].options = tokens.map((t) => ({
            key: t.id,
            title: t.name,
            value: t.contract_address,
            icon: t.image_url,
            tooltip: '',
            type: '',
            options: [],
          }));
        }
      }
    }

    setDapps(sortedDapps);
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
      const key = FormDappUtil.getOriginalKey(fieldKey);
      const index = FormDappUtil.getIndex(fieldKey);
      const blockKey = FormDappUtil.getBlockKey(fieldKey);
      const isInBase = FormDappUtil.isInBase(fieldKey);
      const isInBlock = FormDappUtil.isInBlock(fieldKey);

      if (!draggedIds2D[baseIndex][index] && !isInBase) {
        const _key = isInBlock ? blockKey : key;
        const prefix = 'right-' + FormDappUtil.getBlockType(fieldKey);

        draggedIds2D[baseIndex] = [
          ...draggedIds2D[baseIndex],
          {
            name: prefix + '-' + _key,
            value: '',
            parentNames: [],
          },
        ];
      }

      formDapp = {
        ...formDapp,
        [fieldKey]: value,
      };
    });

    templateIds2DSignal.value = [...draggedIds2D];
    formTemplateDappSignal.value = { ...formDapp };
  }, [templateForm]);

  React.useEffect(() => {
    getDataTemplateForm();
  }, [thisDapp, tokens, stakingPools]);

  React.useEffect(() => {
    fetchData();
  }, [dappState]);

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
        break;
      }
      case DappType.airdrop: {
        const data = parseTokensData(tokens);
        console.log('data', data);

        const model = parseDappModel({
          key: DappType.airdrop,
          model: data,
        });
        console.log('model', model);

        // setTemplateDapps(data);
        // setTemplateForm(model);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Image
            src={'/bvmstudio_logo.png'}
            alt={'bvmstudio_logo'}
            width={549}
            height={88}
          />
        </div>
        <p className={styles.content_text}>
          Drag and drop modules to start new blockchains, new dapps, and new
          economies.
        </p>
      </div>

      <div className={styles.container__header}>
        <div></div>
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

          <div className={styles.container__content__sidebar}>
            <Sidebar />
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default RollupsDappPage;
