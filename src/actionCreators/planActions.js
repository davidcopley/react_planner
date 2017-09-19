import {getTeachingPeriods} from "../selectors/planTeachingPeriodSelectors"
export const setCourseCode = courseCode => {return {type:"SET_COURSE_CODE",courseCode}}
export const setCourseCredit = courseCredit => {return {type:"SET_COURSE_CREDIT",courseCredit}}
export const setCourseName = courseName => {return {type:"SET_COURSE_NAME",courseName}}
export const setCourseFaculty = courseFaculty => {return {type:"SET_COURSE_FACULTY",courseFaculty}}
export const setSnapshotName = snapshotName => {return {type:"SET_SNAPSHOT_NAME",snapshotName}}
export const setSnapshotIndex = snapshotIndex => {return {type:"SET_SNAPSHOT_INDEX",snapshotIndex}}
export const setTeachingPeriodsSet = teachingPeriods => {return {type:"SET_TEACHING_PERIODS_SET",teachingPeriods}}
export const setTeachingPeriods = teachingPeriods => {return {type:"SET_TEACHING_PERIODS",teachingPeriods}}
export const removeUnit = (unitRemoveIndex, unitRemoveTeachingPeriod) => {return {type:"REMOVE_UNIT",unitRemoveIndex,unitRemoveTeachingPeriod}}
export const removeUnitPlaceholder = (unitPlaceholderRemoveIndex, unitPlaceholderRemoveTeachingPeriod) => {return {type:"REMOVE_UNIT_PLACEHOLDER",unitPlaceholderRemoveIndex,unitPlaceholderRemoveTeachingPeriod}}
export const insertUnit = ( unitInsert, unitInsertIndex, unitInsertTeachingPeriod) => {return {type:"INSERT_UNIT",unitInsert,unitInsertIndex,unitInsertTeachingPeriod}}
export const addTeachingPeriod = teachingPeriod => {return {type:"ADD_TEACHING_PERIOD",teachingPeriod}}
export const setUnitPlaceholderUnitCode = (unitPlaceholderIndex,unitPlaceholdersTeachingPeriod,unitCode) => {return {type:"SET_UNIT_PLACEHOLDER_UNIT_CODE",unitPlaceholdersTeachingPeriod,unitPlaceholderIndex,unitCode}}
export const removeTeachingPeriodByTeachingPeriodCode = teachingPeriodCode => (dispatch,getState) => {
    const {planTeachingPeriodReducer} = getState()
    const teachingPeriods = planTeachingPeriodReducer.teachingPeriods
    delete teachingPeriods[teachingPeriodCode]
    dispatch(setTeachingPeriods(teachingPeriods))
}
export const setIsDeferTeachingPeriodByTeachingPeriodCode = (teachingPeriodCode,isDeferred) => (dispatch,getState) => {
    const teachingPeriods = getTeachingPeriods(getState())
    teachingPeriods[teachingPeriodCode]["isDeferred"] = isDeferred
    dispatch(setTeachingPeriods(teachingPeriods))
}
//reset by setting an empty state
export const resetPlanCourse = () => dispatch => {
    dispatch(setCourseCode(""))
    dispatch(setCourseCredit(0))
    dispatch(setCourseName(null))
    dispatch(setCourseFaculty(null))
    dispatch(setSnapshotName(null))
    dispatch(setSnapshotIndex(null))
    dispatch(setTeachingPeriods({}))
}
//a move involves removing unit from old teaching period, and inserting to new teaching period
export const moveUnit = (unitFromIndex,unitFromTeachingPeriod,unitToIndex,unitToTeachingPeriod) => (dispatch,getState) => {
    const unit = getTeachingPeriods(getState())[unitFromTeachingPeriod]["units"][unitFromIndex]
    dispatch(removeUnit(unitFromIndex,unitFromTeachingPeriod))
    dispatch(insertUnit(unit,unitToIndex,unitToTeachingPeriod))
}

export const addUnitCodeToPlaceholder = (unitCode,placeholderIndex,teachingPeriodKey) => (dispatch,getState) => {
    dispatch(setUnitPlaceholderUnitCode(placeholderIndex,teachingPeriodKey,unitCode))
}

export const removeUnitFromPlaceholder = (placeholderIndex,teachingPeriodKey) => (dispatch) => {
    dispatch(addUnitCodeToPlaceholder(null,placeholderIndex,teachingPeriodKey))
}
