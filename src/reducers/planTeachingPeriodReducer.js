const defaultState = {
    teachingPeriods: {
        "2017-S1-01": {
            units: [
                "FIT1001",
                "FIT1002",
                "FIT1003",
                "FIT1004",
            ]
        },
        "2017-S2-01": {
            units: [
                "FIT1005",
                "FIT1006",
                "FIT1007",
            ]
        },
        "2018-S1-01": {
            units: [
                "FIT1008",
                "FIT2001",
                "FIT2002",
                "FIT2003",
                "FIT2004",
            ]
        },
        "2018-S2-01": {
            units: [
                "FIT2005",
                "FIT2006",
                "FIT2007",
                "FIT2008",
            ]
        }
        ,
        "2019-S1-01": {
            units: [
                "FIT3001",
                "FIT3002",
                "FIT3003",
            ]
        },
        "2019-S2-01": {
            units: [
                "FIT3006",
                "FIT3001",
                "FIT3007",
                "FIT3008",
            ]
        }
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case("SET_TEACHING_PERIOD"):
            return {...state, teachingPeriods: {...state.teachingPeriods, ...action.teachingPeriods}}
        case("MOVE_UNIT"):
            const {unitFromIndex, unitFromTeachingPeriod, unitToIndex, unitToTeachingPeriod} = action
            //get unit
            const unit = state.teachingPeriods[unitFromTeachingPeriod]["units"][unitFromIndex]
            //remove from old teaching period
            state =
                {
                    ...state,
                    teachingPeriods: {
                        ...state.teachingPeriods,
                        [unitFromTeachingPeriod]: {
                            ...state.teachingPeriods[unitFromTeachingPeriod],
                            units: [...state.teachingPeriods[unitFromTeachingPeriod]["units"].slice(0, unitFromIndex), ...state.teachingPeriods[unitFromTeachingPeriod]["units"].slice(unitFromIndex + 1)]
                        }
                    }
                }
            //adding to new teaching period
            state =
                {
                    ...state,
                    teachingPeriods: {
                        ...state.teachingPeriods,
                        [unitToTeachingPeriod]: {
                            ...state.teachingPeriods[unitToTeachingPeriod],
                            units: [
                                ...state.teachingPeriods[unitToTeachingPeriod]["units"].slice(0, unitToIndex),
                                unit,
                                ...state.teachingPeriods[unitToTeachingPeriod]["units"].slice(unitToIndex)
                            ]
                        }
                    }
                }
            return state
        case("REMOVE_UNIT"):
            const {unitRemoveIndex, unitRemoveTeachingPeriod} = action
            //remove from old teaching period
            state =
                {
                    ...state,
                    teachingPeriods: {
                        ...state.teachingPeriods,
                        [unitRemoveTeachingPeriod]: {
                            ...state.teachingPeriods[unitRemoveTeachingPeriod],
                            units: [...state.teachingPeriods[unitRemoveTeachingPeriod]["units"].slice(0, unitRemoveIndex), ...state.teachingPeriods[unitRemoveTeachingPeriod]["units"].slice(unitRemoveIndex + 1)]
                        }
                    }
                }
            return state
        case("APPEND_UNIT"):
            const {unitAppend,unitAppendIndex,unitAppendTeachingPeriod} = action
            state =
                {
                    ...state,
                    teachingPeriods: {
                        ...state.teachingPeriods,
                        [unitAppendTeachingPeriod]: {
                            ...state.teachingPeriods[unitAppendTeachingPeriod],
                            units: [
                                ...state.teachingPeriods[unitAppendTeachingPeriod]["units"].slice(0, unitAppendIndex),
                                unitAppend,
                                ...state.teachingPeriods[unitAppendTeachingPeriod]["units"].slice(unitAppendIndex)
                            ]
                        }
                    }
                }
            return state
        default:
            return state
    }
}