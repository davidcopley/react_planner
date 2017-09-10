import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {DragSource} from "react-dnd"
import {setDragSource} from "../../actionCreators/dragAndDropActions"
import {moveUnit,removeUnit} from "../../actionCreators/planActions"
const UnitSourceDrag = {
    beginDrag(props, monitor, component){
        const {setDragSource, units, unitCode,} = props
        const myUnit = units[unitCode]
        const myUnitCredit = myUnit["credit"]
        setDragSource({isUnitsMenuUnit:true,unitCode})
        return {
            isUnitsMenuUnit:true,
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
        const {units, unitCode, unitWidth,duplicateUnits} = this.props
        const myUnit = units[unitCode]
        const myUnitCredit = myUnit["credit"]
        const myUnitWidth = unitWidth * (myUnitCredit / 6)
        const myUnitIsDuplicate = duplicateUnits[unitCode]
        const {connectDragSource, isHovering, canDrop,removeUnit,teachingPeriodCode, index } = this.props;
        return connectDragSource(
            <div style={{
                minHeight: 100,
                minWidth: myUnitWidth,
                maxWidth: myUnitWidth,
                border: "1px solid black",
                borderLeft:isHovering?"5px solid red":"1px solid black",
                background:canDrop?"#d9ffcd":myUnitIsDuplicate?"red":"white",
                flexGrow: 1,
                alignItems: "center"
            }}>
                <div style={{padding: 10, userSelect: "none",overflow:"hidden"}}>
                    {unitCode}<br/>
                    {myUnit.name}<br/>
                    Credits: {myUnitCredit}<br/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {units: state.unitDatabaseReducer.units,duplicateUnits:state.unitValidationReducer.duplicateUnits}
}

export default compose(connect(mapStateToProps,{setDragSource,moveUnit,removeUnit}),DragSource("Unit",UnitSourceDrag,collectDrag))(UnitsMenuUnit)