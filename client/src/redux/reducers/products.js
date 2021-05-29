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
        case 'ADD_PRODUCT_INFO': {

            const allItems = [...state.allItems]
            const listModels = {...state.listModels}

            action.payload.forEach(item => {
                allItems.push(item)
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
                            checkingObj["minimalPriceForIncome"] = checkingObj["PurchasePrice"] + 200
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

        case 'GET_COMISSIONS': {
            const item = {...state.item}

            console.log("item ", item)

            item["commissions"] = action.payload


            return {
                ...state,
                item
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