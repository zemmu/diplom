import React, { FC, useCallback, useEffect, useState } from 'react';
import { IFilteredLocation, ILocation } from '../../../../assets/types/types';
import LargeCardPlace from '../../CardPlace/LargeCardPlace';
import { useAppDispatch, useAppSelector } from '../../../../assets/hooks/redux';
import { locationsStateSlice } from '../../../../store/reducers/LocationsSlice';
import { stringWithCapitalLetter } from '../../../../assets/global';


interface Props {
    filteredLocation: IFilteredLocation
    searchValue: string
}

const FilteredLocationList: FC<Props> = ({filteredLocation, searchValue}) => {
    const [locationList, setLocationsList] = useState(filteredLocation.locations);
    const {selectedLocations} = useAppSelector(state => state.locations);

    useEffect(() => {
        setLocationsList(
            filteredLocation.locations.filter(location => !selectedLocations.find(loc => loc.gtib_id === location.gtib_id))
        )
    }, [filteredLocation, selectedLocations])

    useEffect(() => {
        setLocationsList(
            filteredLocation.locations
                .filter(location => 
                    location.name.toLowerCase().includes(searchValue.toLowerCase()) 
                    && !selectedLocations.find(loc => loc.gtib_id === location.gtib_id)
                )
        )
    }, [searchValue, selectedLocations])

    return (
        locationList?.length > 0 
        ?   
        <div className='filtered-location-list'>
            <div className='header-wrapper'>
                <span className='title'>
                    {stringWithCapitalLetter(filteredLocation.location_type)}
                </span>
                <div className='delimeter'/>
            </div>

        <div className='filtered-locations-container'>
            {
                locationList.slice(0, 5).map(location => 
                    <LargeCardPlace 
                        key={location.gtib_id} 
                        location={location} 
                    />
                )
            }
        </div>
            
        </div>
        : null
    );
};



export default FilteredLocationList;