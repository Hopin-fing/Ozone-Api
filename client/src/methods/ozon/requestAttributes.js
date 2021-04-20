import React from 'react';
import axios from "axios";


const RequestAttributes = (bodyRequest) => {


    const headers = {
        "Client-Id": 52496,
        "Api-Key":"4d9d2744-e2c4-4e6d-900a-a0f54b0af790",
        "Content-Type":"application/json",
        "Retry-After": 3600
    }

    const results = {}


    const request = async () => {
        const response = await axios.post(
            'https://api-seller.ozon.ru/v2/product/import',
            bodyRequest,
            {headers})
            .then(answer => console.log(answer.data.result))
            .catch(err => console.log(err))

    };



    request()
    return results

};

export default RequestAttributes;