import React, { FC } from 'react';
import "../../styles/UserAuth.scss";


interface Props {
  children: React.ReactNode
}

const AuthPageWrapper: FC<Props> = ({children}) => {
  return (
    <div className='registration-wrapper'>
      <div className='registration-container'>
        <div className='img-block' />

        <div className='form-wrapper'>
          <div className="form-container">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPageWrapper;