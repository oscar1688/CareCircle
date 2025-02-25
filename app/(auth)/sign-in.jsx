import { View, Text, ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { signIn, getCurrentUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setform] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setisSubmitting(true);

    try{
      await signIn(form.email, form.password)
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Purple curved background */}
      <View className="absolute top-0 left-0 w-[100px] h-[100px] bg-carecircle-purple-light rounded-br-full" />
      <View className="absolute right-0 top-0 w-[120px] h-[120px] bg-carecircle-purple-dark rounded-bl-full" />
      
      <ScrollView className="flex-1 px-6">
        {/* Back button */}
        <Link href="/" className="mt-4 text-carecircle-purple font-medium">
          <Text className="text-carecircle-purple font-medium">← Back</Text>
        </Link>

        {/* Logo */}
        <View className="items-center mt-12 mb-8 pt-30">
          <View className="w-24 h-24 bg-carecircle-purple/10 rounded-2xl items-center justify-center">
            <Image
              source={require('../../assets/images/logo.png')}
              className="w-40 h-40"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Main content */}
        <View>
          <Text className="text-carecircle-purple text-3xl font-bold mb-8">Sign in</Text>

          <FormField 
            title="Email or User Name"
            value={form.email}
            handleChangeText={(e) => setform({...form, email: e})}
            otherStyles="mb-4"
            keyboradType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({...form, password: e})}
            otherStyles="mb-2"
            secureTextEntry
          />

          <TouchableOpacity className="self-end mb-6">
            <Text className="text-carecircle-purple font-medium">Forget Password ?</Text>
          </TouchableOpacity>

          <CustomButton 
            title="Sign in"
            handlePress={submit}
            containerStyles="bg-carecircle-purple rounded-xl py-4"
            isLoading={isSubmitting}
          />

          <View className="items-center mt-8">
            <Text className="text-gray-600 mb-8">Or sign in With</Text>
            
            <TouchableOpacity className="w-12 h-12 bg-white rounded-full shadow-md items-center justify-center">
              <Image
                source={require('../../assets/icons/google-icon.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600">Don't have account ? </Text>
            <Link href="/sign-up" className="text-carecircle-purple font-medium">Sign Up</Link>
          </View>
        </View>
      </ScrollView>

      {/* Bottom curved shapes */}
      <View className="absolute bottom-0 right-0 w-[130px] h-[130px] bg-carecircle-purple-light rounded-tl-full" />
      <View className="absolute bottom-0 left-0 w-[100px] h-[100px] bg-carecircle-purple-dark rounded-tr-full" />
    </SafeAreaView>
  )
}

export default SignIn