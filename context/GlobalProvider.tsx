import { getCurrentUser, signOut } from "@/lib/appwrite";
import { User } from "@/lib/types";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type GlobalProviderProps = {
  user?: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login?: (user: User) => Promise<void>;
  logout?: () => Promise<void>;
};

const GlobalProviderContext = createContext<GlobalProviderProps>({
  isLoading: false,
  isLoggedIn: false,
});

export const useGlobalContext = () => {
  const context = useContext(GlobalProviderContext);
  return context;
};

const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
  };

  const login = async (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalProviderContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        logout,
        login,
      }}
    >
      {children}
    </GlobalProviderContext.Provider>
  );
};

export default GlobalProvider;
