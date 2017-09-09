const defaultState = {
    duplicateUnits:{}
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("SET_DUPLICATE_UNITS"):
            return {...state,duplicateUnits:action.duplicateUnits}
        default:
            return state
    }
}