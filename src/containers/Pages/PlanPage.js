import React from "react"
import {connect} from "react-redux"
import {DragDropContext} from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend"
import {compose} from "redux"
import {setIsSnapshotsMenuOpen, setIsUnitsMenuOpen} from "../../actionCreators/menuActions"
import SnapshotMenu from "../Menu/SnapshotMenu"
import UnitMenu from "../Menu/UnitsMenu"
import CourseStructure from "../Course/CourseStructure"
import "./PlanPage.css"
import MenuIcon from "material-ui/svg-icons/navigation/menu"
import AddIcon from "material-ui/svg-icons/content/add"
import {IconButton, FloatingActionButton} from "material-ui"
import CourseModal from "../Modals/LoadCourseModal"
import unsubscribe from  "../../subscribers/planTeachingPeriodSubscriber"
import monplanLogoWhite from "../../images/monplanLogoWhite.svg"
import monashLogoWhite from "../../images/monashLogoWhite.svg"
class PlanPage extends React.Component {
    componentWillUnmount() {
        unsubscribe()
    }

    render() {
        const {isSnapshotMenuOpen, isUnitsMenuOpen, setIsSnapshotsMenuOpen, setIsUnitsMenuOpen} = this.props
        return (
            <div style={{minHeight: "100vh", height: "100%", width: "100%", minWidth: 1000}}>
                <span>
                    <div style={{
                        height: 130,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        position: "fixed",
                        backgroundColor: "rgb(0, 108, 171)"
                    }}/>
                    <div style={{display: "flex", width: "100%", alignItems: "center",justifyContent:"center", position: "fixed"}}>
                        <div style={{width: "100%", maxWidth: 1000,display:"flex",flexDirection:"column"}}>
                            <span style={{height:34}}/>
                            <div style={{height:42}}>
                                <img src={monashLogoWhite} height={42} alt=""/>
                                <img src={monplanLogoWhite} height={42} style={{float:"right"}} alt=""/>
                            </div>
                            <IconButton iconStyle={{fill: "#ffffff"}}
                                        onClick={() => setIsSnapshotsMenuOpen(!isSnapshotMenuOpen)}><MenuIcon/>
                            </IconButton>
                        </div>
                    </div>
                </span>
                <SnapshotMenu/>
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
                <div style={{
                    position: "fixed",
                    top: 0,
                    height: 300,
                    width: "100%",
                    background: "rgb(0, 108, 171)",
                    zIndex: -1
                }}/>
                <FloatingActionButton
                    iconStyle={{width: 45, height: 45, transform: isUnitsMenuOpen ? "rotate(-112.5deg" : undefined}}
                    style={{position: "fixed", bottom: 50, right: 50, zIndex: 10000}} backgroundColor={"#a10300"}
                    onClick={() => setIsUnitsMenuOpen(!isUnitsMenuOpen)}>
                    <AddIcon/>
                </FloatingActionButton>
                <CourseModal/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isSnapshotMenuOpen: state.menuReducer.isSnapshotMenuOpen,
    isUnitsMenuOpen: state.menuReducer.isUnitsMenuOpen
})

export default compose(connect(mapStateToProps, {
    setIsSnapshotsMenuOpen,
    setIsUnitsMenuOpen,
}), DragDropContext(HTML5Backend))(PlanPage)