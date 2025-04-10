import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { createUser, getCurrentUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Check for existing session on component mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsLogged(true);
        router.replace("/home");
      }
    } catch (error) {
      console.log("No active session");
    }
  };

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

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

        {/* Main content */}
        <View className="mt-8">
          <Text className="text-carecircle-purple text-3xl font-bold mb-8">Sign Up</Text>

          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles="mb-4"
          />
          
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mb-4"
            keyboradType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mb-4"
          />

          <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyles="bg-carecircle-purple rounded-xl py-4"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/sign-in" className="text-[#6A2FEE] font-medium">Sign In</Link>
          </View>
        </View>
      </ScrollView>

      {/* Bottom curved shapes */}
      <View className="absolute bottom-0 right-0 w-[130px] h-[130px] bg-carecircle-purple-light rounded-tl-full" />
      <View className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-carecircle-purple-dark rounded-tr-full" />
    </SafeAreaView>
  )
};

export default SignUp;