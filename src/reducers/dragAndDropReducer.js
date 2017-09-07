const defaultState ={
    dragSource:null,
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case("SET_DRAG_SOURCE"):
            return {...state,dragSource:action.dragSource}
        default:
            return state
    }
}