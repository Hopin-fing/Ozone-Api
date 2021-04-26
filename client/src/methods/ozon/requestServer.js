import axios from "axios";


const RequestServer = (bodyRequest = null) => {

    const headers = {
        "Client-Id": 52496,
        "Api-Key":"4d9d2744-e2c4-4e6d-900a-a0f54b0af790",
        "Content-Type":"application/json",
        "Retry-After": 2000
    }



    const results = {}


    // const request = async () => {
    //     const response = await axios.post(
    //         'https://api-seller.ozon.ru/v2/product/import',
    //         bodyRequest,
    //         {headers})
    //         .then(answer => console.log(answer.templates.result))
    //         .catch(err => console.log(err))
    //
    //
    //     return response
    // };

    // const body = {
    //         "attribute_type": "optional",
    //         "category_id": 17035116,
    //         "language": "RU"
    // }

    const request = async () => {
        const response = await axios.post(
            'https://api-seller.ozon.ru/v2/product/import',
            bodyRequest,
            {headers})
            .then(answer => console.log(answer.data.result))
            // .catch(err => console.log(err))


        return response
    };

    request().catch(err => console.log(err))



    return results

};

export default RequestServer;



