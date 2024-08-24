export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.rhymecode.aora",
  projectId: "66c958d80037346daeaa",
  databaseId: "66c959fe001cd9243a57",
  userCollectionId: "66c95a21001cd1f2a8b8",
  videoCollectionId: "66c95a4200340bbd230f",
  storageId: "66c95ba50024bda5a87d",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appWriteConfig;

import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import { Post, User } from "./types";

const client = new Client();
client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("unable to create account");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    if (
      (error as Error).message ===
      "Creation of a session is prohibited when a session is active."
    ) {
      await account.deleteSessions();
      await signIn(email, password);
    } else {
      throw error;
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("no currentAccount");

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw new Error("no currentUser");

    return currentUser.documents[0] as User;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments<Post>(
      databaseId,
      videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw error;
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments<Post>(
      databaseId,
      videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error) {
    throw error;
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments<Post>(
      databaseId,
      videoCollectionId,
      [Query.search("title", query), Query.limit(7)]
    );
    return posts.documents;
  } catch (error) {
    throw error;
  }
};
