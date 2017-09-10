import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {DragSource} from "react-dnd"
import {setDragSource} from "../../actionCreators/dragAndDropActions"
import {moveUnit, removeUnit} from "../../actionCreators/planActions"
import "./UnitsMenuUnit.css"
const UnitSourceDrag = {
    beginDrag(props, monitor, component){
        const {setDragSource, units, unitCode,} = props
        const myUnit = units[unitCode]
        const myUnitCredit = myUnit["credit"]
        setDragSource({isUnitsMenuUnit: true, unitCode})
        return {
            isUnitsMenuUnit: true,
            unitCode,
            myUnitCredit
        }
    }
}

const collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
    };
}

class UnitsMenuUnit extends React.Component {
    render() {
        const {units, unitCode} = this.props
        const myUnit = units[unitCode]
        const myUnitCredit = myUnit["credit"]
        const {connectDragSource} = this.props;
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
                    {myUnit.name}<br/>
                    Credits: {myUnitCredit}<br/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {units: state.unitDatabaseReducer.units, duplicateUnits: state.unitValidationReducer.duplicateUnits}
}

export default compose(connect(mapStateToProps, {
    setDragSource,
    moveUnit,
    removeUnit
}), DragSource("Unit", UnitSourceDrag, collectDrag))(UnitsMenuUnit)