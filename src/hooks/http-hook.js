import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);
            setIsLoading(true)
            const response = await fetch(url, {
                method,
                body, headers,
                signal: httpAbortCtrl.signal
            })
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);
            setIsLoading(false);
            return responseData;
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Something went wrong, please try again.')
            throw err;
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null);
    }, [])

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, [])

    return {isLoading, error, sendRequest, clearError}
}