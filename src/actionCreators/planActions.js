export const setCourseCode = courseCode => {return {type:"SET_COURSE_CODE",courseCode}}
export const setCredit = credit => {return {type:"SET_CREDIT",credit}}
export const setTeachingPeriods = teachingPeriods => {return {type:"SET_TEACHING_PERIODS",teachingPeriods}}
export const moveUnit = (unit1Index,unit1TeachingPeriod,unit2Index,unit2TeachingPeriod) => {return {type:"MOVE_UNIT",unit1Index,unit1TeachingPeriod,unit2Index,unit2TeachingPeriod}}