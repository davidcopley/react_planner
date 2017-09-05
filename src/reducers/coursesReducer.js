const defaultState = {
    courses:{
        A2000:{
            name:"Bachelor of IT",
            maxCredit:"144",
            teachingPeriods:{

            }
        }
    }
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("SET_COURSES"):
            return {...state,courses:{...state.courses,...action.courses}}
        default:
            return state
    }
}