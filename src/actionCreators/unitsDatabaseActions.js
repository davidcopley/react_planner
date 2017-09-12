import {parseLocationAndTime} from "../tools/unitLocationAndTime"
export const setUnits = units => {return {type:"SET_UNITS",units}}
export const addUnit = unit => {
    let locationAndTime = unit.locationAndTime
    if(locationAndTime){
        locationAndTime = JSON.parse(locationAndTime)[0]
        locationAndTime = parseLocationAndTime(locationAndTime)
    }else{
        locationAndTime = null
    }
    unit = {unitCode:unit.unitCode,credit:unit.creditPoints,name:unit.unitName,faculty:unit.faculty,locationAndTime}
    return {type:"ADD_UNIT",unit}
}