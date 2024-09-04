import { IAirdropTask } from '@/services/api/dapp/airdrop/interface';
import { IToken } from '@/services/api/dapp/token_generation/interface';
import {
  BlockModel,
  DappModel,
  FieldModel,
  IModelCategory,
  IModelOption,
} from '@/types/customize-model';
import { compareString } from '@/utils/string';
import {
  MouseSensor as LibMouseSensor,
  TouchSensor as LibTouchSensor,
} from '@dnd-kit/core';
import lodashCloneDeep from 'lodash/cloneDeep';
import type { MouseEvent, TouchEvent } from 'react';
import { FieldKeyPrefix } from './contants';
import { UseOrderFormStoreV3 } from './stores/index_v3';
import { DappType, FieldOption } from './types';

const handler = ({ nativeEvent: event }: MouseEvent | TouchEvent) => {
  let cur = event.target as HTMLElement;

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement as HTMLElement;
  }

  return true;
};

export class MouseSensor extends LibMouseSensor {
  static activators = [
    { eventName: 'onMouseDown', handler },
  ] as (typeof LibMouseSensor)['activators'];
}

export class TouchSensor extends LibTouchSensor {
  static activators = [
    { eventName: 'onTouchStart', handler },
  ] as (typeof LibTouchSensor)['activators'];
}

export function hexToHSB(hex: string): { h: number; s: number; b: number } {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let delta = max - min;

  // Calculate Brightness
  let brightness = max;

  // Calculate Saturation
  let saturation = max === 0 ? 0 : delta / max;

  // Calculate Hue
  let hue = 0;
  if (delta !== 0) {
    switch (max) {
      case r:
        hue = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / delta + 2;
        break;
      case b:
        hue = (r - g) / delta + 4;
        break;
    }
    hue *= 60;
  }

  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    b: Math.round(brightness * 100),
  };
}

export function hsbToHex(h: number, s: number, b: number): string {
  s /= 100;
  b /= 100;

  let k = (n: number): number => (n + h / 60) % 6;
  let f = (n: number): number =>
    b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));

  let r = Math.round(f(5) * 255);
  let g = Math.round(f(3) * 255);
  let b_ = Math.round(f(1) * 255);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b_)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

export const adjustBrightness = (hex: string, percent: number) => {
  const fillBackgroundAsHSB = hexToHSB(hex);
  const _background = hsbToHex(
    fillBackgroundAsHSB?.h || 0,
    fillBackgroundAsHSB?.s || 0,
    (fillBackgroundAsHSB?.b || 100) + percent,
  )?.split('.')[0];

  return _background;
};

export const FormDappUtil = {
  getOriginalKey(key: string) {
    return key.split('-')[2];
  },

  getBlockType(key: string) {
    return key.split('-')[1];
  },

  getBlockKey(key: string) {
    return key.split('-')[5];
  },

  getBaseIndex(key: string) {
    return Number(key.split('-')[0]);
  },

  getLevel(key: string) {
    return Number(key.split('-')[3]);
  },

  getIndex(key: string) {
    return Number(key.split('-')[4]);
  },

  isExtendsField(key: string) {
    return Number(key.split('-')[3]) > 0;
  },

  isInBlock(key: string) {
    return key.split('-')[1] === FieldKeyPrefix.BLOCK;
  },

  isInSingle(key: string) {
    return key.split('-')[1] === FieldKeyPrefix.SINGLE;
  },

  isInModule(key: string) {
    return key.split('-')[1] === FieldKeyPrefix.MODULE;
  },

  isInBase(key: string) {
    return key.split('-')[1] === FieldKeyPrefix.BASE;
  },

  isInBaseModule(key: string) {
    return key.split('-')[1] === FieldKeyPrefix.BASE_MODULE;
  },

  // prettier-ignore
  getKeyForm (
    field: FieldModel,
    fieldOption: FieldOption,
    name: string,
  )  {
    if (fieldOption.inBaseField) {
      return `${fieldOption.baseIndex}-${FieldKeyPrefix.BASE}-${name}-${fieldOption.level ?? 0}`;
    } else if (fieldOption.inBlockField) {
      return `${fieldOption.baseIndex}-${FieldKeyPrefix.BLOCK}-${name}-${fieldOption.level ?? 0}-${fieldOption.index}-${fieldOption.blockKey}`;
    } else {
      return `${fieldOption.baseIndex}-${FieldKeyPrefix.SINGLE}-${name}-${fieldOption.level ?? 0}-${fieldOption.index}`;
    }
  },
};

export const DragUtil = {
  idDraggingIsABlock(idDragging: string) {
    return idDragging.split('-')[1] === FieldKeyPrefix.BLOCK;
  },

  idDraggingIsASingle(idDragging: string) {
    return idDragging.split('-')[1] === FieldKeyPrefix.SINGLE;
  },

  idDraggingIsABase(idDragging: string) {
    return idDragging.split('-')[1] === FieldKeyPrefix.BASE;
  },

  idDraggingIsAModule(idDragging: string) {
    return idDragging.split('-')[1] === FieldKeyPrefix.MODULE;
  },

  idDraggingIsAChildOfABlock(idDragging: string) {
    return idDragging.split('-')[1] === FieldKeyPrefix.CHILDREN_OF_BLOCK;
  },

  idDraggingIsAField(idDragging: string) {
    return typeof idDragging.split('-')[3] !== 'undefined';
  },

  idDraggingIsABaseModule(idDragging: string) {
    return idDragging.split('-')[1] === FieldKeyPrefix.BASE_MODULE;
  },

  getBaseIndex(idDragging: string) {
    if (this.idDraggingIsABase(idDragging)) return idDragging.split('-')[2];

    return idDragging.split('-')[4];
  },

  getChildIndex(idDragging: string) {
    return idDragging.split('-')[3];
  },

  getOriginalKey(idDragging: string) {
    return idDragging.split('-')[2];
  },

  isLeftSide(idDragging: string) {
    return idDragging.split('-')[0] === 'left';
  },

  isRightSide(idDragging: string) {
    return idDragging.split('-')[0] === 'right';
  },
};

export const compareKeyInFormDappAndDrag = (
  keyInFormDapp: string,
  idDragging: string,
) => {
  const baseIndexKeyInFormDapp = FormDappUtil.getBaseIndex(keyInFormDapp);
  const baseIndexKeyInActiveId = Number(DragUtil.getBaseIndex(idDragging));
  const indexInFormDapp = FormDappUtil.getIndex(keyInFormDapp);
  const indexInActiveId = Number(DragUtil.getChildIndex(idDragging));
  const originalKeyInFormDapp = FormDappUtil.getOriginalKey(keyInFormDapp);
  const originalKeyInActiveId = DragUtil.getOriginalKey(idDragging);

  return (
    baseIndexKeyInFormDapp === baseIndexKeyInActiveId &&
    indexInFormDapp === indexInActiveId &&
    originalKeyInFormDapp === originalKeyInActiveId
  );
};

export const cloneDeep = lodashCloneDeep;

export const isTwoObjectEqual = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const hasValue = (value: any) => {
  return value !== null && value !== undefined;
};

export const preDataAirdropTask = (
  sortedDapps: DappModel[] = [],
  tokens: IToken[],
  airdropTasks: IAirdropTask[],
) => {
  const _sortedDapps = cloneDeep(sortedDapps);

  if (tokens.length > 0) {
    const _airdropIndex = _sortedDapps.findIndex((v) =>
      compareString(v.key, DappType.airdrop),
    );

    if (_airdropIndex > -1) {
      const fieldRewardToken = _sortedDapps[
        _airdropIndex
      ].baseBlock.fields.findIndex((v: FieldModel) =>
        compareString(v.key, 'reward_token'),
      );

      if (fieldRewardToken > -1) {
        // // @ts-ignore
        const options: any = tokens.map((t) => ({
          key: t.id,
          title: t.name,
          value: t.contract_address,
          icon: t.image_url,
          tooltip: '',
          type: '',
          options: [],
        }));

        // @ts-ignore
        _sortedDapps[_airdropIndex].baseBlock.fields[fieldRewardToken].options =
          options;

        if (airdropTasks.length > 0) {
          const singleFields: BlockModel[] = cloneDeep(
            _sortedDapps[_airdropIndex].blockFields || [],
          );

          for (const airdropTask of airdropTasks) {
            const fields: FieldModel[] = [];

            if (compareString(airdropTask.type, 'follow')) {
              fields.unshift(
                {
                  key: getAirdropTaskKey(airdropTask),
                  title: 'Your X URL',
                  type: 'input',
                  icon: '',
                  value: '',
                  tooltip: '',
                  options: [],
                  placeholder: 'https://x.com/xxxx',
                },
                {
                  key: 'reward_amount',
                  title: 'Reward',
                  type: 'input',
                  icon: '',
                  value: '',
                  tooltip: '',
                  options: [],
                  placeholder: '100000',
                },
              );
            } else if (compareString(airdropTask.type, 'share')) {
              fields.unshift(
                {
                  key: getAirdropTaskKey(airdropTask),
                  title: 'Link Share X',
                  type: 'input',
                  icon: '',
                  value: '',
                  tooltip: '',
                  options: [],
                  placeholder: 'https://x.com/xxxx/status/yyyy',
                },
                {
                  key: 'reward_amount',
                  title: 'Reward',
                  type: 'input',
                  icon: '',
                  value: '',
                  tooltip: '',
                  options: [],
                  placeholder: '100000',
                },
              );
            } else if (compareString(airdropTask.type, 'whitelist')) {
              fields.unshift({
                key: getAirdropTaskKey(airdropTask),
                title: 'Receivers',
                type: 'input',
                inputType: 'file',
                inputAccept: '.csv',
                icon: '',
                value: '',
                tooltip: '',
                options: [],
              });
            }

            singleFields.push({
              key: getAirdropTaskKey(airdropTask),
              title: airdropTask.title,
              icon: '',
              placableAmount: 1,
              section: 'tasks',
              preview: false,
              fields,
              background: '#43766C',
              linkDownloadFile:
                getAirdropTaskKey(airdropTask) === 'whitelist'
                  ? 'https://cdn.bvm.network/users/template_aidrop_3f48a00b-4571-4675-bfa7-f1c1e184c354.csv'
                  : undefined,
            });
          }

          _sortedDapps[_airdropIndex].blockFields = singleFields;
        }
      }
    }
  }
  return _sortedDapps;
};

export const preDataYoloGame = (
  sortedDapps: DappModel[] = [],
  tokens: IToken[],
) => {
  const _sortedDapps = cloneDeep(sortedDapps);

  if (tokens.length > 0) {
    const _appIndex = _sortedDapps.findIndex((v) =>
      compareString(v.key, DappType.yologame),
    );

    if (_appIndex > -1) {
      const fieldSettlementToken = _sortedDapps[
        _appIndex
      ].baseModuleFields?.findIndex((v: BlockModel) =>
        compareString(v.key, 'settlement_token'),
      );

      // @ts-ignore
      if (fieldSettlementToken > -1) {
        // // @ts-ignore
        const options: any = tokens.map((t) => ({
          key: t.id,
          title: t.name,
          value: t.contract_address,
          icon: t.image_url,
          tooltip: '',
          type: '',
          options: [],
          selectable: true,
        }));

        // @ts-ignore
        _sortedDapps[_appIndex].baseModuleFields[fieldSettlementToken].fields =
          options;
      }
    }
  }
  return _sortedDapps;
};

export const getAirdropTaskKey = (task: IAirdropTask) => {
  if (compareString(task.type, 'follow') || compareString(task.id, '1')) {
    return 'follow_twitter_username';
  }
  if (compareString(task.type, 'share') || compareString(task.id, '2')) {
    return 'share_post_link';
  }

  return 'whitelist';
};

export const chainKeyToDappKey = (key: string) => {
  switch (key) {
    case 'create_token':
      return 'token_generation';
    default:
      return key;
  }
};

export const dappKeyToChainKey = (key: string) => {
  switch (key) {
    case 'token_generation':
      return 'create_token';
    default:
      return key;
  }
};

export const isChainOptionDisabled = (
  field: UseOrderFormStoreV3['field'],
  item: IModelCategory,
  currentOption: IModelOption,
) => {
  return (
    (!!currentOption.supportLayers &&
      currentOption.supportLayers.length > 0 &&
      !currentOption.supportLayers.includes(field['layers']?.value as any)) ||
    !!(
      currentOption.supportNetwork &&
      currentOption.supportNetwork !== 'both' &&
      currentOption.supportNetwork !== field['network']?.value
    ) ||
    item.disable ||
    !currentOption.selectable
  );
};

export const shouldCalcPrice = (
  field: UseOrderFormStoreV3['field'],
  item: IModelCategory,
  currentOption: IModelOption,
) => {
  return field[item.key].dragged;
};
