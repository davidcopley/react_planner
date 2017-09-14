import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {DropTarget} from "react-dnd"
import {removeUnit,insertUnit} from "../../actionCreators/planActions"
import {addUnitCodeToPlaceholder,removeUnitFromPlaceholder} from "../../actionCreators/planTeachingPeriodActions"
import {setIsUnitsMenuOpen} from "../../actionCreators/menuActions"
import Unit from "../Unit/Unit"
import "./EmptyUnit.css"
const PlaceholderUnitTargetDrop = {
    drop(props, monitor, component){
        const {teachingPeriodCode,dragSource,removeUnit,addUnitCodeToPlaceholder,index} = props
        // removeUnitPlaceholder(index,teachingPeriodCode)
        console.log(index)
        console.log(dragSource)
        if(dragSource.isUnitsMenuUnit){
            // insertUnit(dragSource.unitCode,index,teachingPeriodCode)

            addUnitCodeToPlaceholder(dragSource.unitCode,index,teachingPeriodCode)
        }else {

            //on drop, move unit from index of teaching period to index of other teaching period
            // moveUnit(dragSource.index, dragSource.teachingPeriodCode, index, teachingPeriodCode)
            removeUnit(dragSource.index,dragSource.teachingPeriodCode)
            addUnitCodeToPlaceholder(dragSource.unitCode,index,teachingPeriodCode)
        }
    },
    hover(props, monitor, component){

    },
    canDrop(props,monitor){
        const {isDeferred, placeholder} = props
        const {unitCode} = placeholder
        return !isDeferred && (unitCode===null)
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
        console.log("render")
        const {unitWidth,connectDropTarget,isHovering,canDrop,removeUnitFromPlaceholder,placeholder,index,teachingPeriodCode} = this.props
        const {placeholderText,unitCode} = placeholder
        return(compose(connectDropTarget)(
            <div  className={"empty-unit"} style={{minHeight:100,maxWidth:unitWidth,minWidth:unitWidth,border:isHovering?"2px solid red":undefined,flexGrow:1,userSelect:"none",background:canDrop?"#adff6d":"#b2ccff",boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"}}>
                {placeholderText}<br/>
                {unitCode}<br/>
                {unitCode&&<button onClick={()=>removeUnitFromPlaceholder(index, teachingPeriodCode)}>Remove unit</button>}
            </div>
        ))
    }
}

const mapStateToProps = state => {
    return {dragSource:state.dragAndDropReducer.dragSource}
}

export default compose(connect(mapStateToProps,{removeUnit,insertUnit,setIsUnitsMenuOpen,removeUnitFromPlaceholder,addUnitCodeToPlaceholder}),DropTarget("Unit",PlaceholderUnitTargetDrop,collectDrop))(PlaceholderUnit)