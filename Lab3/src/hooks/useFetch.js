import { useState, useEffect, useCallback } from 'react';

export function useFetch(fetcher, params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const serializedParams = JSON.stringify(params);

  useEffect(() => {
    const controller = new AbortController();

    async function executeFetch() {
      setLoading(true);
      setError(null);

      try {
        const parsedParams = JSON.parse(serializedParams);
        const result = await fetcher(parsedParams, controller.signal);
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Помилка під час виконання запиту');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    executeFetch();

    return () => controller.abort();
  }, [fetcher, serializedParams, retryCount]);

  const refetch = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  return { data, loading, error, refetch };
}