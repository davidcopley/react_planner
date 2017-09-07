import React from "react"
import {connect} from "react-redux"
import TeachingPeriod from "../TeachingPeriod/TeachingPeriod"
import {DragDropContext} from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend"
import {compose} from "redux"
import {addTeachingPeriod} from "../../actionCreators/planActions"
import {getNextTeachingPeriodKey} from "../../tools/teachingPeriodKeys"
import {setMenuOpen} from "../../actionCreators/menuActions"
import {saveSnapshot} from "../../actionCreators/snapshotsActions"
import Menu from "../Menu/Menu"
class PlanPage extends React.Component {
    render() {
        const {teachingPeriods, addTeachingPeriod, isMenuOpen, setMenuOpen} = this.props

        const {courseCode,courseCredit,snapshotName,saveSnapshot} = this.props
        console.log(courseCode,courseCredit)
        const teachingPeriodCodes = Object.keys(teachingPeriods)
        const nextTeachingPeriodKey = getNextTeachingPeriodKey(teachingPeriodCodes[teachingPeriodCodes.length - 1])
        console.log(nextTeachingPeriodKey)
        return (
            <div style={{minHeight:"100vh",height:"100%"}}>
                <div style={{
                    height: 50,
                    width: "100vw",
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <div style={{display: "flex", width: 1000, maxWidth: 1000, alignItems: "center"}}>
                        <button onClick={() => setMenuOpen(!isMenuOpen)}>Menu</button>
                        MonPlan
                    </div>
                </div>
                <div style={{display: "flex", width: "100%", minHeight:"100vh",height:"100%"}}>
                    {isMenuOpen && <Menu/>}
                    <div style={{display: "flex", width: "100%", justifyContent: "center",minHeight:"100vh",height:"100%"}}>
                        <div style={{display: "flex", flexDirection: "column", width: 1000, maxWidth: 1000,minHeight:"100vh",height:"100%"}}>
                            <h2>Snapshot name: {snapshotName}</h2>
                            <h2>Course Code: {courseCode}</h2>
                            <h2>Course Credit: {courseCredit}</h2>
                            <button onClick={()=>saveSnapshot()}>Save Snapshot</button>
                            {teachingPeriodCodes.map(teachingPeriodCode =>
                                <TeachingPeriod key={`teachingPeriod${teachingPeriodCode}`}
                                                teachingPeriodCode={teachingPeriodCode}/>)
                            }
                            <button onClick={() => addTeachingPeriod(nextTeachingPeriodKey)}>
                                Add Teaching Period
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    teachingPeriods: state.planCourseReducer.teachingPeriods,
    courseCode:state.planCourseReducer.courseCode,
    snapshotName:state.planCourseReducer.snapshotName,
    courseCredit:state.planCourseReducer.credit,
    isMenuOpen: state.menuReducer.isOpen
})

export default compose(connect(mapStateToProps, {
    addTeachingPeriod,
    setMenuOpen,
    saveSnapshot
}), DragDropContext(HTML5Backend))(PlanPage)