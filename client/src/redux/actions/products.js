import axios from "axios";


const  testBodyRequest = require('../../test/badRequest.json')
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

const headers = {
    "Client-Id": REACT_APP_CLIENT_ID,
    "Api-Key" : REACT_APP_API_KEY,
    "Content-Type":"application/json",
    "Retry-After": 2000
}

export const setLoading = () => ({
    type: 'SET_LOADING'
})

export const endLoading = () => ({
    type: 'END_LOADING'
})

export const testRequest = bodyRequest =>  async () => {
    const response = await axios.post(
        `https://api-seller.ozon.ru/v2/category/attribute/values`,
        bodyRequest,
        {headers}).then(data => console.log(data.data))


}

export const importProduct = bodyRequest => async dispatch => {
    dispatch(setLoading())
    // console.log(testBodyRequest)
    //         const response = await axios.post(
    //             `https://api-seller.ozon.ru/v2/product/import`,
    //             testBodyRequest,
    //             {headers})
    //
    // console.log(response.data);



    let reqLog = []

    const addError = (item) => {
        reqLog.push(item)
        console.log('Errrorr')
    }

    for (const item of bodyRequest)  {
        try {
            const response = await axios.post(
                `https://api-seller.ozon.ru/v2/product/import`,
                item.request,
                {headers})

            console.log(response.data);

            if (response.data.result.task_id === 0) {
                addError(item)
            }

        } catch (e) {
            console.log(e)
        }
    }
    while(reqLog.length !== 0) {
        for (const item of reqLog) {
            try {
                const response = await axios.post(
                    `https://api-seller.ozon.ru/v2/product/import`,
                    item.request,
                    {headers})

                if (response.data.result.task_id === 0) {
                    addError(item)
                }
                reqLog = reqLog.slice(1)

            } catch (e) {
                console.log(e)
            }
        }
    }
    console.log("Ошибок нет")
    dispatch(endLoading())

}


export const fetchProductInfo = bodyRequest =>  async (dispatch) => {
    dispatch(setLoading())

    const response = await axios.post(
        `https://api-seller.ozon.ru/v2/product/info/list`,
        bodyRequest,
        {headers})

    dispatch(addProductInfo(response.data))

}

export const fetchPurchasePrice = bodyRequest =>  async (dispatch) => {


    // const resp = await response.json()

}


export const getPrices = () => ({
    type: 'GET_PRICES'

})

export const sendPrice = bodyRequest =>  async (dispatch) =>{
    dispatch(setLoading())

    console.log(bodyRequest)

    await axios.post(
        `https://api-seller.ozon.ru/v1/product/import/prices`,
        bodyRequest,
        {headers}).then(data => console.log(data.data))

    dispatch(endLoading())


    // dispatch(addProductInfo(response.data))

}

export const openTables = () => ({
    type: 'OPEN_TABLES'

})



export const setNewPrice = () => ({
    type: 'SET_NEW_PRICE'
})



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

