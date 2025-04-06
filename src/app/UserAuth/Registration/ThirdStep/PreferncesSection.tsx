import React, { FC } from 'react';


interface Props {
  title: string
  preferences: string[]
  chosenPreferences: string[]
  onClick: (item: string) => void
  maxCount: number
}

const PreferncesSection: FC<Props> = ({title, preferences, chosenPreferences, onClick, maxCount}) => {

  const handleOnClick = (item: string) => {
    if (!chosenPreferences.includes(item) && chosenPreferences.length < maxCount) {
      onClick(item)
    }  else if (chosenPreferences.includes(item)) {
      onClick(item)
    }
  }

  return (
    <div className='preferences-section-container'>
      <div className='preferences-section-header'>
        <h5>{title}</h5>
        <h5 className='preferences-counter'>{ chosenPreferences.length } / {maxCount}</h5>
      </div>
      <div className='preferences-list'>
      {
        preferences.map((p, index) => {
          return (
            <div key={index} 
                 className={`preferences-list-item ${chosenPreferences.includes(p) ? "active" : ""}`}
                 onClick={() => handleOnClick(p)}
            >
              {p}
            </div>  
          )
        })
      }
      </div>
    </div>
  );
};

export default PreferncesSection;