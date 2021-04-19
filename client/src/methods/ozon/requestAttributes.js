import React from 'react';
import axios from "axios";


const RequestAttributes = (id, name,  value = null) => {

    const bodyRequest = {
            "category_id": 17035115,
            "attribute_id": id,
            "language": "RU",
            "last_value_id": 970783264,
            "limit": 50
        }

    const headers = {
        "Client-Id": 52496,
        "Api-Key":"4d9d2744-e2c4-4e6d-900a-a0f54b0af790",
        "Content-Type":"application/json",
        "Retry-After": 3600
    }

    // function sleep(ms) {
    //     return new Promise((resolve) => setTimeout(resolve, ms));
    // }

    const results = {}

    const request = async () => {
        const response = await axios.post(
            'https://api-seller.ozon.ru/v2/category/attribute/values',
            bodyRequest,
            {headers})
            .then(answer => results[name] = answer.data.result.find(x => x.value === value).id)
            // .then(answer => console.log(answer.data.result))
            .catch(err => console.log(err))

    };

    // function sendRequestPost( url, body = null) {
    //
    //
    //     return fetch(url, {
    //         method: "POST",
    //         body :JSON.stringify(body),
    //         headers
    //     })
    //         .then(response => {
    //             return response.json()
    //         })
    // }
    //
    // const handlerRequest = () => {
    //     sendRequestPost( 'https://api-seller.ozon.ru/v2/category/attribute', bodyRequest )
    //         .then(data => console.log('POST :',  data))
    //         .catch(err => console.log(err))
    // }

    // handlerRequest()

    request()
    return results

};

export default RequestAttributes;