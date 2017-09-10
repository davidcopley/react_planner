const defaultState = {
    apiCalled:{},
    courses:[],
    coursesAos:{}
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("ADD_API_CALLED"):
            return {...state,apiCalled:{...state.apiCalled,[action.apiCalled]:true}}
        case("SET_COURSES"):
            return {...state,courses:[...action.courses]}
        case("ADD_COURSE_AOS"):
            return {...state,coursesAos:{...state.coursesAos,[action.courseCode]:action.courseAos}}
        default:
            return state
    }
}