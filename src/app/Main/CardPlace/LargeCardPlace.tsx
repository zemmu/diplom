import React, { FC } from 'react';
import { ILocation } from '../../../assets/types/types';
import { ChevronsDown, Image, Plus } from 'react-feather';
import { locationsStateSlice } from '../../../store/reducers/LocationsSlice';
import { useAppDispatch } from '../../../assets/hooks/redux';
import { stringWithCapitalLetter } from '../../../assets/global';


interface Props {
    location: ILocation
    isRecLocation?: boolean
}

const LargeCardPlace: FC<Props> = ({location, isRecLocation=false}) => {
    const dispatch = useAppDispatch();
    const {setRecomendationLocation, addLocation} = locationsStateSlice.actions;
    
    const handleAddLocation = () => dispatch(addLocation(location));
    const handleSetRecomendation = () => dispatch(setRecomendationLocation(location));

    return (
        <div className='card-place-wrapper'>
            <div className='card-place-container large'>
                <Image className='card-img' />
                <div className='card-info-container'>
                    <div className='title'>
                        {
                            stringWithCapitalLetter(location.name)
                            // location.name.charAt(0).toUpperCase() + location.name.slice(1)
                        }
                    </div>
                </div>
                <div className='card-btns'>
                    {!isRecLocation && <ChevronsDown className='btn' size={50} onClick={handleSetRecomendation} />}
                    <Plus className='btn' size={60} onClick={handleAddLocation}/>
                </div>
            </div>
        </div>
    );
};

export default LargeCardPlace;