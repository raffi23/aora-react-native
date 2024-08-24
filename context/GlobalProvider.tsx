import { getCurrentUser } from "@/lib/appwrite";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Models } from "react-native-appwrite";

type GlobalProviderProps = {
  user?: Models.Document | null;
  isLoggedIn: boolean;
  isLoading: boolean;
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
  const [user, setUser] = useState<Models.Document | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      }}
    >
      {children}
    </GlobalProviderContext.Provider>
  );
};

export default GlobalProvider;
