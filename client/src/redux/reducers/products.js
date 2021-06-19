const arrPrices = require("../../data/responseData/sourcePrices.json")

const initialState = {
    item: {},
    listModels: [],
    listModel: {},
    allItems: [],
    pricesJournal:[],
    loading: false,
    isOpen: false
}

const addProductInfo = (allItems, listModels, data , state) => {

    data.forEach(item => {
        allItems.push(item)
        if(!("check" in item)) {
            const addAtrDB = obj => {
                try {
                    const item = arrPrices.find(x => x["art"].toString() === obj["offer_id"])
                    const buyingPrice = item["BuyingPrice"]
                    const balance = item["count"]
                    const oldPrice = item["CurrentPrice"]

                    return {
                        buyingPrice,
                        balance,
                        oldPrice
                    }
                } catch (e) {
                    return {
                        buyingPrice: null,
                        balance: null,
                        oldPrice: null
                    }
                }
            }

            const isEqualName = (originalName, checkingObj) => {

                const checkingName =  checkingObj.name.replace(/,.*$/, "").trim().replace(/ /g, "_")
                if(originalName === checkingName) {

                    checkingObj["purchasePrice"] = Number(addAtrDB(checkingObj)["buyingPrice"])
                    const purchasePrice = checkingObj["purchasePrice"]
                    const currentPrice = parseInt(checkingObj["price"])
                    checkingObj["price"] = currentPrice
                    let commission = Math.ceil(20 + 45 + currentPrice/100*5 + currentPrice/100*4.4 + (currentPrice-purchasePrice)/100*3)
                    checkingObj["balance"] = Number(addAtrDB(checkingObj)["balance"])
                    checkingObj["income"] = checkingObj["price"] - checkingObj["purchasePrice"] - commission
                    checkingObj["minPrice"] = checkingObj["purchasePrice"] + commission + 100
                    if(addAtrDB(checkingObj)["oldPrice"] !== null ) {
                        checkingObj["oldPrice"] = checkingObj["price"] === Number(addAtrDB(checkingObj)["oldPrice"])
                            ? null
                            : addAtrDB(checkingObj)["oldPrice"].toString()
                    }
                    checkingObj["check"] = true
                    return true
                }
                return false
            }
            const name = item.name.replace(/,.*$/, "").trim().replace(/ /g, "_")
            if(listModels[name]) return  listModels[name] = data.filter(checkingName =>
                isEqualName(name, checkingName ))
                .concat(...state.listModels[name]) // сложение с предыдущим вызовом
            listModels[name] = data.filter(checkingName => isEqualName(name, checkingName ))
        }
    })

    return{
        allItems,
        listModels
    }

}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'OPEN_TABLES':
            return {
                ...state,
                isOpen: true,
                loading: true
            }

        case 'RESET_DATA': {
            return {
                item: {},
                listModels: [],
                listModel: {},
                allItems: [],
                pricesJournal:[],
                isOpen: true
            }
        }

        case 'ADD_JOURNEY' : {
            return {
                ...state
            }
        }

        case 'GET_PRODUCT_INFO': {
            const allItems = [...state.allItems]
            const listModels = {...state.listModels}
            const result = addProductInfo(allItems, listModels, action.payload, state)

            return {
                ...state,
                listModels: result.listModels,
                allItems: result.allItems,
                loading: false
            }
        }

        case 'GET_NEW_PRICE': {
            const allItems = [...state.allItems]
            const listModels = {...state.listModels}
            const result = addProductInfo(allItems, listModels, action.payload, state)

            return {
                ...state,
                listModels: result.listModels,
                allItems: result.allItems,
            }
        }

        case 'GET_LIST_MODEL': {
            const arrModels = []
            state.listModels[action.payload].forEach( product => {
                arrModels.push(product)
            })

            return {
                ...state,
                listModel: arrModels,
                loading: false
            }
        }

        case 'GET_COMMISSIONS':

            const item = {...state.item}

            item["commissions"] = action.payload.commissions
            return {
                ...state,
                item: item
            }

        case 'SEND_PRICE':
            const allItems = [...state.allItems]
            const listModels = {...state.listModels}
            const objRequest = action.payload

            const objAllItems =  allItems.find( x => x["offer_id"] === objRequest["offer_id"])
            let objListModels

            for( let key in listModels) {
                const result = listModels[key].find( x => x["offer_id"] === objRequest["offer_id"])
                if(result) objListModels = result
            }

            objAllItems.price = Number(objRequest["price"])
            objListModels.price = Number(objRequest["price"])

            return {
                ...state,
                allItems,
                listModels,
                loading: true
            }


        case 'GET_PRICES':
            const objWrongPrices = []
            Object.keys(state.listModels).forEach( model => {
                state.listModels[model].forEach(product => {
                    const minPrice = product["minPrice"]
                    const price = product["price"]
                    if (minPrice > price) objWrongPrices.push(product)
                })
            })
            if(objWrongPrices.length !== 0) console.log(objWrongPrices)

            return {
                ...state,
                loading: false
            }

        case 'GET_PRODUCT':

            const objProduct = state.listModel.find(x => x.id === Number(action.payload) )
            return {
                ...state,
                item: objProduct,
                loading: false
            }

        case 'GET_PRICE_JOURNAL':
            return {
                ...state,
                pricesJournal: action.payload
            }

        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'END_LOADING':
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}


export default productsReducer;