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
        default:
            return state
    }
}


export default tablesReducer;