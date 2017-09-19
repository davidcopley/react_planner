export const getUnitsDatabaseReducer = state => state.unitDatabaseReducer
export const getUnits = state => getUnitsDatabaseReducer(state).units
export const getUnitByUnitCode = (state,props) => getUnits(state)[props.unitCode]