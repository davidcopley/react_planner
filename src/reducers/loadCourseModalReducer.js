const defaultState = {
    isLoadCourseModalOpen:false
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("SET_IS_LOAD_COURSE_MODAL_OPEN"):
            return {...state,isLoadCourseModalOpen:action.isLoadCourseModalOpen}
        default:
            return state
    }
}