import React from 'react';
import { useSignalEffect } from '@preact/signals-react';
import cn from 'classnames';

import InfoTooltip from '@components/Form/InfoTooltip';
import { DappModel, IModelOption } from '@/types/customize-model';

import Lego from '../Lego';
import Draggable from '../Draggable';
import { FieldKeyPrefix } from '../../contants';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../../signals/useDragSignal';
import DescriptionModal from '../../components/DescriptionModal/DescriptionModal';

import styles from './styles.module.scss';
import useOneForm from '../../hooks/useOneForm';
import { formDappSignal } from '../../signals/useFormDappsSignal';

type Props = {
  info: IModelOption & {
    description?: {
      title: string;
      content: React.ReactNode;
    };
  };
  thisDapp: DappModel;
  dappIndex: number;
  className?: string;
  children?: React.ReactNode;
};

const BoxOption = ({
  info,
  thisDapp,
  dappIndex,
  className = '',
  children,
}: Props) => {
  const { retrieveFormsByDappKey, retrieveNodePositionsByDappKey } =
    useOneForm();
  const descriptionRef = React.useRef<HTMLDivElement>(null);

  const [allThisDappForm, setAllThisDappForm] = React.useState<
    Record<string, any>[]
  >([]);

  const [isShowModal, setIsShowModal] = React.useState(false);
  const [disableBaseBlock, setDisableBaseBlock] = React.useState(false);

  const mainColor = React.useMemo(
    () => thisDapp?.color || '#F76649',
    [thisDapp],
  );

  useSignalEffect(() => {
    if (!thisDapp) return;

    const draggedIds2D = draggedIds2DSignal.value;
    const canPlaceMoreBase =
      Number(thisDapp.baseBlock.placableAmount) >
        draggedDappIndexesSignal.value.filter((index) => index === dappIndex)
          .length || thisDapp.baseBlock.placableAmount === -1;
    // const canPlaceMoreBase = draggedIds2D.length === 0;

    console.log('[retrieveFormsByDappKey]', {
      dappKey: thisDapp.key,
      forms: retrieveFormsByDappKey({ dappKey: thisDapp.key }),
    });
    setAllThisDappForm(retrieveFormsByDappKey({ dappKey: thisDapp.key }));
    setDisableBaseBlock(!canPlaceMoreBase);
  });

  React.useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.innerHTML = info.description?.content as string;
    }
  }, []);

  if (!thisDapp) {
    return null;
  }

  return (
    <React.Fragment>
      <div
        className={cn(
          styles.container,
          {
            [styles.container__disable]: info.disabled,
          },
          className,
        )}
      >
        <div id={info.key} className={styles.container__header}>
          <h4 className={styles.container__header__title}>{info.title}</h4>

          {info.tooltip && (
            <div onClick={() => setIsShowModal(true)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2b35e4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          )}
        </div>

        <div className={styles.container__body}>
          {children && (
            <div className={styles.container__body__content}>{children}</div>
          )}

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
                {section?.title && section.show && (
                  <div className={styles.container__body__header}>
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
                      id={`left-${FieldKeyPrefix.BASE}-${thisDapp.key}`}
                      disabled={disableBaseBlock}
                      value={{
                        dappIndex,
                        isChain: false,
                        title: thisDapp.baseBlock.title,
                        icon: thisDapp.baseBlock.icon,
                        background: thisDapp.baseBlock.background || mainColor,
                      }}
                    >
                      <Lego
                        {...baseBlock}
                        background={
                          thisDapp?.baseBlock?.background || mainColor
                        }
                        first={false}
                        last={false}
                        titleInLeft={true}
                        titleInRight={false}
                        disabled={disableBaseBlock}
                        checked={draggedDappIndexesSignal.value.some(
                          (dIndex) => dIndex === dappIndex,
                        )}
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
                          let checked = false;

                          for (const key in formDappSignal.value) {
                            if (
                              key.includes(`${FieldKeyPrefix.BLOCK}`) &&
                              key.includes(blockKey)
                            ) {
                              checked = true;
                            }
                          }
                          return (
                            <React.Fragment
                              key={section.key + blockKey + block.title}
                            >
                              <Draggable
                                id={`left-${FieldKeyPrefix.BLOCK}-${blockKey}`}
                                value={{
                                  dappIndex,
                                  isChain: false,
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
                                  checked={checked}
                                />
                              </Draggable>

                              {block.childrenFields?.map(
                                ({ key: childKey, ...child }) => {
                                  let checked = false;

                                  for (const key in formDappSignal.value) {
                                    if (
                                      key.includes(`${FieldKeyPrefix.BLOCK}`) &&
                                      key.includes(blockKey) &&
                                      key.includes(childKey)
                                    ) {
                                      checked = true;
                                    }
                                  }

                                  return (
                                    <Draggable
                                      id={`left-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${blockKey}-${childKey}`}
                                      key={`left-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${blockKey}-${childKey}`}
                                      value={{
                                        dappIndex,
                                        isChain: false,
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
                                        fields={[{ key: childKey, ...child }]}
                                        checked={checked}
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
                          let checked = false;

                          if (allThisDappForm.length > 0) {
                            for (const key in formDappSignal.value) {
                              if (
                                key.includes(
                                  `${FieldKeyPrefix.MODULE}-${item.key}`,
                                )
                              ) {
                                checked = true;
                              }
                            }
                          }

                          return item.fields.map((field) => {
                            return (
                              <Draggable
                                id={`left-${FieldKeyPrefix.MODULE}-${item.key}-${field.value}`}
                                key={`left-${FieldKeyPrefix.MODULE}-${item.key}-${field.value}`}
                                value={{
                                  dappIndex,
                                  isChain: false,
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
                                  infoLego={{
                                    title: info.title,
                                    type: section?.title,
                                  }}
                                  checked={checked}
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
                            let checked = false;

                            if (allThisDappForm.length > 0) {
                              for (const key in formDappSignal.value) {
                                if (
                                  key.includes(
                                    `${FieldKeyPrefix.BASE_MODULE}-${item.key}`,
                                  ) &&
                                  formDappSignal.value[key] === field.value
                                ) {
                                  checked = true;
                                  console.log(
                                    '[checked]',
                                    key,
                                    field.value,
                                    formDappSignal.value[key],
                                  );
                                }
                              }
                            }

                            return (
                              <Draggable
                                id={`left-${FieldKeyPrefix.BASE_MODULE}-${item.key}-${field.value}`}
                                key={`left-${FieldKeyPrefix.BASE_MODULE}-${item.key}-${field.value}`}
                                value={{
                                  dappIndex,
                                  isChain: false,
                                  title: field.title,
                                  icon: field.icon,
                                  value: field.value,
                                  background:
                                    field.background ||
                                    item.background ||
                                    mainColor,
                                }}
                                disabled={disableBaseBlock}
                              >
                                <Lego
                                  {...field}
                                  background={item.background || mainColor}
                                  disabled={disableBaseBlock}
                                  first={false}
                                  last={false}
                                  titleInLeft={true}
                                  titleInRight={false}
                                  checked={checked}
                                  infoLego={{
                                    title: info.title,
                                    type: section?.title,
                                  }}
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
                          let checked = false;

                          if (allThisDappForm.length > 0) {
                            for (const key in formDappSignal.value) {
                              if (
                                key.includes(
                                  `${FieldKeyPrefix.SINGLE}-${itemKey}`,
                                )
                              ) {
                                checked = true;
                              }
                            }
                          }

                          return item.fields.map((field) => {
                            return (
                              <Draggable
                                id={`left-${FieldKeyPrefix.SINGLE}-${field.key}`}
                                key={`left-${FieldKeyPrefix.SINGLE}-${field.key}`}
                                value={{
                                  dappIndex,
                                  isChain: false,
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
                                  checked={checked}
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

      {info.description?.title && (
        <DescriptionModal
          ref={descriptionRef}
          show={isShowModal}
          onClose={() => setIsShowModal(false)}
          title={info.description.title}
          content={info.description.content}
        />
      )}
    </React.Fragment>
  );
};

export default React.memo(BoxOption);
