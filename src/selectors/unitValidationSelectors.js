export const getUnitValidationReducer = state => state.unitValidationReducer
export const getInvalidTimeslotUnits = state => getUnitValidationReducer(state).invalidTimeslotUnits
export const getDuplicateUnits = state => getUnitValidationReducer(state).duplicateUnits
export const getIsInvalidTimeslotUnitByUnitCode = (state,props) => {
    if(!getInvalidTimeslotUnits(state)[props.teachingPeriodCode]){
        return false
    }else {
        return !!getInvalidTimeslotUnits(state)[props.teachingPeriodCode][props.unitCode]
    }
}
export const getIsDuplicateUnitByUnitCode = (state,props) => !!getDuplicateUnits(state)[props.unitCode]