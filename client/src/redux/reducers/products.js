const arrPrices = require("../../data/responseData/sourcePrices.json")

const initialState = {
    item: {},
    listModels: [],
    listModel: {},
    allItems: [],
    loading: false,
    isOpen: false
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'OPEN_TABLES':
            return {
                ...state,
                isOpen: true
            }
        case 'ADD_PRODUCT_INFO': {

            const listModel = {
                ...state.listModels
            }
            action.payload.forEach(item => {
                if(!("check" in item)) {
                    const addPurchasePrice = obj => {
                        try{
                           return arrPrices.find( x => x["art"].toString() === obj["offer_id"])["BuyingPrice"]
                        } catch (e) {
                            return null
                        }
                    }

                    const isEqualName = (originalName, checkingObj) => {
                        const checkingName =  checkingObj.name.replace(/\/.*$/, "").trim().replace(/ /g, "_")
                        if(originalName === checkingName) {
                            checkingObj["PurchasePrice"] = Number(addPurchasePrice(item))
                            checkingObj["price"] = parseInt(checkingObj["price"])
                            checkingObj["income"] = checkingObj["price"] - checkingObj["PurchasePrice"]
                            checkingObj["minimalPriceForIncome"] = checkingObj["PurchasePrice"] + 333
                            checkingObj["check"] = true
                            return true
                        }
                        return false
                    }
                    const name = item.name.replace(/\/.*$/, "").trim().replace(/ /g, "_")
                    if(listModel[name]) return  listModel[name] = action.payload.filter(checkingName =>
                        isEqualName(name, checkingName ))
                        .concat(...state.listModels[name]) // сложение с предыдущим вызовом
                    listModel[name] = action.payload.filter(checkingName => isEqualName(name, checkingName ))
                }
            })

            return {
                ...state,
                listModels: listModel,
                allItems: action.payload,
                loading: false,

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