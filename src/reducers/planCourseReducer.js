const defaultState = {
    courseCode:"A2000",
    courseCredit:144,
    courseName:"Bachelor of something",
    courseFaculty:"Some Faculty",
    snapshotName:null,
    snapshotIndex:null,
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case("SET_COURSE_CODE"):
            return {...state,courseCode:action.courseCode}
        case("SET_COURSE_CREDIT"):
            return {...state,courseCredit:action.courseCredit}
        case("SET_SNAPSHOT_NAME"):
            return {...state,snapshotName:action.snapshotName}
        case("SET_SNAPSHOT_INDEX"):
            return {...state,snapshotIndex:action.snapshotIndex}
        case("SET_COURSE_NAME"):
            return {...state,courseName:action.courseName}
        case("SET_COURSE_FACULTY"):
            return {...state,courseFaculty:action.courseFaculty}
        default:
            return state
    }
}