import { TYmapsHookProps } from "../../types/ymaps";
import {useAppSelector} from "../redux";
import {useEffect, useRef} from "react";


const useRoute: TYmapsHookProps<void> = (ymapsApi, yMap) => {
  const {mode} = useAppSelector(state => state.currentRoute);
  const {selectedLocations} = useAppSelector(state => state.locations);
  const {uiState} = useAppSelector(state => state.uiState);
  const currentRouteRef = useRef<ymaps.multiRouter.MultiRoute>();

  useEffect(() => {
    if (uiState === "build" && selectedLocations.length) {      
      // @ts-ignore
      yMap?.geoObjects.remove(currentRouteRef.current);

      ymapsApi?.ready(() => {        
        // @ts-ignore
        const route = new ymapsApi.multiRouter.MultiRoute({
          referencePoints: selectedLocations.map(location => location.coords),
          params: {
            routingMode: mode,
            avoidTrafficJams: true,
          },
          
        }, {
            // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
            boundsAutoApply: true,
            // Внешний вид линии маршрута.
            routeActiveStrokeWidth: 6,
            routeActiveStrokeColor: "#1aa96f",
            routeActiveStrokeStyle: "solid",
            routeStrokeStyle: 'dot',
            routeStrokeWidth: 4,
            routeStrokeColor: "#a91a8a",
        });
        currentRouteRef.current = route;
        yMap?.geoObjects.add(route)
      })
    }
    
  }, [ymapsApi, yMap, selectedLocations, uiState, mode]);



};

export default useRoute;