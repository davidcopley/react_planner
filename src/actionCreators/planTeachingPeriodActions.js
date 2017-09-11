import {setCourseCredit} from "../actionCreators/planActions"

export const setTeachingPeriodsCredits = teachingPeriodsCredits => {
    return {type: "SET_TEACHING_PERIODS_CREDITS", teachingPeriodsCredits}
}
export const setTeachingPeriodsOrder = teachingPeriodsOrder => {
    return {type: "SET_TEACHING_PERIODS_ORDER", teachingPeriodsOrder}
}

export const calculateTeachingPeriodCredits = () => (dispatch, getState) => {
    const {planTeachingPeriodReducer, unitDatabaseReducer} = getState()
    const {teachingPeriods} = planTeachingPeriodReducer
    const {units} = unitDatabaseReducer
    const teachingPeriodsCredits = {}
    let planCourseCredit = 0
    Object.keys(teachingPeriods).forEach(teachingPeriodKey => {
        const teachingPeriod = teachingPeriods[teachingPeriodKey]
        if (teachingPeriod["isDeferred"]) {
            planCourseCredit += 0
            teachingPeriodsCredits[teachingPeriodKey] = 0
        } else {
            const teachingPeriodUnits = teachingPeriod["units"]
            const teachingPeriodTotalCredits = teachingPeriodUnits.reduce((totalCredits, unitCode) => {let unitCredit = units[unitCode]["credit"];unitCredit = unitCredit===0?6:unitCredit;return unitCredit + totalCredits}, 0)
            planCourseCredit += teachingPeriodTotalCredits
            teachingPeriodsCredits[teachingPeriodKey] = teachingPeriodTotalCredits
        }
    })
    dispatch(setTeachingPeriodsCredits(teachingPeriodsCredits))
    dispatch(setCourseCredit(planCourseCredit))
}

export const sortTeachingPeriodOrder = () => (dispatch, getState) => {
    const {planTeachingPeriodReducer} = getState()
    const {teachingPeriods} = planTeachingPeriodReducer
    const teachingPeriodKeys = Object.keys(teachingPeriods)
    teachingPeriodKeys.sort((a, b) => {
            a = a.split("-")
            b = b.split("-")
            const aYear = a[0]
            const aSemCode = a[1]
            const bYear = b[0]
            const bSemCode = b[1]
            if (aYear === bYear) {
                const values = {"S1": 1, "WINTER": 2, "S2": 3, "SUMMER": 4}
                return values[aSemCode] - values[bSemCode]
            }
            return aYear - bYear
        }
    )
    const teachingPeriodsOrder = teachingPeriodKeys
    dispatch(setTeachingPeriodsOrder(teachingPeriodsOrder))
}