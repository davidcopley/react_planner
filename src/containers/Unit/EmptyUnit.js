import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {DropTarget} from "react-dnd"
import {moveUnit,insertUnit} from "../../actionCreators/planActions"
const EmptyUnitTargetDrop = {
    drop(props, monitor, component){
        const {teachingPeriodCode, index,dragSource,moveUnit,insertUnit} = props
        if(dragSource.isUnitsMenuUnit){
            insertUnit(dragSource.unitCode,index,teachingPeriodCode)
        }else {
            //on drop, move unit from index of teaching period to index of other teaching period
            moveUnit(dragSource.index, dragSource.teachingPeriodCode, index, teachingPeriodCode)
        }
    },
    hover(props, monitor, component){

    },
    canDrop(props,monitor){
        const {isDeferred} = props
        return !isDeferred
    }
}

const collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isHovering: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

class EmptyUnit extends React.Component{
    render(){
        const {unitWidth,connectDropTarget,isHovering,canDrop} = this.props
        return(compose(connectDropTarget)(
            <div className={"empty-unit"} style={{minHeight:100,maxWidth:unitWidth,minWidth:unitWidth,border:isHovering?"2px solid red":"1px solid black",flexGrow:1,userSelect:"none",background:canDrop?"#adff6d":"white",}}>
                EMPTY UNIT
            </div>
        ))
    }
}

const mapStateToProps = state => {
    return {dragSource:state.dragAndDropReducer.dragSource}
}

export default compose(connect(mapStateToProps,{moveUnit,insertUnit}),DropTarget("Unit",EmptyUnitTargetDrop,collectDrop))(EmptyUnit)