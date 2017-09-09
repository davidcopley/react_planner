const defaultState = {
    courseCode:"A2000",
    credit:144,
    snapshotName:null,
    snapshotIndex:null,
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case("SET_COURSE_CODE"):
            return {...state,courseCode:action.courseCode}
        case("SET_CREDIT"):
            return {...state,credit:action.credit}
        case("SET_SNAPSHOT_NAME"):
            return {...state,snapshotName:action.snapshotName}
        case("SET_SNAPSHOT_INDEX"):
            return {...state,snapshotIndex:action.snapshotIndex}
        default:
            return state
    }
}