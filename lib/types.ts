import { ViewToken } from "react-native";
import { Models } from "react-native-appwrite";

export interface User extends Models.Document {
  email: string;
  avatar: string;
  accountId: string;
  username: string;
}

export interface Post extends Models.Document {
  title: string;
  thumnail: string;
  video: string;
  prompt: string;
  creator: User;
}

export type FlatListInfo<T> = {
  viewableItems: ViewToken<T>[];
  changed: ViewToken<T>[];
};
