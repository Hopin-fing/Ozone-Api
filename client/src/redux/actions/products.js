import axios from "axios";

const headers = {
    "Client-Id": 52496,
    "Api-Key":"4d9d2744-e2c4-4e6d-900a-a0f54b0af790",
    "Content-Type":"application/json",
    "Retry-After": 2000
}

export const testRequest = bodyRequest =>  async (dispatch) => {


    const response = await axios.post(
        `https://api-seller.ozon.ru/v2/category/attribute/values`,
        bodyRequest,
        {headers}).then(data => console.log(data.data))


}

export const importProduct = bodyRequest => async dispatch => {
    dispatch(setLoading())


    const reqLog = []

    for (const item of bodyRequest)  {
        try {
            const response = await axios.post(
                `https://api-seller.ozon.ru/v2/product/import`,
                item.request,
                {headers})

            console.log(response.data);

            if (response.data.result.task_id === 0) {
                reqLog.push(item)
                console.log('Errrorr')
            }

        } catch (e) {
            console.log(e)
        }
    }
    if(reqLog.length !== 0) {
        for (const item of reqLog) {
            if (reqLog.length !== 0) {
                try {
                    const response = await axios.post(
                        `https://api-seller.ozon.ru/v2/product/import`,
                        item.request,
                        {headers})


                    if (response.data.result.task_id !== 0) {
                        const index = reqLog.indexOf(reqLog.find(x => x.id === item.id))
                        console.log(index)
                        reqLog.slice(index, 1)
                    }

                } catch (e) {
                    console.log(e)
                }
            }
        }
    }

    // axios.post(
    //     `https://api-seller.ozon.ru/v2/product/import`,
    //     bodyRequest,
    //     {headers})
    //     .then(data => console.log(data))
    //     .catch(err => console.log('Ошибка: ', err.message))
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

export const sendPrice = bodyRequest =>  async (dispatch) =>{
    dispatch(setLoading())

    const response = await axios.post(
        `https://api-seller.ozon.ru/v1/product/import/prices`,
        bodyRequest,
        {headers}).then(data => console.log(data.data))

    // dispatch(addProductInfo(response.data))

}

export const openTables = () => ({
    type: 'OPEN_TABLES'

})

export const setLoading = () => ({
    type: 'SET_LOADING'
})

export const endLoading = () => ({
    type: 'END_LOADING'
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

