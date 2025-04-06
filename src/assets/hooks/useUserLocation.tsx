import {useEffect, useState} from 'react';

const navigatorOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const saveUserLoc = (loc: GeolocationPosition) => setUserLocation([loc.coords.latitude, loc.coords.longitude]);

  useEffect(() => {
    const geo = navigator.geolocation;
    if (geo) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then( () => {
          geo.getCurrentPosition(saveUserLoc, console.log, navigatorOptions)
        });
    }
  }, []);

  return userLocation
};

export default useUserLocation;