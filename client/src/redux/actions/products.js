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

export const setLoading = () => ({
    type: 'SET_LOADING'
})

export const fetchProductInfo =  bodyRequest =>  async (dispatch) => {
    dispatch(setLoading())

    const response = await axios.post(
        `https://api-seller.ozon.ru/v2/product/info/list`,
        bodyRequest,
        {headers})

    dispatch(addProductInfo(response.data))

}

export const getListModel = name =>  ({
    type: 'GET_LIST_MODEL',
    payload: name
})

export const getProduct = id =>  ({
    type: 'GET_PRODUCT',
    payload: id
})

export const addProductInfo = productInfo => ({
    type: 'ADD_PRODUCT_INFO',
    payload: productInfo.result.items
})

