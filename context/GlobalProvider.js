import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      console.log("Checking user status...");
      const userData = await getCurrentUser();
      console.log("checkUser: User data:", userData);
      
      if (userData) {
        console.log("User found, setting logged in state with data:", {
          id: userData.$id,
          email: userData.email,
          username: userData.username
        });
        setIsLogged(true);
        setUser(userData);
      } else {
        console.log("No user found, setting logged out state");
        setIsLogged(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      setIsLogged(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // Add a function to manually refresh user data
  const refreshUser = () => {
    setLoading(true);
    checkUser();
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        refreshUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
