import { useEffect, useRef } from 'react';
import { listenOutsideClick } from '@anthonypena/outside-click';

export function useOutsideClick<TElement extends HTMLElement>(
  callback: (event: MouseEvent) => void,
) {
  const targetRef = useRef<TElement | null>(null);

  useEffect(() => {
    if (targetRef.current == undefined) {
      return;
    }
    return listenOutsideClick(targetRef.current, callback);
  }, [targetRef]);

  return targetRef;
}
