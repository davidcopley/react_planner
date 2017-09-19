import React from "react"
import {connect} from "react-redux"
import TeachingPeriodHeader from "./TeachingPeriodHeader"
import Unit from "../Unit/Unit"
import EmptyUnit from "../Unit/EmptyUnit"
import PlaceholderUnit from "../Unit/Placeholder"
import DeferredUnit from "../Unit/DeferredUnit"
import {addTeachingPeriod} from "../../actionCreators/planActions"
import {getNextSpecialTeachingPeriodKey, getPrevSpecialTeachingPeriodKey, getTeachingPeriodString} from "../../tools/teachingPeriodKeys"
import {FlatButton} from "material-ui"

class TeachingPeriod extends React.Component {
    renderUnits = totalCredits => {
        const {teachingPeriods, teachingPeriodCode, isFirst, isLast} = this.props
        const myTeachingPeriod = teachingPeriods[teachingPeriodCode]
        let {units, unitsPlaceholders, isDeferred} = myTeachingPeriod
        isDeferred = isDeferred && !isFirst && !isLast
        let numPlaceholderUnits = unitsPlaceholders ? unitsPlaceholders.length : 0
        let unitsArray
        if (isDeferred) {
            unitsArray =  []
        } else {
            unitsArray = units.map((unitCode, i) =>
                <Unit
                    key={`unit${unitCode}${teachingPeriodCode}${i}`}
                    index={i}
                    teachingPeriodCode={teachingPeriodCode}
                    isDeferred={isDeferred}
                    unitCode={unitCode}
                    teachingPeriodTotalCredits={totalCredits}
                />
            )
            let placeholderUnitsArray = []
            if (numPlaceholderUnits) {
                placeholderUnitsArray = unitsPlaceholders.map((placeholder, i) =>
                    <PlaceholderUnit
                        key={`unitiPlaceHolder${placeholder["placeholderText"]}${i}`}
                        teachingPeriodCode={teachingPeriodCode}
                        index={i}
                        placeholder={placeholder}
                    />
                )
            }
            unitsArray = unitsArray.concat(placeholderUnitsArray)
        }
        const emptyUnits = (24 - totalCredits - (numPlaceholderUnits * 6)) / 6;
        if (emptyUnits > 0) {
            for (let i = 0; i < emptyUnits; i++) {
                unitsArray.push(
                    <EmptyUnit
                        isDeferred={isDeferred}
                        index={i}
                        teachingPeriodCode={teachingPeriodCode}
                        key={`emptyUnit${i}`}
                    />
                )
            }
        }
        return (
            <div style={{display: "flex",minWidth:800,maxWidth:800}}>
                {unitsArray}
            </div>
        )
    }

    render() {
        //extract my teaching period from redux by teaching period code
        const {teachingPeriods, teachingPeriodsCredits, teachingPeriodCode, isFirst, isLast, addTeachingPeriod} = this.props
        const myTeachingPeriod = teachingPeriods[teachingPeriodCode]
        const myTeachingPeriodsCredits = teachingPeriodsCredits[teachingPeriodCode]
        const totalCredits = myTeachingPeriodsCredits
        let isDeferred = myTeachingPeriod["isDeferred"]
        isDeferred = isDeferred && !isFirst && !isLast
        const isSpecial = teachingPeriodCode.match(/SUMMER/) || teachingPeriodCode.match(/WINTER/)
        const nextSpecialTeachingPeriodKey = getNextSpecialTeachingPeriodKey(teachingPeriodCode)
        let prevSpecialTeachingPeriodKey
        let shouldShowAddPrevSpecialTeachingPeriod = false
        if (isFirst) {
            prevSpecialTeachingPeriodKey = getPrevSpecialTeachingPeriodKey(teachingPeriodCode)
            shouldShowAddPrevSpecialTeachingPeriod = !(prevSpecialTeachingPeriodKey in teachingPeriods)
        }
        const shouldShowAddSpecialTeachingPeriod = !(nextSpecialTeachingPeriodKey in teachingPeriods)
        return (
            <span>
                {!isSpecial && isFirst && shouldShowAddPrevSpecialTeachingPeriod &&
                <FlatButton
                    fullWidth
                    style={{fontSize:13}}
                    onClick={() => addTeachingPeriod(prevSpecialTeachingPeriodKey)}>Add {getTeachingPeriodString(prevSpecialTeachingPeriodKey)}</FlatButton>
                }
                <div id={teachingPeriodCode}
                     style={{
                         display: "flex",
                         width: "100%",
                         justifyContent: "center",
                         borderBottom: "1px solid #dddddd",
                         borderTop: "1px solid #dddddd",
                     }}>

                <TeachingPeriodHeader
                    isFirst={isFirst}
                    isLast={isLast}
                    isDeferred={isDeferred}
                    totalCredits={totalCredits}
                    teachingPeriodCode={teachingPeriodCode}
                />
                    {this.renderUnits(totalCredits)}
            </div>
                {shouldShowAddSpecialTeachingPeriod && nextSpecialTeachingPeriodKey &&
                <FlatButton
                    fullWidth
                    style={{fontSize:13}}
                    onClick={() => addTeachingPeriod(nextSpecialTeachingPeriodKey)}>Add {getTeachingPeriodString(nextSpecialTeachingPeriodKey)}</FlatButton>
                }
            </span>
        )
    }
}

const mapStateToProps = state => ({
    teachingPeriods: state.planTeachingPeriodReducer.teachingPeriods,
    teachingPeriodsCredits: state.planTeachingPeriodReducer.teachingPeriodsCredits,
    units: state.unitDatabaseReducer.units
})

export default connect(mapStateToProps, {addTeachingPeriod})(TeachingPeriod)