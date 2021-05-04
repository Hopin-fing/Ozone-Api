 import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const request = useCallback(
        async (
            url,
            method = 'POST',
            body= null,
            headers = {
                "Client-Id": 52496,
                "Api-Key":"4d9d2744-e2c4-4e6d-900a-a0f54b0af790",
                "Content-Type":"application/json"
            }) => {
        setLoading(true)

        try {
            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

           const response = await fetch( url, {method, body, headers})
           const data = await  response.json()

            if(!response.ok) {
                throw new Error('Некорректные данные для отправки отзыва')
            }
            setLoading(false)


            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}