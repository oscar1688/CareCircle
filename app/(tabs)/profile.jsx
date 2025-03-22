import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Stack, useRouter } from 'expo-router'

const Profile = () => {
  const router = useRouter()

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen 
        options={{ 
          title: 'Profile',
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

      {/* Profile Section */}
      <View className="items-center py-8">
        {/* Profile Picture */}
        <View className="w-[120px] h-[120px] rounded-full bg-[#E8F5E9] justify-center items-center mb-4">
          <View className="w-[100px] h-[100px] rounded-full bg-white justify-center items-center">
            <Image
              source={require('../../assets/icons/profile.png')}
              className="w-[50px] h-[50px] tint-[#4C6444]"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* User Info */}
        <Text className="text-2xl font-bold text-gray-800 mb-2">User_Name</Text>
        <Text className="text-base text-gray-600">email@gmail.com</Text>
      </View>

      {/* Settings Button */}
      <TouchableOpacity className="flex-row items-center p-4 border-t border-b border-gray-200 mt-8">
        <Image
          source={require('../../assets/icons/menu.png')}
          className="w-6 h-6 mr-3 tint-[#4C6444]"
          resizeMode="contain"
        />
        <Text className="text-base text-gray-800">Setting</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile
