export const setTeachingPeriodsCredits = teachingPeriodsCredits => {return {type:"SET_TEACHING_PERIODS_CREDITS",teachingPeriodsCredits}}

export const calculateTeachingPeriodCredits = () => (dispatch,getState) => {
    const {planTeachingPeriodReducer,unitDatabaseReducer} = getState()
    const {teachingPeriods} = planTeachingPeriodReducer
    const {units} = unitDatabaseReducer
    const teachingPeriodsCredits = {}
    Object.keys(teachingPeriods).forEach(teachingPeriodKey => {
        const teachingPeriod = teachingPeriods[teachingPeriodKey]
        const teachingPeriodUnits = teachingPeriod["units"]
        const teachingPeriodTotalCredits =  teachingPeriodUnits.reduce((totalCredits, unitCode) => units[unitCode]["credit"] + totalCredits, 0)
        teachingPeriodsCredits[teachingPeriodKey] = teachingPeriodTotalCredits
    })
    console.log(teachingPeriodsCredits)
    dispatch(setTeachingPeriodsCredits(teachingPeriodsCredits))
}