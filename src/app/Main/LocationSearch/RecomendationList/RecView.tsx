import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../assets/hooks/redux';
import LargeCardPlace from '../../CardPlace/LargeCardPlace';
import { locationsAPI } from '../../../../store/APIs/locations';
import FilteredLocationList from '../LocationList/FilteredLocationList';
import useUserLocalStorage from '../../../../assets/hooks/AuthUser/useUserLocalStorage';
import { IMe } from '../../../../assets/types/types';

const RecView = () => {
    const {getCreds} = useUserLocalStorage();
    const {recomendationLocation} = useAppSelector(state => state.locations);
    const [getRecs, {data}] = locationsAPI.useLazyGetRecsQuery();
    const [creds, setCreds] = useState(getCreds() as IMe);

    useEffect(() => {
        getRecs({
            gtib_id: recomendationLocation?.gtib_id?.toString(),
            user_id: creds?.id || undefined
        })     
    }, [recomendationLocation])

    return (
        <div className='location-list'>
            <div className='rec-view-container'>
                <LargeCardPlace location={recomendationLocation} isRecLocation/>
                {
                    (data && data?.length > 0) &&
                        data.map((d, index) => 
                            <FilteredLocationList 
                                key={index} 
                                filteredLocation={d} 
                                searchValue=''
                            />
                        )
                }
            </div>
        </div>
    );
};

export default RecView;

