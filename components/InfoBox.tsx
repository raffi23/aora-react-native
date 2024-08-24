import { View, Text } from "react-native";
import React, { FC } from "react";

type Props = {
  title: string;
  titleStyles?: string;
  subtitle?: string;
  containerStyles?: string;
};

const InfoBox: FC<Props> = ({
  title,
  subtitle,
  titleStyles,
  containerStyles,
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      {subtitle && (
        <Text className={`text-sm text-gray-100 text-center font-pregular`}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default InfoBox;
