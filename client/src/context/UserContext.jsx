import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  console.log("usercontext", user);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/auth/profile");
        setUser(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
