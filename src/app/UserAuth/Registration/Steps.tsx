import React, { FC } from 'react';
// @ts-ignore
import step from "../../../assets/img/step.svg";
// @ts-ignore
import stepCompleted from "../../../assets/img/step-completed.svg";


interface Props {
  currentStep: number
  setStep: (value: number) => void
}

const Steps: FC<Props> = ({currentStep, setStep}) => {  

  const handleStep = (value: number) => {
    setStep(value);
    
  }
  return (
    <div style={{display: "flex", gap: 10}}>
      {
        Array.from(new Array(3)).map((_, index) => {
          return (
            <img  key={index} 
                  src={ index < currentStep ? stepCompleted : step } 
                  alt=""
                  onClick={() => handleStep(index + 1)}
                  style={{cursor: "pointer"}}
             />
          )
        })
      }
    </div>
  );
};

export default Steps;