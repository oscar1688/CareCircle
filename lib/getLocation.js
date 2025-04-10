import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Request for Location Permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        // Get current location
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);

      } catch (error) {
        setErrorMsg(error.message);
      }
    })();
  }, []);

  return { location, errorMsg };
};
