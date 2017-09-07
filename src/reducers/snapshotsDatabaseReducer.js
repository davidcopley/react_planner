const defaultState = {
    snapshots:{

    }
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("SET_SNAPSHOTS"):
            return {...state,snapshots:{...state.snapshots,...action.snapshots}}
        default:
            return state
    }
}