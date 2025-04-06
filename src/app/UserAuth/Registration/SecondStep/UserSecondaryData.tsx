import React, { FC } from 'react';
import AuthInput from '../../AuthInput';
import { IUserSecondaryData } from '../../../../assets/types/types';
import WalkingRange from './WalkingRange';

interface Props {
  userSecondaryData: IUserSecondaryData
  handleUserSecondaryData: (key: string, value: string | number) => void
  nonValidateFields: string[]
}

const UserSecondaryData: FC<Props> = ({userSecondaryData, handleUserSecondaryData, nonValidateFields}) => {

  const handleGender = (value: any) => {
    handleUserSecondaryData('gender', value.target.value);
  }

  const handleBirthDate = (value: string) => {
    if (value.length < 11) {
      let newBirthDate = value;
      if (value?.length === 2 || value?.length === 5) {
        newBirthDate += "/";
      }
      
      handleUserSecondaryData("birthDate", newBirthDate);
    }
  }

  const handleWalkingTime = (value: number) => {
    handleUserSecondaryData("walkingTime", value);
  }

  return (
    <>
       <div>
        <h1>Познакомимся поближе</h1>
      </div>
      <div className='user-secondary-data-container' style={{display: "grid", gridTemplateColumns: "1fr 2fr"}}>
        <span>Ваш пол</span>
        <div style={{display: "flex", gap: 10}}>
          <input type="radio" name="gender" id="male" value="male"
          checked={userSecondaryData.gender === "male"} 
          onChange={handleGender}
          />
          <label htmlFor="male">он</label>
          <input type="radio" name="gender" id="female" value="female" 
          checked={userSecondaryData.gender === "female"} 
          onChange={handleGender}
          />
          <label htmlFor="female">она</label>
          <input type="radio" name="gender" id="other" value="other" 
          checked={userSecondaryData.gender === "other"} 
          onChange={handleGender}
          />
          <label htmlFor="other">другое</label>
        </div>

        <span>Дата рождения</span>
        <AuthInput  placeholder='DD/MM/YYYY' 
                    value={userSecondaryData.birthDate} 
                    setValue={handleBirthDate} 
                    isValidated={!nonValidateFields.includes("birthDate")}
        />
      
        <WalkingRange value={userSecondaryData.walkingTime} handleValue={handleWalkingTime} />
        
      </div>
    </>
  );
};

export default UserSecondaryData;