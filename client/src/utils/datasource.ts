import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { AnyFunction } from '@utils/types';

type DataProxy<T> = {
  [K in keyof T]: T[K] extends AnyFunction ? (...args: Parameters<T[K]>) => DataMethod<T[K]> : T[K];
};

class DataMethod<T extends AnyFunction> {
  constructor(
      private delegate: AnyFunction,
      private args: Parameters<T>,
      private target: string,
  ) {}

  useQuery(deps: (string | number)[] = [], opts?: Omit<UseQueryOptions<Awaited<ReturnType<T>>>, 'queryKey' | 'queryFn'>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Awaited<ReturnType<T>>>({
      ...opts,
      queryKey: [`${this.target}.${this.delegate.name}`, ...deps],
      queryFn: () => this.delegate(...this.args),
    });
  }
}

export function createDatasource<T extends object>(source: T): DataProxy<T> {
  return new Proxy<T>(source, {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    get(target: T, prop: string | symbol, receiver: any) {
      const delegate = Reflect.get(target, prop, receiver);

      if (typeof delegate === 'function') {
        // Оборачиваем функцию для перехвата вызова
        return (...args: unknown[]) => new DataMethod(delegate.bind(target) as AnyFunction, args, target.constructor.name);
      }

      // Вернуть обычные свойства как есть
      return delegate;
    },
  }) as DataProxy<T>;
}