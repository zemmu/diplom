import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { stringWithCapitalLetter } from "../../global";
import { locationsStateSlice } from "../../../store/reducers/LocationsSlice";
import { TYmapsHookProps } from "../../types/ymaps";


const usePlacemarks:TYmapsHookProps<void> = (ymapsApi, yMap) => {
    const [shownLocations, setShownLocations] = useState<any[]>([]);
    const {selectedLocations, locationsToRemove} = useAppSelector(state => state.locations);
    const dispatch = useAppDispatch();
    const {setLocationsToRemove} = locationsStateSlice.actions;

    useEffect(() => {        
        ymapsApi?.ready(() => {
            yMap?.geoObjects.removeAll();
            const locationsOnMap = selectedLocations.map(location => {
                const mark = new ymapsApi.Placemark(location.coords, {
                    iconCaption: stringWithCapitalLetter(location.name),
                    balloonContentHeader: stringWithCapitalLetter(location.name),
                    balloonContentBody: location.description
                })
                // yMap?.setCenter(locations?.[0].coords, 14);
                yMap?.geoObjects.add(mark);
                return mark
            })
            setShownLocations(locationsOnMap)
        }) 
    }, [ymapsApi, selectedLocations]);

    useEffect(() => {
        if (locationsToRemove.length) {
            shownLocations.map(location => {
                yMap?.geoObjects.remove(location);
            })
            dispatch(setLocationsToRemove([]));                
        }
    }, [locationsToRemove])
};

export default usePlacemarks;