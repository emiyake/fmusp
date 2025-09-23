import React, { useLayoutEffect } from 'react';

// basically Exclude<React.ClassAttributes<T>["ref"], string>
type UserRef<T> = ((instance: T | null) => void) | React.RefObject<T> | null | undefined;

type Writable<T> = { -readonly [P in keyof T]: T[P] };

const updateRef = <T>(ref: NonNullable<UserRef<T>>, value: T | null) => {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  (ref as Writable<typeof ref>).current = value as T;
};

const useLatest = <T>(value: T) => {
  const ref = React.useRef(value);

  useLayoutEffect(() => {
    ref.current = value;
  });

  return ref;
};

export const useComposedRef = <T extends HTMLElement>(libRef: React.RefObject<T | null>, userRef: UserRef<T>) => {
  const prevUserRef = React.useRef<UserRef<T>>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentional
  return React.useCallback(
    (instance: T | null) => {
      libRef.current = instance;

      if (prevUserRef.current) {
        updateRef(prevUserRef.current, null);
      }

      prevUserRef.current = userRef;

      if (!userRef) {
        return;
      }

      updateRef(userRef, instance);
    },
    [userRef],
  );
};

type UnknownFunction = (...args: any[]) => any;

type InferEventType<TTarget> = TTarget extends {
  // we infer from 2 overloads which are super common for event targets in the DOM lib
  // we "prioritize" the first one as the first one is always more specific
  addEventListener(type: infer P, ...args: any): void;
  // we can ignore the second one as it's usually just a fallback that allows bare `string` here
  // we use `infer P2` over `any` as we really don't care about this type value
  // and we don't want to accidentally fail a type assignability check, remember that `any` isn't assignable to `never`
  addEventListener(type: infer _P2, ...args: any): void;
}
  ? P & string
  : never;

type InferEvent<TTarget, TType extends string> = `on${TType}` extends keyof TTarget
  ? Parameters<Extract<TTarget[`on${TType}`], UnknownFunction>>[0]
  : Event;

function useListener<TTarget extends EventTarget, TType extends InferEventType<TTarget>>(
  target: TTarget,
  type: TType,
  listener: (event: InferEvent<TTarget, TType>) => void,
) {
  const latestListener = useLatest(listener);
  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentional
  React.useLayoutEffect(() => {
    const handler: typeof listener = ev => latestListener.current(ev);
    // might happen if document.fonts is not defined, for instance
    if (!target) {
      return;
    }
    target.addEventListener(type, handler);
    return () => target.removeEventListener(type, handler);
  }, []);
}

export const useFormResetListener = (
  libRef: React.RefObject<HTMLTextAreaElement | null>,
  listener: (event: Event) => any,
) => {
  useListener(document.body, 'reset', ev => {
    if (libRef.current?.form === ev.target) {
      listener(ev);
    }
  });
};

export const useWindowResizeListener = (listener: (event: UIEvent) => any) => {
  useListener(window, 'resize', listener);
};

export const useFontsLoadedListener = (listener: (event: Event) => any) => {
  useListener(document.fonts, 'loadingdone', listener);
};
