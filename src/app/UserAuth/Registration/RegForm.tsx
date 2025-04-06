import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../../assets/components/Button/Button';
import { userAuthAPI } from '../../../store/APIs/UserAuth';
import UserMainData from './FirstStep/UserMainData';
import Steps from './Steps';
import UserSecondaryData from './SecondStep/UserSecondaryData';
import { IUserSecondaryData } from '../../../assets/types/types';
import UserPreferences from './ThirdStep/UserPreferences';
import useHandleFirstStep from '../../../assets/hooks/AuthUser/useHandleFirstStep';
import FourthStep from './FourthStep';
import useLoginUser from '../../../assets/hooks/AuthUser/useLoginUser';

export const validateObject = (item: {[key: string]: any}) => {
  let nonValidateFields: string[] = [];
  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      if (item[key]?.toString().length === 0) {
        nonValidateFields.push(key);
      }
    }
  }
  
  return nonValidateFields;
}

const RegForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedStep, setCompletedStep] = useState(1);
  const [userData, setUserData] = useState({ username: "qwe", email: "qwe@mail.ru", password: "qweqweqweqwe" });
  const [userSecondaryData, setUserSecondaryData] = useState<IUserSecondaryData>({ gender: "male", birthDate: "", walkingTime: 30 });
  const [userPrefernces, setUserPreferences] = useState({ food: [], interests: [] })
  const {handleRegUser} = useHandleFirstStep(userData)
  const [saveData] = userAuthAPI.useSaveAdditionalDataMutation();
  const {handleLogin} = useLoginUser();

  const handleUserData = (key: string, value: string) => {
    setUserData(prevState => ({...prevState, [key]: value}));
  }

  const handleSecondaryUserData = (key: string, value: string | number) => {
    setUserSecondaryData(prevState => ({...prevState, [key]: value}));
  }

  const handleUserPrefernces = (preferType: "food" | "interests", value: string) => {
    setUserPreferences(prev => {
      const exists = prev[preferType].find(item => item === value);
      if (exists) {
        return {
          ...prev,
          [preferType]: prev[preferType].filter(item => item !== value)
        }
      } else {
        return {
          ...prev,
          [preferType]: [...prev[preferType], value]
        }
      }
    })
  }


  const handleSteps = () => {
    switch (currentStep) {
      case 1:
        if (validateObject(userData).length === 0) {
          handleRegUser()
            .then(data => {
              if (data?.status) {
                setUserData(prev => ({...prev, ...data.user}))
                setCurrentStep(2);
                setCompletedStep(1);
              } 
            })
        }
        break;
      case 2:
        if (validateObject(userSecondaryData).length === 0) {
          setCurrentStep(3);
          setCompletedStep(2);
        }
        break;
      case 3:
        if (userPrefernces?.food.length === 3 && userPrefernces?.interests.length === 5) {
          saveData({...userData, ...userSecondaryData, ...userPrefernces})
            .then(data => {
              // @ts-ignore
              if (data.data === "Saved") {
                setCurrentStep(4);
                setCompletedStep(3);
              }
            })
        }
        break

        case 4:
          handleLogin({username: userData.username, password: userData.password})
        break
      default:
        break;
    }
  }

  const handleBtnText = () => {
    switch (currentStep) {
      case 4:
        return "В путь!"
      case 3:
        return "Создать аккаунт"
    
      default:
        return "Продолжить";
    }
  }

  return (
    <>
      { currentStep === 1 && 
          <UserMainData userData={userData} 
                        handleUserData={handleUserData} 
                        nonValidateFields={validateObject(userData)} 
          /> 
      }
      { currentStep === 2 && 
          <UserSecondaryData  userSecondaryData={userSecondaryData} 
                              handleUserSecondaryData={handleSecondaryUserData} 
                              nonValidateFields={validateObject(userSecondaryData)}
          /> 
      }
      { currentStep === 3 && <UserPreferences chosenPreferences={userPrefernces} handleUserPrefernces={handleUserPrefernces} /> }
      { currentStep < 4 && <Steps currentStep={currentStep} setStep={setCurrentStep} /> }

      { currentStep === 4 && <FourthStep /> }
      <div>
        <Button text={handleBtnText()} onClick={handleSteps} />
      </div>
    </>
  );
};

export default RegForm;