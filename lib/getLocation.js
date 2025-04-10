import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export const getLocation = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);

        // Optional: Reverse geocode to get address
        const geo = await Location.reverseGeocodeAsync(loc.coords);
        setAddress(geo[0]); // geo is an array of address objects
      } catch (error) {
        setErrorMsg(error.message);
      }
    })();
  }, []);

  return { location, address, errorMsg };
};
