const initialState = {
    all: [],
    filter: null
}

export const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL':
            return {...state, all: action.payload}
        case 'SET_FILTER':
            return {...state, filter: {...state.filter, [action.key]: action.payload}}
        default:
            return state
    }
}

const loadAllProdsThunk = () => {

}


