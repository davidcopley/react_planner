export const parseCoursesData = courses => {
    return courses.filter(course=>!!course.courseCode).map(course=>{
        return {faculty: course.managingFaculty, courseCode: course.courseCode, courseName: course.courseName}
    })
}

export const parsePropertyMap = propertyMap => {
    return {aosName:propertyMap.aosName,aosCode:propertyMap.aosCode}
}