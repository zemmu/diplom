import React from 'react';
import "./styles/App.scss";
import Main from "./app/Main/Main";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPageWrapper from './app/UserAuth/AuthPageWrapper';
import LoginForm from './app/UserAuth/LoginForm';
import RegForm from './app/UserAuth/Registration/RegForm';


function App() {

  const RegistrationPage = <AuthPageWrapper><RegForm/></AuthPageWrapper>
  const LoginPage = <AuthPageWrapper><LoginForm/></AuthPageWrapper>

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='reg' element={RegistrationPage} />
          <Route path='login' element={LoginPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
