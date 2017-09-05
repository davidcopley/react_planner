const defaultState = {
    units:{
        FIT1001: {
            credit:6,
            name:"Introduction to Programming"
        },
        FIT1002: {
            credit:6,
            name:"Introduction to Database"
        },
        FIT1003: {
            credit:6,
            name:"Introduction to Algorithms"
        },
        FIT1004: {
            credit:6,
            name:"Introduction to Professional Practices"
        },
        FIT1005: {
            credit:6,
            name:"Introduction to Software Engineering"
        },
        FIT1006: {
            credit:6,
            name:"Introduction to Object Oriented Programming"
        },
        FIT1007: {
            credit:6,
            name:"Introduction to Programming Paradigms"
        },
        FIT1008: {
            credit:6,
            name:"Introduction to Documentations"
        },
        FIT2001: {
            credit:6,
            name:"Introduction to Programming"
        },
        FIT2002: {
            credit:6,
            name:"Advanced Database"
        },
        FIT2003: {
            credit:6,
            name:"Advanced Algorithms"
        },
        FIT2004: {
            credit:6,
            name:"Advanced Professional Practices"
        },
        FIT2005: {
            credit:6,
            name:"Advanced Software Engineering"
        },
        FIT2006: {
            credit:6,
            name:"Advanced Object Oriented Programming"
        },
        FIT2007: {
            credit:12,
            name:"Advanced Programming Paradigms"
        },
        FIT2008: {
            credit:6,
            name:"Advanced Documentations"
        },
        FIT3001: {
            credit:6,
            name:"Master of Programming"
        },
        FIT3002: {
            credit:6,
            name:"Master Database"
        },
        FIT3003: {
            credit:6,
            name:"Master Algorithms"
        },
        FIT3004: {
            credit:18,
            name:"Master Professional Practices"
        },
        FIT3005: {
            credit:12,
            name:"Master Software Engineering"
        },
        FIT3006: {
            credit:6,
            name:"Master Object Oriented Programming"
        },
        FIT3007: {
            credit:6,
            name:"Master Programming Paradigms"
        },
        FIT3008: {
            credit:6,
            name:"Master Documentations"
        },
    }
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case("SET_UNITS"):
            return {...state,unit:{...state.units,...action.units}}
        default:
            return state
    }
}