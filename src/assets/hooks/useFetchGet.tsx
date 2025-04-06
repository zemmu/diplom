import {useState, useEffect} from 'react';


function useFetchGet(
  api: string, key: string, value: number | string,
  isRefresh=true
) {
  const [data, setData] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && isRefresh) {
      setIsLoading(true)
      setData(null);
      setIsError(false);

      const fetchString = value ? `/api/${api}/?${key}=${value}` : `/api/${api}`
      fetch(fetchString)
          .then(res => res.json())
          .then(d => d && setData(d))
          .catch(err => {
            setIsError(true)
          })
          .finally(() => setIsLoading(false));
    }
  }, [api, isRefresh])

  return {data, isLoading, isError}
}

export default useFetchGet;