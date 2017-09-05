import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {DragSource, DropTarget} from "react-dnd"

const UnitSourceDrag = {
    beginDrag(props, monitor, component){
        const {teachingPeriodCode, index} = component.props
        return {
            teachingPeriodCode,
            index
        }
    }
}
const UnitSourceDrop = {
    drop(props, monitor, component){
        console.log(component)
    }
}

const collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    };
}

const collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Unit extends React.Component {
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
    return {units: state.planUnitsReducer.units}
}

export default compose(DragSource("Unit",UnitSourceDrag,collectDrag), DropTarget("Unit",UnitSourceDrop,collectDrop), connect(mapStateToProps))(Unit)