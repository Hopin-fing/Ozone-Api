import React from 'react';
import RequestServer from "./requestServer";

const data = require("../../data/responseData/products.json")

const CustomRequest = (props) => {


    const urlInfo = "/v2/product/info"
    const urlInfoList = "/v2/product/info/list"
    const method = "POST"
    const bodyRequestInfo = {
            "offer_id": "100811038274",
            "product_id": 70946518,
            "sku": 0
        }
    const bodyRequestInfoList = {
        "offer_id": [

        ],
        "product_id": [
        ],
        "sku": [
        ]
    }

    data.forEach(element => {
        bodyRequestInfoList.offer_id.push(element.art.toString())
    })


};

export default CustomRequest;