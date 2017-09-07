const defaultState = {
    courseCode:null,
    credit:null,
    teachingPeriods:{
        "2017-S1-01":true,
        "2017-S2-01":true,
        "2018-S1-01":true,
        "2018-S2-01":true,
        "2019-S1-01":true,
        "2019-S2-01":true,
    }
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case("SET_COURSE_CODE"):
            return {...state,courseCode:action.courseCode}
        case("SET_CREDIT"):
            return {...state,credit:action.credit}
        case("SET_TEACHING_PERIODS"):
            return {...state,teachingPeriods:{...state.teachingPeriods,...action.teachingPeriods}}
        case("ADD_TEACHING_PERIOD"):
            return {...state,teachingPeriods:{...state.teachingPeriods,[action.teachingPeriod]:true}}
        default:
            return state
    }
}