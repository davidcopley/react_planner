import React from "react"
import {connect} from "react-redux"
import TeachingPeriodHeader from "./TeachingPeriodHeader"
import Unit from "../Unit/Unit"
import EmptyUnit from "../Unit/EmptyUnit"
import PlaceholderUnit from "../Unit/PlaceholderUnit"
import {addTeachingPeriod} from "../../actionCreators/planActions"
import {getNextSpecialTeachingPeriodKey,getPrevSpecialTeachingPeriodKey} from "../../tools/teachingPeriodKeys"


class TeachingPeriod extends React.Component {
    calculateTeachingPeriodUnitWidth = totalCredits => {
        let unitWidth = 0
        if (totalCredits < 24) {
            unitWidth = 800 / (24 / 6)
        } else {
            unitWidth = 800 / (totalCredits / 6)
        }
        return unitWidth
    }
    renderUnits = totalCredits => {
        const {teachingPeriods, teachingPeriodCode, isFirst, isLast} = this.props
        const myTeachingPeriod = teachingPeriods[teachingPeriodCode]
        let {units,unitsPlaceholders, isDeferred} = myTeachingPeriod
        isDeferred = isDeferred && !isFirst && !isLast
        let numPlaceholderUnits = unitsPlaceholders?unitsPlaceholders.length:0
        let unitWidth = this.calculateTeachingPeriodUnitWidth(totalCredits+numPlaceholderUnits*6)
        let unitsArray
        if (isDeferred) {
            unitsArray = []
        } else {
            unitsArray = units.map((unitCode, i) =>
                <Unit
                    key={`unit${unitCode}${teachingPeriodCode}${i}`}
                    index={i}
                    teachingPeriodCode={teachingPeriodCode}
                    isDeferred={isDeferred}
                    unitCode={unitCode}
                    unitWidth={unitWidth}
                    teachingPeriodTotalCredits={totalCredits}
                />
            )
            let placeholderUnitsArray = []
            if(numPlaceholderUnits) {
                placeholderUnitsArray = unitsPlaceholders.map((placeholder, i) =>
                    <PlaceholderUnit
                        key={`unitiPlaceHolder${placeholder["placeholderText"]}${i}`}
                        teachingPeriodCode={teachingPeriodCode}
                        index={i}
                        unitWidth={unitWidth}
                        placeholder={placeholder}
                    />
                )
            }
            unitsArray = unitsArray.concat(placeholderUnitsArray)
        }
        const emptyUnits = (24 - totalCredits - (numPlaceholderUnits*6)) / 6;
        if (emptyUnits > 0) {
            for (let i = 0; i < emptyUnits; i++) {
                unitsArray.push(
                    <EmptyUnit
                        isDeferred={isDeferred}
                        index={i}
                        teachingPeriodCode={teachingPeriodCode}
                        key={`emptyUnit${i}`}
                        unitWidth={unitWidth}
                    />
                )
            }
        }
        return (
            <div className="unit-container" style={{padding: 10}}>
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
        const isSpecial = teachingPeriodCode.match(/SUMMER/)||teachingPeriodCode.match(/WINTER/)
        const nextSpecialTeachingPeriodKey = getNextSpecialTeachingPeriodKey(teachingPeriodCode)
        let prevSpecialTeachingPeriodKey
        let shouldShowAddPrevSpecialTeachingPeriod = false
        if(isFirst){
            prevSpecialTeachingPeriodKey = getPrevSpecialTeachingPeriodKey(teachingPeriodCode)
            shouldShowAddPrevSpecialTeachingPeriod = !(prevSpecialTeachingPeriodKey in teachingPeriods)
        }
        const shouldShowAddSpecialTeachingPeriod = !(nextSpecialTeachingPeriodKey in teachingPeriods)
        return (
            <span>
                {!isSpecial&&isFirst&&shouldShowAddPrevSpecialTeachingPeriod&& <button onClick={()=>addTeachingPeriod(prevSpecialTeachingPeriodKey)}>Add {prevSpecialTeachingPeriodKey}</button>}
            <div id={teachingPeriodCode}
                 style={{display: "flex", background: isDeferred ? "#7100ff" : "white", width: "100%"}}>
                <TeachingPeriodHeader
                    isFirst={isFirst}
                    isLast={isLast}
                    isDeferred={isDeferred}
                    totalCredits={totalCredits}
                    teachingPeriodCode={teachingPeriodCode}
                />
                {this.renderUnits(totalCredits)}
            </div>
                {shouldShowAddSpecialTeachingPeriod&&nextSpecialTeachingPeriodKey&&<button onClick={()=>addTeachingPeriod(nextSpecialTeachingPeriodKey)}>Add {nextSpecialTeachingPeriodKey}</button>}
            </span>
        )
    }
}

const mapStateToProps = state => ({
    teachingPeriods: state.planTeachingPeriodReducer.teachingPeriods,
    teachingPeriodsCredits: state.planTeachingPeriodReducer.teachingPeriodsCredits,
    units: state.unitDatabaseReducer.units
})

export default connect(mapStateToProps,{addTeachingPeriod})(TeachingPeriod)