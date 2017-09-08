export const getNextTeachingPeriodKey = currentTeachingPeriodKey => {
    if(!currentTeachingPeriodKey){
        const date = new Date()
        return `${date.getYear()+1900}-${date.getMonth()<7?"S1":"S2"}-01`
    }
    const teachingPeriodSplitted = currentTeachingPeriodKey.split("-")
    const year = teachingPeriodSplitted[0]
    const semester = teachingPeriodSplitted[1]
    const semesterNumber = parseInt(semester.replace("S",""))
    let nextYear,nextSemesterNumber;
    console.log(semesterNumber)
    if(semesterNumber===1){
        nextSemesterNumber = 2
        nextYear=year
    }else{
        nextSemesterNumber = 1
        nextYear=parseInt(year)+1
    }
    const nextTeachingPeriodKey = `${nextYear}-S${nextSemesterNumber}-01`
    return nextTeachingPeriodKey
}