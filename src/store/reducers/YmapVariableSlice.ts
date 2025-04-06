import {YMapsApi} from "@pbe/react-yandex-maps/typings/util/typing";
import ymaps from "yandex-maps";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface VariableState {
  ymapsApi: YMapsApi | undefined
  yMap: ymaps.Map | undefined
}

const initialState: VariableState = {
  ymapsApi: undefined,
  yMap: undefined
}

export const variableSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    setYmapsApi(state, action: PayloadAction<YMapsApi>) {
      state.ymapsApi = action.payload;
    },
    setYmap(state, action: PayloadAction<ymaps.Map>) {
      state.yMap = action.payload;
    },
  }
});

export default variableSlice.reducer;