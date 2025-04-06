import { PayloadAction, createSlice } from "@reduxjs/toolkit"


type TUiStates = "prepare" | "search" | "build" | "process"

interface IState {
    uiState: TUiStates

}

const initialState: IState = {
    uiState: "prepare"
}

export const uiRouteStateSlice = createSlice({
    name: "uiRouteState", initialState,
    reducers: {
        setUiState(state, action: PayloadAction<TUiStates>) {
            state.uiState = action.payload
        }
    }
})

export default uiRouteStateSlice.reducer
