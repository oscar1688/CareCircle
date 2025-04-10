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

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
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
      
      const userData = {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl
      };
      
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        userData
      );

      await signIn(email, password);
  
      return newUser;
    } catch (error) {
      console.error("createUser error:", error);
      throw error;
    }
}

// Sign in
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("signIn: Session created:", session);
    
    // Get user data after creating session
    const userData = await getCurrentUser();
    console.log("signIn: User data after login:", userData);
    
    if (!userData) {
      throw new Error("Failed to get user data after login");
    }
    
    return userData;  // Return the user data instead of just the session
  } catch (error) {
    console.error("signIn error:", error);
    throw error;
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    // Don't log errors for expected cases (no session/unauthorized)
    if (error.type !== 'user_unauthorized' && error.code !== 401) {
      console.error("getAccount error:", error);
    }
    return null;
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) {
      console.log("getCurrentUser: No account found");
      return null;
    }

    console.log("getCurrentUser: Account found:", currentAccount);

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    console.log("getCurrentUser: Database query result:", currentUser);

    if (!currentUser.documents.length) {
      console.log("getCurrentUser: No user document found");
      return null;
    }

    const userData = currentUser.documents[0];
    console.log("getCurrentUser: Returning user data:", userData);
    return userData;
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}

// Sign out
export async function signOut() {
  try {
    await account.deleteSession("current");
    // Clear any cached account data here if needed
    return true;
  } catch (error) {
    // If error is due to no session, consider it a success
    if (error.type === 'user_unauthorized' || error.code === 401) {
      return true;
    }
    console.error("signOut error:", error);
    throw error;
  }
}

export default client;