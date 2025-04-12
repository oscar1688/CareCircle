import { Image, StyleSheet, Platform, View, Text,} from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import React , { useState, useEffect } from 'react';
import{Slot, Stack} from 'expo-router';
import { UserListScreen } from '../../../components/CalendarListScreen';
import  Calendar  from '../../../components/Calendar';
import { getUserID } from '../../../config';

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

const UserCalendar = () => {

    const { userId } = useLocalSearchParams();
    const [currentUser, setCurrentUser] = useState({})

      useEffect(()=>{
          try{
             getUserID(userId).then(user => {
                  console.log(user)
                  const userObj = new User(user._id, user.email, user.username, 'No Password', [], user.currentLocation)
                  console.log(userObj)
                  setCurrentUser(userObj)
              })
              .catch((error) => console.error('Error fetching events:', error))
          }catch(e){
              console.log("Error", e.message)
          }
      },[]) //get from DB


    return(
        <>
            {currentUser.username == undefined ?
                <View className="w-full h-full justify-center items-center">
                        <Text className ="text-lg font-bold text-purple-900">Loading...</Text>
                    </View>:
                <Calendar user={currentUser} isUser={false}/> }
        </>
    )
}

export default UserCalendar