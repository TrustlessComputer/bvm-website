import { computed, effect, ReadonlySignal } from '@preact/signals-core';
import { DependencyList, useEffect, useMemo, useRef } from 'react';

export function useSignalEffectDeps(cb: () => void | (() => void), deps: DependencyList): void {
  const callback = useRef(cb);
  callback.current = cb;

  useEffect(() => {
    return effect(() => callback.current());
  }, deps);
}

export function useComputedDeps<T>(compute: () => T, des: DependencyList): ReadonlySignal<T> {
  const $compute = useRef(compute);
  $compute.current = compute;
  return useMemo(() => computed<T>(() => $compute.current()), des);
}
