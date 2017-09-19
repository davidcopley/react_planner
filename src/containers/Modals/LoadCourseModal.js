import React from "react"
import {Dialog,AutoComplete,TextField,FlatButton} from "material-ui"
import {connect} from "react-redux"
import {getCourses,getCourseByCourseCode,getCourseMapByAosCode} from "../../actionCreators/courseDatabaseActions"
import {setIsLoadCourseModalOpen} from "../../actionCreators/loadCourseModalActions"


class LoadCourseModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedCourseCode:null,
            selectedAosCode:null,
            isCommencementYearValid:true,
            commencementYear:null
        }
    }
    componentDidMount(){
        const {getCourses} = this.props
        getCourses()
    }

    handleChooseCourse = (courseName,index) => {
        const {courses,getCourseByCourseCode} = this.props
        if(courses[index]) {
            const {courseCode} = courses[index]
            this.setState({selectedCourseCode: courseCode})
            getCourseByCourseCode(courseCode)
        }
    }
u
    onUpdateCourseInput = () => {
        const {selectedCourseCode} = this.state
        if(selectedCourseCode) {
            this.setState({selectedCourseCode: null})
            this.aos.setState({searchText:''})
        }
    }

    onUpdateAosInput = () => {
        const {selectedAosCode} = this.state
        if(selectedAosCode) {
            this.setState({selectedAosCode: null})
        }
    }

    updateYear = year => {
        this.setState({isCommencementYearValid:!!year.match(/^(20)[1-9][0-9]$/),commencementYear:year})
    }

    handleChooseAos = (aosName,index) => {
        const {selectedCourseCode} = this.state
        const {coursesAos,getCourseMapByAosCode} = this.props
        const aos = coursesAos[selectedCourseCode][index]
        if(aos){
            this.setState({selectedAosCode:aos.aosCode})
        }
    }

    loadCourse = () => {
        const {getCourseMapByAosCode,setIsLoadCourseModalOpen} = this.props
        const {selectedAosCode,commencementYear} = this.state
        getCourseMapByAosCode(selectedAosCode,commencementYear)
        this.setState({
            selectedCourseCode:null,
            selectedAosCode:null,
        })
        setIsLoadCourseModalOpen(false)
    }

    render(){
        const {courses,coursesAos,isLoadCourseModalOpen,setIsLoadCourseModalOpen} = this.props
        const {selectedCourseCode,selectedAosCode,isCommencementYearValid} = this.state
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
                    onUpdateInput={this.onUpdateAosInput}
                    disabled={selectedCourseCode===null}
                    floatingLabelText={"Area of Study"}
                    fullWidth
                    filter={AutoComplete.fuzzyFilter}
                    hintText="Type anything"
                    dataSource={aosDatasource}
                />
                <TextField
                    fullWidth
                    disabled={selectedAosCode===null}
                    floatingLabelText={"Commencement Year"}
                    defaultValue={new Date().getUTCFullYear()}
                    onChange={e=>this.updateYear(e.target.value)}
                    errorText={!isCommencementYearValid&&"Invalid commencement year"}
                />
                <FlatButton onClick={()=>this.loadCourse()} fullWidth disabled={!selectedAosCode||!isCommencementYearValid}>Load Course</FlatButton>
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