import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

type Props = {
  title: string;
  subtitle: string;
};

const EmptyState: FC<Props> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="text-xl text-center font-psemibold text-white">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100 mt-2">
        {subtitle}
      </Text>

      <CustomButton
        onPress={() => router.push("/create")}
        className="w-full my-5"
      >
        Create video
      </CustomButton>
    </View>
  );
};

export default EmptyState;
