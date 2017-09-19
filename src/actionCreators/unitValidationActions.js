import {getUnits} from "../selectors/unitsDatabaseSelectors"
import {getTeachingPeriods} from "../selectors/planTeachingPeriodSelectors"
export const setDuplicateUnits = duplicateUnits => {return {type:"SET_DUPLICATE_UNITS",duplicateUnits}}
export const setInvalidTimeslotUnits = invalidTimeslotUnits => {return {type:"SET_INVALID_TIMESLOT_UNITS",invalidTimeslotUnits}}
export const validateDuplicateUnits = () => (dispatch,getState) => {
    const {planTeachingPeriodReducer} = getState()
    const {teachingPeriods} = planTeachingPeriodReducer
    const teachingPeriodKeys = Object.keys(teachingPeriods)
    let unitAppearances = {}
    let duplicateUnits = {}
    teachingPeriodKeys.forEach(teachingPeriodKey => {
        const teachingPeriod = teachingPeriods[teachingPeriodKey]
        if(teachingPeriod["isDeferred"]){
            return
        }
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
export const validateInvalidTimeslotUnits = () => (dispatch,getState) => {
    const teachingPeriods = getTeachingPeriods(getState())
    const units = getUnits(getState())
    const teachingPeriodKeys = Object.keys(teachingPeriods)
    let invalidTimeslotUnits = {}
    teachingPeriodKeys.forEach(teachingPeriodKey=>{
        const teachingPeriodSemester = teachingPeriodKey.split("-")[1]
        const teachingPeriod = teachingPeriods[teachingPeriodKey]
        const teachingPeriodUnits = teachingPeriod["units"]
        teachingPeriodUnits.forEach(unitKey => {
            const unit = units[unitKey]
            const {locationAndTime} = unit
            if(locationAndTime&&locationAndTime.timesSet){
                const {timesSet} = locationAndTime
                if(!timesSet[teachingPeriodSemester]){
                    if(!invalidTimeslotUnits[teachingPeriodKey]){
                        invalidTimeslotUnits[teachingPeriodKey]={}
                    }
                    invalidTimeslotUnits[teachingPeriodKey][unitKey]={issue:`Not available in ${teachingPeriodSemester}`}
                }
            }
        })
    })
    dispatch(setInvalidTimeslotUnits(invalidTimeslotUnits))
}