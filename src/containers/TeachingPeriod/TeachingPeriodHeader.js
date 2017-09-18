import React from "react"
import {connect} from "react-redux"
import {
    removeTeachingPeriodByTeachingPeriodCode,
    setIsDeferTeachingPeriodByTeachingPeriodCode
} from "../../actionCreators/planActions"
import {getTeachingPeriodString} from "../../tools/teachingPeriodKeys"

class TeachingPeriodHeader extends React.Component {
    render() {
        const {teachingPeriodCode, totalCredits, removeTeachingPeriodByTeachingPeriodCode, isDeferred, setIsDeferTeachingPeriodByTeachingPeriodCode, isFirst, isLast} = this.props
        const isWinter = teachingPeriodCode.match(/WINTER/)
        const isSummer = teachingPeriodCode.match(/SUMMER/)
        const isSpecialTeachingPeriod = isSummer || isWinter
        return (
            <div style={{
                minWidth: 150,
                minHeight: 120,
                maxHeight: 120,
                flexGrow: 0,
                background: isSummer ? "#ff9a53" : isWinter ? "#c2ecff" : "#ffffff",
                display:"flex",
                alignItems:"center"
            }}>
                <div style={{padding: 16, userSelect: "none", overflow: "hidden", fontSize: 13,verticalAlign:"middle"}}>
                    {getTeachingPeriodString(teachingPeriodCode)}<br/>
                    Total Credits: {totalCredits}<br/>
                    {(isFirst || isLast || isSpecialTeachingPeriod) &&
                    <button onClick={() => removeTeachingPeriodByTeachingPeriodCode(teachingPeriodCode)}>
                        Remove</button>}<br/>
                    {!isFirst && !isLast &&
                    <button
                        onClick={() => setIsDeferTeachingPeriodByTeachingPeriodCode(teachingPeriodCode, !isDeferred)}>
                        Defer</button>}<br/>
                </div>
            </div>
        )
    }
}

export default connect(null, {
    removeTeachingPeriodByTeachingPeriodCode,
    setIsDeferTeachingPeriodByTeachingPeriodCode
})(TeachingPeriodHeader)