import { signal, effect, Signal } from '@angular/core';

export function createDebouncedSignal<T>(
  sourceSignal: Signal<T>,
  delay: number = 300
): Signal<T> {
  const debouncedSignal = signal<T>(sourceSignal());
  let debounceTimer: any = null;

  effect(() => {
    const value = sourceSignal();
    
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    debounceTimer = setTimeout(() => {
      debouncedSignal.set(value);
    }, delay);
  });

  return debouncedSignal.asReadonly();
}