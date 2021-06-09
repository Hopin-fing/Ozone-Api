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
            }
        }

        case 'ADD_JOURNEY' : {
            return {
                ...state
            }
        }

        case 'ADD_PRODUCT_INFO': {

            const allItems = [...state.allItems]
            const listModels = {...state.listModels}

            action.payload.forEach(item => {
                allItems.push(item)
                if(!("check" in item)) {
                    const addAtrDB = obj => {
                        try {

                            const item = arrPrices.find(x => x["art"].toString() === obj["offer_id"])
                            const buyingPrice = item["BuyingPrice"]
                            const balance = item["count"]

                            return {
                                buyingPrice,
                                balance,
                            }
                        } catch (e) {
                            return {
                                buyingPrice: null,
                                balance: null
                            }
                        }
                    }

                    const isEqualName = (originalName, checkingObj) => {

                        const checkingName =  checkingObj.name.replace(/\/.*$/, "").trim().replace(/ /g, "_")
                        if(originalName === checkingName) {

                            checkingObj["purchasePrice"] = Number(addAtrDB(checkingObj)["buyingPrice"])
                            const purchasePrice = checkingObj["purchasePrice"]
                            const currentPrice = parseInt(checkingObj["price"])
                            checkingObj["price"] = currentPrice
                            let commission = Math.ceil(20 + 45 + currentPrice/100*5 + currentPrice/100*4.4 + (currentPrice-purchasePrice)/100*3)
                            checkingObj["balance"] = Number(addAtrDB(checkingObj)["balance"])
                            checkingObj["income"] = checkingObj["price"] - checkingObj["purchasePrice"] - commission
                            checkingObj["minimalPriceForIncome"] = checkingObj["purchasePrice"] + commission + 150
                            checkingObj["check"] = true
                            return true
                        }
                        return false
                    }
                    const name = item.name.replace(/\/.*$/, "").trim().replace(/ /g, "_")
                    if(listModels[name]) return  listModels[name] = action.payload.filter(checkingName =>
                        isEqualName(name, checkingName ))
                        .concat(...state.listModels[name]) // сложение с предыдущим вызовом
                    listModels[name] = action.payload.filter(checkingName => isEqualName(name, checkingName ))
                }
            })

            return {
                ...state,
                listModels,
                allItems,
                loading: false

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
            // listModels.forEach(item => {
            //     const result = item.find( x => x["id"] === objRequest["id"])
            //     if(result) return objListModels = result
            // })





            objAllItems.price = Number(objRequest["price"])
            objListModels.price = Number(objRequest["price"])

            return {
                ...state,
                allItems,
                listModels
            }


        case 'GET_PRICES':
            const objWrongPrices = []
            Object.keys(state.listModels).forEach( model => {
                state.listModels[model].forEach(product => {
                    const minPrice = product["minimalPriceForIncome"]
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