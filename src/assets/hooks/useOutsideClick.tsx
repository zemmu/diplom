import {useCallback, useEffect, useState} from "react";

export const useOutsideClick = (ref: any) => {
  const [outClick, setOutClick] = useState(false);

  const handleClickOutside = useCallback((event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOutClick(true)
    } else {
      setOutClick(false)
    }
  }, [ref])


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleClickOutside])

  return outClick
}