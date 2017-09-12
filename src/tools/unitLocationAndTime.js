export const parseLocationAndTime = locationAndTime => {
    if(!locationAndTime){
        return null
    }
    let {time} = locationAndTime
    let times = time
    let timesSet = {}
    times.forEach(time=>{
        if(time.match(/First semester/g)){
            timesSet["S1"] = true
        }
        else if(time.match(/Second semester/g)){
            timesSet["S2"] = true
        }
        else if(time.match(/Full year/g)){
            timesSet["FY"] = true
        }
    })
    return {location:locationAndTime.location,timesSet}
}