import React from "react"
import {connect} from "react-redux"
import TeachingPeriodHeader from "./TeachingPeriodHeader"
import Unit from "../Unit/Unit"
import EmptyUnit from "../Unit/EmptyUnit"

class TeachingPeriod extends React.Component {

    calculateTotalCredits = unitsCodes => {
        const {units} = this.props
        const totalCredits = unitsCodes.reduce((totalCredits, unitCode) => units[unitCode]["credit"] + totalCredits, 0)
        return totalCredits
    }
    renderUnits = () => {


        const calculateTeachingPeriodUnitWidth = (unitsCodes, units, totalCredits) => {
            let unitWidth = 0
            if (totalCredits < 24) {
                unitWidth = 850 / (24 / 6)
            } else {
                unitWidth = 850 / (totalCredits / 6)
            }
            return unitWidth
        }

        const {teachingPeriods, teachingPeriodCode, units} = this.props
        const myTeachingPeriod = teachingPeriods[teachingPeriodCode]
        let unitsCodes = myTeachingPeriod["units"]
        let totalCredits = this.calculateTotalCredits(unitsCodes)
        let unitWidth = calculateTeachingPeriodUnitWidth(unitsCodes, units, totalCredits)
        let unitsArray = unitsCodes.map((unitCode, i) => <Unit className="unit" key={`unit${unitCode}${teachingPeriodCode}${i}`} index={i}
                                                               teachingPeriodCode={teachingPeriodCode}
                                                               unitCode={unitCode} unitWidth={unitWidth} teachingPeriodTotalCredits={totalCredits}/>)
        const emptyUnits = (24 - totalCredits) / 6;
        if (emptyUnits > 0) {
            for (let i = 0; i < emptyUnits; i++) {
                unitsArray.push(<EmptyUnit index={i} teachingPeriodCode={teachingPeriodCode}  key={`emptyUnit${i}`} unitWidth={unitWidth}/>)
            }
        }
        return (
            <div ref={this.sortableGroupDecorator} style={{display: "flex", minWidth: 850, maxWidth: 850, padding: 10}}>
                {unitsArray}
            </div>
        )
    }

    render() {
        console.log("TEACHING PERIOD RENDER")
        //extract my teaching period from redux by teaching period code
        const {teachingPeriods, teachingPeriodCode, units} = this.props
        const myTeachingPeriod = teachingPeriods[teachingPeriodCode]
        let unitsCodes = myTeachingPeriod["units"]
        let totalCredits = this.calculateTotalCredits(unitsCodes)
        return (
            <div id={teachingPeriodCode} style={{display: "flex"}}>
                <TeachingPeriodHeader totalCredits={totalCredits} teachingPeriodCode={teachingPeriodCode}/>
                {this.renderUnits()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    teachingPeriods: state.planTeachingPeriodReducer.teachingPeriods,
    units: state.planUnitsReducer.units
})

export default connect(mapStateToProps)(TeachingPeriod)