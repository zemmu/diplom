import {useEffect, useState} from 'react';

const UseKeyPress = (keyTarget: string) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  const downHandler = ({key}: any) => {
    if (key === keyTarget) setIsKeyPressed(true);
  }

  const upHandler = ({key}: any) => {
    if (key === keyTarget) setIsKeyPressed(false);
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    }
  }, [window])

  return isKeyPressed;
};

export default UseKeyPress;