import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import { Post } from "@/lib/types";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

type Props = {
  video: Post;
};

const VideoCard: FC<Props> = ({
  video: { title, video, creator, thumnail },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-between items-center flex-row flex-1">
          <View className="flex-row justify-center flex-1 gap-2 items-start">
            <View className="w-[46px] h-[46px] rounded-lg border border-secondary p-0.5">
              <Image
                source={{ uri: creator?.avatar }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>

            <View className="justify-center flex-1 ml-3 gap-1">
              <Text
                className="text-white text-sm font-psemibold"
                numberOfLines={1}
              >
                {title}
              </Text>
              <Text
                className="text-xs text-gray-100 font-pregular"
                numberOfLines={1}
              >
                {creator?.username}
              </Text>
            </View>
          </View>

          <View className="pt-2">
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            (status as any).didJustFinish && setPlay(false);
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
            source={{ uri: thumnail }}
          />
          <Image
            className="w-12 h-12 absolute"
            resizeMode="contain"
            source={icons.play}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
