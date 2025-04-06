import React, { FC } from 'react';
import "./Button.scss";


interface Props {
  text: string
  onClick: () => void
}

const Button: FC<Props> = ({text, onClick}) => {
  return (
    <button onClick={onClick} className='custom-btn'>
      {text}
    </button>
  );
};

export default Button;