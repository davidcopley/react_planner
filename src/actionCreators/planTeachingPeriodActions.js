import {setCourseCredit} from "../actionCreators/planActions"

export const setTeachingPeriodsCredits = teachingPeriodsCredits => {return {type:"SET_TEACHING_PERIODS_CREDITS",teachingPeriodsCredits}}

export const calculateTeachingPeriodCredits = () => (dispatch,getState) => {
    const {planTeachingPeriodReducer,unitDatabaseReducer} = getState()
    const {teachingPeriods} = planTeachingPeriodReducer
    const {units} = unitDatabaseReducer
    const teachingPeriodsCredits = {}
    let planCourseCredit = 0
    Object.keys(teachingPeriods).forEach(teachingPeriodKey => {
        const teachingPeriod = teachingPeriods[teachingPeriodKey]
        console.log(teachingPeriod)
        if(teachingPeriod["isDeferred"]){
            planCourseCredit+=0
            teachingPeriodsCredits[teachingPeriodKey] = 0
        }else {
            const teachingPeriodUnits = teachingPeriod["units"]
            const teachingPeriodTotalCredits = teachingPeriodUnits.reduce((totalCredits, unitCode) => units[unitCode]["credit"] + totalCredits, 0)
            planCourseCredit += teachingPeriodTotalCredits
            teachingPeriodsCredits[teachingPeriodKey] = teachingPeriodTotalCredits
        }
    })
    dispatch(setTeachingPeriodsCredits(teachingPeriodsCredits))
    dispatch(setCourseCredit(planCourseCredit))
}