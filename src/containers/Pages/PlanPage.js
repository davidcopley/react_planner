import React from "react"
import {connect} from "react-redux"
import TeachingPeriod from "../TeachingPeriod/TeachingPeriod"
import { DragDropContext } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend"
import {compose} from "redux"

class PlanPage extends React.Component {
    render() {
        const {teachingPeriods} = this.props
        const teachingPeriodCodes = Object.keys(teachingPeriods)
        return (
            <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                <div style={{display: "flex", flexDirection: "column", width: 1000, maxWidth: 1000}}>
                    {teachingPeriodCodes.map(teachingPeriodCode =>
                        <TeachingPeriod key={`teachingPeriod${teachingPeriodCode}`}teachingPeriodCode={teachingPeriodCode}/>)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    teachingPeriods: state.planCourseReducer.teachingPeriods
})

export default compose(connect(mapStateToProps),DragDropContext(HTML5Backend))(PlanPage)