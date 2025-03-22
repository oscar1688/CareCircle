import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { icons } from '../../constants'

const CalendarItem = ({ name }) => (
  <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
    <View className="w-10 h-10 bg-gray-100 rounded-lg justify-center items-center mr-4">
      <Image
        source={icons.calendars}
        className="w-6 h-6 tint-[#4C6444]"
        resizeMode="contain"
      />
    </View>
    <Text className="text-base text-gray-800">{name}</Text>
  </TouchableOpacity>
)

const ActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity className="flex-row items-center p-4" onPress={onPress}>
    <Image
      source={icon}
      className="w-5 h-5 mr-3 tint-[#4C6444]"
      resizeMode="contain"
    />
    <Text className="text-base text-[#4C6444]">{label}</Text>
  </TouchableOpacity>
)

const Calendars = () => {
  const router = useRouter()
  const sampleCalendars = [
    'Calendar_Name',
    'Calendar_Name',
    'Calendar_Name',
  ]

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen 
        options={{ 
          title: 'Calendars',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
              <Image
                source={require('../../assets/icons/left-arrow.png')}
                className="w-5 h-5 tint-[#4C6444]"
                resizeMode="contain"
              />
              <Text className="text-base text-[#4C6444]">Back</Text>
            </TouchableOpacity>
          ),
        }} 
      />

      {/* Calendar List */}
      <ScrollView className="flex-1 px-4">
        {sampleCalendars.map((calendar, index) => (
          <CalendarItem key={index} name={calendar} />
        ))}
      </ScrollView>

      {/* Action Buttons */}
      <View className="border-t border-gray-200 py-2 flex-row justify-around">
        <ActionButton
          icon={require('../../assets/icons/plus.png')}
          label="Add Calendar"
          onPress={() => {}}
        />
        <ActionButton
          icon={require('../../assets/icons/menu.png')}
          label="Edit Calendar"
          onPress={() => {}}
        />
      </View>
    </View>
  )
}

export default Calendars
