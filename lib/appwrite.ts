export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.rhymecode.aora",
  projectId: "66c958d80037346daeaa",
  databaseId: "66c959fe001cd9243a57",
  userCollectionId: "66c95a21001cd1f2a8b8",
  videoCollectionId: "66c95a4200340bbd230f",
  storageId: "66c95ba50024bda5a87d",
};

import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

const client = new Client();
client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

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
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
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
