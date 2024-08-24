import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React, { FC, PropsWithChildren } from "react";

type Props = {
  textStyles?: string;
  isLoading?: boolean;
};

const CustomButton: FC<PropsWithChildren<Props> & TouchableOpacityProps> = ({
  children,
  className,
  textStyles,
  isLoading,
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${className} ${
        isLoading ? "opacity-50" : ""
      }`}
      {...rest}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
