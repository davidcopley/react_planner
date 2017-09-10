import React from "react"
import {connect} from "react-redux"
import {DragDropContext} from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend"
import {compose} from "redux"
import {addTeachingPeriod} from "../../actionCreators/planActions"
import {setMenuOpen} from "../../actionCreators/menuActions"
import {saveSnapshot, appendSnapshotBySnapshotName} from "../../actionCreators/snapshotsActions"
import SnapshotMenu from "../Menu/SnapshotMenu"
import UnitMenu from "../Menu/UnitsMenu"
import CourseStructure from "../Course/CourseStructure"
import "./PlanPage.css"
class PlanPage extends React.Component {
    render() {
        const {isMenuOpen, setMenuOpen} = this.props
        return (
            <div style={{minHeight: "100vh", height: "100%"}}>
                <div style={{
                    height: 80,
                }}>
                <div style={{
                    height: 80,
                    width: "100vw",
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                    position:"fixed",
                    backgroundColor:"#337dff"
                }}/>
                    <div style={{display: "flex", width: 1000, maxWidth: 1000, alignItems: "center",position:"fixed"}}>
                        <button style={{margin:20}} onClick={() => setMenuOpen(!isMenuOpen)}>Menu</button>
                        <h1 style={{color:"white"}}>MonPlan</h1>
                    </div>
                </div>
                <div style={{display: "flex", width: "100%", minHeight: "100vh", height: "100%"}}>
                    {isMenuOpen && <SnapshotMenu/>}
                    <div style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        minHeight: "100vh",
                        height: "100%",
                    }}>
                        <CourseStructure/>
                    </div>
                    <UnitMenu/>
                </div>
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

export default compose(connect(mapStateToProps, {
    addTeachingPeriod,
    setMenuOpen,
    saveSnapshot,
    appendSnapshotBySnapshotName
}), DragDropContext(HTML5Backend))(PlanPage)