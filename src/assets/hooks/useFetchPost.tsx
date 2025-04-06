import {useState, useEffect, useCallback} from 'react';


function useFetchPost(api: string, value: any, isSend=true) {
  const [data, setData] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [controller, setController] = useState(new AbortController());

  useEffect(() => {
    if (!isLoading && isSend) {
      setIsLoading(true)
      setData(null);
      setIsError(false);

      fetch(`$/api/${api}/`,{
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value),
        signal: controller.signal
      })
          .then(res => res.json())
          .then(d => d && setData(d))
          .catch(err => {
            console.log(err)
            setIsError(true);
          })
          .finally(() => setIsLoading(false));
    }
  }, [api, isSend]);

  const abortHandle = useCallback(() => {
    controller.abort();
    setController(new AbortController());
  }, [controller])

  return {data, isLoading, isError, abortHandle}
}

export default useFetchPost;