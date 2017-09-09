import React from "react"
import {connect} from "react-redux"
import TeachingPeriodHeader from "./TeachingPeriodHeader"
import Unit from "../Unit/Unit"
import EmptyUnit from "../Unit/EmptyUnit"
import unsubscribe from  "../../subscribers/planTeachingPeriodSubscriber"

class TeachingPeriod extends React.Component {

    calculateTotalCredits = unitsCodes => {
        const {units} = this.props
        return unitsCodes.reduce((totalCredits, unitCode) => units[unitCode]["credit"] + totalCredits, 0)
    }
    renderUnits = () => {


        const calculateTeachingPeriodUnitWidth = (unitsCodes, units, totalCredits) => {
            let unitWidth = 0
            if (totalCredits < 24) {
                unitWidth = 800 / (24 / 6)
            } else {
                unitWidth = 800 / (totalCredits / 6)
            }
            return unitWidth
        }

        const {teachingPeriods, teachingPeriodCode, units, isFirst, isLast} = this.props
        const myTeachingPeriod = teachingPeriods[teachingPeriodCode]
        let unitsCodes = myTeachingPeriod["units"]
        let isDeferred = myTeachingPeriod["isDeferred"]
        isDeferred = isDeferred && !isFirst && !isLast
        let totalCredits = this.calculateTotalCredits(unitsCodes)
        let unitWidth = calculateTeachingPeriodUnitWidth(unitsCodes, units, totalCredits)
        let unitsArray = unitsCodes.map((unitCode, i) => <Unit className="unit" key={`unit${unitCode}${teachingPeriodCode}${i}`} index={i}
                                                               teachingPeriodCode={teachingPeriodCode}  isDeferred={isDeferred}
                                                               unitCode={unitCode} unitWidth={unitWidth} teachingPeriodTotalCredits={totalCredits}/>)
        const emptyUnits = (24 - totalCredits) / 6;
        if (emptyUnits > 0) {
            for (let i = 0; i < emptyUnits; i++) {
                unitsArray.push(<EmptyUnit className="unit" isDeferred={isDeferred} index={i} teachingPeriodCode={teachingPeriodCode}  key={`emptyUnit${i}`} unitWidth={unitWidth}/>)
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
        const {teachingPeriods, teachingPeriodCode,isFirst,isLast} = this.props
        const myTeachingPeriod = teachingPeriods[teachingPeriodCode]
        let unitsCodes = myTeachingPeriod["units"]
        let isDeferred = myTeachingPeriod["isDeferred"]
        isDeferred = isDeferred && !isFirst && !isLast
        let totalCredits = this.calculateTotalCredits(unitsCodes)
        return (
            <div id={teachingPeriodCode} style={{display: "flex",background:isDeferred?"#cfb4aa":"white",width:"100%"}}>
                <TeachingPeriodHeader isFirst={isFirst} isLast={isLast} isDeferred={isDeferred} totalCredits={totalCredits} teachingPeriodCode={teachingPeriodCode}/>
                {this.renderUnits()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    teachingPeriods: state.planTeachingPeriodReducer.teachingPeriods,
    units: state.unitDatabaseReducer.units
})

export default connect(mapStateToProps)(TeachingPeriod)