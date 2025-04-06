import React, { FC } from 'react';
import Search from "./SearchLine/SearchLine";
import YandexMap from "./YandexMap/YandexMap";




const MapContainer: FC = () => {
  return (
    <div className="map-container" style={{height:"100%"}}>
      <Search />
      <YandexMap />
    </div>
  );
};

export default MapContainer;