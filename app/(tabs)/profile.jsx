import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { signOut } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useEffect } from 'react';

const Profile = () => {
  const router = useRouter();
  const { user, setUser, setIsLogged, loading, refreshUser } = useGlobalContext();

  // Add debugging useEffect
  useEffect(() => {
    console.log("Profile component - Current user state:", user);
    if (!user && !loading) {
      console.log("No user data found, attempting refresh...");
      refreshUser();
    }
  }, [user, loading]);

  const logout = async () => {
    try {
      await signOut();
      // Only after successful signout, update the state
      setUser(null);
      setIsLogged(false);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };

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
        {loading ? (
          <Text className="text-base text-gray-600">Loading...</Text>
        ) : user ? (
          <>
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              {user.username || 'No username'}
            </Text>
            <Text className="text-base text-gray-600">
              {user.email || 'No email'}
            </Text>
            <Text className="text-xs text-gray-400 mt-1">
              ID: {user.$id || 'No ID'}
            </Text>
          </>
        ) : (
          <Text className="text-base text-gray-600">No user data available</Text>
        )}
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

      {/* Sign Out Button */}
      <TouchableOpacity 
        className="flex-row items-center p-4 border-b border-gray-200"
        onPress={logout}
      >
        <Image
          source={require('../../assets/icons/logout.png')}
          className="w-6 h-6 mr-3 tint-[#4C6444]"
          resizeMode="contain"
        />
        <Text className="text-base text-gray-800">Sign Out</Text>
      </TouchableOpacity>
      {/*Temporary return to landingpage button*/}
      {/* <TouchableOpacity
        className="flex-row items-center p-4 border-b border-gray-200"
        onPress={() => router.replace("index")}
        >
          <Text className="text-base text-gray-800">
            Return to Landing Page
          </Text>
        </TouchableOpacity> */}
    </View>
  );
};

export default Profile;
