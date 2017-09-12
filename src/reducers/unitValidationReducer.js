const defaultState = {
    duplicateUnits:{}
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("SET_DUPLICATE_UNITS"):
            return {...state,duplicateUnits:action.duplicateUnits}
        case("SET_INVALID_TIMESLOT_UNITS"):
            return {...state,invalidTimeslotUnits:action.invalidTimeslotUnits}
        default:
            return state
    }
}