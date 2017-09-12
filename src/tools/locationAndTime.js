export const parseLocationAndTime = locationAndTime => {
    if(!locationAndTime){
        return null
    }
    let {time} = locationAndTime
    let times = time
    times = times.map(time=>{
        if(time.match(/First semester/g)){
            return "S1-01"
        }
        else if(time.match(/Second semester/g)){
            return "S2-01"
        }
    })
    return {location:locationAndTime.location,times}
}