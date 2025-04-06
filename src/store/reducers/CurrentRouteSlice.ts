import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ILocation } from "../../assets/types/types";

type TRouteMode = "masstransit" | "pedestrian";

interface IState {
    mode: TRouteMode
    locations: ILocation[]
}

const initialState: IState = {
    mode: "masstransit",
    locations: []
}


export const currentRouteSlice = createSlice({
    initialState, name: "currentRouteSlice",
    reducers: {
        setRouteMode: (state, action: PayloadAction<TRouteMode>) => {
            state.mode = action.payload;
        },
        setRouteLocations: (state, action: PayloadAction<ILocation[]>) => {
            state.locations = action.payload;
        }
    }
})

export default currentRouteSlice.reducer;
