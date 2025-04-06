import React, { FC, memo } from 'react';
import AuthInput from '../../AuthInput';
import { IUserData } from '../../../../assets/types/types';


interface Props {
  userData: IUserData
  handleUserData: (key: string, value: string) => void
  nonValidateFields: string[]
}

const UserMainData: FC<Props> = ({userData, handleUserData, nonValidateFields}) => {
  return (
    <>
      <div>
        <h1>Создать аккаунт</h1>
      </div>
      <div>
        <AuthInput  value={userData.username} 
                    setValue={(value) => handleUserData("username", value)} 
                    placeholder='Имя пользователя' 
                    isValidated={!nonValidateFields.includes("username")}
        />
        <AuthInput  value={userData.email} 
                    setValue={(value) => handleUserData("email", value)} 
                    placeholder='Email' 
                    isValidated={!nonValidateFields.includes("email")}
        />
        <AuthInput  value={userData.password} 
                    setValue={(value) => handleUserData("password", value)} 
                    placeholder='Пароль' 
                    isValidated={!nonValidateFields.includes("password")}
        />
      </div>
    </>
  );
};

export default memo(UserMainData);