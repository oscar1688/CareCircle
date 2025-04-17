import { Image, StyleSheet, Platform, View, Text, ActivityIndicator} from 'react-native';
import React , { useState, useEffect } from 'react';
import { CalendarListScreen } from '../../../components/CalendarListScreen';
import{Slot, Stack} from 'expo-router';
import { getUserEmail } from '../../../config';
import {User} from './UserCalendar';
import { getLocation } from '../../../lib/getLocation';
import { useGlobalContext } from '../../../context/GlobalProvider';


const Calendars = () => {



    const [currentUser, setCurrentUser] = useState({})
    
      // Example of using useGlobalContext and useEffect to handle user data
      const { location, address, errorMsg } = getLocation();
      // 1. Get both user data and loading state
      const { user, loading, refreshUser } = useGlobalContext();
      // 2. Use useEffect to handle cases where user data might be missing
    
      useEffect(()=>{
        try{
          getUserEmail(user.email).then(user => setCurrentUser({
            id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            currentLocation: user.currentLocation,
          })).catch((error) => console.error('Error fetching events:', error)) 
        }catch(e){
          console.log("Error", e.message);
        }
      },[user])
      
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

    return(
        <>           
            {!currentUser.email ? 
                <View className="w-full h-full justify-center items-center">
                    <Text className ="text-lg font-bold text-purple-900">Loading...</Text>
                    <ActivityIndicator/>
                </View>: 
                <CalendarListScreen user={currentUser}/>}
        </>
    )
}

export default Calendars