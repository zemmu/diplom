import React, {useId, useState} from 'react';
import Input from "../../../../assets/components/Input/Input";
import { Search } from 'react-feather';

const SearchLine = () => {
  const id = useId();
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  

  return (
    <div className="search-wrapper" >
      <div className={`search-container ${isActive ? "active" : "inactive"}`}>
        <Input value={value}
               setValue={setValue}
               id={id}
               setIsClicked={setIsActive}
        />
        <Search />
      </div>
    </div>
  );
};

export default SearchLine;