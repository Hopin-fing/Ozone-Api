const initialState = {
    items: [],
    isLoaded: false,
    isOpen: false
}

const tablesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_TABLES':
            return {
                isOpen: true
            }
        case 'ADD_PRODUCT_INFO':
            return {
                ...state,
                items: action.payload,
                isLoaded: true
            }
        default:
            return state
    }
}


export default tablesReducer;