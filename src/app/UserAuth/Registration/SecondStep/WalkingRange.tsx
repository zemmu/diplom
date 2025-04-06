import React, { FC, useEffect, useState } from 'react';


interface Props {
  value: number
  handleValue: (value: number) => void
}

const WalkingRange: FC<Props> = ({value, handleValue}) => {
  const min = 0;
  const max = 150;
  const [percent, setPercent] = useState(0);

  const handleWalkingTime = (e: any) => {
    handleValue(Number(e.target.value));
  }

  useEffect(() => {
    const percentage = (value - min) * 100 / (max - min);
    setPercent(percentage);  
  }, [value])

  return (
    <div className='walking-range-wrapper'>
          <span>Сколько длится Ваша прогулка в минутах?</span>
          <div className='walking-range-container'>
            <div className='walking-range-labels'>
              <span>30</span>
              <span>60</span>
              <span>90</span>
              <span>120</span>
            </div>

            <input type="range" 
                   className='walking-range-input'
                   min={min}
                   max={max}
                   value={value}
                   onChange={handleWalkingTime}
                   style={{backgroundSize: `${percent}%`}}
            />  
          </div> 
        </div>
  );
};

export default WalkingRange;