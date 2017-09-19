export const getUnitValidationReducer = state => state.unitValidationReducer
export const getInvalidTimeslotUnits = state => getUnitValidationReducer(state).invalidTimeslotUnits
export const getDuplicateUnits = state => getUnitValidationReducer(state).duplicateUnits
export const getIsInvalidTimeslotUnitByUnitCode = (state,props) => !!getInvalidTimeslotUnits(state)[props.unitCode]