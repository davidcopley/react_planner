export const getNextGeneralTeachingPeriodKey = currentTeachingPeriodKey => {
    if(!currentTeachingPeriodKey){
        const date = new Date()
        return `${date.getYear()+1900}-${date.getMonth()<7?"S1":"S2"}-01`
    }
    const teachingPeriodSplitted = currentTeachingPeriodKey.split("-")
    const year = teachingPeriodSplitted[0]
    const semester = teachingPeriodSplitted[1]
    let nextYear, nextSemesterNumber;
    if(semester !== "WINTER" && semester !== "SUMMER") {
        const semesterNumber = parseInt(semester.replace("S", ""))
        if (semesterNumber === 1) {
            nextSemesterNumber = 2
            nextYear = year
        } else {
            nextSemesterNumber = 1
            nextYear = parseInt(year) + 1
        }
    }else{
        //WINTER
        if(semester === "WINTER"){
            nextYear = year
            nextSemesterNumber = 2
            //SUMMER
        }else{
            nextYear = year+1
            nextSemesterNumber = 1
        }
    }
    return `${nextYear}-S${nextSemesterNumber}-01`
}

export const getNextSpecialTeachingPeriodKey = currentTeachingPeriodKey => {
    if(!currentTeachingPeriodKey){
        const date = new Date()
        const nextSeason = date.getMonth()<7?"WINTER":"SUMMER"
        return `${date.getYear()+1900}-${nextSeason}-01`
    }
    const teachingPeriodSplitted = currentTeachingPeriodKey.split("-")
    const year = teachingPeriodSplitted[0]
    const semester = teachingPeriodSplitted[1]
    if(semester === "WINTER" || semester === "SUMMER"){
        return null
    }
    const semesterNumber = parseInt(semester.replace("S", ""))
    let nextTeachingPeriodCode;
    if (semesterNumber === 1) {
        nextTeachingPeriodCode = "WINTER"
    } else {
        nextTeachingPeriodCode = "SUMMER"
    }
    return `${year}-${nextTeachingPeriodCode}-01`
}