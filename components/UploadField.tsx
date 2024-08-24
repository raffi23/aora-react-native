import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import { ImagePickerAsset } from "expo-image-picker";
import React, { FC } from "react";
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  title: string;
  containerStyles?: string;
  type: "video" | "image";
  onPress?: (event: GestureResponderEvent) => void;
  value?: ImagePickerAsset | null;
};

const UploadField: FC<Props> = ({
  title,
  type,
  containerStyles,
  onPress,
  value,
}) => {
  const isVideo = type === "video";

  return (
    <View className={`space-y-2 ${containerStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <TouchableOpacity
        className="bg-black-100 rounded-2xl border-2 border-black-500 justify-center items-center flex-row gap-2 overflow-hidden"
        style={{ height: value ? 200 : isVideo ? 150 : 75 }}
        onPress={!value ? onPress : undefined}
        onLongPress={value ? onPress : undefined}
        activeOpacity={value ? 1 : 0.7}
      >
        {!value ? (
          <>
            <View
              className={`${
                isVideo
                  ? "border border-dashed border-secondary-100 w-12 h-12 p-3"
                  : "w-5 h-5"
              } rounded-lg justify-center items-center`}
            >
              <Image
                source={icons.upload}
                resizeMode="contain"
                className="w-full h-full"
              />
            </View>
            {!isVideo && (
              <Text className="font-pregular text-gray-100">Choose a file</Text>
            )}
          </>
        ) : isVideo ? (
          <Video
            className="w-full h-full rounded-2xl"
            source={{ uri: value.uri }}
            resizeMode={ResizeMode.COVER}
            useNativeControls
          />
        ) : (
          <Image
            className="w-full h-full rounded-2xl"
            source={{ uri: value.uri }}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UploadField;
