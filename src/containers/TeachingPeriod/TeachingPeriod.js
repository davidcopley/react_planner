import React from "react"
import {connect} from "react-redux"
import TeachingPeriodHeader from "./TeachingPeriodHeader"
import Unit from "../Unit/Unit"
import EmptyUnit from "../Unit/EmptyUnit"
import PlaceholderUnit from "../Unit/Placeholder"
import DeferredUnit from "../Unit/DeferredUnit"
import {addTeachingPeriod} from "../../actionCreators/planActions"
import {
    getNextSpecialTeachingPeriodKey,
    getTeachingPeriodString,
    getPrevTeachingPeriodKey,
    getPrevGeneralTeachingPeriodKey
} from "../../tools/teachingPeriodKeys"
import {FlatButton} from "material-ui"
import {
    getTeachingPeriodByTeachingPeriodCode,
    getTeachingPeriodCreditsByTeachingPeriodCode,
    getTeachingPeriods,
} from "../../selectors/planTeachingPeriodSelectors"
import {getUnits} from "../../selectors/unitsDatabaseSelectors"

const renderUnits = (props, totalCredits) => {
    const {teachingPeriod, teachingPeriodCode, isFirst, isLast} = props
    let {units, unitsPlaceholders, isDeferred} = teachingPeriod
    isDeferred = isDeferred && !isFirst && !isLast
    let numPlaceholderUnits = unitsPlaceholders ? unitsPlaceholders.length : 0
    let numNullPlaceholderUnits = unitsPlaceholders ? unitsPlaceholders.filter(ph=>ph.unitCode===null).length : 0
    let unitsArray
    if (isDeferred) {
        return [<DeferredUnit key={`${teachingPeriodCode}DeferredUnit`}/>]
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
        let indexCounter = unitsArray.length
        const emptyUnits = (24 - totalCredits - (numNullPlaceholderUnits * 6)) / 6;
        if (emptyUnits > 0) {
            for (let i = 0; i < emptyUnits; i++) {
                unitsArray.push(
                    <EmptyUnit
                        isDeferred={isDeferred}
                        index={indexCounter}
                        teachingPeriodCode={teachingPeriodCode}
                        key={`emptyUnit${i}`}
                    />
                )
                indexCounter += 1
            }
        }
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

    return (
        <div style={{display: "flex", minWidth: 800, maxWidth: 800}}>
            {unitsArray}
        </div>
    )
}
const TeachingPeriod = props => {
    //extract my teaching period from redux by teaching period code
    const {teachingPeriods, teachingPeriod, teachingPeriodCredits, teachingPeriodCode, isFirst, isLast, addTeachingPeriod} = props
    let isDeferred = teachingPeriod["isDeferred"]
    isDeferred = isDeferred && !isFirst && !isLast
    const isSpecial = teachingPeriodCode.match(/WINTER|SUMMER/)
    const nextSpecialTeachingPeriodKey = getNextSpecialTeachingPeriodKey(teachingPeriodCode)
    const prevTeachingPeriod = getPrevTeachingPeriodKey(teachingPeriodCode)
    const prevGeneralTeachingPeriod = getPrevGeneralTeachingPeriodKey(teachingPeriodCode)
    const shouldShowAddSpecialTeachingPeriod = !(nextSpecialTeachingPeriodKey in teachingPeriods)
    return (
        <span>
                {isFirst &&
                <span>
                    {!isSpecial &&
                        <FlatButton
                            fullWidth
                            style={{fontSize: 13, zIndex: 0, borderTop: "1px solid #dddddd"}}
                            onClick={() => addTeachingPeriod(prevGeneralTeachingPeriod)}>Add {getTeachingPeriodString(prevGeneralTeachingPeriod)}
                        </FlatButton>
                    }
                    <FlatButton
                    fullWidth
                    style={{fontSize: 13, zIndex: 0, borderTop: "1px solid #dddddd"}}
                    onClick={() => addTeachingPeriod(prevTeachingPeriod)}>Add {getTeachingPeriodString(prevTeachingPeriod)}
                    </FlatButton>
                </span>
                }
            <div id={teachingPeriodCode}
                 style={{
                     display: "flex",
                     width: "100%",
                     justifyContent: "center",
                     borderBottom: "1px solid #dddddd",
                     borderTop: "1px solid #dddddd",
                     minHeight: 124,
                     maxHeight: 124
                 }}>

                <TeachingPeriodHeader
                    isFirst={isFirst}
                    isLast={isLast}
                    isDeferred={isDeferred}
                    totalCredits={teachingPeriodCredits}
                    teachingPeriodCode={teachingPeriodCode}
                    key={teachingPeriodCode}
                />
                {renderUnits(props, teachingPeriodCredits)}
            </div>
            {shouldShowAddSpecialTeachingPeriod && nextSpecialTeachingPeriodKey &&
            <FlatButton
                fullWidth
                style={{fontSize: 13, zIndex: 0}}
                onClick={() => addTeachingPeriod(nextSpecialTeachingPeriodKey)}>Add {getTeachingPeriodString(nextSpecialTeachingPeriodKey)}</FlatButton>
            }
            </span>
    )

}

const mapStateToProps = (state, props) => ({
    teachingPeriod: getTeachingPeriodByTeachingPeriodCode(state, props),
    teachingPeriodCredits: getTeachingPeriodCreditsByTeachingPeriodCode(state, props),
    teachingPeriods: getTeachingPeriods(state),
    units: getUnits(state)
})

export default connect(mapStateToProps, {addTeachingPeriod})(TeachingPeriod)