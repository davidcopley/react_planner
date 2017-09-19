import React from "react"
import {connect} from "react-redux"
import {
    removeTeachingPeriodByTeachingPeriodCode,
    setIsDeferTeachingPeriodByTeachingPeriodCode
} from "../../actionCreators/planActions"
import {getTeachingPeriodString} from "../../tools/teachingPeriodKeys"
import {IconButton} from "material-ui"
import Close from "material-ui/svg-icons/navigation/close"
import Defer from "material-ui/svg-icons/av/fast-forward"
import Undefer from "material-ui/svg-icons/av/fast-rewind"

class TeachingPeriodHeader extends React.Component {
    render() {
        const {teachingPeriodCode, totalCredits, removeTeachingPeriodByTeachingPeriodCode, isDeferred, setIsDeferTeachingPeriodByTeachingPeriodCode, isFirst, isLast} = this.props
        const isWinter = teachingPeriodCode.match(/WINTER/)
        const isSummer = teachingPeriodCode.match(/SUMMER/)
        const isSpecialTeachingPeriod = isSummer || isWinter
        return (
            <div style={{
                minWidth: 180,
                maxWidth: 180,
                minHeight: 120,
                maxHeight: 120,
                flexGrow: 0,
                display:"flex",
                alignItems:"center"
            }}>
                <div style={{padding: 16, userSelect: "none", overflow: "hidden", fontSize: 13,verticalAlign:"middle"}}>
                    <div style={{display:"flex",overflow:"hidden",alignItems:"center"}}>
                        <div style={{overflow:"hidden"}}>{getTeachingPeriodString(teachingPeriodCode)}</div>
                    {(isFirst || isLast || isSpecialTeachingPeriod) &&
                    <IconButton iconStyle={{height:18,width:18}} style={{padding:0,marginLeft:10,width:18,height:18,zIndex:0}} onClick={() => removeTeachingPeriodByTeachingPeriodCode(teachingPeriodCode)}>
                        <Close/>
                    </IconButton>}
                    {!isFirst && !isLast &&
                    <IconButton iconStyle={{height:18,width:18}} style={{padding:0,marginLeft:10,width:18,height:18,zIndex:0}}
                                onClick={() => setIsDeferTeachingPeriodByTeachingPeriodCode(teachingPeriodCode, !isDeferred)}>
                        {isDeferred?<Undefer/>:<Defer/>}</IconButton>}
                    </div>
                    <br/>Total Credits: {totalCredits}

                </div>
            </div>
        )
    }
}

export default connect(null, {
    removeTeachingPeriodByTeachingPeriodCode,
    setIsDeferTeachingPeriodByTeachingPeriodCode
})(TeachingPeriodHeader)