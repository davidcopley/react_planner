export const setCourseCode = courseCode => {return {type:"SET_COURSE_CODE",courseCode}}
export const setCredit = credit => {return {type:"SET_CREDIT",credit}}
export const setTeachingPeriodsSet = teachingPeriods => {return {type:"SET_TEACHING_PERIODS_SET",teachingPeriods}}
export const setTeachingPeriods = teachingPeriods => {return {type:"SET_TEACHING_PERIODS",teachingPeriods}}
export const moveUnit = (unitFromIndex,unitFromTeachingPeriod,unitToIndex,unitToTeachingPeriod) => {return {type:"MOVE_UNIT",unitFromIndex,unitFromTeachingPeriod,unitToIndex,unitToTeachingPeriod}}
export const removeUnit = (unitRemoveIndex, unitRemoveTeachingPeriod) => {return {type:"REMOVE_UNIT",unitRemoveIndex,unitRemoveTeachingPeriod}}
export const addTeachingPeriod = teachingPeriod => {return {type:"ADD_TEACHING_PERIOD",teachingPeriod}}