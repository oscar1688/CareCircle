import { Image, StyleSheet, Platform, View, Text,} from 'react-native';
import React , { useState, useEffect } from 'react';
import { CalendarListScreen } from '../../../components/CalendarListScreen';
import{Slot, Stack} from 'expo-router';
import { getUserEmail } from '../../../config';
import {User} from '../home';

const email = 'pokemonleagchampion@gmail.com';


const Calendars = () => {

    const [currentUser, setCurrentUser] = useState({})
    
    useEffect(()=>{
              try{
                  getUserEmail(email).then(user =>{
                    const userObj = new User(user._id, user.email, user.username, user.password, user.Calendars, user.currentLocation)
                    setCurrentUser(userObj)
                  })  
                  .catch((error) => console.error('Error fetching events:', error))
              }catch(e){
                  console.log("Error", e.message)
              }
          },[]) 

    return(
        <>
            <CalendarListScreen user={currentUser}/>
        </>
    )
}

export default Calendars