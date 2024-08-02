import React from 'react';
import { useSignalEffect } from '@preact/signals-react';

import InfoTooltip from '@components/Form/InfoTooltip';

import Draggable from '../Draggable';
import Lego from '../Lego';
import { FieldKeyPrefix } from '../../contants';
import { draggedIds2DSignal } from '../../signals/useDragSignal';
import { useThisDapp } from '../../hooks/useThisDapp';

import styles from './styles.module.scss';

type Props = {};

const BoxOption = ({}: Props) => {
  const { thisDapp } = useThisDapp();
  const [disableBaseBlock, setDisableBaseBlock] = React.useState(false);

  const mainColor = React.useMemo(
    () => thisDapp?.color || '#F76649',
    [thisDapp?.color],
  );

  useSignalEffect(() => {
    if (!thisDapp) return;

    const draggedIds2D = draggedIds2DSignal.value;
    const canPlaceMoreBase =
      Number(thisDapp.baseBlock.placableAmount) > draggedIds2D.length ||
      thisDapp.baseBlock.placableAmount === -1;
    // const canPlaceMoreBase = draggedIds2D.length === 0;

    setDisableBaseBlock(!canPlaceMoreBase);
  });

  if (!thisDapp) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__body}>
        {thisDapp?.sections?.map((section) => {
          const totalBlocks = (thisDapp.blockFields || []).filter(
            (f) => f.section === section.key,
          ).length;
          const totalModules = (thisDapp.moduleFields || [])
            .filter((f) => f.section === section.key)
            .reduce((acc, item) => acc + item.fields.length, 0);
          const totalBaseModules = (thisDapp.baseModuleFields || [])
            .filter((f) => f.section === section.key)
            .reduce((acc, item) => acc + item.fields.length, 0);
          const totalSingle = (thisDapp.singleFields || [])
            .filter((f) => f.section === section.key)
            .reduce((acc, item) => acc + item.fields.length, 0);

          const { key: baseBlockKey, ...baseBlock } = thisDapp.baseBlock;

          return (
            <React.Fragment key={section.key}>
              {section?.title && (
                <div className={styles.container__header}>
                  {section?.title} {section?.required && <sup>*</sup>}
                  {section.tooltip && (
                    <InfoTooltip
                      iconSize="sm"
                      placement="top-start"
                      label={section.tooltip}
                      iconName={'/icons/ic-tooltip-blue.svg'}
                    />
                  )}
                </div>
              )}

              {section.key === thisDapp.baseBlock.section && (
                <div className={styles.container__body__item}>
                  <Draggable
                    id={`left-${FieldKeyPrefix.BASE}`}
                    disabled={disableBaseBlock}
                    value={{
                      title: thisDapp.baseBlock.title,
                      icon: thisDapp.baseBlock.icon,
                      background: thisDapp.baseBlock.background || mainColor,
                    }}
                  >
                    <Lego
                      {...baseBlock}
                      background={thisDapp?.baseBlock?.background || mainColor}
                      first={false}
                      last={false}
                      titleInLeft={true}
                      titleInRight={false}
                      disabled={disableBaseBlock}
                    />
                  </Draggable>
                </div>
              )}

              {totalBlocks > 0 && (
                <div className={styles.container__body__item}>
                  <div className={styles.container__body__item__inner}>
                    {thisDapp.blockFields
                      ?.filter((f) => f.section === section.key)
                      ?.map(({ key: blockKey, ...block }) => {
                        return (
                          <React.Fragment
                            key={section.key + blockKey + block.title}
                          >
                            <Draggable
                              id={`left-${FieldKeyPrefix.BLOCK}-${blockKey}`}
                              value={{
                                title: block.title,
                                icon: block.icon,
                                background: block.background || mainColor,
                              }}
                            >
                              <Lego
                                {...block}
                                background={block?.background || mainColor}
                                first={false}
                                last={false}
                                titleInLeft={true}
                                titleInRight={false}
                              />
                            </Draggable>

                            {block.childrenFields?.map(
                              ({ key: childKey, ...child }) => {
                                return (
                                  <Draggable
                                    id={`left-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${blockKey}-${childKey}`}
                                    key={`left-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${blockKey}-${childKey}`}
                                    value={{
                                      title: child.title,
                                      icon: child.icon,
                                      background:
                                        child.background ||
                                        block.background ||
                                        mainColor,
                                      children: true,
                                      fieldKey: childKey,
                                    }}
                                  >
                                    <Lego
                                      {...child}
                                      background={
                                        child?.background || mainColor
                                      }
                                      first={false}
                                      last={false}
                                      titleInLeft={true}
                                      titleInRight={false}
                                      preview={true}
                                      fields={[child]}
                                    />
                                  </Draggable>
                                );
                              },
                            )}
                          </React.Fragment>
                        );
                      })}
                  </div>
                </div>
              )}

              {totalModules > 0 && (
                <div className={styles.container__body__item}>
                  <div className={styles.container__body__item__inner}>
                    {thisDapp.moduleFields
                      ?.filter((f) => f.section === section.key)
                      ?.map((item) => {
                        return item.fields.map((field) => {
                          return (
                            <Draggable
                              id={`left-${FieldKeyPrefix.MODULE}-${item.key}-${field.value}`}
                              key={`left-${FieldKeyPrefix.MODULE}-${item.key}-${field.value}`}
                              value={{
                                title: field.title,
                                icon: field.icon,
                                value: field.value,
                                background:
                                  field.background ||
                                  item.background ||
                                  mainColor,
                              }}
                              disabled={!field.selectable}
                            >
                              <Lego
                                {...field}
                                background={item.background || mainColor}
                                disabled={!field.selectable}
                                first={false}
                                last={false}
                                titleInLeft={true}
                                titleInRight={false}
                              />
                            </Draggable>
                          );
                        });
                      })}
                  </div>
                </div>
              )}

              {totalBaseModules > 0 && (
                <div className={styles.container__body__item}>
                  <div className={styles.container__body__item__inner}>
                    {thisDapp.baseModuleFields
                      ?.filter((f) => f.section === section.key)
                      ?.map((item) => {
                        return item.fields.map((field) => {
                          return (
                            <Draggable
                              id={`left-${FieldKeyPrefix.BASE_MODULE}-${item.key}-${field.value}`}
                              key={`left-${FieldKeyPrefix.BASE_MODULE}-${item.key}-${field.value}`}
                              value={{
                                title: field.title,
                                icon: field.icon,
                                value: field.value,
                                background:
                                  field.background ||
                                  item.background ||
                                  mainColor,
                              }}
                              disabled={!field.selectable}
                            >
                              <Lego
                                {...field}
                                background={item.background || mainColor}
                                disabled={!field.selectable}
                                first={false}
                                last={false}
                                titleInLeft={true}
                                titleInRight={false}
                              />
                            </Draggable>
                          );
                        });
                      })}
                  </div>
                </div>
              )}

              {totalSingle > 0 && (
                <div className={styles.container__body__item}>
                  <div className={styles.container__body__item__inner}>
                    {thisDapp.singleFields
                      ?.filter((f) => f.section === section.key)
                      ?.map(({ key: itemKey, ...item }) => {
                        return item.fields.map((field) => {
                          return (
                            <Draggable
                              id={`left-${FieldKeyPrefix.SINGLE}-${field.key}`}
                              key={`left-${FieldKeyPrefix.SINGLE}-${field.key}`}
                              value={{
                                title: field.title,
                                icon: field.icon,
                                background:
                                  field.background ||
                                  item.background ||
                                  mainColor,
                              }}
                            >
                              <Lego
                                {...item}
                                background={item.background || mainColor}
                                first={false}
                                last={false}
                                titleInLeft={true}
                                titleInRight={false}
                              />
                            </Draggable>
                          );
                        });
                      })}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(BoxOption);
