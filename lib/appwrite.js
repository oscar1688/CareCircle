import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.carecircle',
    projectId: '67bcf62800219048d2a6',
    databaseId: '67bd03bb002b4afb80f3',
    userCollectionId: '67bd04650032e9c2cb12',
    eventCollectionId: '67bd067a0007685e3380',
    oauthCallbackUrl: 'carecircle://auth/callback',
    oauthFailureCallbackUrl: 'carecircle://auth/failure'
};
// Local appwrite for development
// export const appwriteConfig = {
//     endpoint: 'http://192.168.1.17/v1',
//     platform: 'com.carecircle.local',
//     projectId: '67e8911f003a74710163',
//     databaseId: '67e8a43400116e54da4b',
//     userCollectionId: '67e8a43c00144b22ee03'
// }

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
// const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(username);
  
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

// Sign In
export async function signIn(email, password) {
    try {
      // First try to delete any existing session
      try {
        await account.deleteSession('current');
      } catch (error) {
        // Ignore error if no session exists
        console.log("No existing session to delete");
      }

      // Now create new session
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.log("Sign in error:", error);
      throw error;
    }
  }

// Get Account
export async function getAccount() {
    try {
      const currentAccount = await account.get();
      return currentAccount;
    } catch (error) {
      // If error is related to no session, return null instead of throwing
      if (error.type === 'user_unauthorized' || 
          error.code === 401 || 
          error.message.includes('unauthorized') ||
          error.message.includes('session')) {
        return null;
      }
      throw error;
    }
  }

// Get Current User
export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) return null;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser || !currentUser.documents || currentUser.documents.length === 0) {
        return null;
      }
  
      return currentUser.documents[0];
    } catch (error) {
      console.log("getCurrentUser error:", error);
      return null;
    }
  }

// Sign Out
export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

export default client;