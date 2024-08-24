import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import React, { FC, useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  defaultValue?: string;
};

const SearchInput: FC<Props> = ({ defaultValue }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(defaultValue ?? "");
  return (
    <View className="flex-row items-center w-full h-16 px-4 bg-black-100 border-2 border-black-500 rounded-2xl focus:border-secondary space-x-4">
      <TextInput
        className="text-base text-white flex-1 font-pregular"
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        defaultValue={query}
        value={query}
        onChangeText={(text) => setQuery(text)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) Alert.alert("missing query");
          else {
            if (pathname.startsWith("/search")) {
              router.setParams({ query });
            } else {
              router.push(`/search/${query}`);
            }
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
