declare module 'react-create-ref' {
  import React from 'react';

  type ReactCreateRef<T> = typeof React.createRef extends Function
    ? React.RefObject<T>
    : () => { current: null };

  export default function createRef<T>(): ReactCreateRef<T>;
}
