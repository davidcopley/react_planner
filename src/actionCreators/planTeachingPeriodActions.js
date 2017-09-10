export const calculateTeachingPeriodCredits = () => (dispatch,getState) => {
    const {planTeachingPeriodReducer,unitDatabaseReducer} = getState()
    const {teachingPeriods} = planTeachingPeriodReducer
    const {units} = unitDatabaseReducer
    const teachingPeriodsTotalCredits = {}
    Object.keys(teachingPeriods).forEach(teachingPeriodKey => {
        const teachingPeriod = teachingPeriods[teachingPeriodKey]
        const teachingPeriodUnits = teachingPeriod["units"]
        const teachingPeriodTotalCredits =  teachingPeriodUnits.reduce((totalCredits, unitCode) => units[unitCode]["credit"] + totalCredits, 0)
        teachingPeriodsTotalCredits[teachingPeriodKey] = teachingPeriodTotalCredits
    })
    console.log(teachingPeriodsTotalCredits)
}