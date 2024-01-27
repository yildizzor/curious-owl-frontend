import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

const AuthContext = React.createContext();
console.log(AuthContext);

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })

        .then((response) => {
          const user = response.data;

          setIsLoggedIn(true);
          setisLoading(false);
          setUser(user);
        })

        .catch((error) => {
          setIsLoggedIn(false);
          setisLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setisLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
