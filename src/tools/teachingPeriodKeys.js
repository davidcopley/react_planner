export const getNextGeneralTeachingPeriodKey = currentTeachingPeriodKey => {
    if(!currentTeachingPeriodKey){
        const date = new Date()
        return `${date.getYear()+1900}-${date.getMonth()<7?"S1":"S2"}-01`
    }
    const teachingPeriodSplitted = currentTeachingPeriodKey.split("-")
    const year = parseInt(teachingPeriodSplitted[0])
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
    const year = parseInt(teachingPeriodSplitted[0])
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

export const getPrevSpecialTeachingPeriodKey = currentTeachingPeriodKey => {
    if(!currentTeachingPeriodKey){
        const date = new Date()
        const prevSeason = date.getMonth()<7?"SUMMER":"WINTER"
        const prevYear = prevSeason==="SUMMER"?date.getYear()-1:date.getYear()
        return `${prevYear+1900}-${prevSeason}-01`
    }
    const teachingPeriodSplitted = currentTeachingPeriodKey.split("-")
    let year = parseInt(teachingPeriodSplitted[0])
    const semester = teachingPeriodSplitted[1]
    if(semester === "WINTER" || semester === "SUMMER"){
        return null
    }
    const semesterNumber = parseInt(semester.replace("S", ""))
    let prevTeachingPeriodCode;
    if (semesterNumber === 1) {
        prevTeachingPeriodCode = "SUMMER"
        year-=1
    } else {
        prevTeachingPeriodCode = "WINTER"
    }
    return `${year}-${prevTeachingPeriodCode}-01`
}

export const getTeachingPeriodString = teachingPeriodKey => {
    let string,year,semester
    const teachingPeriodSplitted = teachingPeriodKey.split("-")
    year = teachingPeriodSplitted[0]
    semester = teachingPeriodSplitted[1]
    if(semester[0]==="S"){
        semester = "Semester "+semester[1]+", "
    }else if(semester==="WINTER"){
        semester = "Winter, "
    }else semester = "Summer, "
    string = semester+year
    return string
}