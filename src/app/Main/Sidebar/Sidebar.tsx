import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../assets/hooks/redux';
import { uiRouteStateSlice } from '../../../store/reducers/UIRouteStateSlice';
import SmallCardPlace from '../CardPlace/SmallCardPlace';
import { ChevronLeft, Plus } from 'react-feather';
import { currentRouteSlice } from '../../../store/reducers/CurrentRouteSlice';
import RouteLocationList from './RouteLocationList';
import RouteModeSelector from './RouteModeSelector';
import SelectedCategoriesImgs from './SelectedCategoriesImgs';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const {setUiState} = uiRouteStateSlice.actions;
  const {selectedLocations} = useAppSelector(state => state.locations);
  const {uiState} = useAppSelector(state => state.uiState);
  const {setRouteLocations} = currentRouteSlice.actions;

  useEffect(() => {    
    dispatch(setRouteLocations(selectedLocations));
  }, [selectedLocations])

  const handleBtnStart = () => { dispatch(setUiState('build')) }

  const handleReturnBtn = () => {
    let state: typeof uiState;
    switch (uiState) {
      case 'build':
        state = "prepare";
        break;
      case 'process':
        state = "build";
        break;
      
      default:
        state = "prepare"
    }
    dispatch(setUiState("prepare"));
  }

  const handleBtnAdd = () => dispatch(setUiState("search"));

  return (
    <div className="route-sidebar-wrapper">
      <div className="route-sidebar-container">
        <div className="routes-wrapper">
          <div className='routes-container'>
            <div className='header'>
              {
                uiState !== "prepare" 
                ? <div className='btn-container' onClick={handleReturnBtn}>
                    <ChevronLeft size={35}/>
                  </div>
                : <div/>
              }
              <h1 className='sidebar-title'>Маршрут</h1>
              {
                ["prepare", "build"].includes(uiState) &&
                <div
                  className='btn-container'
                  style={{marginTop: 5}}
                  onClick={handleBtnAdd}
                >
                  <Plus size={35}/>
                </div>
              }
            </div>
            { uiState === "build" && <RouteModeSelector /> }
            { ["prepare", "search"].includes(uiState) && <SelectedCategoriesImgs /> }

            <div className='location-list'>
            {
              uiState === "build"
              ? <RouteLocationList />
              : selectedLocations.map(location => <SmallCardPlace key={location.id} location={location} />)
            }
            </div>

          </div>
        </div>
        {
          (selectedLocations.length > 0 && uiState !== "build") &&
          <div 
            className="btn_start" 
            onClick={handleBtnStart}
          >
            { ["prepare", "search"].includes(uiState)  && "Построить путь"}
            {/* { uiState === "build" && "Поехали!"} */}
          </div>
        }
        
      </div>
    </div>
  );
};

export default Sidebar;