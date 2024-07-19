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
