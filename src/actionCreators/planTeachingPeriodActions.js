import {getTeachingPeriods,getTeachingPeriodsOrder} from "../selectors/planTeachingPeriodSelectors"
import {getUnits} from "../selectors/unitsDatabaseSelectors"
import {setCourseCredit,setUnitPlaceholderUnitCode} from "../actionCreators/planActions"

export const setTeachingPeriodsCredits = teachingPeriodsCredits => {
    return {type: "SET_TEACHING_PERIODS_CREDITS", teachingPeriodsCredits}
}
export const setTeachingPeriodsOrder = teachingPeriodsOrder => {
    return {type: "SET_TEACHING_PERIODS_ORDER", teachingPeriodsOrder}
}

export const calculateTeachingPeriodCredits = () => (dispatch, getState) => {
    const teachingPeriods = getTeachingPeriods(getState())
    const units = getUnits(getState())
    const teachingPeriodsCredits = {}
    let planCourseCredit = 0
    const teachingPeriodKeys = getTeachingPeriodsOrder(getState())||Object.keys(teachingPeriods)
    teachingPeriodKeys.forEach((teachingPeriodKey,i) => {
        const teachingPeriod = teachingPeriods[teachingPeriodKey]
        console.log(teachingPeriod)
        if (teachingPeriod["isDeferred"]&&i!==0&&i!==(teachingPeriodKeys.length-1)) {
            console.log(teachingPeriod)
            planCourseCredit += 0
            teachingPeriodsCredits[teachingPeriodKey] = 0
        } else {
            const teachingPeriodUnits = teachingPeriod["units"]
            const teachingPeriodUnitsPlaceholders = teachingPeriod["unitsPlaceholders"]
            const teachingPeriodTotalCredits = teachingPeriodUnits.reduce((totalCredits, unitCode) => {
                let unitCredit = units[unitCode]["credit"];
                unitCredit = unitCredit===0?6:unitCredit;
                return unitCredit + totalCredits}, 0
            )
            let teachingPeriodUnitsPlaceholdersTotalCredits = 0
            if(teachingPeriodUnitsPlaceholders) {
                teachingPeriodUnitsPlaceholdersTotalCredits = teachingPeriodUnitsPlaceholders.reduce((totalCredits, placeholder) => {
                    const {unitCode} = placeholder
                    if (unitCode) {
                        let unitCredit = units[unitCode]["credit"];
                        unitCredit = unitCredit === 0 ? 6 : unitCredit;
                        return unitCredit + totalCredits
                    }
                    return totalCredits
                }, 0)
            }
            planCourseCredit += teachingPeriodTotalCredits + teachingPeriodUnitsPlaceholdersTotalCredits
            teachingPeriodsCredits[teachingPeriodKey] = teachingPeriodTotalCredits + teachingPeriodUnitsPlaceholdersTotalCredits
        }
    })
    dispatch(setTeachingPeriodsCredits(teachingPeriodsCredits))
    dispatch(setCourseCredit(planCourseCredit))
}

export const sortTeachingPeriodOrder = () => (dispatch, getState) => {
    const teachingPeriods = getTeachingPeriods(getState())
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
