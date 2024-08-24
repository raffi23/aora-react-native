import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = <T>(fn: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, refetch: fetchData };
};

export default useAppwrite;
