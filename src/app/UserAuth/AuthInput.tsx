import React, { FC, useCallback } from 'react';

interface Props {
  value: string
  setValue: (value: string) => void
  placeholder: string
  isValidated?: boolean
}

const AuthInput: FC<Props> = ({value, setValue, placeholder, isValidated=true}) => {

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  } , [setValue])

  return (
    <input className='auth-input' 
           value={value}
           onChange={onChange}
           placeholder={placeholder}
           style={{
            border: isValidated ? "1px solid var(--grey)" : "1px solid red",
            backgroundColor: isValidated ? "#f9f9f9" : "#fff7f7"
           }}
    />
  );
};

export default AuthInput;