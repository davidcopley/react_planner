import React from "react"
import {connect} from "react-redux"
import TeachingPeriod from "../TeachingPeriod/TeachingPeriod"
import {DragDropContext} from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend"
import {compose} from "redux"
import {addTeachingPeriod} from "../../actionCreators/planActions"
import {getNextTeachingPeriodKey} from "../../tools/teachingPeriodKeys"
import {setMenuOpen} from "../../actionCreators/menuActions"
import Menu from "../Menu/Menu"
class PlanPage extends React.Component {
    render() {
        const {teachingPeriods, addTeachingPeriod, isMenuOpen, setMenuOpen} = this.props

        const {courseCode,courseCredit} = this.props
        console.log(courseCode,courseCredit)
        const teachingPeriodCodes = Object.keys(teachingPeriods)
        const nextTeachingPeriodKey = getNextTeachingPeriodKey(teachingPeriodCodes[teachingPeriodCodes.length - 1])
        console.log(nextTeachingPeriodKey)
        return (
            <div>
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
                <div style={{display: "flex", width: "100%"}}>
                    {isMenuOpen && <Menu/>}
                    <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                        <div style={{display: "flex", flexDirection: "column", width: 1000, maxWidth: 1000}}>
                            <h1>Course Code: {courseCode}</h1>
                            <h2>Course Credit: {courseCredit}</h2>
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
    courseCredit:state.planCourseReducer.credit,
    isMenuOpen: state.menuReducer.isOpen
})

export default compose(connect(mapStateToProps, {
    addTeachingPeriod,
    setMenuOpen
}), DragDropContext(HTML5Backend))(PlanPage)