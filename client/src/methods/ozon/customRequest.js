import React from 'react';
import RequestServer from "./requestServer";

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
            "100811038274",
            "100418273254",
            "100418273452"
        ],
        "product_id": [
            70946518,
            70224504,
            70224502
        ],
        "sku": [
            0
        ]
    }

    RequestServer(method, urlInfoList, bodyRequestInfoList)

};

export default CustomRequest;