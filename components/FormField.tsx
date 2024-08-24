import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { FC, useState } from "react";
import { icons } from "@/constants";

type Props = {
  title: string;
  containerStyles?: string;
};

const FormField: FC<Props & TextInputProps> = ({
  title,
  containerStyles,
  secureTextEntry,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  return (
    <View className={`space-y-2 ${containerStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex-row items-center w-full h-16 px-4 bg-black-100 border-2 border-black-500 rounded-2xl focus:border-secondary">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          placeholderTextColor="#7b7b8b"
          secureTextEntry={showPassword}
          {...rest}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Image
              className="w-6 h-6"
              source={showPassword ? icons.eyeHide : icons.eye}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
