import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {DragSource, DropTarget} from "react-dnd"
import {setDragSource} from "../../actionCreators/dragAndDropActions"
import {moveUnit, removeUnit, insertUnit} from "../../actionCreators/planActions"
import {facultyColors,facultyFontColorMap} from "../../constants/colors"
import "./Unit.css"
const UnitSourceDrag = {
    beginDrag(props, monitor, component){
        const {teachingPeriodCode, index, setDragSource, units, unitCode,} = props
        const myUnit = units[unitCode]
        const myUnitCredit = myUnit["credit"]
        setDragSource({teachingPeriodCode, index,unitCode})
        return {
            teachingPeriodCode,
            index,
            myUnitCredit
        }
    }
}
const UnitTargetDrop = {
    drop(props, monitor, component){
        const {teachingPeriodCode, index, dragSource, moveUnit, insertUnit} = props
        if (dragSource.isUnitsMenuUnit) {
            insertUnit(dragSource.unitCode, index, teachingPeriodCode)
        } else {
            //on drop, move unit from index of teaching period to index of other teaching period
            moveUnit(dragSource.index, dragSource.teachingPeriodCode, index, teachingPeriodCode)
        }
    },
    hover(props, monitor, component){

    },
    canDrop(props, monitor){
        const item = monitor.getItem()
        const {teachingPeriodTotalCredits, isDeferred} = props
        const {myUnitCredit} = item
        //if teaching periods can contain extra credits, and teaching period is not deferred
        return (myUnitCredit + teachingPeriodTotalCredits) <= 36 && !isDeferred
    }
}

const collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
    };
}

const collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isHovering: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

class Unit extends React.Component {
    render() {
        const {units, unitCode, unitWidth, teachingPeriodCode, duplicateUnits, invalidTimeslotUnits} = this.props
        const myUnit = units[unitCode]
        const myUnitCredit = myUnit["credit"]
        const {faculty} = myUnit
        let widthUnit;
        if(myUnitCredit===0){
            widthUnit = 1
        }else{
            widthUnit = (myUnitCredit / 6)
        }
        const myUnitWidth = unitWidth * widthUnit
        const myUnitIsDuplicate = duplicateUnits[unitCode]
        const myUnitIsInvalidTimeslot = invalidTimeslotUnits[teachingPeriodCode]&&invalidTimeslotUnits[teachingPeriodCode][unitCode]
        const {connectDragSource, connectDropTarget, isHovering, canDrop, removeUnit, index} = this.props;
        return compose(connectDragSource, connectDropTarget)(
            <div
                className="unit"
                style={{
                    minHeight: 100,
                    minWidth: myUnitWidth,
                    maxWidth: myUnitWidth,
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
                    borderLeft: isHovering ? "5px solid red" : undefined,
                    background: canDrop ? "#d9ffcd" : myUnitIsDuplicate ? "#ff5648" :myUnitIsInvalidTimeslot? "#f606ff": facultyColors[faculty],
                    flexGrow: 1,
                    alignItems: "center",
                    color:facultyFontColorMap[faculty]
                }}>
                <div style={{padding: 10, userSelect: "none", overflow: "hidden"}}>
                    {unitCode}<br/>
                    {myUnit.name}<br/>
                    Credits: {myUnitCredit}<br/>
                    <button  onClick={() => removeUnit(index, teachingPeriodCode)}>Remove</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        units: state.unitDatabaseReducer.units,
        dragSource: state.dragAndDropReducer.dragSource,
        duplicateUnits: state.unitValidationReducer.duplicateUnits,
        invalidTimeslotUnits: state.unitValidationReducer.invalidTimeslotUnits
    }
}

export default compose(connect(mapStateToProps, {
    setDragSource,
    moveUnit,
    removeUnit,
    insertUnit
}), DragSource("Unit", UnitSourceDrag, collectDrag), DropTarget("Unit", UnitTargetDrop, collectDrop))(Unit)