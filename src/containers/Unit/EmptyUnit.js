import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {DropTarget} from "react-dnd"
import {moveUnit} from "../../actionCreators/planActions"
import "./EmptyUnit.css"
const EmptyUnitTargetDrop = {
    drop(props, monitor, component){
        console.log("DROP")
        const {teachingPeriodCode, index,dragSource,moveUnit} = props
        moveUnit(dragSource.index,dragSource.teachingPeriodCode,index,teachingPeriodCode)
    },
    hover(props, monitor, component){

    }
}

const collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

class EmptyUnit extends React.Component{
    render(){
        const {unitWidth,connectDropTarget,isOver} = this.props
        console.log(isOver)
        return(compose(connectDropTarget)(
            <div className={"empty-unit"} style={{minHeight:100,minWidth:unitWidth,border:isOver?"2px solid red":"1px solid black",flexGrow:1,userSelect:"none"}}>
                EMPTY UNIT
            </div>
        ))
    }
}

const mapStateToProps = state => {
    return {dragSource:state.dragAndDropReducer.dragSource}
}

export default compose(connect(mapStateToProps,{moveUnit}),DropTarget("Unit",EmptyUnitTargetDrop,collectDrop))(EmptyUnit)