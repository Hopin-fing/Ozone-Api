import axios from "axios";
import md5  from "crypto-js/md5";
import moment from "moment";

const  testBodyRequest = require('../../test/badRequest.json')

const headers = {
    "Client-Id": 52496,
    "Api-Key":"4d9d2744-e2c4-4e6d-900a-a0f54b0af790",
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

    const sign = md5(moment().format("YYYY-MM-DD") + '2c428475c53106048f6364b5eb163431').toString()
    const response = await axios.get(`https://viplinza.ru/export/price.php?sign=${sign}`,{
        headers: {
            "Content-Type":"application/json",
            "Retry-After": 2000,
            "Access-Control-Allow-Origin": "*"
        }
    });
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

