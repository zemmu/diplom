import React, { useEffect, useState } from 'react';
import { userAuthAPI } from '../../../store/APIs/UserAuth';
import useUserCreds from './useUserLocalStorage';
import { useNavigate } from 'react-router-dom';
import { IUserCreds } from '../../types/types';

const useLoginUser = () => {
  const [login, {data: loginData, isLoading: loginIsLoading}] = userAuthAPI.useLoginUserMutation();
  const [getMe, {data: meData, isLoading: meIsLoading}] = userAuthAPI.useLazyMeQuery();
  const {setToken, setCreds} = useUserCreds();
  const navigate = useNavigate();

  const handleLogin = (userCreds: IUserCreds) => login(userCreds)

  useEffect(() => {    
    if (!loginIsLoading && loginData) {      
      if (loginData?.auth_token) {  
        setToken(loginData.auth_token);         
        getMe(loginData.auth_token);
      } 
    }
  }, [loginData, loginIsLoading]);

  useEffect(() => {
    if (!meIsLoading && meData) {
      setCreds(meData);
      loginData && setToken(loginData.auth_token);
      navigate("/");
    }
  }, [meData, meIsLoading])

  return {handleLogin}
};

export default useLoginUser;