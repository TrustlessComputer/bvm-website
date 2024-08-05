import React from 'react';
import { useSignalEffect } from '@preact/signals-react';

import Droppable from '../Droppable';
import Draggable from '../Draggable';
import Lego from '../Lego';
import LegoParent from '../LegoParent';
import Input from '../Input';
import Dropdown from '../Dropdown';
import ExtendsInput from '../ExtendsInput';
import Button from '../Button';
import Label from '../Label';
import { FieldKeyPrefix } from '../../contants';
import { FieldOption } from '../../types';
import {
  adjustBrightness,
  cloneDeep,
  DragUtil,
  FormDappUtil,
  isTwoObjectEqual,
} from '../../utils';
import useDappsStore, {
  subScribeDropEnd,
  useTemplateFormStore,
} from '../../stores/useDappStore';
import {
  draggedIds2DSignal,
  draggedIdsSignal,
  templateIds2DSignal,
} from '../../signals/useDragSignal';
import {
  formDappDropdownSignal,
  formDappInputSignal,
  formDappSignal,
  formDappToggleSignal,
} from '../../signals/useFormDappsSignal';
import { useThisDapp } from '../../hooks/useThisDapp';

import styles from './styles.module.scss';
import Image from 'next/image';
import BottomButton from '@/modules/blockchains/dapp/components/BottomButton';
import DateTimeInput from '../DateTimeInput';
import { DappModel, FieldModel } from '@/types/customize-model';
import { Box, Text } from '@chakra-ui/react';

const RightDroppableV2 = () => {
  const {
    thisDapp,
    blockFieldMapping,
    baseModuleFieldMapping,
    moduleFieldMapping,
    singleFieldMapping,
  } = useThisDapp();
  const { templateDapps } = useTemplateFormStore();

  const refContainer = React.useRef<HTMLDivElement>(null);
  const refWrap = React.useRef<HTMLDivElement>(null);

  const [draggedIds2D, setDraggedIds2D] = React.useState<
    typeof draggedIds2DSignal.value
  >([]);
  const [templateIds2D, setTemplateIds2D] = React.useState<
    typeof templateIds2DSignal.value
  >([]);

  const mainColor = React.useMemo(
    () => adjustBrightness(thisDapp?.color || '#F76649', -10),
    [thisDapp],
  );

  const handleReset = () => {
    formDappSignal.value = [];
    draggedIds2DSignal.value = [];
  };

  const onActionClick = (params: { dapp: DappModel }) => {
    console.log(params.dapp?.action);
    alert('CLICK ME');
  };

  const getInput = React.useCallback(
    (
      { key: fieldKey, ...field }: FieldModel,
      fieldOpt: FieldOption,
      zIndex: number,
    ) => {
      if (field.type === 'input') {
        return (
          <Lego
            first={false}
            last={false}
            titleInLeft={true}
            titleInRight={false}
            zIndex={zIndex}
            {...field}
            key={fieldKey}
          >
            <Input
              {...field}
              {...fieldOpt}
              name={fieldKey}
              dappKey={thisDapp.key}
              key={fieldKey}
            />
          </Lego>
        );
      } else if (field.type === 'dropdown') {
        return (
          <Lego
            key={fieldKey}
            background={adjustBrightness(mainColor, -20)}
            first={false}
            last={false}
            title={field.title}
            titleInLeft={true}
            titleInRight={false}
            zIndex={zIndex}
          >
            <Dropdown
              {...field}
              {...fieldOpt}
              keyDapp={thisDapp.key}
              name={fieldKey}
              key={fieldKey}
              options={field.options}
            />
          </Lego>
        );
      } else if (field.type === 'extends') {
        return (
          <ExtendsInput
            {...field}
            {...fieldOpt}
            key={fieldKey}
            name={fieldKey}
            keyDapp={thisDapp.key}
            zIndex={zIndex}
          />
        );
      } else if (field.type === 'group') {
        return (
          <Lego
            {...field}
            key={fieldKey}
            first={false}
            last={false}
            titleInLeft={true}
            titleInRight={false}
            zIndex={zIndex}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {field.options.map((option, optIndex) =>
                getInput(option, fieldOpt, field.options.length - optIndex),
              )}
            </div>
          </Lego>
        );
      } else if (field.type === 'datetime') {
        return (
          <Lego
            {...field}
            key={fieldKey}
            first={false}
            last={false}
            titleInLeft={true}
            titleInRight={false}
            zIndex={zIndex}
          >
            <DateTimeInput
              {...field}
              {...fieldOpt}
              name={fieldKey}
              key={fieldKey}
              dappKey={thisDapp.key}
              placeholder={field.placeholder}
            />
          </Lego>
        );
      }
    },
    [thisDapp],
  );

  const getLabel = React.useCallback(
    (
      field: FieldModel,
      fieldOpt: FieldOption,
      baseIndex: number,
      background?: string,
    ) => {
      const thisDapp = templateDapps[baseIndex];
      const mainColor = adjustBrightness(background || thisDapp.color, +10);

      if (field.type === 'input') {
        return (
          <Lego
            first={false}
            last={false}
            titleInLeft={true}
            titleInRight={false}
            {...field}
            key={field.key}
            background={adjustBrightness(mainColor, -20)}
          >
            <Input
              {...field}
              {...fieldOpt}
              name={field.key}
              dappKey={thisDapp.key}
              disabled
              onlyLabel
            />
          </Lego>
        );
      } else if (field.type === 'dropdown') {
        return (
          <Lego
            key={field.key}
            background={adjustBrightness(mainColor, -20)}
            first={false}
            last={false}
            title={field.title}
            titleInLeft={true}
            titleInRight={false}
          >
            <Dropdown
              {...field}
              {...fieldOpt}
              keyDapp={thisDapp.key}
              name={field.key}
              options={field.options}
              background={adjustBrightness(mainColor, -40)}
              disabled
              onlyLabel
            />
          </Lego>
        );
      } else if (field.type === 'extends') {
        return (
          <ExtendsInput
            {...field}
            {...fieldOpt}
            key={field.key}
            name={field.key}
            keyDapp={thisDapp.key}
            background={adjustBrightness(mainColor, -20)}
            disabled
            onlyLabel
          />
        );
      } else if (field.type === 'group') {
        return (
          <Lego
            key={field.key}
            background={adjustBrightness(mainColor, -20)}
            first={false}
            last={false}
            title={field.title}
            titleInLeft={true}
            titleInRight={false}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {field.options.map((option, optIndex) =>
                getInput(option, fieldOpt, field.options.length - optIndex),
              )}
            </div>
          </Lego>
        );
      } else if (field.type === 'datetime') {
        return (
          <Lego
            key={field.key}
            background={adjustBrightness(mainColor, -20)}
            first={false}
            last={false}
            title={field.title}
            titleInLeft={true}
            titleInRight={false}
          >
            <DateTimeInput
              {...field}
              {...fieldOpt}
              name={field.key}
              dappKey={thisDapp.key}
              placeholder={field.placeholder}
              disabled
              onlyLabel
            />
          </Lego>
        );
      }
    },
    [templateDapps],
  );

  useSignalEffect(() => {
    if (draggedIds2DSignal.value.length === draggedIds2D.length) {
      for (let i = 0; i < draggedIds2DSignal.value.length; i++) {
        if (!isTwoObjectEqual(draggedIds2DSignal.value[i], draggedIds2D[i])) {
          setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
          break;
        }

        for (let j = 0; j < draggedIds2DSignal.value[i].length; j++) {
          if (
            !isTwoObjectEqual(
              draggedIds2DSignal.value[i][j],
              draggedIds2D[i][j],
            )
          ) {
            setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
            break;
          }
        }
      }
    } else {
      setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
    }

    if (templateIds2DSignal.value.length === templateIds2D.length) {
      for (let i = 0; i < templateIds2DSignal.value.length; i++) {
        if (!isTwoObjectEqual(templateIds2DSignal.value[i], templateIds2D[i])) {
          setTemplateIds2D(cloneDeep(templateIds2DSignal.value));
          break;
        }

        for (let j = 0; j < templateIds2DSignal.value[i].length; j++) {
          if (
            !isTwoObjectEqual(
              templateIds2DSignal.value[i][j],
              templateIds2D[i][j],
            )
          ) {
            setTemplateIds2D(cloneDeep(templateIds2DSignal.value));
            break;
          }
        }
      }
    } else {
      setTemplateIds2D(cloneDeep(templateIds2DSignal.value));
    }
  });

  useSignalEffect(() => {
    const isHad = subScribeDropEnd.value;

    setTimeout(() => {
      if (!refWrap.current || !refContainer.current) return;
      if (
        isHad &&
        refWrap.current.scrollHeight > refContainer.current.scrollHeight
      ) {
        const ouputEl = refWrap.current?.querySelector<HTMLElement>('#output');
        if (ouputEl) ouputEl.style.alignItems = 'flex-start';
      }
    }, 150);
  });

  if (!thisDapp) return null;

  return (
    <div className={styles.wrapRight} ref={refContainer}>
      <div className={styles.wrapRight_inner} ref={refWrap}>
        <Droppable
          id="output"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              transform: 'translateX(35%)',
            }}
          >
            {draggedIds2D.map((ids, baseIndex) => {
              let blockCount = 0;

              const { key: baseBlockKey, ...baseBlock } = thisDapp.baseBlock;

              return (
                <Draggable
                  id={`right-${FieldKeyPrefix.BASE}-${baseIndex}`}
                  key={baseIndex}
                  value={{
                    title: thisDapp.baseBlock.title,
                    icon: thisDapp.baseBlock.icon,
                    fieldKey: thisDapp.baseBlock.key,
                    background: thisDapp.color_border || mainColor,
                  }}
                >
                  <Droppable
                    id={`right-${FieldKeyPrefix.BASE}-${baseIndex}`}
                    style={{
                      width: 'max-content',
                      height: 'max-content',
                    }}
                  >
                    <LegoParent
                      {...baseBlock}
                      background={thisDapp?.color_border || mainColor}
                      label={thisDapp.label}
                      zIndex={
                        draggedIds2D.length + templateIds2D?.length - baseIndex
                      }
                    >
                      {ids
                        .filter((id) =>
                          DragUtil.idDraggingIsABaseModule(id.name),
                        )
                        .map((item, itemIndex) => {
                          const thisBaseModule =
                            baseModuleFieldMapping[
                              DragUtil.getOriginalKey(item.name)
                            ];
                          const thisModule = thisBaseModule.fields.find(
                            (f: FieldModel) => f.value === item.value,
                          );

                          if (!thisModule) return null;

                          return (
                            <Lego
                              {...thisBaseModule}
                              preview={false}
                              key={item.name}
                              background={adjustBrightness(
                                thisBaseModule.background || mainColor,
                                -20,
                              )}
                              first={false}
                              last={false}
                              titleInLeft={false}
                              titleInRight={true}
                              zIndex={ids.length * 2 - itemIndex}
                            >
                              <Label {...thisModule} />
                            </Lego>
                          );
                        })}

                      {thisDapp.baseBlock.fields.map(
                        (field: FieldModel, fieldIndex: number) => {
                          return getInput(
                            field,
                            {
                              inBaseField: true,
                              inBlockField: false,
                              inSingleField: false,
                              index: undefined,
                              level: 0,
                              blockKey: '',
                              baseIndex,
                            },
                            thisDapp.baseBlock.fields.length +
                              ids.length * 2 -
                              fieldIndex,
                          );
                        },
                      )}

                      {ids.map((item, itemIndex) => {
                        if (DragUtil.idDraggingIsABlock(item.name)) {
                          const { key: thisBlockKey, ...thisBlock } =
                            blockFieldMapping[
                              DragUtil.getOriginalKey(item.name)
                            ];
                          const needSuffix = thisBlock.placableAmount === -1;

                          blockCount++;

                          return (
                            <Draggable
                              id={`${item.name}-${itemIndex}-${baseIndex}`}
                              key={`${item.name}-${itemIndex}-${baseIndex}`}
                              value={{
                                title: thisBlock.title + ' #' + blockCount,
                                icon: thisBlock.icon,
                                fieldKey: thisBlockKey,
                                background: thisBlock.background || mainColor,
                              }}
                            >
                              <Droppable
                                id={`${item.name}-${itemIndex}-${baseIndex}`}
                              >
                                <LegoParent
                                  {...thisBlock}
                                  title={
                                    thisBlock.title +
                                    (needSuffix ? ' #' + blockCount : '')
                                  }
                                  background={adjustBrightness(
                                    thisBlock.background || mainColor,
                                    -10,
                                  )}
                                  smallMarginHeaderTop
                                  zIndex={ids.length - itemIndex}
                                >
                                  {thisBlock.fields.map(
                                    (field: FieldModel, fieldIndex: number) => {
                                      return getInput(
                                        field,
                                        {
                                          inBaseField: false,
                                          inBlockField: true,
                                          inSingleField: false,
                                          index: itemIndex,
                                          level: 0,
                                          blockKey: thisBlockKey,
                                          baseIndex,
                                        },
                                        thisBlock.fields.length +
                                          item.children.length +
                                          1 -
                                          fieldIndex,
                                      );
                                    },
                                  )}

                                  {item.children.map((child, childIndex) => {
                                    const thisChildField =
                                      thisBlock.childrenFields?.find(
                                        (f: FieldModel) =>
                                          f.key ===
                                          DragUtil.getOriginalKey(child.name),
                                      );

                                    if (!thisChildField) return null;

                                    return (
                                      <Draggable
                                        id={`${child.name}`}
                                        key={`${child.name}`}
                                        value={{
                                          title: thisChildField.title,
                                          icon: thisChildField.icon,
                                          fieldKey: thisChildField.key,
                                          background:
                                            thisChildField.background ||
                                            mainColor,
                                          blockKey: thisBlockKey,
                                        }}
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          gap: '0px',
                                          zIndex:
                                            item.children.length - childIndex,
                                        }}
                                      >
                                        {getInput(
                                          thisChildField,
                                          {
                                            inBaseField: false,
                                            inBlockField: true,
                                            inSingleField: false,
                                            index: itemIndex,
                                            level: 0,
                                            blockKey: thisBlockKey,
                                            baseIndex,
                                          },
                                          item.children.length - childIndex,
                                        )}
                                      </Draggable>
                                    );
                                  })}
                                </LegoParent>
                              </Droppable>
                            </Draggable>
                          );
                        } else if (DragUtil.idDraggingIsASingle(item.name)) {
                          const field =
                            singleFieldMapping[
                              DragUtil.getOriginalKey(item.name)
                            ];

                          const thisModule = field.fields[0];

                          if (!thisModule) return null;

                          return (
                            <Draggable
                              id={`${item.name}-${itemIndex}-${baseIndex}`}
                              key={`${item.name}-${itemIndex}-${baseIndex}`}
                              value={{
                                title: thisModule.title,
                                icon: thisModule.icon,
                                fieldKey: thisModule.key,
                              }}
                            >
                              {getInput(
                                thisModule,
                                {
                                  inBaseField: false,
                                  inBlockField: false,
                                  inSingleField: true,
                                  index: itemIndex,
                                  level: 0,
                                  blockKey: '',
                                  baseIndex,
                                },
                                ids.length - itemIndex,
                              )}
                            </Draggable>
                          );
                        } else if (DragUtil.idDraggingIsAModule(item.name)) {
                          const thisModule =
                            moduleFieldMapping[
                              DragUtil.getOriginalKey(item.name)
                            ];
                          const isMultiple = thisModule.placableAmount === -1;

                          if (isMultiple) {
                            return (
                              <Draggable
                                id={`${item.name}-${itemIndex}-${baseIndex}`}
                                key={`${item.name}-${itemIndex}-${baseIndex}`}
                                value={{
                                  title: thisModule.title,
                                  icon: thisModule.icon,
                                  fieldKey: thisModule.key,
                                }}
                              >
                                <LegoParent
                                  {...thisModule}
                                  background={adjustBrightness(mainColor, -20)}
                                  smallMarginHeaderTop
                                  zIndex={ids.length - itemIndex}
                                >
                                  {(item.value as string[]).map(
                                    (value, index) => {
                                      const thisValue = thisModule.fields.find(
                                        (f: FieldModel) => f.value === value,
                                      );

                                      if (!thisValue) return null;

                                      return (
                                        <Draggable
                                          id={`${item.name}-${itemIndex}-${baseIndex}-${value}`}
                                          key={`${item.name}-${itemIndex}-${baseIndex}-${value}`}
                                          value={{
                                            title: thisValue.title,
                                            icon: thisValue.icon,
                                            value: thisValue.value,
                                          }}
                                        >
                                          <Lego
                                            key={value}
                                            background={adjustBrightness(
                                              thisModule.background ||
                                                mainColor,
                                              -40,
                                            )}
                                            first={false}
                                            last={false}
                                            titleInLeft={true}
                                            titleInRight={false}
                                          >
                                            <Label {...thisValue} />
                                          </Lego>
                                        </Draggable>
                                      );
                                    },
                                  )}
                                </LegoParent>
                              </Draggable>
                            );
                          } else {
                            const thisField = thisModule.fields.find(
                              (f: FieldModel) => f.value === item.value,
                            );

                            if (!thisField) return null;

                            return (
                              <Draggable
                                id={`${item.name}-${itemIndex}-${baseIndex}`}
                                key={`${item.name}-${itemIndex}-${baseIndex}`}
                                value={{
                                  title: thisModule.title,
                                  icon: thisModule.icon,
                                  fieldKey: thisModule.key,
                                }}
                              >
                                <Lego
                                  {...thisModule}
                                  preview={false}
                                  background={adjustBrightness(
                                    thisModule.background || mainColor,
                                    -20,
                                  )}
                                  first={false}
                                  last={false}
                                  titleInLeft={false}
                                  titleInRight={true}
                                  zIndex={ids.length - itemIndex}
                                >
                                  <Label {...thisField} />
                                </Lego>
                              </Draggable>
                            );
                          }
                        }

                        return null;
                      })}
                    </LegoParent>
                  </Droppable>
                </Draggable>
              );
            })}

            {templateIds2D.map((ids, baseIndex) => {
              let blockCount = 0;
              const thisDapp = templateDapps[baseIndex];
              const mainColor = thisDapp.color;

              return (
                <LegoParent
                  {...thisDapp.baseBlock}
                  background={mainColor}
                  label={thisDapp.label}
                  dapp={thisDapp}
                  key={baseIndex}
                >
                  {ids
                    .filter((id) => DragUtil.idDraggingIsABaseModule(id.name))
                    .map((item) => {
                      const thisBaseModule =
                        baseModuleFieldMapping[
                          DragUtil.getOriginalKey(item.name)
                        ];
                      const thisField = thisBaseModule.fields.find(
                        (f: FieldModel) => f.value === item.value,
                      );

                      if (!thisField) return null;

                      return (
                        <Lego
                          key={item.name}
                          background={adjustBrightness(
                            thisBaseModule.background || mainColor,
                            -20,
                          )}
                          first={false}
                          last={false}
                          titleInLeft={true}
                          titleInRight={false}
                        >
                          <Label {...thisField} />
                        </Lego>
                      );
                    })}

                  {thisDapp.baseBlock.fields.map((field: FieldModel) => {
                    return getLabel(
                      field,
                      {
                        inBaseField: true,
                        inBlockField: false,
                        inSingleField: false,
                        index: undefined,
                        level: 0,
                        blockKey: '',
                        baseIndex,
                      },
                      baseIndex,
                      field?.background,
                    );
                  })}

                  {ids.map((item, itemIndex) => {
                    if (DragUtil.idDraggingIsABlock(item.name)) {
                      const { key: thisBlockKey, ...thisBlock } =
                        blockFieldMapping[DragUtil.getOriginalKey(item.name)];

                      blockCount++;

                      return (
                        <Draggable
                          id={`${item.name}-${itemIndex}-${baseIndex}`}
                          key={`${item.name}-${itemIndex}-${baseIndex}`}
                          value={{
                            title: thisBlock.title + ' #' + blockCount,
                            icon: thisBlock.icon,
                          }}
                        >
                          <LegoParent
                            {...thisBlock}
                            title={thisBlock.title + ' #' + blockCount}
                            background={adjustBrightness(mainColor, -10)}
                            smallMarginHeaderTop
                          >
                            {thisBlock.fields.map((field: FieldModel) => {
                              return getLabel(
                                field,
                                {
                                  inBaseField: false,
                                  inBlockField: true,
                                  inSingleField: false,
                                  index: itemIndex,
                                  level: 0,
                                  blockKey: thisBlockKey,
                                  baseIndex,
                                },
                                baseIndex,
                              );
                            })}

                            {/*{item.children.map((child, childIndex) => {
                              const thisChildField =
                                thisBlock.childrenFields?.find(
                                  (f) =>
                                    f.key ===
                                    DragUtil.getOriginalKey(child.name),
                                );

                              if (!thisChildField) return null;

                              return (
                                <Draggable
                                  id={`${child.name}`}
                                  key={`${child.name}`}
                                  value={{
                                    title: thisChildField.title,
                                    icon: thisChildField.icon,
                                    fieldKey: thisChildField.key,
                                    background:
                                      thisChildField.background ||
                                      mainColor,
                                    blockKey: thisBlockKey,
                                  }}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0px',
                                    zIndex:
                                      item.children.length - childIndex,
                                  }}
                                >
                                  {getLabel(
                                    thisChildField,
                                    {
                                      inBaseField: false,
                                      inBlockField: true,
                                      inSingleField: false,
                                      index: itemIndex,
                                      level: 0,
                                      blockKey: thisBlockKey,
                                      baseIndex,
                                    },
                                    item.children.length - childIndex,
                                  )}
                                </Draggable>
                              );
                            })}*/}
                          </LegoParent>
                        </Draggable>
                      );
                    } else if (DragUtil.idDraggingIsASingle(item.name)) {
                      const field =
                        singleFieldMapping[DragUtil.getOriginalKey(item.name)];

                      const thisModule = field.fields[0];

                      if (!thisModule) return null;

                      return (
                        <Draggable
                          id={`${item.name}-${itemIndex}-${baseIndex}`}
                          key={`${item.name}-${itemIndex}-${baseIndex}`}
                          value={{
                            title: thisModule.title,
                            icon: thisModule.icon,
                          }}
                        >
                          {getLabel(
                            thisModule,
                            {
                              inBaseField: false,
                              inBlockField: false,
                              inSingleField: true,
                              index: itemIndex,
                              level: 0,
                              blockKey: '',
                              baseIndex,
                            },
                            baseIndex,
                          )}
                        </Draggable>
                      );
                    } else if (DragUtil.idDraggingIsAModule(item.name)) {
                      const thisModule =
                        moduleFieldMapping[DragUtil.getOriginalKey(item.name)];
                      const isMultiple = thisModule.placableAmount === -1;

                      if (isMultiple) {
                        return (
                          <Draggable
                            id={`${item.name}-${itemIndex}-${baseIndex}`}
                            key={`${item.name}-${itemIndex}-${baseIndex}`}
                            value={{
                              title: thisModule.title,
                              icon: thisModule.icon,
                            }}
                          >
                            <LegoParent
                              {...thisModule}
                              background={adjustBrightness(mainColor, -20)}
                              smallMarginHeaderTop
                            >
                              {(item.value as string[]).map((value, index) => {
                                const thisField = thisModule.fields.find(
                                  (f: FieldModel) => f.value === value,
                                );

                                if (!thisField) return null;

                                return (
                                  <Draggable
                                    id={`${item.name}-${itemIndex}-${baseIndex}-${value}`}
                                    key={`${item.name}-${itemIndex}-${baseIndex}-${value}`}
                                    value={{
                                      title: thisModule.title,
                                      icon: thisModule.icon,
                                    }}
                                  >
                                    <Lego
                                      key={value}
                                      background={adjustBrightness(
                                        thisModule.background || mainColor,
                                        -40,
                                      )}
                                      first={false}
                                      last={false}
                                      titleInLeft={true}
                                      titleInRight={false}
                                    >
                                      <Label {...thisField} />
                                    </Lego>
                                  </Draggable>
                                );
                              })}
                            </LegoParent>
                          </Draggable>
                        );
                      } else {
                        const thisField = thisModule.fields.find(
                          (f: FieldModel) => f.value === item.value,
                        );

                        if (!thisField) return null;

                        return (
                          <Draggable
                            id={`${item.name}-${itemIndex}-${baseIndex}`}
                            key={`${item.name}-${itemIndex}-${baseIndex}`}
                            value={{
                              title: thisModule.title,
                              icon: thisModule.icon,
                            }}
                          >
                            <Lego
                              {...thisModule}
                              preview={false}
                              background={adjustBrightness(
                                thisModule.background || mainColor,
                                -20,
                              )}
                              first={false}
                              last={false}
                              titleInLeft={false}
                              titleInRight={true}
                            >
                              <Label {...thisField} />
                            </Lego>
                          </Draggable>
                        );
                      }
                    }

                    return null;
                  })}

                  {thisDapp.action && (
                    <BottomButton
                      color={thisDapp.action.color || mainColor}
                      dapp={thisDapp}
                    />
                  )}
                </LegoParent>
              );
            })}
          </div>
        </Droppable>
      </div>
      <Button
        element="button"
        type="button"
        onClick={() => handleReset()}
        className={styles.resetButton}
      >
        RESET <Image src="/icons/undo.svg" alt="undo" width={20} height={20} />
      </Button>
    </div>
  );
};

export default RightDroppableV2;
