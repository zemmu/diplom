import React, {FC, memo, useEffect, useRef, useState} from 'react';
import "./Input.scss";
import {useOutsideClick} from "../../hooks/useOutsideClick";

interface Props {
  value: string
  setValue: (value: string) => void
  id?: string
  styles?: React.CSSProperties
  setIsClicked?: (value: boolean) => void
}

const Input: FC<Props> = ({value, setValue, id=undefined, styles, setIsClicked}) => {
  const [isClick, setIsClick] = useState(false);
  const ref = useRef(null);
  const isOutsideClick = useOutsideClick(ref);

  useEffect(() => { setIsClicked && setIsClicked(isClick) }, [isClick]);

  useEffect(() => { isOutsideClick && setIsClick(false) }, [isOutsideClick])

  return (
    <input className="custom-input" type="text"
           ref={ref}
           id={id && id}
           style={styles}
           value={value}
           onChange={e => setValue(e.target.value)}
           onClick={() => setIsClick(true)}
    />
  );
};

export default memo(Input);