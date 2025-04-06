import React, { FC, useCallback } from 'react';
import PreferncesSection from './PreferncesSection';


const foodPreferences = [
  "Грузинская", "Вино", "Русская", "Кофе", "Современная", 
  "Газировка", "Азиатская", "Чай", "Европейская"
];
const interests = [
  "Чтение", "Фильмы", "Скульптура", "Картины", "Спорт", "Мода", "Искусство",
  "Фотография", "Блоггинг", "K-POP", "Плаванье", "Садоводство", "Природа", "Лодки",
  "Средневековье", "Барокко", "Классицизм", "Модерн", "Орган", "Кофе"
];

interface Props {
  chosenPreferences: {food: string[], interests: string[]}
  handleUserPrefernces: (preferType: "food" | "interests", value: string) => void
}

const UserPreferences: FC<Props> = ({chosenPreferences, handleUserPrefernces}) => {
  return (
    <>
      <div>
        <h1>Еще чуть-чуть</h1>
      </div>
      <div className='user-preferences-container'>
        <PreferncesSection title='Любимая кухня и напиток?' 
                           preferences={foodPreferences} 
                           chosenPreferences={chosenPreferences.food} 
                           onClick={(item) => handleUserPrefernces("food", item)}
                           maxCount={3}
        />
        <PreferncesSection title='Что Вам интересно?' 
                           preferences={interests} 
                           chosenPreferences={chosenPreferences.interests}
                           onClick={(item) => handleUserPrefernces("interests", item)}
                           maxCount={5}
        />
        
      </div>
    </>
  );
};

export default UserPreferences;