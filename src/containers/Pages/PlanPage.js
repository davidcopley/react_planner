import React from "react"
import {connect} from "react-redux"
import {DragDropContext} from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend"
import {compose} from "redux"
import {setIsSnapshotsMenuOpen, setIsUnitsMenuOpen} from "../../actionCreators/menuActions"
import {setIsLoadCourseModalOpen} from "../../actionCreators/loadCourseModalActions"
import {resetPlanCourse} from "../../actionCreators/planActions"
import {saveSnapshot} from "../../actionCreators/snapshotsActions"
import SnapshotMenu from "../Menu/SnapshotMenu"
import UnitMenu from "../Menu/UnitsMenu"
import CourseStructure from "../Course/CourseStructure"
import MenuIcon from "material-ui/svg-icons/navigation/menu"
import AddIcon from "material-ui/svg-icons/content/add"
import {IconButton, FloatingActionButton} from "material-ui"
import CourseModal from "../Modals/LoadCourseModal"
import unsubscribe from  "../../subscribers/planTeachingPeriodSubscriber"
import monplanLogoWhite from "../../images/monplanLogoWhite.svg"
import monashLogoWhite from "../../images/monashLogoWhite.svg"
import Save from "material-ui/svg-icons/content/save"
import Done from "material-ui/svg-icons/action/done"
import Create from "material-ui/svg-icons/content/create"
import Load from "material-ui/svg-icons/file/cloud-download"
class PlanPage extends React.Component {
    componentWillUnmount() {
        unsubscribe()
    }

    render() {
        const {isSnapshotMenuOpen, isUnitsMenuOpen, setIsSnapshotsMenuOpen, setIsUnitsMenuOpen,setIsLoadCourseModalOpen,isLoadCourseModalOpen,resetPlanCourse,saveSnapshot} = this.props
        return (
            <div style={{minHeight: "100vh", height: "100%", width: "100%", minWidth: 1000}}>
                <div style={{
                    height: 130,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    position: "fixed",
                    backgroundColor: "rgb(0, 108, 171)",
                    zIndex:1
                }}/>
                <div style={{display: "flex", width: "100%", alignItems: "center",justifyContent:"center", position: "fixed",zIndex:1}}>
                    <div style={{width: "100%", maxWidth: 1000,display:"flex",flexDirection:"column"}}>
                        <span style={{height:34}}/>
                        <div style={{height:42}}>
                            <img src={monashLogoWhite} height={42} alt=""/>
                            <img src={monplanLogoWhite} height={35} style={{float:"right"}} alt=""/>
                        </div>
                        <div style={{height:42}}>
                            <IconButton iconStyle={{fill: "#ffffff"}}
                                        onClick={() => setIsSnapshotsMenuOpen(!isSnapshotMenuOpen)}><MenuIcon/>
                            </IconButton>
                            <IconButton onClick={()=>saveSnapshot()} iconStyle={{fill: "#ffffff"}} style={{float:"right"}}>
                                <Save/>
                            </IconButton>
                            <IconButton onClick={() => setIsLoadCourseModalOpen(!isLoadCourseModalOpen)} iconStyle={{fill: "#ffffff"}} style={{float:"right"}}>
                                <Load/>
                            </IconButton>
                            <IconButton onClick={()=>resetPlanCourse()} iconStyle={{fill: "#ffffff"}} style={{float:"right"}}>
                                <Create/>
                            </IconButton>
                            <IconButton iconStyle={{fill: "#ffffff"}} style={{float:"right"}}>
                                <Done/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <SnapshotMenu/>
                <div style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    minHeight: "100vh",
                    height: "100%",
                    position:"relative",
                    top:130
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
                    iconStyle={{transform: isUnitsMenuOpen ? "rotate(-112.5deg)" : undefined}}
                    style={{position: "fixed", bottom: 45, right: 24, zIndex: 1001, width:56,height:56}} backgroundColor={"#cf0001"}
                    onClick={() => setIsUnitsMenuOpen(!isUnitsMenuOpen)}
                >
                    <AddIcon/>
                </FloatingActionButton>
                <CourseModal/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isSnapshotMenuOpen: state.menuReducer.isSnapshotMenuOpen,
    isUnitsMenuOpen: state.menuReducer.isUnitsMenuOpen,
    isLoadCourseModalOpen: state.loadCourseModalReducer.isLoadCourseModalOpen
})

export default compose(connect(mapStateToProps, {
    setIsSnapshotsMenuOpen,
    setIsUnitsMenuOpen,
    setIsLoadCourseModalOpen,
    resetPlanCourse,
    saveSnapshot
}), DragDropContext(HTML5Backend))(PlanPage)