export const setDuplicateUnits = duplicateUnits => {return {type:"SET_DUPLICATE_UNITS",duplicateUnits}}
export const validateDuplicateUnits = () => (dispatch,getState) => {
    const {planTeachingPeriodReducer} = getState()
    const {teachingPeriods} = planTeachingPeriodReducer
    const teachingPeriodKeys = Object.keys(teachingPeriods)
    let unitAppearances = {}
    let duplicateUnits = {}
    teachingPeriodKeys.forEach(teachingPeriodKey => {
        const teachingPeriod = teachingPeriods[teachingPeriodKey]
        const teachingPeriodUnits = teachingPeriod["units"]
        teachingPeriodUnits.forEach(unitKey => {
            if(unitKey in unitAppearances){
                duplicateUnits[unitKey] = true
            }else{
                unitAppearances[unitKey] = true
            }
        })
    })
    dispatch(setDuplicateUnits(duplicateUnits))
}