import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {DragSource, DropTarget} from "react-dnd"
import {setDragSource} from "../../actionCreators/dragAndDropActions"
import {moveUnit, removeUnit, insertUnit} from "../../actionCreators/planActions"
import {facultyColors, facultyFontColorMap} from "../../constants/colors"
import {IconButton} from "material-ui"
import Close from "material-ui/svg-icons/navigation/close"
import "./Unit.css"
import {getUnitByUnitCode} from "../../selectors/unitsDatabaseSelectors"
const UnitSourceDrag = {
    beginDrag(props, monitor, component){
        const {teachingPeriodCode, index, setDragSource, unit, unitCode,} = props
        const {credit} = unit
        setDragSource({teachingPeriodCode, index, unitCode})
        return {
            teachingPeriodCode,
            index,
            credit
        }
    },
    isDragging(props,monitor){
        return true
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
        const unit = monitor.getItem()
        const {teachingPeriodTotalCredits, isDeferred} = props
        const {credit} = unit
        //if teaching periods can contain extra credits, and teaching period is not deferred
        return (credit + teachingPeriodTotalCredits) <= 36 && !isDeferred
    }
}

const collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging:monitor.isDragging()
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
        const {unit, unitCode, teachingPeriodCode, duplicateUnits, invalidTimeslotUnits} = this.props
        const {credit,faculty,name} = unit
        const isDuplicate = duplicateUnits[unitCode]
        const isInvalidTimeslot = invalidTimeslotUnits[teachingPeriodCode] && invalidTimeslotUnits[teachingPeriodCode][unitCode]
        const {connectDragSource, connectDropTarget, isHovering, canDrop, removeUnit, index,isDragging} = this.props;
        return compose(connectDragSource, connectDropTarget)(
            <div
                className="unit"
                style={{
                    minHeight: 120,
                    maxHeight: 120,
                    border: "2px solid #ffffff",
                    borderLeft: isHovering ? "5px solid red" : undefined,
                    background: isDuplicate ? "#ff5648" : isInvalidTimeslot ? "#f606ff" : facultyColors[faculty] ? facultyColors[faculty] : "#f3f3f3",
                    opacity: isDragging&&canDrop ? 1:isDragging&&!canDrop? 0.1:1 ,
                    flexGrow: 1,
                    flex:credit||6,
                    alignItems: "center",
                    color: facultyFontColorMap[faculty],
                }}>
                <div style={{padding: 16, userSelect: "none", overflow: "hidden", fontSize: 13,height:88,position:"relative"}}>
                    {unitCode}<br/>
                    {name}<br/>
                    Credits: {credit}<br style={{marginBottom:"auto"}}/>
                    <IconButton
                        style={{position:"absolute",top:-8,right:-8,zIndex:0}}
                        iconStyle={{height:18,width:18,fill:facultyFontColorMap[faculty]}}
                        onClick={() => removeUnit(index, teachingPeriodCode)}
                    >
                        <Close/>
                    </IconButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        unit: getUnitByUnitCode(state,props),
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