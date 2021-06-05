import axios from "axios";

const REACT_APP_CLIENT_ID_MY_ALCON = process.env.REACT_APP_CLIENT_ID_MY_ALCON;
const REACT_APP_API_KEY_MY_ALCON = process.env.REACT_APP_API_KEY_MY_ALCON;

const headers = {
    "Client-Id": REACT_APP_CLIENT_ID_MY_ALCON,
    "Api-Key" : REACT_APP_API_KEY_MY_ALCON,
    "Content-Type":"application/json",
    "Retry-After": 2000
}


const sendRequestPost = async (url, body) => {
    return axios.post(url, body, {headers})
}


export const setLoading = () => ({
    type: 'SET_LOADING'
})

export const endLoading = () => ({
    type: 'END_LOADING'
})

export const getCommissions = bodyRequest => async dispatch => {
    const url = "https://api-seller.ozon.ru/v2/product/info"
    const response = await sendRequestPost(url, bodyRequest)


    dispatch({
        type: 'GET_COMMISSIONS',
        payload: response.data.result
    })

}

export const testRequest = bodyRequest => async () => {
    const url = "https://api-seller.ozon.ru/v2/product/info"
    await sendRequestPost(url, bodyRequest).then(data => console.log(data.data))

}

export const importStocks = bodyRequest => async () => {

    const url = "https://api-seller.ozon.ru/v2/products/stocks"
    let arrResponseData = {"stocks" :[]}

    for(const [index, element] of bodyRequest.entries()) {
        if(index % 99 === 0 && index !== 0) {
            console.log(arrResponseData)
            const response = await sendRequestPost(url, arrResponseData)
            arrResponseData.stocks = []
            console.log(response.data)
        }
        try{
            arrResponseData.stocks.push(element)
        }catch (e) {
            console.log(element)
        }
    }
    console.log("bodyRequest ", bodyRequest)
    console.log("arrResponseData ", arrResponseData)
    await sendRequestPost(url, arrResponseData).then(data => console.log(data.data))
}

export const importProduct = bodyRequest => async dispatch => {
    dispatch(setLoading())

    let reqLog = []

    const url = "https://api-seller.ozon.ru/v2/product/import"

    const addError = (item) => {
        reqLog.push(item)
        console.log('Error!')
    }

    for (const item of bodyRequest)  {
        try {
            const response = await sendRequestPost(url, item.request)
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
                const response =  await sendRequestPost(url, item.request)

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


export const fetchProductInfo = data =>  async dispatch => {
    dispatch(setLoading())

    const url = "https://api-seller.ozon.ru/v2/product/info/list"
    const arrResponseData = []
    const bodyRequestInfoList = {
        "offer_id": [],
        "product_id": [],
        "sku": []
    }

    for(const [index, element] of data.entries()) {
        if(index % 999 === 0 && index !== 0) {

            const response = await sendRequestPost(url, bodyRequestInfoList)


            bodyRequestInfoList.offer_id = []
            arrResponseData.push(response.data.result.items)
        }
        bodyRequestInfoList.offer_id.push(element.art.toString())
    }

    const response = await sendRequestPost(url, bodyRequestInfoList)
    console.log("response", response)
    arrResponseData.push(response.data.result.items)
    dispatch(addProductInfo(arrResponseData.flat()))

}


export const getPrices = () => ({
    type: 'GET_PRICES'

})

export const sendPrice = (bodyRequest, countRequest = "single") =>  async (dispatch) =>{
    dispatch(setLoading())
    const url = "https://api-seller.ozon.ru/v1/product/import/prices"

    const arrResponseData = {"prices" : []}

    for(const [index, element] of bodyRequest.entries()) {
        if(index % 999 === 0 && index !== 0) {
            console.log(arrResponseData)
            const response = await sendRequestPost(url, arrResponseData)
            arrResponseData.prices = []
            console.log(response.data)
            // arrResponseData.prices.push(response.data.result.items)
        }
        try{
            arrResponseData.prices.push(element)
        }catch (e) {
            console.log(element)
        }
        
    }


    const response = await sendRequestPost(url, arrResponseData)


    if (response.data.result[0].updated) {
        dispatch({
            type: 'SEND_PRICE',
            payload: bodyRequest[0]
        })
        console.log("Цена обновилась!")
    }
    if(countRequest === "single") dispatch(endLoading())
    if (!response.data.result[0].updated) {console.log("Что то произошло не так!")}



}

export const openTables = () => ({
    type: 'OPEN_TABLES'
})

export const resetData = () => ({
    type: 'RESET_DATA'
})

export const getPriceJournal = data => ({
    type: 'GET_PRICE_JOURNAL',
    payload: data
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
    payload: productInfo
})

