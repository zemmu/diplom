import React from 'react';
// @ts-ignore
import journeyLogo from "../../../assets/img/journey-logo.svg";

const FourthStep = () => {
  return (
    <>
      <div>
        <h1>Приятных прогулок</h1>
      </div>
      <div className='journey-img-container'>
        <img className='journey-img' 
             src={journeyLogo} alt="" /> 
      </div>
    </>
  );
};

export default FourthStep;