import {
  MouseSensor as LibMouseSensor,
  TouchSensor as LibTouchSensor,
} from '@dnd-kit/core';
import type { MouseEvent, TouchEvent } from 'react';

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

export const getParentId = (key: string, suffix?: string) =>
  'parent-' + key + (suffix ? `-${suffix}` : '');

export const getChildId = (
  parentKey: string,
  key: string,
  value: string | number,
  suffix?: string,
) =>
  'child-' +
  parentKey +
  '-' +
  key +
  '-' +
  value.toString() +
  (suffix ? `-${suffix}` : '');
