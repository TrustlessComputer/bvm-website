export interface IAnimationHook {
  delayEnter?: number;
  delayTrigger?: number;
  duration?: number;
  ease?: string;
  horizontal?: boolean;
}

export interface IAnimationProps extends IAnimationHook {
  threshold?: number;
  start?: string;
  isObserver?: boolean;
  isInPopup?: boolean;
  markers?: boolean;
}

export interface IValueHookAnimation {
  initAnimation: () => void;
  playAnimation: (d?: number) => void;
}

export type IAnimationElement =
  | HTMLDivElement
  | HTMLElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLHeadElement
  | HTMLLinkElement
  | HTMLButtonElement
  | SVGSVGElement;
