import React, { useEffect, useState } from 'react';
import AuthInput from './AuthInput';
import Button from '../../assets/components/Button/Button';
import { Link } from 'react-router-dom';
import { userAuthAPI } from '../../store/APIs/UserAuth';
import { validateObject } from './Registration/RegForm';
import useLoginUser from '../../assets/hooks/AuthUser/useLoginUser';

const LoginForm = () => {
  const [userData, setUserData] = useState({ username: "", password: "" })
  const {handleLogin} = useLoginUser();
  const nonValidateFields = validateObject(userData);

  const handleData = (key: "username" | "password", value: string) => setUserData({ ...userData, [key]: value })
  

  return (
    <>
      <div>
        <h1>С возвращением!</h1>
      </div>
      <div>
        <AuthInput  value={userData.username} 
                    setValue={(value) => handleData("username", value)} 
                    placeholder='Имя пользователя'
                    isValidated={!nonValidateFields.includes("username")} 
        />
        <AuthInput  value={userData.password} 
                    setValue={(value) => handleData("password", value)} 
                    placeholder='Пароль' 
                    isValidated={!nonValidateFields.includes("password")} 
        />
      </div>
      <div className='login-tools' style={{margin: 0, justifyContent: "space-between"}}>
        <Link to='/reg' className='login-tool'>Создать аккаунт</Link>
        <a className='login-tool'>Забыли пароль?</a>
      </div>
      <div>
        <Button text={"Войти"} onClick={() => handleLogin(userData)} />
      </div>
    </>
  );
};

export default LoginForm;