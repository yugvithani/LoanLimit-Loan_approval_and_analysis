import React from 'react';
import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      // console.log(body);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
      
        const responseData = await response.json();
      
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
      
        if (!response.ok) {
          throw new Error(responseData.message || 'Request failed!');
        }
      
        setIsLoading(false);
        return responseData;
      } catch (err) {
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
      
        if (err.name === 'AbortError') {
          // Silently ignore aborted requests
          console.warn('Request aborted');
          return; // Don't throw or set error
        }
      
        setError(err.message || 'Something went wrong');
        setIsLoading(false);
        throw err;
      }
      
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  },[]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => {
        console.log("calling abort");
        abortCtrl.abort();
      });
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
