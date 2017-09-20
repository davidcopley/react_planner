import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {DragSource} from "react-dnd"
import {setDragSource} from "../../actionCreators/dragAndDropActions"
import {moveUnit, removeUnit} from "../../actionCreators/planActions"
import "./UnitsMenuUnit.css"
import {getUnitByUnitCode} from "../../selectors/unitsDatabaseSelectors"
const UnitSourceDrag = {
    beginDrag(props, monitor, component){
        const {setDragSource, unit, unitCode,} = props
        const {credit} = unit
        setDragSource({isUnitsMenuUnit: true, unitCode})
        return {
            isUnitsMenuUnit: true,
            unitCode,
            credit
        }
    }
}

const collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
    };
}

const UnitsMenuUnit = props => {
    const {unit, unitCode} = props
    const {credit, name} = unit
    const {connectDragSource} = props;
    return connectDragSource(
        <div
            className="units-menu-unit"
            style={{
                minHeight: 100,
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
                background: "white",
                flexGrow: 1,
                alignItems: "center"
            }}>
            <div style={{padding: 10, userSelect: "none", overflow: "hidden"}}>
                {unitCode}<br/>
                {name}<br/>
                Credits: {credit}<br/>
            </div>
        </div>
    )

}

const mapStateToProps = (state, props) => {
    return {
        unit: getUnitByUnitCode(state, props),
        duplicateUnits: state.unitValidationReducer.duplicateUnits
    }
}

export default compose(connect(mapStateToProps, {
    setDragSource,
    moveUnit,
    removeUnit
}), DragSource("Unit", UnitSourceDrag, collectDrag))(UnitsMenuUnit)