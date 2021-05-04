const initialState = {
    item: {},
    listModels: [],
    listModel: [],
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
            const listModel = {}
            action.payload.forEach(item => {
                if(!("check" in item)) {
                    const isEqualName = (originalName, checkingObj) => {
                        const checkingName =  checkingObj.name.replace(/\/.*$/, "").trim().replace(/ /g, "_")
                        if(originalName === checkingName) {

                            checkingObj["check"] = true
                            return true
                        }
                        return false
                    }
                    const name = item.name.replace(/\/.*$/, "").trim().replace(/ /g, "_")
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

        case 'GET_PRODUCT':
            const objProduct = state.listModel.find(x => x.id === Number(action.payload) )


            console.log("objProduct", objProduct)
            console.log("action.payload", typeof action.payload)
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