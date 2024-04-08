import { isMobile, isTablet } from 'react-device-detect';

export const isSmall = isMobile || isTablet;

export interface IAward {
  neededAmount: number;
  captainPoint: number;
  memberPoint: number;
  left?: string;
  right?: string;
  start?: {
    key: string;
    value: string;
  };
  index: number;
}

const calcLeft = (value: number) => {
  return `calc(${value}% - 32px)`;
};

const calcRight = () => {
  return '0px';
};

export const AWARD_LIST: IAward[] = [
  {
    index: 0,
    neededAmount: 0,
    captainPoint: 0,
    memberPoint: 0,
    left: '0%',
    start: {
      key: '',
      value: '',
    },
  },
  {
    index: 1,
    neededAmount: 50000,
    captainPoint: 0.5,
    memberPoint: 0.25,
    left: calcLeft(20),
  },
  {
    index: 2,
    neededAmount: 100000,
    captainPoint: 1,
    memberPoint: 0.5,
    left: calcLeft(40),
  },
  {
    index: 3,
    neededAmount: 500000,
    captainPoint: 2,
    memberPoint: 1,
    left: calcLeft(60),
  },
  {
    index: 4,
    neededAmount: 1000000,
    captainPoint: 4,
    memberPoint: 2,
    left: calcLeft(80),
  },
  {
    index: 5,
    neededAmount: 5000000,
    captainPoint: 8,
    memberPoint: 4,
    right: calcRight(),
  },
];
