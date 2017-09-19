import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {DropTarget} from "react-dnd"
import {removeUnit, addUnitCodeToPlaceholder, removeUnitFromPlaceholder} from "../../actionCreators/planActions"
import {setIsUnitsMenuOpen} from "../../actionCreators/menuActions"
import {getUnits} from "../../selectors/unitsDatabaseSelectors"
import Unit from "../Unit/Unit"
import "./EmptyUnit.css"
const PlaceholderUnitTargetDrop = {
    drop(props, monitor, component){
        const {teachingPeriodCode, dragSource, removeUnit, addUnitCodeToPlaceholder, index} = props
        if (dragSource.isUnitsMenuUnit) {
            addUnitCodeToPlaceholder(dragSource.unitCode, index, teachingPeriodCode)
        } else {
            removeUnit(dragSource.index, dragSource.teachingPeriodCode)
            addUnitCodeToPlaceholder(dragSource.unitCode, index, teachingPeriodCode)
        }
    },
    hover(props, monitor, component){

    },
    canDrop(props, monitor){
        const {isDeferred, placeholder} = props
        const {unitCode} = placeholder
        return !isDeferred && (unitCode === null)
    }
}

const collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isHovering: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

class PlaceholderUnit extends React.Component {

    render() {
        const {connectDropTarget, isHovering, canDrop, removeUnitFromPlaceholder, placeholder, index, teachingPeriodCode, units} = this.props
        const {placeholderText, unitCode} = placeholder
        return (compose(connectDropTarget)(
            <div className={"empty-unit"} style={{
                minHeight: 120,
                maxHeight: 120,
                border: isHovering ? "2px solid red" : "2px solid #ffffff",
                flexGrow: 1,
                flex:6,
                userSelect: "none",
                background: canDrop ? "#adff6d" : "#eef2ff",
            }}>
                <div style={{padding: 16, userSelect: "none", overflow: "hidden", height: "100%"}}>
                    <span style={{fontSize: 13}}>{placeholderText}</span><br/>
                    {unitCode}<br/>
                    {unitCode &&
                    <button onClick={() => removeUnitFromPlaceholder(index, teachingPeriodCode)}>Remove unit</button>}
                </div>
            </div>
        ))
    }
}

const mapStateToProps = state => {
    return {
        dragSource: state.dragAndDropReducer.dragSource,
        units: getUnits(state)
    }
}

export default compose(connect(mapStateToProps, {
    removeUnit,
    setIsUnitsMenuOpen,
    removeUnitFromPlaceholder,
    addUnitCodeToPlaceholder
}), DropTarget("Unit", PlaceholderUnitTargetDrop, collectDrop))(PlaceholderUnit)