import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {DragSource, DropTarget} from "react-dnd"
import {setDragSource} from "../../actionCreators/dragAndDropActions"
import {moveUnit,removeUnit, insertUnit} from "../../actionCreators/planActions"
const UnitSourceDrag = {
    beginDrag(props, monitor, component){
        const {teachingPeriodCode, index,setDragSource, units, unitCode,} = props
        const myUnit = units[unitCode]
        const myUnitCredit = myUnit["credit"]
        setDragSource({teachingPeriodCode, index})
        return {
            teachingPeriodCode,
            index,
            myUnitCredit
        }
    }
}
const UnitTargetDrop = {
    drop(props, monitor, component){
        const {teachingPeriodCode, index,dragSource,moveUnit,insertUnit} = props
        console.log(dragSource)
        if(dragSource.isUnitsMenuUnit){
            console.log("DRAGGED FROM UNIT MENU")
            console.log(dragSource)
            insertUnit(dragSource.unitCode,index,teachingPeriodCode)
        }else {
            //on drop, move unit from index of teaching period to index of other teaching period
            moveUnit(dragSource.index, dragSource.teachingPeriodCode, index, teachingPeriodCode)
        }
    },
    hover(props, monitor, component){

    },
    canDrop(props,monitor){
        const item = monitor.getItem()
        const {teachingPeriodTotalCredits,isDeferred} = props
        const {myUnitCredit} = item
        //if teaching periods can contain extra credits, and teaching period is not deferred
        return (myUnitCredit+teachingPeriodTotalCredits)<=36&&!isDeferred
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
        const {units, unitCode, unitWidth,duplicateUnits} = this.props
        const myUnit = units[unitCode]
        const myUnitCredit = myUnit["credit"]
        const myUnitWidth = unitWidth * (myUnitCredit / 6)
        const myUnitIsDuplicate = duplicateUnits[unitCode]
        const {connectDragSource, connectDropTarget, isHovering, canDrop,removeUnit,teachingPeriodCode, index } = this.props;
        return compose(connectDragSource,connectDropTarget)(
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
                    <button onClick={()=>removeUnit(index,teachingPeriodCode)}>Remove</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {units: state.unitDatabaseReducer.units,dragSource:state.dragAndDropReducer.dragSource, duplicateUnits:state.unitValidationReducer.duplicateUnits}
}

export default compose(connect(mapStateToProps,{setDragSource,moveUnit,removeUnit,insertUnit}),DragSource("Unit",UnitSourceDrag,collectDrag), DropTarget("Unit",UnitTargetDrop,collectDrop))(Unit)