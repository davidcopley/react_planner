import {setCourseCode,setCourseCredit, setSnapshotName, setTeachingPeriods,setSnapshotIndex,setCourseName,setCourseFaculty} from "../actionCreators/planActions"
import {setTeachingPeriodsOrder} from "../actionCreators/planTeachingPeriodActions"
export const setSnapshots = snapshots =>{return {type:"SET_SNAPSHOTS",snapshots}}
export const appendSnapshot = snapshot => {return {type:"APPEND_SNAPSHOT",snapshot}}
export const setSnapshot = (snapshot,snapshotIndex) => {return {type:"SET_SNAPSHOT",snapshot,snapshotIndex}}
export const loadSnapshotByIndex = snapshotIndex => (dispatch, getState) => {
    const {snapshotsDatabaseReducer} = getState()
    const {snapshots} = snapshotsDatabaseReducer
    const snapshot = snapshots[snapshotIndex]
    const {courseName,courseCode,credit,teachingPeriods,snapshotName,courseFaculty} = snapshot
    //dispatch to planCourseReducer
    dispatch(setTeachingPeriodsOrder([]))
    dispatch(setCourseCode(courseCode))
    dispatch(setCourseCredit(credit))
    dispatch(setCourseName(courseName))
    dispatch(setCourseFaculty(courseFaculty))
    dispatch(setSnapshotName(snapshotName))
    dispatch(setSnapshotIndex(snapshotIndex))
    //dispatch to planTeachingPeriodsReducer
    dispatch(setTeachingPeriods(teachingPeriods))
}
export const saveSnapshot = () => (dispatch,getState) => {
    const {planCourseReducer,planTeachingPeriodReducer} = getState()
    const {courseCode,snapshotName,snapshotIndex} = planCourseReducer
    const {teachingPeriods} = planTeachingPeriodReducer
    const snapshot = {courseCode,snapshotName,teachingPeriods}
    dispatch(setSnapshot(snapshot,snapshotIndex))
}
export const appendSnapshotBySnapshotName = snapshotName => (dispatch, getState) => {
    const {planCourseReducer,planTeachingPeriodReducer,} = getState()
    const {courseCode,credit} = planCourseReducer
    const {teachingPeriods} = planTeachingPeriodReducer
    const snapshot = {courseCode,credit,snapshotName,teachingPeriods}
    dispatch(appendSnapshot(snapshot))
}

export const appendSnapshotPromise = snapshot => dispatch =>{
    dispatch(appendSnapshot(snapshot))
    return Promise.resolve()
}