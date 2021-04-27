import axios from "axios";


const RequestServer = (method, url,bodyRequest = null) => {

    const headers = {
        "Client-Id": 52496,
        "Api-Key":"4d9d2744-e2c4-4e6d-900a-a0f54b0af790",
        "Content-Type":"application/json",
        "Retry-After": 2000
    }

    const results = {}

    const request = async () => {
        if (method === "GET") {
            const response = await axios.get(
                `https://api-seller.ozon.ru${url}`,
                {headers})
                .then(answer => console.log(answer.data.result))
            return response
        }
        if (method === "POST") {
            const response = await axios.post(
                `https://api-seller.ozon.ru${url}`,
                bodyRequest,
                {headers})
                .then(answer => console.log(answer.data.result))
            return response
        }

            // .catch(err => console.log(err))



    };

    request().catch(err => console.log(err))

    return results

};

export default RequestServer;



