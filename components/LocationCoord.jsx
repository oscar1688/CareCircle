// LocationCoord.jsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import axios from 'axios';

const GOOGLE_GEOCODING_API_KEY = 'AIzaSyBaldx3PsYQHNnBTFxtPG-z6V_OIa_gfRY';
const DEFAULT_RADIUS = 500; // Radius in meters

const Circle = ({ isInsideRadius }) => {
  return (
    <View className={`w-8 h-8 rounded-full ${isInsideRadius ? 'bg-green-500' : 'bg-red-500'}`} />
  );
};

const LocationCoord = ({name, address, coordinates, radius = DEFAULT_RADIUS }) => {
  const [isInsideRadius, setIsInsideRadius] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const checkLocationAgainstCoords = async () => {
      try {
        if (!address || !coordinates) {
          setErrorMsg('Address and coordinates are required');
          return;
        }

        // Convert address to coordinates
        const geoResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_GEOCODING_API_KEY}`
        );

        if (!geoResponse.data || !geoResponse.data.results || geoResponse.data.results.length === 0) {
          setErrorMsg('Address not found');
          return;
        }

        const { lat, lng } = geoResponse.data.results[0].geometry.location;
        const addressCoords = { latitude: lat, longitude: lng };

        const userCoords = {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        };

        const distance = getDistance(userCoords, addressCoords);
        console.log(`Distance from address: ${distance} meters`);

        setIsInsideRadius(distance <= radius);
        setErrorMsg(null);
      } catch (error) {
        console.error('Error checking location:', error);
        setErrorMsg('Error checking location');
      }
    };

    checkLocationAgainstCoords();
  }, [address, coordinates, radius]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {errorMsg ? (
        <Text className="text-red-500 text-xs">{errorMsg}</Text>
      ) : (
        <>
          <Text className="text-white text-xs">{isInsideRadius ? 'Inside Radius' : 'Outside Radius'}</Text>
          <Circle isInsideRadius={isInsideRadius} />
        </>
      )}
    </View>
  );
};

export default LocationCoord;
