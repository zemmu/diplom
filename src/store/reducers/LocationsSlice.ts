import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ILocation } from "../../assets/types/types"



interface IState {
    selectedLocations: ILocation[]
    locationsToRemove: ILocation[]
    placemarkLocation: ILocation
    recomendationLocation: ILocation
}

const initialState: IState = {
    selectedLocations: [],
    locationsToRemove: [],
    placemarkLocation: {} as ILocation,
    recomendationLocation: {} as ILocation
}


export const locationsStateSlice = createSlice({
    name: "locationsStateSlice", initialState,
    reducers: {
        addLocation(state, action: PayloadAction<ILocation>) {
            if (!state.selectedLocations.find(loc => action.payload.gtib_id === loc.gtib_id)) {
                state.selectedLocations.push(action.payload)
            }
        },
        removeLocation(state, action: PayloadAction<ILocation>) {
            state.selectedLocations = state.selectedLocations.filter(l => l.gtib_id !== action.payload.gtib_id);
            state.locationsToRemove.push(action.payload)
        },
        setSelectedLocations(state, action: PayloadAction<ILocation[]>) {
            state.selectedLocations = action.payload
        },
        setLocationsToRemove(state, action: PayloadAction<any>) {
            state.locationsToRemove = action.payload
        },
        setPlacemarkLocation(state, action: PayloadAction<ILocation>) {
            state.placemarkLocation = action.payload
        },
        setRecomendationLocation(state, action: PayloadAction<ILocation>) {
            state.recomendationLocation = action.payload
        }
    }
})

export default locationsStateSlice.reducer