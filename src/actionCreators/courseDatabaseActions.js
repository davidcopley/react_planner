import axios from "axios"
import {appendSnapshot} from "../actionCreators/snapshotsActions"
import {addUnit} from "./unitsActions"
import {parseCoursesData,parseAos,parsePropertyMapToSnapshot} from "../tools/courseDatabaseTools"
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

export const getCourseMapByAosCode = aosCode => (dispatch,getState) => {
    const {coursesDatabaseReducer} = getState()
    const {apiCalled} = coursesDatabaseReducer
    if(!apiCalled[`/courseMaps/${aosCode}`]) {
        axios
            .get(`${api}/courseMaps/${aosCode}`)
            .then(res=>{
                const {data} = res
                const teachingPeriods = JSON.parse(data[0]["propertyMap"]["teachingPeriods"].value)
                dispatch(getUnitsByTeachingPeriods(teachingPeriods))
                const snapshot = parsePropertyMapToSnapshot(data[0]["propertyMap"])
                dispatch(appendSnapshot(snapshot))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}

export const getUnitsByTeachingPeriods = teachingPeriods => (dispatch,getState) => {
    console.log(teachingPeriods)
    teachingPeriods.forEach(teachingPeriod=>{
        teachingPeriod.units.forEach(unit=>{
            const {unitCode,unitName,creditPoints} = unit
            console.log(unit)
            dispatch(addUnit(unit))
        })
    })
}