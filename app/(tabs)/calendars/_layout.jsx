import {View, Text} from 'react-native'
import { Stack, Redirect } from 'expo-router'

export default function TabsLayout(){

    return(
        <Stack>
            <Stack.Screen
                name = "Calendars"
                options={{headerShown: false}}/>
            <Stack.Screen
                name = "Users"
                options={{headerShown: false}}/>
            <Stack.Screen
                name = "UserCalendar"
                options={{headerShown: false}}/>
        </Stack>
    )

}