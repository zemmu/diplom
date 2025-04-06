import React, { useCallback, useMemo, useState } from 'react';
import {YMaps, Map} from "@pbe/react-yandex-maps";

import {mapProps, yApis} from "../../../../assets/global";
import useUserLocation from "../../../../assets/hooks/useUserLocation";
import ymaps from "yandex-maps";
import usePlacemarks from '../../../../assets/hooks/Map/usePlacemarks';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';
import useRoute from '../../../../assets/hooks/Map/useRoute';


const YandexMap = () => {
  const userLocation = useUserLocation();
  const mapState: ymaps.IMapState = useMemo(() => ({ center: userLocation, zoom: 15 }), [userLocation]);
  const [ymapsApi, setYmapsApi] = useState<YMapsApi>();
  const [yMap, setYmap] = useState<ymaps.Map>();
  usePlacemarks(ymapsApi, yMap);
  useRoute(ymapsApi, yMap)

  const onMapLoad = useCallback((ymsApi: any) => { 
    setYmapsApi(ymsApi);
  }, []);
  const onInstanceRef = useCallback((YMRef: ymaps.Map) => {
    setYmap(YMRef);
  }, []);
  


  return (
    <YMaps query={{apikey: yApis.map, suggest_apikey: yApis.geoSuggest}}>
      <Map
        state={mapState}
        width={"auto"}
        height={"100%"}
        onLoad={onMapLoad}
        instanceRef={onInstanceRef}
        modules={mapProps.modules}
        options={mapProps.options}
      />

    </YMaps>
  );
};

export default YandexMap;