export const parseCoursesData = courses => {
    return courses.filter(course=>!!course.courseCode).map(course=>{
        return {faculty: course.managingFaculty, courseCode: course.courseCode, courseName: course.courseName}
    })
}

export const parseAos = aos => {
    return {aosName:aos.aosName,aosCode:aos.aosCode}
}

export const parsePropertyMapToSnapshot = propertyMap => {
    const teachingPeriods = JSON.parse(propertyMap["teachingPeriods"].value)
    console.log(teachingPeriods)
    return propertyMapToSnapshot(teachingPeriods)
}

export const propertyMapToSnapshot = teachingPeriods => {
    let snapshot = {
        snapshotName:null,
        courseCode:null,
        teachingPeriods: {}
    }
    teachingPeriods.forEach(teachingPeriod=>{
        const {year,code,units} = teachingPeriod
        const date = new Date()
        let teachingPeriodYear = date.getYear()+1900+parseInt(year)
        const teachingPeriodCode = `${teachingPeriodYear}-${code}`
        snapshot.teachingPeriods[teachingPeriodCode] = {units:[],unitsPlaceholders:[]}
        units.forEach(unit=>{
            const unitCode = unit.unitCode
            if(unitCode.match(/^\w{3}\d{4}$/)){
                snapshot.teachingPeriods[teachingPeriodCode]["units"].push(unitCode)
            }else{
                snapshot.teachingPeriods[teachingPeriodCode]["unitsPlaceholders"].push(unitCode)
            }

        })
    })
    return snapshot
}