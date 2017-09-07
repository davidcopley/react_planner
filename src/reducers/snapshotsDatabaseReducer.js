const defaultState = {
    snapshots:[
        {
            snapshotName:"Snapshot1",
            courseCode:"B2000",
            credit:192,
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
                }
            }
        },
        {
            snapshotName:"Snapshot2",
            courseCode:"C2000",
            credit:144,
            teachingPeriods: {
                "2018-S2-01": {
                    units: [
                        "FIT2005",
                        "FIT2006",
                        "FIT2007",
                        "FIT2008",
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
        },
        {
            snapshotName:"Some Random Snapshot name",
            courseCode:"A2000",
            credit:144,
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
    ]
}

export default (state=defaultState,action) => {
    switch(action.type){
        case("SET_SNAPSHOTS"):
            return {...state,snapshots:{...state.snapshots,...action.snapshots}}
        case("SET_SNAPSHOT"):
            let newSnapshots = state.snapshots.map(snapshot=>snapshot)
            newSnapshots[action.snapshotIndex] = action.snapshot
            return {...state,snapshots:newSnapshots}
        case("APPEND_SNAPSHOT"):
            return {...state,snapshots:[...state.snapshots,action.snapshot]}
        default:
            return state
    }
}