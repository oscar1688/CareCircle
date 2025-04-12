import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import LocationChecker from '../../components/LocationChecker';
import LocationCoord from '../../components/LocationCoord';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getLocation } from '../../lib/getLocation';

import Calendar from '../../components/Calendar';
import { getUserEmail } from '../../config';


export class User{

  constructor(id, email, username, password, calendars, currentLocation){
      this.id = id
      this.email = email
      this.username = username
      this.password = password
      this.calendars = calendars
      this.currentLocation = currentLocation
  }
}

const email = 'oli03';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Example of using useGlobalContext and useEffect to handle user data
  const { location, address, errorMsg } = getLocation();
  // 1. Get both user data and loading state
  const { user, loading, refreshUser } = useGlobalContext();
  // 2. Use useEffect to handle cases where user data might be missing
  useEffect(() => {
    if (!loading && !user) {
      console.log("No user data in home, attempting refresh...");
      refreshUser();
    }
  }, [user, loading]);
  // 3. Create helper function to safely access user data
  const getUserDisplay = () => {
    try {
      // Use optional chaining to safely access properties
      return {
        email: user?.email || 'No email available',
        username: user?.username || 'No username available',
        // Add fallback for any other user properties you need
      };
    } catch (error) {
      console.error("Error accessing user data:", error);
      return { email: 'Error loading data', username: 'Error loading data' };
    }
  };
  // 4. Handle loading state first
  if (loading) {
    return (
      <View className="flex-1 bg-white p-4 justify-center items-center">
        <Text className="text-lg">Loading...</Text>
      </View>
    );
  }
  // 5. Handle case where user isn't logged in
  if (!user) {
    return (
      <View className="flex-1 bg-white p-4 justify-center items-center">
        <Text className="text-lg">Please sign in to view this page</Text>
      </View>
    );
  }
  // 6. Get user display data safely
  const { email, username } = getUserDisplay();


  const [currentUser, setCurrentUser] = useState({})

      useEffect(()=>{
          try{
              getUserEmail(email).then(user => {
                  const userObj = new User(user._id, user.email, user.username, user.password, user.Calendars, user.currentLocation)
                  setCurrentUser(userObj)
              })
              .catch((error) => console.error('Error fetching events:', error))
          }catch(e){
              console.log("Error", e.message)
          }
      },[]) //get from DB


  const exampleAddress = '675 Avenue Z, New York, NY';
  const exampleCoordinates = { latitude: 40.586549, longitude: -73.969033 };
  return (
    <View className="flex-1 bg-white p-4">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Example Displaying Current Location Coordinates and User Data */}
      {/* <View>
      {location ? (
        <Text>Lat: {location.latitude}, Lng: {location.longitude}</Text>
      ) : (
        <Text>{errorMsg || "Fetching location..."}</Text>
      )}

      {address && (
        <Text>
          {address.name}, {address.street}, {address.city}, {address.region}
        </Text>
      )}
      </View> */}
      {/* 7. Display user data with proper error boundaries */}
      {/* <View>
        <Text className="text-2xl font-bold mb-2">
          Welcome back!
        </Text>
        <Text className="text-base text-gray-600">
          Signed in as: {email}
        </Text>
        <Text className="text-base text-gray-600 mt-2">
          Username: {username}
        </Text>
      </View> */}
      <LocationCoord address={exampleAddress} coordinates={exampleCoordinates} />
      <Calendar user={currentUser} isUser={true}/>
    </View>
  )
}

export default Home