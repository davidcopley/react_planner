import React from "react"
import {connect} from "react-redux"
import {addTeachingPeriod} from "../../actionCreators/planActions"
import {saveSnapshot, appendSnapshotBySnapshotName} from "../../actionCreators/snapshotsActions"
import {setIsLoadCourseModalOpen} from "../../actionCreators/loadCourseModalActions"
import TeachingPeriod from "../TeachingPeriod/TeachingPeriod"
import {getNextGeneralTeachingPeriodKey,getTeachingPeriodString} from "../../tools/teachingPeriodKeys"
import {getCourses} from "../../actionCreators/courseDatabaseActions"
import {FlatButton,LinearProgress} from "material-ui"
import {facultyColors} from "../../constants/colors"
class CourseStructure extends React.Component {
    render() {
        const {snapshotName, courseCode,courseName, courseCredit,courseFaculty, saveSnapshot, addTeachingPeriod, appendSnapshotBySnapshotName, teachingPeriodsOrder, isLoadCourseModalOpen, setIsLoadCourseModalOpen} = this.props
        const nextTeachingPeriodKey = getNextGeneralTeachingPeriodKey(teachingPeriodsOrder[teachingPeriodsOrder.length - 1])
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 1000,
                minWidth: 1000,
                paddingTop: 0,
                paddingBottom: 0,
                minHeight: "100vh",
                height: "100%",
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
                background: "#ffffff",
                marginBottom:50
            }}>
                <div style={{height:64,marginTop:14,width:"100%",display:"flex"}}>
                    <span style={{fontSize:14,fontWeight:500,lineHeight:1.71}}>
                        <span style={{marginLeft:24}}>{courseCode} - {courseName}</span><br/>
                        <span style={{marginLeft:24,color:"#7c7b7c"}}>{courseFaculty}</span>
                    </span>
                    <span style={{fontSize:14,fontWeight:500,lineHeight:1.71,color:"#7c7b7c"}}>
                        <span style={{marginLeft:24}}>{courseCredit}</span><br/>
                        <span style={{marginLeft:24}}>Credit Points</span>
                    </span>
                    <span style={{fontSize:14,fontWeight:500,lineHeight:1.71,color:"#7c7b7c"}}>
                        <span style={{marginLeft:24}}>$PRICE</span><br/>
                        <span style={{marginLeft:24}}>Total Est. Cost</span>
                    </span>
                    <FlatButton style={{marginLeft:"auto",marginRight:8,zIndex:0}} label={"COURSE INFO"} labelStyle={{color:facultyColors[courseFaculty]}}/>
                </div>
                <LinearProgress color={facultyColors[courseFaculty]||"#000000"} mode={"determinate"} value={courseCredit/144*100} style={{height:3}}/>
                {snapshotName ? <button onClick={() => saveSnapshot()}>Save Snapshot</button> : <div>
                    <button onClick={() => appendSnapshotBySnapshotName(this.snapshotName.value)}>New Snapshot</button>
                    <input ref={snapshotName => this.snapshotName = snapshotName} type="text"
                           placeholder="Enter Snapshot Name"/></div>}
                {teachingPeriodsOrder.map((teachingPeriodCode, i) =>
                    <TeachingPeriod
                        key={`teachingPeriod${teachingPeriodCode}`}
                        teachingPeriodCode={teachingPeriodCode}
                        isFirst={i === 0}
                        isLast={i === teachingPeriodsOrder.length - 1}
                    />)
                }
                <FlatButton style={{fontSize:13,borderTop: "1px solid #dddddd"}} onClick={() => addTeachingPeriod(nextTeachingPeriodKey)}>
                    Add {getTeachingPeriodString(nextTeachingPeriodKey)}
                </FlatButton>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    teachingPeriods: state.planTeachingPeriodReducer.teachingPeriods,
    teachingPeriodsOrder: state.planTeachingPeriodReducer.teachingPeriodsOrder,
    courseCode: state.planCourseReducer.courseCode,
    snapshotName: state.planCourseReducer.snapshotName,
    courseCredit: state.planCourseReducer.courseCredit,
    courseName: state.planCourseReducer.courseName,
    courseFaculty: state.planCourseReducer.courseFaculty,
    isMenuOpen: state.menuReducer.isOpen,
})

export default connect(mapStateToProps, {
    addTeachingPeriod,
    saveSnapshot,
    appendSnapshotBySnapshotName,
    getCourses
})(CourseStructure)