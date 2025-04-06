import {combineReducers, configureStore} from "@reduxjs/toolkit";
import variableReducer from "./reducers/YmapVariableSlice";
import { userAuthAPI } from "./APIs/UserAuth";
import uiRouteStateReducer from "./reducers/UIRouteStateSlice";
import locationsReducer from "./reducers/LocationsSlice";
import { locationsAPI } from "./APIs/locations";
import currentRouteReducer from "./reducers/CurrentRouteSlice";

const rootReducer = combineReducers({
  variables: variableReducer,
  uiState: uiRouteStateReducer,
  locations: locationsReducer,
  currentRoute: currentRouteReducer,

  [userAuthAPI.reducerPath]: userAuthAPI.reducer,
  [locationsAPI.reducerPath]: locationsAPI.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAuthAPI.middleware, locationsAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
