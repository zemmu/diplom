import React from 'react';
import "../../../styles/Main.scss";
import { Link } from 'react-router-dom';
import useUserLocalStorage from '../../../assets/hooks/AuthUser/useUserLocalStorage';
import UserContainer from './UserContainer';
import useUserAuth from '../../../assets/hooks/AuthUser/useUserAuth';


export const AppHeader = () => {
  const {isLogged} = useUserAuth();

  return (
    <div className="app-header-wrapper">
      <div className="app-header-container">
        <div className='nav-container'>
          <div className='nav-item'>Карта</div>
          <div className='nav-item'>Настройки</div>
        
        {
          isLogged
          ? <UserContainer /> 
          : <div className='logg-nav-container'>
              <Link to='/reg' className='nav-item'>Регистрация</Link>
              <Link to='/login' className='nav-item'>Авторизация</Link>
            </div>
        }
        
        </div>
      </div>
    </div>
  );
};



