import axios from "axios"
import {appendSnapshotPromise,loadSnapshotByIndex} from "../actionCreators/snapshotsActions"
import {addUnit} from "./unitsDatabaseActions"
import {parseCoursesData,parseAos,parsePropertyMapToSnapshotWithCommencementYear} from "../tools/courseDatabaseTools"
const api = "https://monplan-api-dev.appspot.com";
export const addApiCalled = apiCalled => {return {type:"ADD_API_CALLED",apiCalled}}
export const addCourseAosByCourseCode = (courseCode,courseAos) => {return {type:"ADD_COURSE_AOS",courseCode,courseAos}}
export const setCourses = courses => {return {type:"SET_COURSES",courses}}
export const getCourses = () => (dispatch,getState) => {
    const {coursesDatabaseReducer} = getState()
    const {apiCalled} = coursesDatabaseReducer
    if(!apiCalled["/basic/courses"]) {
        axios
            .get(`${api}/basic/courses`)
            .then(res => {
                const {data} = res
                dispatch(addApiCalled("/basic/courses"))
                dispatch(setCourses(parseCoursesData(data)))
            })
            .catch(err => {
                console.log(err)
            })
    }
}
export const getCourseByCourseCode = courseCode => (dispatch,getState) => {
    const {coursesDatabaseReducer} = getState()
    const {apiCalled} = coursesDatabaseReducer
    if(!apiCalled[`/basic/courses/${courseCode}`]) {
        axios
            .get(`${api}/basic/courses/${courseCode}`)
            .then(res => {
                const {data} = res
                dispatch(addApiCalled(`/basic/courses/${courseCode}`))
                const courseAos = data.map(aos=>parseAos(aos.propertyMap))
                dispatch(addCourseAosByCourseCode(courseCode,courseAos))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getCourseMapByAosCode = (aosCode,commencementYear=null) => (dispatch,getState) => {
    const {coursesDatabaseReducer,snapshotsDatabaseReducer} = getState()
    const {apiCalled} = coursesDatabaseReducer
    if(!apiCalled[`/courseMaps/${aosCode}`]) {
        axios
            .get(`${api}/courseMaps/${aosCode}`)
            .then(res=>{
                const {data} = res
                console.log(data)
                const {courseName,courseCode,courseType,faculty} = data[0]["propertyMap"]
                const teachingPeriods = JSON.parse(data[0]["propertyMap"]["teachingPeriods"].value)
                dispatch(getUnitsByTeachingPeriods(teachingPeriods))
                const snapshot = parsePropertyMapToSnapshotWithCommencementYear(data[0]["propertyMap"],commencementYear)
                console.log(data[0]["propertyMap"])
                snapshot.snapshotName=`${courseName} - ${courseCode}`
                snapshot.courseCode=courseCode
                snapshot.courseName=`${courseType} of ${courseName}`
                snapshot.courseFaculty = faculty
                dispatch(appendSnapshotPromise(snapshot))
                    .then(()=>dispatch(loadSnapshotByIndex(snapshotsDatabaseReducer.snapshots.length)))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}

export const getUnitsByTeachingPeriods = teachingPeriods => (dispatch,getState) => {
    teachingPeriods.forEach(teachingPeriod=>{
        teachingPeriod.units.forEach(unit=>{
            if(unit.unitCode.match(/^\w{3}\d{4}$/)) {
                dispatch(addUnit(unit))
            }
        })
    })
}