import React, { FC } from 'react';
import { Image, Minus } from 'react-feather';
import { ILocation } from '../../../assets/types/types';
import { useAppDispatch } from '../../../assets/hooks/redux';
import { locationsStateSlice } from '../../../store/reducers/LocationsSlice';


interface Props {
    location: ILocation
}

const SmallCardPlace: FC<Props> = ({location}) => {
    const dispatch = useAppDispatch();
    const {removeLocation} = locationsStateSlice.actions;

    const handlerRemoveLocation = () => {
        dispatch(removeLocation(location))
    }

    return (
        <div className='card-place-wrapper small'>
        <div className='card-place-container small'>
            <Image className='card-img' />
            <div className='card-info-container'>
                <div className='title'>
                    {
                        location.name.charAt(0).toUpperCase() + location.name.slice(1)
                    }
                </div>
            </div>
            <div 
                className='btn-container'
                onClick={handlerRemoveLocation}
            >
                <Minus />
            </div>
        </div>
    </div>
    );
};

export default SmallCardPlace;

