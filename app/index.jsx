import { Text, View, Pressable, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-5 justify-center items-center relative">
        {/* Top curved shapes */}
        <View className="absolute top-0 left-0 w-[200px] h-[200px] bg-carecircle-purple-light rounded-br-full" />
        <View className="absolute top-0 right-0 w-[100px] h-[100px] bg-carecircle-purple-dark rounded-bl-full" />

        {/* Logo */}
        <View className="w-[100px] h-[100px] mb-6">
          <Image
            source={require('../assets/images/logo.png')}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        {/* Welcome Text */}
        <Text className="text-2xl font-bold text-center mb-4 text-black">
          Welcome to CareCircle – Stay Connected, Stay Organized
        </Text>
        
        {/* Description */}
        <Text className="text-base text-center text-gray-600 mb-8 leading-6">
          Effortlessly share your calendar and location with the people who matter most. Create groups, plan together, and keep track of everyone's whereabouts in real time.
        </Text>

        {/* Continue Button */}
        <CustomButton
          title="Continue"
          handlePress={() => router.push('/sign-in')}
          containerStyles="mt-7 w-full"
        />

        {/* Bottom curved shapes */}
        <View className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-carecircle-purple-light rounded-tl-full" />
        <View className="absolute bottom-0 left-0 w-[100px] h-[100px] bg-carecircle-purple-dark rounded-tr-full" />
      </View>
    </SafeAreaView>
  );
}
