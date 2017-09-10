const defaultState = {
    isSnapshotMenuOpen:false,
    isUnitsMenuOpen:false
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("SET_SNAPSHOTS_MENU_OPEN"):
            return {...state,isSnapshotMenuOpen:action.isSnapshotMenuOpen}
        case("SET_UNITS_MENU_OPEN"):
            return {...state,isUnitsMenuOpen:action.isUnitsMenuOpen}
        default:
            return state;
    }
}