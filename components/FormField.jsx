import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  fullStyle,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
    <View className={`${fullStyle}`}>
      <View>
        <Text className="text-base mx-2 mt-1 text-gray-100 font-pmedium">{title}</Text>
      </View>
      <View className={`space-y-2 ${otherStyles}`}>

        <View className="w-full h-12 px-4 bg-white rounded-2xl border-2 border-carecircle-purple-light focus:border-secondary flex flex-row items-center">
          <TextInput
            className="flex-1 w-full text-black font-psemibold text-base"
            keyboardType={keyboardType}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
            {...props}
          />

          {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      </View>
    </>
  );
};

export default FormField;
