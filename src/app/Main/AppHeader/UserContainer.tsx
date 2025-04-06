import React from 'react';
// @ts-ignore
import userLogo from "../../../assets/img/user-default.svg";
import useUserLocalStorage from '../../../assets/hooks/AuthUser/useUserLocalStorage';
import { IMe } from '../../../assets/types/types';

const UserContainer = () => {
    const {getCreds} = useUserLocalStorage();
    const [user, setUser] = React.useState(getCreds() as IMe);
    
    return (
        <div className='user-container'>
            <div className='user-info'>
            <div className='user-name'>
                <h3>{user.username}</h3>
            </div>
            <div className='user-rank'>
                Гранд Мастер
            </div>
            </div>
            <div className='user-logo'>
                <img src={userLogo} alt="" />
            </div>
        </div>
    );
};

export default UserContainer;