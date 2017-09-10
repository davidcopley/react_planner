import React from "react"
import {connect} from "react-redux"
import {DragDropContext} from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend"
import {compose} from "redux"
import {addTeachingPeriod} from "../../actionCreators/planActions"
import {setIsSnapshotsMenuOpen,setIsUnitsMenuOpen} from "../../actionCreators/menuActions"
import {saveSnapshot, appendSnapshotBySnapshotName} from "../../actionCreators/snapshotsActions"
import SnapshotMenu from "../Menu/SnapshotMenu"
import UnitMenu from "../Menu/UnitsMenu"
import CourseStructure from "../Course/CourseStructure"
import "./PlanPage.css"
class PlanPage extends React.Component {
    render() {
        const {isSnapshotMenuOpen,isUnitsMenuOpen, setIsSnapshotsMenuOpen,setIsUnitsMenuOpen} = this.props
        return (
            <div style={{minHeight: "100vh", height: "100%"}}>
                <div style={{
                    height: 80,
                }}>
                <div style={{
                    height: 80,
                    width: "100vw",
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
                    display: "flex",
                    justifyContent: "center",
                    position:"fixed",
                    backgroundColor:"rgb(0, 108, 171)"
                }}/>
                    <div style={{display: "flex", width:"100%", alignItems: "center",position:"fixed"}}>
                        <button style={{margin:20}} onClick={() => setIsSnapshotsMenuOpen(!isSnapshotMenuOpen)}>Menu</button>
                        <h1 style={{color:"white",width:"100%"}}>Unit Planner</h1>
                        <button style={{margin:20}} onClick={()=> setIsUnitsMenuOpen(!isUnitsMenuOpen)}>Units</button>
                    </div>
                </div>
                <div style={{display: "flex", width: "100%", minHeight: "100vh", height: "100%"}}>
                    {isSnapshotMenuOpen && <SnapshotMenu/>}
                    <div style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        minHeight: "100vh",
                        height: "100%",
                    }}>
                        <CourseStructure/>
                    </div>
                    {isUnitsMenuOpen && <UnitMenu/>}
                </div>
                <div style={{position:"fixed",top:0,height:300,width:"100%",background:"rgb(0, 108, 171)",zIndex:-1}}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    teachingPeriods: state.planTeachingPeriodReducer.teachingPeriods,
    courseCode: state.planCourseReducer.courseCode,
    snapshotName: state.planCourseReducer.snapshotName,
    courseCredit: state.planCourseReducer.courseCredit,
    isSnapshotMenuOpen: state.menuReducer.isSnapshotMenuOpen,
    isUnitsMenuOpen: state.menuReducer.isUnitsMenuOpen
})

export default compose(connect(mapStateToProps, {
    addTeachingPeriod,
    setIsSnapshotsMenuOpen,
    setIsUnitsMenuOpen,
    saveSnapshot,
    appendSnapshotBySnapshotName
}), DragDropContext(HTML5Backend))(PlanPage)