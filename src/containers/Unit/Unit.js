import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {DragSource, DropTarget} from "react-dnd"
import {setDragSource} from "../../actionCreators/dragAndDropActions"
import {moveUnit} from "../../actionCreators/planActions"

const UnitSourceDrag = {
    beginDrag(props, monitor, component){
        console.log(props)
        const {teachingPeriodCode, index,setDragSource} = props
        setDragSource({teachingPeriodCode, index})
        console.log("SET DRAG SOURCE")
        return {
            teachingPeriodCode,
            index
        }
    }
}
const UnitSourceDrop = {
    drop(props, monitor, component){
        const {teachingPeriodCode, index,dragSource,moveUnit} = props
        moveUnit(dragSource.index,dragSource.teachingPeriodCode,index,teachingPeriodCode)
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

    }
}

class Unit extends React.Component {
    constructor(props){
        super(props)
        this.state={
            dragSource:null,
            dropTarget:null
        }
    }
    render() {
        const {units, unitCode, unitWidth} = this.props
        const myUnit = units[unitCode]
        const myUnitCredit = myUnit["credit"]
        const myUnitWidth = unitWidth * (myUnitCredit / 6)
        const {connectDragSource, connectDropTarget } = this.props;
        return compose(connectDragSource,connectDropTarget)(
            <div style={{
                minHeight: 100,
                minWidth: myUnitWidth,
                border: "1px solid black",
                flexGrow: 1,
                alignItems: "center"
            }}>
                <div style={{padding: 10, userSelect: "none"}}>
                    {unitCode}<br/>
                    {myUnit.name}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {units: state.planUnitsReducer.units,dragSource:state.dragAndDropReducer.dragSource}
}

export default compose(connect(mapStateToProps,{setDragSource,moveUnit}),DragSource("Unit",UnitSourceDrag,collectDrag), DropTarget("Unit",UnitSourceDrop,collectDrop))(Unit)