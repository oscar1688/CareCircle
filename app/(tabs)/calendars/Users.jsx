import { Image, StyleSheet, Platform, View, Text,} from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import React , { useState, useEffect } from 'react';
import{Slot, Stack} from 'expo-router';
import { UserListScreen } from '../../../components/CalendarListScreen';
import { Calendar } from '../../../components/CalendarListScreen'

const UserScreen = () => {

    const { calendarName, usersList, id } = useLocalSearchParams();
    const calendar = new Calendar(id, calendarName, usersList.split(',')) 
    return(
        <>
            <UserListScreen calendar={calendar}/>
        </>
    )
}

export default UserScreen