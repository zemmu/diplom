import React from 'react';
import "../../styles/App.scss";
import "../../styles/CardPlace.scss";
import {AppHeader} from "./AppHeader/AppHeader";
import MapContainer from './MapContainer/MapContainer';
import Sidebar from './Sidebar/Sidebar';
import { useAppSelector } from '../../assets/hooks/redux';
import LocationSearch from './LocationSearch/LocationSearch';


const Main = () => {
  const {uiState} = useAppSelector(state => state.uiState)  

  return (
    <div className="main-window">
      <Sidebar/>

      <div style={{height: "100%", display: "grid", gridTemplateRows: "60px 1fr", overflow: "hidden"}}>
        <AppHeader />
        {
          uiState === "search"
          ? <LocationSearch />
          : <MapContainer />
        }
        
      </div>
      
    </div>
  );
};

export default Main;