import { Image, StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity, useWindowDimensions, Alert} from 'react-native';
import {React, useState, useRef} from 'react';
import {Link, router} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

let isDoneWithTimeLine = false 
let firstTimeLine = true
let timeLineCounter = 0
let amString = " am"
let isAM = true

export function UserHeader(props){
    return(
        <>                
                <View className={`relative flex shadow-2xl flex-row w-full h-[100] border-0 left-[0] top-[] items-center justify-center bg-opacity-100 bg-gray-300 ${props.className}`} styles={{borderColor:'black'}}>
                    <CalendarHeader calendarName = {props.calendarName} textClassName={props.textClassName}/>              
                </View>
        </>
    )
}

export function NavigationBar(){
    return(
        <>
            <View className="relative flex shadow-2xl flex-row w-full h-[50] border-2 left-[0] top-[0] items-center justify-center bg-opacity-100 bg-gray-300 justify-evenly" style={{borderColor:'black'}}>
                    <View className="relative flex shadow-2xl flex-row w-1/2 min-w-[400px] h-full border-2 items-center justify-center bg-opacity-100 bg-gray-300 border-red-400 justify-evenly" /*style={{maxWidth:'50%', width: '100%', height:'100%', borderColor:'red',}}*/>
                        {/* <AddEvent/> */}
                    </View>
            </View>
        </>
    )
}

export function FullUserHeader(props){
    return(
        <View className="flex-row items-center">
            <UserIcon LocationColor = {props.LocationColor}/>
            <UserInformation UserName = {props.UserName}/>
        </View>
    )
}

export function CalendarHeader(props){  
    return(
        <View>
            <Text className={`text-3xl font-bold top-[20px] text-purple-900`}>
                {props.calendarName ? `${props.calendarName}`:"Calendar_Name"}
            </Text>
        </View>
    )
}

export function HomeBody(){
    return(
        <>  <View className="w-full h-full">
                <TimeSheet/>
            </View>
        </>
    )
}

// export function TimeSheetOuter(){
    
//     return(
//         <View className={`flex-row-reverse w-full border-0 border-black-600 bg-trans`}> 
//             <ScrollView className="flex-col w-full border-0 border-black-600 bg-trans">
                
//             </ScrollView>
//         </View>
//     )
// }

export function TimeSheet(){


    // let amString = " am"
    // let theTime = ""
    // for(let i = 1; i<= 2; i++){
    //     for(let j = 1; i<= 11; i++){
    //         theTime = j + amString
    //         return(<LineofTime time = {theTime}/>)
    //     }
    //     amString = " pm"
    // }
    // return(<LineofTime time='12 am'/>)

    const {width, height} = useWindowDimensions();
    const addHeight = height - 450

   return(
    <View className="flex-row-reverse w-full h-[600px] border-0 border-black-600 bg-trans" style={{height:height-250}}>
        <View className="flex-col w-full border-0 border-black-600 bg-trans">           
            <LineofTime time='12 am'/> 
            <LineofTime time='1 am'/>
            <LineofTime time='2 am'/> 
            <LineofTime time='3 am'/>
            <LineofTime time='4 am'/> 
            <LineofTime time='5 am'/>
            <LineofTime time='6 am'/> 
            <LineofTime time='7 am'/>
            <LineofTime time='8 am'/> 
            <LineofTime time='9 am'/>
            <LineofTime time='10 am'/> 
            <LineofTime time='11 am'/>
            <LineofTime time='12 pm'/>
            <LineofTime time='1 pm'/>
            <LineofTime time='2 pm'/> 
            <LineofTime time='3 pm'/>
            <LineofTime time='4 pm'/> 
            <LineofTime time='5 pm'/>
            <LineofTime time='6 pm'/> 
            <LineofTime time='7 pm'/>
            <LineofTime time='8 pm'/> 
            <LineofTime time='9 pm'/>
            <LineofTime time='10 pm'/> 
            <LineofTime time='11 pm'/>
            <LineofTime time='12 am'/>
        </View>
    </View>
    )
}

export function LineofTime(props){
    return(
        <>
            <View className="flex-row-reverse border-0 border-purple-300">
                <View className="h-[3px] w-5/6 bg-black my-[50px]" />
                <Text className="top-[-15px] text-xl my-[50px] mx-5">{props.time}</Text>
            </View>
        </>
    )
}

export function UsersFooter(){
    return(
        <View className="fixed flex w-full h-[150] border-0 bottom-[0] left-[0] overflow-x-auto bg-gray-200 bg-opacity-1 flex-row items-center justify-content"> {/*Users Footer*/}
            {/* <View className="h-[85] w-[85] rounded-full bg-gray-200 border-4 border-red-200"></View> {/*Users Footer Scroll*/}
            {/*<View className="h-[85] w-[85] rounded-full bg-gray-200 border-4 border-green-200"></View> */}
            {/* <UserIcon LocationColor='green' UserName="Oscar_L"/>
            <UserIcon LocationColor='gray' UserName="Jeffery_W"/>
            <UserIcon LocationColor='blue' UserName="Jumman_B"/> */}            
        </View>
    )
}

export function UserIcon(props){
    return(
        <View className="flex-col justify-center items-center m-2 border-black border-0 w-[100px]">
            <Text className="items-center text-gray-400">{props.UserName}</Text>
                <Image className="h-[85px] w-[85px] object-contain rounded-full bg-gray-200 border-4 border-gray-400" style={{borderColor:props.LocationColor, width:85, height:85}} 
                source={require('../assets/images/DefaultUserIcon.png')}></Image>  {/*User Icon*/}
        </View>
    )
}

export function UserInformation(props){
    return(
        <View>
            <Text className="text-2xl">User_Name</Text>
            <Text className="text-xl color-blue-700">Location</Text>
        </View>
    )
}

