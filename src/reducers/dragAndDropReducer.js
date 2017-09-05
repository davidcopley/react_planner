const defaultState ={
    dragSource:null,
    dropTarget:null
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case("SET_DRAG_SOURCE"):
            console.log(action.dragSource)
            return {...state,dragSource:action.dragSource}
        case("SET_DROP_TARGET"):
            return {...state,dropTarget:action.dropTarget}
        default:
            return state
    }
}