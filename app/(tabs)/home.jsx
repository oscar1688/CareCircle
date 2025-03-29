import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import LocationChecker from '../../components/LocationChecker'

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  // Generate array of dates for the date selector
  const getDates = () => {
    const dates = []
    for (let i = -3; i <= 3; i++) {
      const date = new Date(selectedDate)
      date.setDate(selectedDate.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  // Generate time slots for the day
  const getTimeSlots = () => {
    const slots = []
    for (let i = 8; i <= 20; i++) { // 8 AM to 8 PM
      slots.push(i)
    }
    return slots
  }

  // Format time to 12-hour format
  const formatTime = (hour) => {
    const ampm = hour >= 12 ? 'pm' : 'am'
    const formattedHour = hour % 12 || 12
    return `${formattedHour} ${ampm}`
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Calendar Name */}
      <Text className="text-2xl font-bold text-center py-4 text-[#4C6444]">Calendar_Name</Text>

      {/* Date Selector */}
      <View className="border-t border-b border-gray-200 py-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {getDates().map((date, index) => (
            <TouchableOpacity
              key={index}
              className={`items-center px-2 mx-1 w-[50px] py-2 ${
                date.getDate() === selectedDate.getDate() ? 'bg-[#4C6444] rounded-full' : ''
              }`}
              onPress={() => setSelectedDate(date)}
            >
              <Text className="text-xs text-gray-600">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]}
              </Text>
              <Text className={`text-base font-bold mt-1 ${
                date.getDate() === selectedDate.getDate() ? 'text-white' : 'text-black'
              }`}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Events Container with Time Lines */}
      <View className="flex-1 flex-row">
        {/* Time Lines */}
        <View className="w-[60px] pt-4 border-r border-gray-200">
          {getTimeSlots().map((hour) => (
            <View key={hour} className="h-[60px] justify-start items-center relative">
              <Text className="text-xs text-gray-600 -mt-1.5">{formatTime(hour)}</Text>
              <View className="absolute right-[-60px] top-0 w-[60px] h-[1px] bg-gray-200" />
            </View>
          ))}
        </View>

        {/* Events List */}
        <ScrollView className="flex-1 px-4">
          {/* Sample Event */}
          <View className="bg-[#4C6444] rounded-lg p-4 mb-4 ml-2 w-[95%] mt-[140px]">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-white mr-3 justify-center items-center">
                  <Image 
                    source={require('../../assets/icons/profile.png')}
                    className="w-6 h-6 tint-[#4C6444]"
                    resizeMode="contain"
                  />
                </View>

                <View>
                  <Text className="text-white font-bold text-base">User_Name</Text>
                  <Text className="text-white text-sm">Event Name</Text>
                  <Text className="text-gray-200 text-xs">Location</Text>
{/* Location TESTING */}
                  <LocationChecker 
                    address="1600 Amphitheatre Parkway, Mountain View, CA" 
                    radius={500} 
                  />

                </View>
              </View>
              <Text className="text-white text-xs">11:36</Text>
            </View>
            <Text className="text-white text-sm">Event Description</Text>
          </View>
        </ScrollView>
      </View>

      {/* Add Event Button */}
      <TouchableOpacity className="bg-white p-4 items-center border-t border-gray-200">
        <Text className="text-[#4C6444] text-base font-bold">+ Add Event</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home