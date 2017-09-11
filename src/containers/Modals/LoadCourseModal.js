import React from "react"
import _ from "lodash"
import {Dialog,AutoComplete} from "material-ui"
import {connect} from "react-redux"
import {getCourses,getCourseByCourseCode,getCourseMapByAosCode} from "../../actionCreators/courseDatabaseActions"
import {setIsLoadCourseModalOpen} from "../../actionCreators/loadCourseModalActions"


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

    onUpdateCourseInput = () => {
        const {selectedCourseCode} = this.state
        if(selectedCourseCode) {
            this.setState({selectedCourseCode: null})
            this.aos.setState({searchText:''})
        }
    }

    handleChooseAos = (aosName,index) => {
        const {selectedCourseCode} = this.state
        const {coursesAos,getCourseMapByAosCode} = this.props
        const aos = coursesAos[selectedCourseCode][index]
        getCourseMapByAosCode(aos.aosCode)
    }

    render(){
        const {courses,coursesAos,isLoadCourseModalOpen,setIsLoadCourseModalOpen} = this.props
        const {selectedCourseCode} = this.state
        const coursesDatasource = courses.map(course=>course.courseName)
        const aosDatasource = coursesAos[selectedCourseCode]?coursesAos[selectedCourseCode].map(aos=>aos.aosName):[]
        return(
            <Dialog open={isLoadCourseModalOpen} onRequestClose={()=>setIsLoadCourseModalOpen(false)}>
                <AutoComplete
                    openOnFocus
                    onNewRequest={this.handleChooseCourse}
                    onUpdateInput={this.onUpdateCourseInput}
                    floatingLabelText={"Course"}
                    fullWidth
                    filter={AutoComplete.fuzzyFilter}
                    hintText="Type anything"
                    dataSource={coursesDatasource}
                    maxSearchResults={5}
                />
                <AutoComplete
                    ref={aos => this.aos = aos}
                    openOnFocus
                    onNewRequest={this.handleChooseAos}
                    disabled={selectedCourseCode===null}
                    floatingLabelText={"Area of Study"}
                    fullWidth
                    filter={AutoComplete.fuzzyFilter}
                    hintText="Type anything"
                    dataSource={aosDatasource}
                />
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        courses: state.coursesDatabaseReducer.courses,
        coursesAos: state.coursesDatabaseReducer.coursesAos,
        isLoadCourseModalOpen: state.loadCourseModalReducer.isLoadCourseModalOpen
    }
}

export default connect(mapStateToProps,{getCourses,getCourseByCourseCode,getCourseMapByAosCode,setIsLoadCourseModalOpen})(LoadCourseModal)