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
            const {unit1Index, unit1TeachingPeriod, unit2Index, unit2TeachingPeriod} = action
            //get unit
            const unit = state.teachingPeriods[unit1TeachingPeriod]["units"][unit1Index]
            console.log(unit)
            //remove from old teaching period
            state =
                {
                    ...state,
                    teachingPeriods: {
                        ...state.teachingPeriods,
                        [unit1TeachingPeriod]: {
                            ...state.teachingPeriods[unit1TeachingPeriod],
                            units: [...state.teachingPeriods[unit1TeachingPeriod]["units"].slice(0, unit1Index), ...state.teachingPeriods[unit1TeachingPeriod]["units"].slice(unit1Index + 1)]
                        }
                    }
                }
            //adding to new teaching period
            state =
                {
                    ...state,
                    teachingPeriods: {
                        ...state.teachingPeriods,
                        [unit2TeachingPeriod]: {
                            ...state.teachingPeriods[unit2TeachingPeriod],
                            units: [
                                ...state.teachingPeriods[unit2TeachingPeriod]["units"].slice(0, unit2Index),
                                unit,
                                ...state.teachingPeriods[unit2TeachingPeriod]["units"].slice(unit2Index)
                            ]
                        }
                    }
                }
            return state
        default:
            return state
    }
}