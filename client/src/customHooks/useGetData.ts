import { useState, useEffect } from "react";

const useGetData = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState<null | string>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const resData = await res.json();
      setData(resData);
    } catch (err) {
      setError(`Error fetching data:  ${err}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  return [isLoading, data, error];
};

export default useGetData;
