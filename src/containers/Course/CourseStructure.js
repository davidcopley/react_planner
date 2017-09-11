import React from "react"
import {connect} from "react-redux"
import {addTeachingPeriod} from "../../actionCreators/planActions"
import {saveSnapshot, appendSnapshotBySnapshotName} from "../../actionCreators/snapshotsActions"
import {setIsLoadCourseModalOpen} from "../../actionCreators/loadCourseModalActions"
import TeachingPeriod from "../TeachingPeriod/TeachingPeriod"
import {getNextGeneralTeachingPeriodKey} from "../../tools/teachingPeriodKeys"
import {getCourses} from "../../actionCreators/courseDatabaseActions"
class CourseStructure extends React.Component {
    render() {
        const {snapshotName, courseCode, courseCredit, saveSnapshot, addTeachingPeriod, appendSnapshotBySnapshotName, teachingPeriodsOrder, isLoadCourseModalOpen ,setIsLoadCourseModalOpen} = this.props
        const nextTeachingPeriodKey = getNextGeneralTeachingPeriodKey(teachingPeriodsOrder[teachingPeriodsOrder.length - 1])
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 1000,
                minWidth: 1000,
                padding: 100,
                paddingTop: 0,
                paddingBottom: 0,
                minHeight: "100vh",
                height: "100%",
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
                background: "#ffffff"
            }}>
                <h2>Snapshot name: {snapshotName}</h2>
                <h2>Course Code: {courseCode}</h2>
                <h2>Course Credit: {courseCredit}</h2>
                <button onClick={()=>setIsLoadCourseModalOpen(!isLoadCourseModalOpen)}>Load Course</button>
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
                <button onClick={() => addTeachingPeriod(nextTeachingPeriodKey)}>
                    Add Teaching Period
                </button>
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
    isMenuOpen: state.menuReducer.isOpen,
    isLoadCourseModalOpen: state.loadCourseModalReducer.isLoadCourseModalOpen
})

export default connect(mapStateToProps, {
    addTeachingPeriod,
    saveSnapshot,
    appendSnapshotBySnapshotName,
    getCourses,
    setIsLoadCourseModalOpen
})(CourseStructure)