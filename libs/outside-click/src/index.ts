export function listenOutsideClick(
  target: HTMLElement,
  callback: (event: MouseEvent) => void,
) {
  const listener = (event: MouseEvent) => {
    if (!target.contains(event.target as HTMLElement)) {
      callback(event);
    }
  };
  document.addEventListener('click', listener);
  return () => document.removeEventListener('click', listener);
}
