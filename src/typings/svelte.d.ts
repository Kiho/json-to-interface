declare class Svelte<T> {
  constructor(options: { target: Element, data?: any, store?: any });

  get(): T;
  get(name: string): any;

  set(data: T);

  on(
      eventName: string,
      callback?: (event?: any) => any)
      : () => { cancel: () => any };

  fire(eventName: string, event?: any);

  observe(
      name: string,
      callback: (newValue?, oldValue?) => any,
      options?: { init?: boolean, defer?: boolean })
      : () => { cancel: () => any };

  teardown();

  oncreate();
}
