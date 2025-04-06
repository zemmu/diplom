import React from 'react';
import { currentRouteSlice } from '../../../store/reducers/CurrentRouteSlice';
import { useAppDispatch, useAppSelector } from '../../../assets/hooks/redux';
import SmallCardPlace from '../CardPlace/SmallCardPlace';
import { locationsStateSlice } from '../../../store/reducers/LocationsSlice';

const RouteLocationList = () => {
  const dispatch = useAppDispatch();
  const {setSelectedLocations} = locationsStateSlice.actions;
  const {selectedLocations} = useAppSelector(state => state.locations);

    return (
        <>
            {
                selectedLocations.map(
                    location => 
                    <SmallCardPlace key={location.gtib_id} location={location} />
                )
            }
        </>
    )
};

export default RouteLocationList;