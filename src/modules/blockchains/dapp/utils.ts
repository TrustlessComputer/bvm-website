import {
  MouseSensor as LibMouseSensor,
  TouchSensor as LibTouchSensor,
} from '@dnd-kit/core';
import type { MouseEvent, TouchEvent } from 'react';
import { FieldOption } from './types';
import { FieldKeyPrefix } from './contants';

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

export const removeItemAtIndex = (arr: any[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

export function hexToHSB(hex: string) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Convert RGB to HSB
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  let d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    if (!h) return;
    h /= 6;
  }

  return {
    h: h * 360, // Hue in degrees
    s: s * 100, // Saturation in percentage
    b: (v / 255) * 100, // Brightness in percentage
  };
}

export function hsbToHex(h: number, s: number, b: number) {
  s /= 100;
  b /= 100;

  let k = (n: any) => (n + h / 60) % 6;
  let f = (n: any) => b * (1 - s * Math.max(Math.min(k(n), 4 - k(n), 1), 0));

  let _r = Math.round(f(5) * 255);
  let _g = Math.round(f(3) * 255);
  let _b = Math.round(f(1) * 255);

  return `#${((1 << 24) + (_r << 16) + (_g << 8) + _b)
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

  idDraggingIsAField(idDragging: string) {
    return typeof idDragging.split('-')[3] !== 'undefined';
  },

  getBaseIndex(idDragging: string) {
    if (this.idDraggingIsABase(idDragging)) return idDragging.split('-')[2];

    return idDragging.split('-')[4];
  },
  // baseIndex-block-name
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

export const cloneDeep = <T>(obj: T) => {
  return JSON.parse(JSON.stringify(obj)) as T;
};

export const isTwoObjectEqual = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const hasValue = (value: any) => {
  return value !== null && value !== undefined;
};
