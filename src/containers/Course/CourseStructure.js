import React from "react"
import {connect} from "react-redux"
import {addTeachingPeriod} from "../../actionCreators/planActions"
import {saveSnapshot,appendSnapshotBySnapshotName} from "../../actionCreators/snapshotsActions"
import TeachingPeriod from "../TeachingPeriod/TeachingPeriod"
import {getNextTeachingPeriodKey} from "../../tools/teachingPeriodKeys"
class CourseStructure extends React.Component{
    render(){
        const {snapshotName,courseCode,courseCredit,teachingPeriods,saveSnapshot,addTeachingPeriod,appendSnapshotBySnapshotName} = this.props
        const teachingPeriodCodes = Object.keys(teachingPeriods)
        const nextTeachingPeriodKey = getNextTeachingPeriodKey(teachingPeriodCodes[teachingPeriodCodes.length - 1])
        return(
            <div style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 1000,
                minHeight: "100vh",
                height: "100%"
            }}>
                <h2>Snapshot name: {snapshotName}</h2>
                <h2>Course Code: {courseCode}</h2>
                <h2>Course Credit: {courseCredit}</h2>
                {snapshotName ? <button onClick={() => saveSnapshot()}>Save Snapshot</button> : <div>
                    <button onClick={() => appendSnapshotBySnapshotName(this.snapshotName.value)}>New Snapshot</button>
                    <input ref={snapshotName => this.snapshotName = snapshotName} type="text" placeholder="Enter Snapshot Name"/></div>}
                {teachingPeriodCodes.map((teachingPeriodCode,i) =>
                    <TeachingPeriod
                        key={`teachingPeriod${teachingPeriodCode}`}
                        teachingPeriodCode={teachingPeriodCode}
                        isFirst={i===0}
                        isLast={i===teachingPeriodCodes.length-1}
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
    courseCode: state.planCourseReducer.courseCode,
    snapshotName: state.planCourseReducer.snapshotName,
    courseCredit: state.planCourseReducer.courseCredit,
    isMenuOpen: state.menuReducer.isOpen
})

export default connect(mapStateToProps,{addTeachingPeriod,saveSnapshot,appendSnapshotBySnapshotName})(CourseStructure)