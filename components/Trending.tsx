import { icons } from "@/constants";
import { FlatListInfo, Post } from "@/lib/types";
import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";
type ItemProps = {
  item: Post;
  activeItemId: string;
};

const zoomIn: Animatable.CustomAnimation = {
  0: { scaleX: 0.9, scaleY: 0.9 },
  1: { scaleX: 1, scaleY: 1 },
};

const zoomOut: Animatable.CustomAnimation = {
  0: { scaleX: 1, scaleY: 1 },
  1: { scaleX: 0.9, scaleY: 0.9 },
};

const TrendingItem: FC<ItemProps> = ({ item, activeItemId }) => {
  const isActive = activeItemId === item.$id;
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={isActive ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            (status as any).didJustFinish && setPlay(false);
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/50 items-center justify-center"
          >
            <Image
              source={icons.play}
              className="h-12 w-12 absolute"
              resizeMode="contain"
            />
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

type Props = {
  posts: Post[];
};

const Trending: FC<Props> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]?.$id);

  const viewableItemsChangedHandler = ({
    viewableItems,
  }: FlatListInfo<Post>) => {
    if (viewableItems.length <= 0) return;
    setActiveItem(viewableItems[0].key.replace("-trending", ""));
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => `${item.$id}-trending`}
      renderItem={({ item }) => (
        <TrendingItem item={item} activeItemId={activeItem} />
      )}
      onViewableItemsChanged={viewableItemsChangedHandler}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
