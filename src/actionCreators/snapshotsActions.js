import {setCourseCode,setCredit,setTeachingPeriodsSet, setTeachingPeriods} from "../actionCreators/planActions"
export const setSnapshots = snapshots =>{return {type:"SET_SNAPSHOTS",snapshots}}
export const loadSnapshot = snapshot => dispatch => {
    const {courseCode,credit,teachingPeriods} = snapshot
    //dispatch to planCourseReducer
    dispatch(setCourseCode(courseCode))
    dispatch(setCredit(credit))
    ////the teaching period set expects {[teaching period id]:True} but still works if passed in teachingPeriodsData, even though redundant
    dispatch(setTeachingPeriodsSet(teachingPeriods))
    //dispatch to planTeachingPeriodsReducer
    dispatch(setTeachingPeriods(teachingPeriods))
}