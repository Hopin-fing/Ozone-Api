import axios from "axios";
import cabinetsInfo from "../../methods/clientData";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 200 });

const headers = {
    "Client-Id": cabinetsInfo.My_Alcon.id,
    "Api-Key" : cabinetsInfo.My_Alcon.apiKey,
    "Content-Type":"application/json",
    "Retry-After": 4000
}

export const sendRequestPost = async (url, body, header = null) => {
    const customHeaders = headers

    if(header) {
        customHeaders["Client-Id"] = cabinetsInfo[header].id
        customHeaders["Api-Key"] = cabinetsInfo[header].apiKey
    }

    body["headers"] = header
        ?  customHeaders
        :  headers


    return axios.post(url, body, {})
}

export const sendRequestGet = async (url) => {
    return axios.get(url,{headers})
}