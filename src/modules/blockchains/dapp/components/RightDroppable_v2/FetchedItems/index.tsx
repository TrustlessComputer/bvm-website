import { FieldModel } from '@/types/customize-model';
import { useSignalEffect } from '@preact/signals-react';
import React from 'react';
import { useThisDapp } from '../../../hooks/useThisDapp';
import { templateIds2DSignal } from '../../../signals/useDragSignal';
import {
  isTwoObjectEqual,
  cloneDeep,
  DragUtil,
  adjustBrightness,
} from '../../../utils';
import BottomButton from '../../BottomButton';
import Label from '../../Label';
import Lego from '../../Lego';
import LegoParent from '../../LegoParent';
import { useTemplateFormStore } from '../../../stores/useDappStore';
import { FieldOption } from '../../../types';
import DateTimeInput from '../../DateTimeInput';
import Dropdown from '../../Dropdown';
import ExtendsInput from '../../ExtendsInput';
import Input from '../../Input';
import Draggable from '../../Draggable';

const FetchedItems = () => {
  const { templateDapps } = useTemplateFormStore();

  const [templateIds2D, setTemplateIds2D] = React.useState<
    typeof templateIds2DSignal.value
  >([]);

  const {
    thisDapp,
    baseModuleFieldMapping,
    blockFieldMapping,
    moduleFieldMapping,
    singleFieldMapping,
  } = useThisDapp();

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
                getLabel(option, fieldOpt, field.options.length - optIndex),
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

  return templateIds2D.map((ids, baseIndex) => {
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
              baseModuleFieldMapping[DragUtil.getOriginalKey(item.name)];
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
  });
};

export default FetchedItems;
