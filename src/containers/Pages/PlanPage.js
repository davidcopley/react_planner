import React from "react"
import {connect} from "react-redux"
import TeachingPeriod from "../TeachingPeriod/TeachingPeriod"


class PlanPage extends React.Component {
    const
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

export default connect(mapStateToProps)(PlanPage)