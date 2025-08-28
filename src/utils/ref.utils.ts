import type React from 'react';

export const handleSharedRef = (
  innerRef: any,
  refToAssign: React.ForwardedRef<any>,
  handler: (innerRef: any) => void,
): void => {
  handler(innerRef);
  if (typeof refToAssign === 'function') {
    refToAssign(innerRef);
  } else if (refToAssign) {
    refToAssign.current = innerRef;
  }
};
