import {setCourseCode,setCredit,setTeachingPeriodsSet, setSnapshotName, setTeachingPeriods,setSnapshotIndex} from "../actionCreators/planActions"
export const setSnapshots = snapshots =>{return {type:"SET_SNAPSHOTS",snapshots}}
export const setSnapshot = (snapshot,snapshotIndex) => {return {type:"SET_SNAPSHOT",snapshot,snapshotIndex}}
export const loadSnapshot = (snapshot,snapshotIndex) => (dispatch,getState) => {
    console.log(getState())
    const {courseCode,credit,teachingPeriods,snapshotName} = snapshot
    //dispatch to planCourseReducer
    dispatch(setCourseCode(courseCode))
    dispatch(setCredit(credit))
    dispatch(setSnapshotName(snapshotName))
    dispatch(setSnapshotIndex(snapshotIndex))
    ////the teaching period set expects {[teaching period id]:True} but still works if passed in teachingPeriodsData, even though redundant
    dispatch(setTeachingPeriodsSet(teachingPeriods))
    //dispatch to planTeachingPeriodsReducer
    dispatch(setTeachingPeriods(teachingPeriods))
}
export const saveSnapshot = () => (dispatch,getState) => {
    const {planCourseReducer,planTeachingPeriodReducer} = getState()
    const {courseCode,credit,snapshotName,snapshotIndex} = planCourseReducer
    const {teachingPeriods} = planTeachingPeriodReducer
    const snapshot = {courseCode,credit,snapshotName,teachingPeriods}
    dispatch(setSnapshot(snapshot,snapshotIndex))
}