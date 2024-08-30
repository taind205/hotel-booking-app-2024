import { RefObject, useEffect } from "react";

export const useOutsideClick = <T extends HTMLElement>(
    ref: RefObject<T>,
    handleClickOutside: () => void
  ) => {
    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handleClickOutside();
        }
      };
  
      document.addEventListener('click', handleClick);
  
      return () => document.removeEventListener('click', handleClick);
    }, [ref, handleClickOutside]);
  };