import axios from "axios";

const headers = {
    "Client-Id": 52496,
    "Api-Key":"4d9d2744-e2c4-4e6d-900a-a0f54b0af790",
    "Content-Type":"application/json",
    "Retry-After": 2000
}

export const openTables = () => ({
    type: 'OPEN_TABLES'
})

export const fetchProductInfo = bodyRequest => (dispatch) => {

    axios.post(
        `https://api-seller.ozon.ru/v2/product/info/list`,
        bodyRequest,
        {headers}).then(({data}) => {
            dispatch(addProductInfo(data))
    })
}

export const addProductInfo = (productInfo) => ({
    type: 'ADD_PRODUCT_INFO',
    payload: productInfo
})