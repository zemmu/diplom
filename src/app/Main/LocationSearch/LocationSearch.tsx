import React, { useEffect, useState } from 'react';
import "../../../styles/LocationSearch.scss";
import { Search } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../../assets/hooks/redux';
import Input from '../../../assets/components/Input/Input';
import LocationList from './LocationList/LocationList';
import RecView from './RecomendationList/RecView';
import { locationsStateSlice } from '../../../store/reducers/LocationsSlice';
import { ILocation } from '../../../assets/types/types';

const LocationSearch = () => {
    const dispatch = useAppDispatch();
    const {setRecomendationLocation} = locationsStateSlice.actions;
    const [searchValue, setSearchValue] = useState("");
    const {recomendationLocation} = useAppSelector(state => state.locations);
    const [isRecView, setIsRecView] = useState(false);


    useEffect(() => {
        if (recomendationLocation?.gtib_id) {
            setIsRecView(true);
        }
    }, [recomendationLocation])

    useEffect(() => { setIsRecView(false) }, [searchValue])

    useEffect(() => {
        if (!isRecView) {
            dispatch(setRecomendationLocation({} as ILocation))
        }
    }, [isRecView])

    return (
        <div className='location-search-container'>
            
            <div className='search-container'>
                <Input 
                    value={searchValue}
                    setValue={setSearchValue}
                    styles={{fontSize: 18}}
                />
                <Search size={20}/>
            </div>
            {
                isRecView
                ? <RecView />
                : <LocationList searchValue={searchValue} />
            }
        </div>
    );
};

export default LocationSearch;