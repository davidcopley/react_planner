import {parseLocationAndTime} from "../tools/unitLocationAndTime"
import unitRuleParser from "../tools/unitRuleParser/unitRuleParser"
export const setUnits = units => {
    return {type: "SET_UNITS", units}
}
export const addUnit = unit => {
    let unitRules = unit.rules
    let parsedUnitRules = {}
    if (unitRules) {
        unitRules.forEach(unitRule => {
            parsedUnitRules[unitRule["ruleSummary"]] = unitRuleParser.parse(unitRule["ruleString"])
        })
    }
    let locationAndTime = unit.locationAndTime
    if (locationAndTime) {
        locationAndTime = JSON.parse(locationAndTime)[0]
        locationAndTime = parseLocationAndTime(locationAndTime)
    } else {
        locationAndTime = null
    }
    unit = {
        unitCode: unit.unitCode,
        credit: unit.creditPoints,
        name: unit.unitName,
        faculty: unit.faculty,
        locationAndTime,
        rules: parsedUnitRules
    }
    return {type: "ADD_UNIT", unit}
}