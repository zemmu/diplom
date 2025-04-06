import React, { FC, useEffect, useState } from 'react';
import { locationsAPI } from '../../../../store/APIs/locations';
import { IFilteredLocation } from '../../../../assets/types/types';
import FilteredLocationList from './FilteredLocationList';
import { useAppSelector } from '../../../../assets/hooks/redux';


interface Props {
    searchValue: string
}

const LocationList: FC<Props> = ({searchValue}) => {
    const {data, isLoading, isError} = locationsAPI.useGetLocationsQuery("");
    const {selectedLocations} = useAppSelector(state => state.locations);
    const [filteredLocations, setFilteredLocations] = useState<IFilteredLocation[]>([]);
    const [locationTypes, setLocationTypes] = useState<string[]>([]);

    useEffect(() => {
        if (data) {            
            setLocationTypes([...new Set(data.map(d => d.location_type))]);
        }
    }, [data])

    useEffect(() => {
        if (data) {                     
            const fLocations = locationTypes.map(lt => {               
                const filteredList = data.filter(d => d.location_type === lt)
                return {
                    location_type: lt,
                    locations: filteredList
                }
            });
            setFilteredLocations(fLocations);
        }        
    }, [locationTypes, selectedLocations]);
    
    return (
        <div className='location-list'>
            { isLoading && "Загрузка..." }
            { isError && "Ошибка" }
            {
                filteredLocations?.length  > 0 && 
                    filteredLocations.map(loc => 
                        <FilteredLocationList 
                            key={loc.location_type} 
                            filteredLocation={loc} 
                            searchValue={searchValue}
                        />
                    )

            }
        </div>
    );
};

export default LocationList;