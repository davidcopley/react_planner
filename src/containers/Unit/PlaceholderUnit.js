import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {DropTarget} from "react-dnd"
import {moveUnit,insertUnit,removeUnitPlaceholder} from "../../actionCreators/planActions"
import {setIsUnitsMenuOpen} from "../../actionCreators/menuActions"
import "./EmptyUnit.css"
const PlaceholderUnitTargetDrop = {
    drop(props, monitor, component){
        const {teachingPeriodCode, index,dragSource,moveUnit,insertUnit,removeUnitPlaceholder} = props
        removeUnitPlaceholder(index,teachingPeriodCode)
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

class PlaceholderUnit extends React.Component{
    render(){
        const {unitWidth,connectDropTarget,isHovering,canDrop,setIsUnitsMenuOpen,placeholderUnitText} = this.props
        return(compose(connectDropTarget)(
            <div onClick={()=>setIsUnitsMenuOpen(true)}  className={"empty-unit"} style={{minHeight:100,maxWidth:unitWidth,minWidth:unitWidth,border:isHovering?"2px solid red":undefined,flexGrow:1,userSelect:"none",background:canDrop?"#adff6d":"#b2ccff",boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"}}>
                {placeholderUnitText}
            </div>
        ))
    }
}

const mapStateToProps = state => {
    return {dragSource:state.dragAndDropReducer.dragSource}
}

export default compose(connect(mapStateToProps,{moveUnit,insertUnit,setIsUnitsMenuOpen,removeUnitPlaceholder}),DropTarget("Unit",PlaceholderUnitTargetDrop,collectDrop))(PlaceholderUnit)