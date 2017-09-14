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
        case("SET_TEACHING_PERIODS"):
            return {...state, teachingPeriods: {...action.teachingPeriods}}
        case("SET_TEACHING_PERIODS_CREDITS"):
            return {...state, teachingPeriodsCredits: {...action.teachingPeriodsCredits}}
        case("SET_TEACHING_PERIODS_ORDER"):
            return {...state, teachingPeriodsOrder: action.teachingPeriodsOrder}
        case("ADD_TEACHING_PERIOD"):
            return {...state,teachingPeriods:{...state.teachingPeriods,[action.teachingPeriod]:{units:[]}}}
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
        case("INSERT_UNIT"):
            const {unitInsert,unitInsertIndex,unitInsertTeachingPeriod} = action
            state =
                {
                    ...state,
                    teachingPeriods: {
                        ...state.teachingPeriods,
                        [unitInsertTeachingPeriod]: {
                            ...state.teachingPeriods[unitInsertTeachingPeriod],
                            units: [
                                ...state.teachingPeriods[unitInsertTeachingPeriod]["units"].slice(0, unitInsertIndex),
                                unitInsert,
                                ...state.teachingPeriods[unitInsertTeachingPeriod]["units"].slice(unitInsertIndex)
                            ]
                        }
                    }
                }
            return state
        case("SET_UNIT_PLACEHOLDER_UNIT_CODE"):
            const {unitPlaceholdersTeachingPeriod, unitPlaceholderIndex, unitCode} = action
            state =
                {
                    ...state,
                    teachingPeriods: {
                        ...state.teachingPeriods,
                        [unitPlaceholdersTeachingPeriod]: {
                            ...state.teachingPeriods[unitPlaceholdersTeachingPeriod],
                            unitsPlaceholders:[
                                ...state.teachingPeriods[unitPlaceholdersTeachingPeriod].unitsPlaceholders.map((unitPlaceholder,i)=>{
                                    return i===unitPlaceholderIndex?{...unitPlaceholder,unitCode}:unitPlaceholder
                                })
                            ]
                        }
                    }
                }
            return state
        default:
            return state
    }
}