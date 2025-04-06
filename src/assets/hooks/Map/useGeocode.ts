import { useCallback } from "react";
import { useAppSelector } from "../redux";

const useGeocode = () => {
  const ymapsApi = useAppSelector(state => state.variables.ymapsApi);

  const getCoords = async (locationName: string) => {
    try {
      const result = await ymapsApi?.ready();
      if (result) {
        const testGeoCoder = await ymapsApi?.geocode("Санкт-Петербург, Невский пр., д. 40-42");
        
        const results = testGeoCoder?.geoObjects?.getLength() || 0;
        for (let index = 0; index < results; index++) {
          console.log(
            testGeoCoder?.geoObjects?.get(index)?.geometry?.getBounds()?.[0]

          );
        }
        
        // const coords = testGeoCoder?.geoObjects?.get(0)?.geometry?.getBounds()?.[1];
        // return coords;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {getCoords}
};

export default useGeocode;