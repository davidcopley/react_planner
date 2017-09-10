import React from "react"
import _ from "lodash"
import {Dialog,AutoComplete} from "material-ui"
import {connect} from "react-redux"
import {getCourses,getCourseByCourseCode} from "../../actionCreators/courseDatabaseActions"

class LoadCourseModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedCourseCode:null,
            selectedAos:null
        }
    }
    componentDidMount(){
        const {getCourses} = this.props
        getCourses()
    }

    handleChooseCourse = (courseName,index) => {
        const {courses,getCourseByCourseCode} = this.props
        const {courseCode} = courses[index]
        this.setState({selectedCourseCode:courseCode})
        getCourseByCourseCode(courseCode)
    }

    render(){
        const {courses,coursesAos} = this.props
        const {selectedCourseCode} = this.state
        const coursesDatasource = courses.map(course=>course.courseName)
        const aosDatasource = coursesAos[selectedCourseCode]?coursesAos[selectedCourseCode].map(aos=>aos.aosName):[]
        return(
            <Dialog open>
                <AutoComplete
                    openOnFocus
                    onNewRequest={this.handleChooseCourse}
                    floatingLabelText={"Course"}
                    fullWidth
                    filter={AutoComplete.fuzzyFilter}
                    hintText="Type anything"
                    dataSource={coursesDatasource}
                    maxSearchResults={5}
                />
                <AutoComplete
                    openOnFocus
                    disabled={selectedCourseCode===null}
                    floatingLabelText={"Area of Study"}
                    fullWidth
                    filter={AutoComplete.fuzzyFilter}
                    hintText="Type anything"
                    dataSource={aosDatasource}
                    maxSearchResults={5}
                />
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        courses: state.coursesDatabaseReducer.courses,
        coursesAos: state.coursesDatabaseReducer.coursesAos
    }
}

export default connect(mapStateToProps,{getCourses,getCourseByCourseCode})(LoadCourseModal)